package com.apexgarage.service;

import com.apexgarage.model.Build;
import com.apexgarage.repository.BuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BuildService {

    private final BuildRepository buildRepository;

    public List<Build> getAllBuilds() {
        return buildRepository.findAllByOrderByUpdatedAtDesc();
    }

    public Optional<Build> getBuildById(Long id) {
        return buildRepository.findById(id);
    }

    public Build saveBuild(Build build) {
        return buildRepository.save(build);
    }

    public Optional<Build> updateBuild(Long id, Build updated) {
        return buildRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setCarModelKey(updated.getCarModelKey());
            existing.setPartsConfig(updated.getPartsConfig());
            existing.setPaintConfig(updated.getPaintConfig());
            existing.setThumbnailDataUrl(updated.getThumbnailDataUrl());
            return buildRepository.save(existing);
        });
    }

    public boolean deleteBuild(Long id) {
        if (buildRepository.existsById(id)) {
            buildRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
