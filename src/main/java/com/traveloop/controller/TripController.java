package com.traveloop.controller;

import com.traveloop.dto.BudgetResponse;
import com.traveloop.entity.Activity;
import com.traveloop.entity.Stop;
import com.traveloop.entity.Trip;
import com.traveloop.entity.User;
import com.traveloop.repository.ActivityRepository;
import com.traveloop.repository.StopRepository;
import com.traveloop.repository.TripRepository;
import com.traveloop.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final StopRepository stopRepository;
    private final ActivityRepository activityRepository;

    public TripController(TripRepository tripRepository, UserRepository userRepository,
                          StopRepository stopRepository, ActivityRepository activityRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
        this.stopRepository = stopRepository;
        this.activityRepository = activityRepository;
    }

    @PostMapping
    public ResponseEntity<?> createTrip(@RequestBody Trip trip, @RequestParam Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    trip.setUser(user);
                    trip.setShareToken(UUID.randomUUID().toString().replace("-", "").substring(0, 16));
                    Trip saved = tripRepository.save(trip);
                    return ResponseEntity.status(HttpStatus.CREATED).body((Object) saved);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found")));
    }

    @GetMapping
    public ResponseEntity<?> getAllTrips(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            List<Trip> trips = tripRepository.findByUser_IdOrderByCreatedAtDesc(userId);
            return ResponseEntity.ok(trips);
        }
        List<Trip> publicTrips = tripRepository.findByIsPublicTrue();
        return ResponseEntity.ok(publicTrips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTripById(@PathVariable Long id) {
        return tripRepository.findById(id)
                .map(trip -> ResponseEntity.ok((Object) trip))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Trip not found")));
    }

    @GetMapping("/shared/{shareToken}")
    public ResponseEntity<?> getTripByShareToken(@PathVariable String shareToken) {
        return tripRepository.findByShareToken(shareToken)
                .map(trip -> ResponseEntity.ok((Object) trip))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Shared trip not found")));
    }

    @PostMapping("/{id}/stops")
    public ResponseEntity<?> addStop(@PathVariable Long id, @RequestBody Stop stop) {
        return tripRepository.findById(id)
                .map(trip -> {
                    stop.setTrip(trip);
                    Stop saved = stopRepository.save(stop);
                    return ResponseEntity.status(HttpStatus.CREATED).body((Object) saved);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Trip not found")));
    }

    @GetMapping("/{id}/stops")
    public ResponseEntity<?> getStops(@PathVariable Long id) {
        if (!tripRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Trip not found"));
        }
        List<Stop> stops = stopRepository.findByTrip_IdOrderByStopOrderAsc(id);
        return ResponseEntity.ok(stops);
    }

    @PostMapping("/{tripId}/stops/{stopId}/activities")
    public ResponseEntity<?> addActivity(@PathVariable Long tripId, @PathVariable Long stopId,
                                          @RequestBody Activity activity) {
        if (!tripRepository.existsById(tripId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Trip not found"));
        }
        return stopRepository.findById(stopId)
                .map(stop -> {
                    if (!stop.getTrip().getId().equals(tripId)) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body((Object) Map.of("error", "Stop does not belong to this trip"));
                    }
                    activity.setStop(stop);
                    Activity saved = activityRepository.save(activity);
                    return ResponseEntity.status(HttpStatus.CREATED).body((Object) saved);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Stop not found")));
    }

    @GetMapping("/{id}/budget")
    public ResponseEntity<?> getBudget(@PathVariable Long id) {
        return tripRepository.findById(id)
                .map(trip -> {
                    List<Stop> stops = stopRepository.findByTrip_IdOrderByStopOrderAsc(id);

                    BigDecimal totalAccommodation = BigDecimal.ZERO;
                    BigDecimal totalTransport = BigDecimal.ZERO;
                    BigDecimal totalActivity = BigDecimal.ZERO;
                    List<BudgetResponse.StopBudget> stopBreakdowns = new ArrayList<>();

                    for (Stop stop : stops) {
                        BudgetResponse.StopBudget sb = new BudgetResponse.StopBudget();
                        sb.setStopId(stop.getId());
                        sb.setCityName(stop.getCityName());

                        BigDecimal accCost = stop.getAccommodationCost() != null ? stop.getAccommodationCost() : BigDecimal.ZERO;
                        BigDecimal transCost = stop.getTransportCost() != null ? stop.getTransportCost() : BigDecimal.ZERO;

                        sb.setAccommodationCost(accCost);
                        sb.setTransportCost(transCost);

                        BigDecimal actCost = BigDecimal.ZERO;
                        List<Activity> activities = activityRepository.findByStop_Id(stop.getId());
                        for (Activity a : activities) {
                            if (a.getCost() != null) {
                                actCost = actCost.add(a.getCost());
                            }
                        }
                        sb.setActivityCost(actCost);
                        sb.setStopTotal(accCost.add(transCost).add(actCost));

                        totalAccommodation = totalAccommodation.add(accCost);
                        totalTransport = totalTransport.add(transCost);
                        totalActivity = totalActivity.add(actCost);

                        stopBreakdowns.add(sb);
                    }

                    BudgetResponse response = new BudgetResponse();
                    response.setTripId(trip.getId());
                    response.setTripTitle(trip.getTitle());
                    response.setTotalAccommodationCost(totalAccommodation);
                    response.setTotalTransportCost(totalTransport);
                    response.setTotalActivityCost(totalActivity);
                    response.setGrandTotal(totalAccommodation.add(totalTransport).add(totalActivity));
                    response.setCurrency(trip.getCurrency());
                    response.setStopBreakdown(stopBreakdowns);

                    return ResponseEntity.ok((Object) response);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Trip not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        if (!tripRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Trip not found"));
        }
        tripRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Trip deleted successfully"));
    }
}
