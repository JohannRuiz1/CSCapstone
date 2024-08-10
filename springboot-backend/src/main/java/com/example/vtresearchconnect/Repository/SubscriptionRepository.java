package com.example.vtresearchconnect.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vtresearchconnect.Entity.Lab;
import com.example.vtresearchconnect.Entity.Student;
import com.example.vtresearchconnect.Entity.Subscription;
import com.example.vtresearchconnect.Entity.SubscriptionId;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionId> {
    List<Subscription> findByStudentId(Long studentId);
    Subscription findByStudentAndLab(Student student, Lab lab);

}
