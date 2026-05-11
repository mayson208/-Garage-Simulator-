package com.apexgarage.repository;

import com.apexgarage.model.Build;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuildRepository extends JpaRepository<Build, Long> {
    List<Build> findAllByOrderByUpdatedAtDesc();
}
