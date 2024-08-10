package com.example.vtresearchconnect.Repository;

import com.example.vtresearchconnect.Entity.Lab;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LabRepository extends JpaRepository<Lab, Long> {

    @Query("SELECT l FROM Lab l JOIN l.major JOIN l.major.college")
    List<Lab> findAllLabs();

    @Query("SELECT l FROM Lab l JOIN l.major m JOIN l.major.college WHERE m.name = :majorName")
    List<Lab> findByMajor(@Param("majorName") String majorName);

    @Query("SELECT l FROM Lab l JOIN l.major m JOIN m.college c WHERE c.name = :collegeName")
    List<Lab> findByCollege(@Param("collegeName") String collegeName);

    Lab findByName(String name);

    @Query("SELECT l FROM Lab l WHERE l.id = :id")
    Lab findLabById(@Param("id") Long id);

}
