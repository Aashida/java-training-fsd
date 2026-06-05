package com.springboot.myproj.service;

import com.springboot.myproj.dto.CreateJobRequest;
import com.springboot.myproj.dto.JobResponse;
import com.springboot.myproj.exceptions.ResourceNotFoundException;
import com.springboot.myproj.mapper.JobMapper;
import com.springboot.myproj.model.Employer;
import com.springboot.myproj.model.Job;
import com.springboot.myproj.repository.JobRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final EmployerService employerService;

    public void createJob(CreateJobRequest dto, String username){

        Employer employer = employerService.getByUsername(username);

        Job job = new Job();

        job.setTitle(dto.title());
        job.setDescription(dto.description());
        job.setLocation(dto.location());
        job.setSalary(dto.salary());

        job.setEmployer(employer);

        jobRepository.save(job);
    }

    public List<JobResponse> getAllJobs(int page, int size){

        Pageable pageable = PageRequest.of(page,size);

        List<Job> jobs = jobRepository.findAll(pageable).getContent();

        return jobs.stream()
                .map(JobMapper::mapEntityToDto)
                .toList();
    }

    public Job getById(int jobId){

        return jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Job Id"));
    }
}