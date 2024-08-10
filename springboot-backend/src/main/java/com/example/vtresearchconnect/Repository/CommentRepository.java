package com.example.vtresearchconnect.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vtresearchconnect.Entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
}
