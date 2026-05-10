package com.traveloop.repository;

import com.traveloop.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUser_IdOrderByCreatedAtDesc(Long userId);
    Optional<Trip> findByShareToken(String shareToken);
    List<Trip> findByIsPublicTrue();
}
