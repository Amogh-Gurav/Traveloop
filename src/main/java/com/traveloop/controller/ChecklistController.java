package com.traveloop.controller;

import com.traveloop.entity.ChecklistItem;
import com.traveloop.repository.ChecklistItemRepository;
import com.traveloop.repository.TripRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips/{tripId}/checklist")
@CrossOrigin(origins = "*")
public class ChecklistController {

    private final ChecklistItemRepository checklistItemRepository;
    private final TripRepository tripRepository;

    public ChecklistController(ChecklistItemRepository checklistItemRepository, TripRepository tripRepository) {
        this.checklistItemRepository = checklistItemRepository;
        this.tripRepository = tripRepository;
    }

    @PostMapping
    public ResponseEntity<?> addItem(@PathVariable Long tripId, @RequestBody ChecklistItem item) {
        return tripRepository.findById(tripId)
                .map(trip -> {
                    item.setTrip(trip);
                    ChecklistItem saved = checklistItemRepository.save(item);
                    return ResponseEntity.status(HttpStatus.CREATED).body((Object) saved);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Trip not found")));
    }

    @GetMapping
    public ResponseEntity<?> getItems(@PathVariable Long tripId) {
        if (!tripRepository.existsById(tripId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Trip not found"));
        }
        List<ChecklistItem> items = checklistItemRepository.findByTrip_Id(tripId);
        return ResponseEntity.ok(items);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<?> updateItem(@PathVariable Long tripId, @PathVariable Long itemId,
                                         @RequestBody ChecklistItem updated) {
        return checklistItemRepository.findById(itemId)
                .map(item -> {
                    if (!item.getTrip().getId().equals(tripId)) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body((Object) Map.of("error", "Item does not belong to this trip"));
                    }
                    if (updated.getItemName() != null) item.setItemName(updated.getItemName());
                    if (updated.getCategory() != null) item.setCategory(updated.getCategory());
                    if (updated.getIsPacked() != null) item.setIsPacked(updated.getIsPacked());
                    if (updated.getQuantity() != null) item.setQuantity(updated.getQuantity());
                    if (updated.getNotes() != null) item.setNotes(updated.getNotes());
                    ChecklistItem saved = checklistItemRepository.save(item);
                    return ResponseEntity.ok((Object) saved);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Checklist item not found")));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable Long tripId, @PathVariable Long itemId) {
        return checklistItemRepository.findById(itemId)
                .map(item -> {
                    if (!item.getTrip().getId().equals(tripId)) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body((Object) Map.of("error", "Item does not belong to this trip"));
                    }
                    checklistItemRepository.delete(item);
                    return ResponseEntity.ok((Object) Map.of("message", "Item deleted"));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Checklist item not found")));
    }
}
