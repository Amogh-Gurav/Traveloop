package com.traveloop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stops")
public class Stop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    @JsonIgnore
    private Trip trip;

    @Column(name = "city_name", nullable = false, length = 255)
    private String cityName;

    @Column(nullable = false, length = 255)
    private String country;

    @Column(name = "arrival_date", nullable = false)
    private LocalDate arrivalDate;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "stop_order", nullable = false)
    private Integer stopOrder;

    @Column(name = "accommodation_name", length = 255)
    private String accommodationName;

    @Column(name = "accommodation_cost", precision = 10, scale = 2)
    private BigDecimal accommodationCost;

    @Column(name = "transport_cost", precision = 10, scale = 2)
    private BigDecimal transportCost;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "stop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities = new ArrayList<>();

    @Transient
    private Long tripId;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getTripId() {
        if (trip != null) return trip.getId();
        return tripId;
    }

    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public LocalDate getArrivalDate() { return arrivalDate; }
    public void setArrivalDate(LocalDate arrivalDate) { this.arrivalDate = arrivalDate; }
    public LocalDate getDepartureDate() { return departureDate; }
    public void setDepartureDate(LocalDate departureDate) { this.departureDate = departureDate; }
    public Integer getStopOrder() { return stopOrder; }
    public void setStopOrder(Integer stopOrder) { this.stopOrder = stopOrder; }
    public String getAccommodationName() { return accommodationName; }
    public void setAccommodationName(String accommodationName) { this.accommodationName = accommodationName; }
    public BigDecimal getAccommodationCost() { return accommodationCost; }
    public void setAccommodationCost(BigDecimal accommodationCost) { this.accommodationCost = accommodationCost; }
    public BigDecimal getTransportCost() { return transportCost; }
    public void setTransportCost(BigDecimal transportCost) { this.transportCost = transportCost; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public List<Activity> getActivities() { return activities; }
    public void setActivities(List<Activity> activities) { this.activities = activities; }
}
