package com.apexgarage.controller;

import com.apexgarage.model.Build;
import com.apexgarage.service.BuildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/builds")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BuildController {

    private final BuildService buildService;

    @GetMapping
    public List<Build> getAllBuilds() {
        return buildService.getAllBuilds();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Build> getBuildById(@PathVariable Long id) {
        return buildService.getBuildById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Build> createBuild(@RequestBody Build build) {
        Build saved = buildService.saveBuild(build);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Build> updateBuild(@PathVariable Long id, @RequestBody Build build) {
        return buildService.updateBuild(id, build)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/duplicate")
    public ResponseEntity<Build> duplicateBuild(@PathVariable Long id) {
        return buildService.duplicateBuild(id)
                .map(b -> ResponseEntity.status(HttpStatus.CREATED).body(b))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuild(@PathVariable Long id) {
        return buildService.deleteBuild(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
