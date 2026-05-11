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

    // JSON blob: {"bodyKit": 1, "wheels": 3, "suspension": null, ...}
    @Column(name = "parts_config", columnDefinition = "TEXT")
    private String partsConfig;

    // JSON blob: {"type": "solid", "color": "#FF0000", "wrap": null}
    @Column(name = "paint_config", columnDefinition = "TEXT")
    private String paintConfig;

    @Column(name = "thumbnail_data_url", columnDefinition = "TEXT")
    private String thumbnailDataUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
