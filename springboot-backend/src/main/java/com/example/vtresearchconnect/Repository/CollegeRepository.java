package com.example.vtresearchconnect.Repository;

import com.example.vtresearchconnect.Entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.vtresearchconnect.DTO.CollegeDTO;
import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Long>{
    @Query("SELECT new com.example.vtresearchconnect.DTO.CollegeDTO(c.id, c.name) FROM College c")
    List<CollegeDTO> findAllColleges();

    @Query("SELECT new com.example.vtresearchconnect.DTO.CollegeDTO(c.id, c.name) FROM College c WHERE c.name = :collegeName")
    CollegeDTO findCollege(String collegeName);

    College findByName(String name);
}
