package com.example.vtresearchconnect.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.vtresearchconnect.Entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{
    @Query("SELECT s FROM Student s WHERE s.firstName= :firstName AND s.lastName= :lastName")
    Student findByFirstNameAndLastName(String firstName, String lastName);

    @Query("SELECT s FROM Student s WHERE s.email= :email")
    Student findByEmail(String email);

     @Query("SELECT s FROM Student s WHERE s.user.id = :userId")
    Student findByUserId(@Param("userId") Long userId);
}
