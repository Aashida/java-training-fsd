package com.springboot.myproj.repository;

import com.springboot.myproj.model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSeekerRepository extends JpaRepository<JobSeeker,Integer> {

    JobSeeker findByUserUsername(String username);
}
