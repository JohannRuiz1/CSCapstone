package com.example.vtresearchconnect.Service;

import com.example.vtresearchconnect.Entity.Lab;
import com.example.vtresearchconnect.Entity.Student;
import com.example.vtresearchconnect.Entity.Subscription;
import com.example.vtresearchconnect.Entity.SubscriptionId;
import com.example.vtresearchconnect.Repository.LabRepository;
import com.example.vtresearchconnect.Repository.StudentRepository;
import com.example.vtresearchconnect.Repository.SubscriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LabRepository labRepository;

    public void addSubscription(Long studentId, Long labId) {
        // Assuming SubscriptionId is a composite key with studentId and labId
        Student student = studentRepository.findById(studentId).get();
        Lab lab = labRepository.findById(labId).get();

        if (student != null && lab != null) {
            // Create the Subscription object with both student and lab
            SubscriptionId id = new SubscriptionId(studentId, labId);
            Subscription subscription = new Subscription();
            subscription.setId(id);
            subscription.setStudent(student);
            subscription.setLab(lab);

            // Save the Subscription
            if (!subscriptionRepository.existsById(id)) {
                subscriptionRepository.save(subscription);
            }
        } else {
            throw new RuntimeException("Student or Lab not found");
        }
    }

    public void removeSubscription(Long studentId, Long labId) {
        SubscriptionId id = new SubscriptionId(studentId, labId);
        if (subscriptionRepository.existsById(id)) {
            subscriptionRepository.deleteById(id);
        } else {
            throw new RuntimeException("Subscription not found");
        }
    }
}
