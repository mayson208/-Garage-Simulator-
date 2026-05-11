package com.apexgarage.repository;

import com.apexgarage.model.Build;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuildRepository extends JpaRepository<Build, Long> {

    List<Build> findAllByOrderByUpdatedAtDesc();

    Optional<Build> findByShareToken(String shareToken);

    Page<Build> findByIsPublicTrue(Pageable pageable);

    @Query("SELECT b FROM Build b WHERE b.isPublic = true AND b.carModelKey = :carModelKey")
    Page<Build> findByIsPublicTrueAndCarModelKey(@Param("carModelKey") String carModelKey, Pageable pageable);

    @Query("SELECT b FROM Build b WHERE b.isPublic = true AND b.partsConfig LIKE %:partCategory%")
    Page<Build> findByIsPublicTrueAndPartsConfigContaining(@Param("partCategory") String partCategory, Pageable pageable);
}
