package com.apexgarage.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "parts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String category;

    // Comma-separated car model keys e.g. "supra_mk4,rx7_fd3s"
    @Column(name = "compatible_cars", nullable = false, length = 512)
    private String compatibleCars;

    @Column(name = "price_msrp")
    private Double priceMsrp;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    // JSON object: {"x": 0, "y": 0, "z": 0, "rx": 0, "ry": 0, "rz": 0}
    @Column(name = "model_offset", length = 256)
    private String modelOffset;

    @Column(name = "glb_path")
    private String glbPath;

    @Column(name = "attachment_node")
    private String attachmentNode;

    @Column(length = 1024)
    private String description;

    // Performance part modifiers — null for non-performance parts
    @Column(name = "hp_modifier")
    private Double hpModifier;

    @Column(name = "tq_modifier")
    private Double tqModifier;
}
