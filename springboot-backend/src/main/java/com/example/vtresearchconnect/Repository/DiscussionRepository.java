package com.example.vtresearchconnect.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vtresearchconnect.Entity.Discussion;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
}
