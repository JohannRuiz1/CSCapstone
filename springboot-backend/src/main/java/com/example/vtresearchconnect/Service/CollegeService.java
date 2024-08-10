package com.example.vtresearchconnect.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.DTO.CollegeDTO;
import com.example.vtresearchconnect.Repository.CollegeRepository;
import com.example.vtresearchconnect.Repository.MajorRepository;

@Service
public class CollegeService {
    @Autowired
    private CollegeRepository collegeRepository;
    @Autowired
    private MajorRepository majorRepository;

    public List<CollegeDTO> getAllColleges() {
        return collegeRepository.findAllColleges();
    }

    public List<CollegeDTO> getAllCollegesWithMajors() {
        List<CollegeDTO> colleges = collegeRepository.findAllColleges();
        for(CollegeDTO college: colleges){
            college.setMajors(majorRepository.findMajorByCollegeNoName(college.getName()));
        }
        return colleges;
    }
    
    public CollegeDTO getCollege(String collegeName) {
        return collegeRepository.findCollege(collegeName);
    }

    public CollegeDTO getCollegeWithMajors(String collegeName) {
        CollegeDTO college = collegeRepository.findCollege(collegeName);
        college.setMajors(majorRepository.findMajorByCollegeNoName(college.getName()));
        return college;
    }


}
