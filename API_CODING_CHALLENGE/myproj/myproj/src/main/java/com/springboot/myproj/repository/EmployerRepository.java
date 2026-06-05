package com.springboot.myproj.repository;

import com.springboot.myproj.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer,Integer> {

    Employer findByUserUsername(String username);
}