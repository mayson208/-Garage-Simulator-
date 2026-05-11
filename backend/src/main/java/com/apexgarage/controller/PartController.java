package com.apexgarage.controller;

import com.apexgarage.model.Part;
import com.apexgarage.service.PartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PartController {

    private final PartService partService;

    @GetMapping
    public List<Part> getAllParts(
            @RequestParam(required = false) String car,
            @RequestParam(required = false) String category) {

        if (car != null && category != null) {
            return partService.getPartsByCarAndCategory(car, category);
        } else if (car != null) {
            return partService.getPartsByCompatibleCar(car);
        } else if (category != null) {
            return partService.getPartsByCategory(category);
        }
        return partService.getAllParts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Part> getPartById(@PathVariable Long id) {
        return partService.getPartById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
