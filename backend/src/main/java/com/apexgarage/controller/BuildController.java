package com.apexgarage.controller;

import com.apexgarage.model.Build;
import com.apexgarage.service.BuildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/share/{token}")
    public ResponseEntity<Build> getByShareToken(@PathVariable String token) {
        return buildService.getByShareToken(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/visibility")
    public ResponseEntity<Build> toggleVisibility(@PathVariable Long id) {
        return buildService.toggleVisibility(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/share/{token}/clone")
    public ResponseEntity<Build> cloneFromShare(@PathVariable String token) {
        var original = buildService.recordClone(token);
        if (original.isEmpty()) return ResponseEntity.notFound().build();
        return buildService.duplicateBuild(original.get().getId())
                .map(b -> ResponseEntity.status(HttpStatus.CREATED).<Build>body(b))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/gallery")
    public ResponseEntity<Map<String, Object>> getGallery(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(required = false) String carModel) {
        List<Build> builds = buildService.getPublicBuilds(page, limit, sort, carModel);
        return ResponseEntity.ok(Map.of("builds", builds, "page", page, "limit", limit));
    }
}
