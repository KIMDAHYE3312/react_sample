package com.ohgiraffers.restapi.review.repository;

import com.ohgiraffers.restapi.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    /* count는 반환형이 long이다. */
    long countByProductCode(int productCode);
}
