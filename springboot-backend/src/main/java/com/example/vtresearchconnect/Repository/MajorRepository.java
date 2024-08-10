package com.example.vtresearchconnect.Repository;

import com.example.vtresearchconnect.DTO.MajorDTO;
import com.example.vtresearchconnect.Entity.Major;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorRepository extends CrudRepository<Major, Long>{
    @Query("SELECT new com.example.vtresearchconnect.DTO.MajorDTO(m.id, m.name) FROM Major m")
    List<MajorDTO> findAllMajors();

    @Query("SELECT new com.example.vtresearchconnect.DTO.MajorDTO(m.id, m.name, m.college.name) FROM Major m JOIN m.college WHERE m.college.name = :collegeName")
    List<MajorDTO> findMajorByCollege(String collegeName);

    @Query("SELECT new com.example.vtresearchconnect.DTO.MajorDTO(m.id, m.name) FROM Major m JOIN m.college WHERE m.college.name = :collegeName")
    List<MajorDTO> findMajorByCollegeNoName(String collegeName);

    Major findByName(String name);
}

