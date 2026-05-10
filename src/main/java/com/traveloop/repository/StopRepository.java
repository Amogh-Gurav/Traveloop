package com.traveloop.repository;

import com.traveloop.entity.Stop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StopRepository extends JpaRepository<Stop, Long> {
    List<Stop> findByTrip_IdOrderByStopOrderAsc(Long tripId);
}
