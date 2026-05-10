package com.traveloop.repository;

import com.traveloop.entity.ChecklistItem;
import com.traveloop.entity.Trip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long> {
    List<ChecklistItem> findByTrip_Id(Long tripId);
}
