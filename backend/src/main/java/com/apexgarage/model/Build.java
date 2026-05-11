package com.apexgarage.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "builds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Build {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "car_model_key", nullable = false)
    private String carModelKey;

    @Column(name = "parts_config", columnDefinition = "TEXT")
    private String partsConfig;

    @Column(name = "paint_config", columnDefinition = "TEXT")
    private String paintConfig;

    @Column(name = "stance_config", columnDefinition = "TEXT")
    private String stanceConfig;

    @Column(name = "wheel_size")
    private Integer wheelSize;

    @Column(name = "thumbnail_data_url", columnDefinition = "TEXT")
    private String thumbnailDataUrl;

    // Share system
    @Column(name = "share_token", unique = true, length = 12)
    private String shareToken;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = false;

    @Column(name = "clone_count", nullable = false)
    private Integer cloneCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
