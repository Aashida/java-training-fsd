package com.springboot.myproj.service;

import com.springboot.myproj.dto.ApplicationResponse;
import com.springboot.myproj.mapper.ApplicationMapper;
import com.springboot.myproj.model.Application;
import com.springboot.myproj.model.Job;
import com.springboot.myproj.model.JobSeeker;
import com.springboot.myproj.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobService jobService;
    private final JobSeekerService jobSeekerService;

    public void apply(int jobId, String username){

        JobSeeker seeker = jobSeekerService.getByUsername(username);

        Job job = jobService.getById(jobId);

        Application application = new Application();

        application.setJob(job);
        application.setJobSeeker(seeker);

        applicationRepository.save(application);
    }

    public List<ApplicationResponse> getMyApplications(String username, int page, int size){

        Pageable pageable = PageRequest.of(page,size);

        List<Application> applications = applicationRepository.getApplicationsBySeeker(username, pageable).getContent();

        return applications.stream()
                .map(ApplicationMapper::mapEntityToDto)
                .toList();
    }
}
