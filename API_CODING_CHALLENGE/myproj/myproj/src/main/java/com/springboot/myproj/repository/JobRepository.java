package com.springboot.myproj.repository;

import com.springboot.myproj.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job,Integer> {
}