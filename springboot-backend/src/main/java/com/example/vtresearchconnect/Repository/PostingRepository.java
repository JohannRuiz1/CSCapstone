package com.example.vtresearchconnect.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vtresearchconnect.Entity.Posting;

public interface PostingRepository extends JpaRepository<Posting, Long> {
    // You can define custom queries here if needed
}
