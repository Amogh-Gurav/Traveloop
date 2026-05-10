package com.traveloop.dto;

import java.math.BigDecimal;
import java.util.List;

public class BudgetResponse {

    private Long tripId;
    private String tripTitle;
    private BigDecimal totalAccommodationCost;
    private BigDecimal totalTransportCost;
    private BigDecimal totalActivityCost;
    private BigDecimal grandTotal;
    private String currency;
    private List<StopBudget> stopBreakdown;

    public static class StopBudget {
        private Long stopId;
        private String cityName;
        private BigDecimal accommodationCost;
        private BigDecimal transportCost;
        private BigDecimal activityCost;
        private BigDecimal stopTotal;

        public Long getStopId() { return stopId; }
        public void setStopId(Long stopId) { this.stopId = stopId; }
        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }
        public BigDecimal getAccommodationCost() { return accommodationCost; }
        public void setAccommodationCost(BigDecimal accommodationCost) { this.accommodationCost = accommodationCost; }
        public BigDecimal getTransportCost() { return transportCost; }
        public void setTransportCost(BigDecimal transportCost) { this.transportCost = transportCost; }
        public BigDecimal getActivityCost() { return activityCost; }
        public void setActivityCost(BigDecimal activityCost) { this.activityCost = activityCost; }
        public BigDecimal getStopTotal() { return stopTotal; }
        public void setStopTotal(BigDecimal stopTotal) { this.stopTotal = stopTotal; }
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }
    public String getTripTitle() { return tripTitle; }
    public void setTripTitle(String tripTitle) { this.tripTitle = tripTitle; }
    public BigDecimal getTotalAccommodationCost() { return totalAccommodationCost; }
    public void setTotalAccommodationCost(BigDecimal totalAccommodationCost) { this.totalAccommodationCost = totalAccommodationCost; }
    public BigDecimal getTotalTransportCost() { return totalTransportCost; }
    public void setTotalTransportCost(BigDecimal totalTransportCost) { this.totalTransportCost = totalTransportCost; }
    public BigDecimal getTotalActivityCost() { return totalActivityCost; }
    public void setTotalActivityCost(BigDecimal totalActivityCost) { this.totalActivityCost = totalActivityCost; }
    public BigDecimal getGrandTotal() { return grandTotal; }
    public void setGrandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public List<StopBudget> getStopBreakdown() { return stopBreakdown; }
    public void setStopBreakdown(List<StopBudget> stopBreakdown) { this.stopBreakdown = stopBreakdown; }
}
