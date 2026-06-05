package com.springboot.myproj.service;

import com.springboot.myproj.model.Employer;
import com.springboot.myproj.repository.EmployerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployerService {
    private final EmployerRepository employerRepository;
    public Employer getByUsername(String username) {
        return employerRepository.findByUserUsername(username);
    }
}
