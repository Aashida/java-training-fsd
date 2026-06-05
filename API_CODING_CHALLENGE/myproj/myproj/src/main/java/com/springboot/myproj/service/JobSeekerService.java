package com.springboot.myproj.service;

import com.springboot.myproj.exceptions.ResourceNotFoundException;
import com.springboot.myproj.model.JobSeeker;
import com.springboot.myproj.repository.JobSeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;

    public JobSeeker getByUsername(String username){

        JobSeeker seeker = jobSeekerRepository.findByUserUsername(username);

        if(seeker == null){
            throw new ResourceNotFoundException("Job Seeker not found");
        }

        return seeker;
    }
}