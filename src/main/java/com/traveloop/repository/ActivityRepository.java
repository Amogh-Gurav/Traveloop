package com.traveloop.repository;

import com.traveloop.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByStop_Id(Long stopId);
    List<Activity> findByStop_Trip_Id(Long tripId);
}
