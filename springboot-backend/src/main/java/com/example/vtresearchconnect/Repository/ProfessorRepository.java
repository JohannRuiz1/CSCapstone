package com.example.vtresearchconnect.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.vtresearchconnect.Entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long>{
    @Query("SELECT p FROM Professor p WHERE p.firstName= :firstName AND p.lastName= :lastName")
    Professor findByFirstNameAndLastName(String firstName, String lastName);

    @Query("SELECT p FROM Professor p WHERE p.user.id = :userId")
    Professor findByUserId(@Param("userId") Long userId);

    @Query("SELECT p FROM Professor p WHERE p.email= :email")
    Professor findByEmail(String email);

    @Query("SELECT p FROM Professor p WHERE p.lab.id = :labId")
    Professor findByLabId(Long labId);

}

