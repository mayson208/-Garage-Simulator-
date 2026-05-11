package com.apexgarage.service;

import com.apexgarage.model.Build;
import com.apexgarage.repository.BuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        if (build.getShareToken() == null || build.getShareToken().isBlank()) {
            build.setShareToken(generateToken());
        }
        if (build.getIsPublic() == null) {
            build.setIsPublic(false);
        }
        if (build.getCloneCount() == null) {
            build.setCloneCount(0);
        }
        return buildRepository.save(build);
    }

    public Optional<Build> updateBuild(Long id, Build updated) {
        return buildRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setCarModelKey(updated.getCarModelKey());
            existing.setPartsConfig(updated.getPartsConfig());
            existing.setPaintConfig(updated.getPaintConfig());
            existing.setStanceConfig(updated.getStanceConfig());
            existing.setWheelSize(updated.getWheelSize());
            existing.setThumbnailDataUrl(updated.getThumbnailDataUrl());
            return buildRepository.save(existing);
        });
    }

    public Optional<Build> duplicateBuild(Long id) {
        return buildRepository.findById(id).map(original -> {
            Build copy = new Build();
            copy.setName("Copy of " + original.getName());
            copy.setCarModelKey(original.getCarModelKey());
            copy.setPartsConfig(original.getPartsConfig());
            copy.setPaintConfig(original.getPaintConfig());
            copy.setStanceConfig(original.getStanceConfig());
            copy.setWheelSize(original.getWheelSize());
            copy.setThumbnailDataUrl(original.getThumbnailDataUrl());
            copy.setShareToken(generateToken());
            copy.setIsPublic(false);
            copy.setCloneCount(0);
            return buildRepository.save(copy);
        });
    }

    public Optional<Build> getByShareToken(String token) {
        return buildRepository.findByShareToken(token);
    }

    public Optional<Build> toggleVisibility(Long id) {
        return buildRepository.findById(id).map(build -> {
            build.setIsPublic(!Boolean.TRUE.equals(build.getIsPublic()));
            return buildRepository.save(build);
        });
    }

    public Optional<Build> recordClone(String token) {
        return buildRepository.findByShareToken(token).map(build -> {
            build.setCloneCount(build.getCloneCount() == null ? 1 : build.getCloneCount() + 1);
            return buildRepository.save(build);
        });
    }

    public List<Build> getPublicBuilds(int page, int limit, String sort, String carModel) {
        Sort jpaSort = switch (sort) {
            case "clones"     -> Sort.by(Sort.Direction.DESC, "cloneCount");
            case "expensive"  -> Sort.by(Sort.Direction.DESC, "updatedAt");
            default           -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
        Pageable pageable = PageRequest.of(page, limit, jpaSort);

        if (carModel != null && !carModel.isBlank()) {
            return buildRepository.findByIsPublicTrueAndCarModelKey(carModel, pageable).getContent();
        }
        return buildRepository.findByIsPublicTrue(pageable).getContent();
    }

    public boolean deleteBuild(Long id) {
        if (buildRepository.existsById(id)) {
            buildRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private String generateToken() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
    }
}
