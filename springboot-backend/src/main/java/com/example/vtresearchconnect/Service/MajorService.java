package com.example.vtresearchconnect.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vtresearchconnect.DTO.MajorDTO;
import com.example.vtresearchconnect.Entity.Major;
import com.example.vtresearchconnect.Repository.MajorRepository;

@Service
public class MajorService {
    @Autowired
    private MajorRepository MajorRepository;

    public List<MajorDTO> getAllMajors() {
        return MajorRepository.findAllMajors();
    }

    public List<MajorDTO> getMajorByCollege(String collegeName) {
        return MajorRepository.findMajorByCollege(collegeName);
    }

    public MajorDTO mapMajorToDTO(Major major){
        return new MajorDTO(
            major.getId(),
            major.getName(),
            major.getCollege().getName()
        );
    }

}
