package com.apexgarage.service;

import com.apexgarage.model.Car;
import com.apexgarage.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Optional<Car> getCarByModelKey(String modelKey) {
        return carRepository.findByModelKey(modelKey);
    }
}
