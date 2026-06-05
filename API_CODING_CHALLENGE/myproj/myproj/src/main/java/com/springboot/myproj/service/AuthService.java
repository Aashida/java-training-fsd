package com.springboot.myproj.service;

import com.springboot.myproj.dto.RegisterDto;
import com.springboot.myproj.enums.Role;
import com.springboot.myproj.model.Employer;
import com.springboot.myproj.model.JobSeeker;
import com.springboot.myproj.model.User;
import com.springboot.myproj.repository.EmployerRepository;
import com.springboot.myproj.repository.JobSeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserService userService;
    private final EmployerRepository employerRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterDto dto){

        User user = new User();

        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password()));

        user.setRole(dto.role());

        user = userService.save(user);

        if(dto.role() == Role.EMPLOYER){

            Employer employer = new Employer();
            employer.setCompanyName(dto.companyName());
            employer.setUser(user);
            employerRepository.save(employer);
        }

        if(dto.role() == Role.JOBSEEKER){

            JobSeeker seeker = new JobSeeker();
            seeker.setName(dto.name());
            seeker.setResumeSummary(dto.resumeSummary());

            seeker.setUser(user);

            jobSeekerRepository.save(seeker);
        }
    }
}

