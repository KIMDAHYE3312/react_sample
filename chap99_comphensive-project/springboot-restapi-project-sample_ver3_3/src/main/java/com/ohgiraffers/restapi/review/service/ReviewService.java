package com.ohgiraffers.restapi.review.service;

import com.ohgiraffers.restapi.common.Criteria;
import com.ohgiraffers.restapi.review.dto.ReviewAndMemberDTO;
import com.ohgiraffers.restapi.review.dto.ReviewDTO;
import com.ohgiraffers.restapi.review.entity.Review;
import com.ohgiraffers.restapi.review.entity.ReviewAndMember;
import com.ohgiraffers.restapi.review.repository.ReviewAndMemberRepository;
import com.ohgiraffers.restapi.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewAndMemberRepository reviewAndMemberRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ReviewAndMemberRepository reviewAndMemberRepository,
                         ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.reviewAndMemberRepository = reviewAndMemberRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Object insertProductReview(ReviewDTO reviewDTO) {
        log.info("[ReviewService] insertProductReview Start ==============================");

        int result = 0;

        java.util.Date now = new java.util.Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd HH:mm:ss");
        String reviewDate = sdf.format(now);
        reviewDTO.setReviewCreateDate(reviewDate);

        try {
            Review review = modelMapper.map(reviewDTO, Review.class);
            reviewRepository.save(review);

            result = 1;

        } catch (Exception e) {
            log.info("[review insert] Exception!!");
        }

        log.info("[ReviewService] insertProductReview End ==============================");

        return (result > 0) ? "리뷰 입력 성공" : "리뷰 입력 실패" ;
    }

    public long selectReviewTotal(int productCode) {
        log.info("[ReviewService] selectReviewTotal Start ===================================");

        long result = reviewRepository.countByProductCode(productCode);

        log.info("[ReviewService] selectReviewTotal End ===================================");

        return result;
    }

    public Object selectReviewListWithPaging(Criteria cri) {
        log.info("[ReviewService] selectReviewListWithPaging Start ===================================");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("reviewCode"));		// 댓글은 주로 최신글이 위에 올라옴으로 오름차순

        Page<ReviewAndMember> result = reviewAndMemberRepository.findByProductCode(Integer.valueOf(cri.getSearchValue()), paging);
        List<ReviewAndMember> reviewList = (List<ReviewAndMember>)result.getContent();

        log.info("[ReviewService] selectReviewListWithPaging End ===================================");

        return reviewList.stream().map(review -> modelMapper.map(review, ReviewAndMemberDTO.class)).collect(Collectors.toList());
    }

    public Object selectReviewDetail(int reviewCode) {
        log.info("[ReviewService] getReviewDetail Start ==============================");

        ReviewAndMember review = reviewAndMemberRepository.findById(reviewCode).get();

        log.info("[ReviewService] getReviewDetail End ==============================");

        return modelMapper.map(review, ReviewAndMemberDTO.class);
    }

    @Transactional
    public Object updateProductReview(ReviewDTO reviewDTO) {
        log.info("[ReviewService] updateProductReview Start ==============================");

        int result = 0;

        try {
            Review review = reviewRepository.findById(reviewDTO.getReviewCode()).get();
            review = review.reviewTitle(reviewDTO.getReviewTitle())
                    .reviewContent(reviewDTO.getReviewContent())
                    .build();

            result = 1;

        } catch (Exception e) {
            log.info("[review update] Exception!!");
        }

        log.info("[ReviewService] updateProductReview End ==============================");

        return (result > 0) ? "리뷰 수정 성공" : "리뷰 수정 실패" ;
    }
}
