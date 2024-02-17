package com.ohgiraffers.restapi.review.repository;

import com.ohgiraffers.restapi.review.entity.ReviewAndMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewAndMemberRepository extends JpaRepository<ReviewAndMember, Integer> {

    Page<ReviewAndMember> findByProductCode(int searchValue, Pageable paging);
}
