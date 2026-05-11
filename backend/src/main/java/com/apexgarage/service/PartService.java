package com.apexgarage.service;

import com.apexgarage.model.Part;
import com.apexgarage.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PartService {

    private final PartRepository partRepository;

    public List<Part> getAllParts() {
        return partRepository.findAll();
    }

    public Optional<Part> getPartById(Long id) {
        return partRepository.findById(id);
    }

    public List<Part> getPartsByCategory(String category) {
        return partRepository.findByCategory(category);
    }

    public List<Part> getPartsByCompatibleCar(String carKey) {
        return partRepository.findByCompatibleCar(carKey);
    }

    public List<Part> getPartsByCarAndCategory(String carKey, String category) {
        return partRepository.findByCompatibleCarAndCategory(carKey, category);
    }
}
