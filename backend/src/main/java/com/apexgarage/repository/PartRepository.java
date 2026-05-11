package com.apexgarage.repository;

import com.apexgarage.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {

    List<Part> findByCategory(String category);

    @Query("SELECT p FROM Part p WHERE p.compatibleCars LIKE %:carKey%")
    List<Part> findByCompatibleCar(@Param("carKey") String carKey);

    @Query("SELECT p FROM Part p WHERE p.compatibleCars LIKE %:carKey% AND p.category = :category")
    List<Part> findByCompatibleCarAndCategory(@Param("carKey") String carKey, @Param("category") String category);
}
