package com.apexgarage.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private Integer year;

    @Column(name = "model_key", nullable = false, unique = true)
    private String modelKey;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "glb_path")
    private String glbPath;

    // Named attachment nodes for 3D part placement
    // e.g. "wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,wing_rear,exhaust_tip"
    @Column(name = "attachment_nodes", length = 512)
    private String attachmentNodes;

    @Column(length = 1024)
    private String description;
}
