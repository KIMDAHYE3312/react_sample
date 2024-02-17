package com.ohgiraffers.restapi.review.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;


@Entity
@Table(name = "TBL_REVIEW")
@AllArgsConstructor
@Getter
@ToString
public class Review {

    @Id
    @Column(name = "REVIEW_CODE", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewCode;

    @Column(name = "PRODUCT_CODE", nullable = false)
    private int productCode;

    @Column(name = "MEMBER_CODE", nullable = false)
    private int memberCode;

    @Column(name = "REVIEW_TITLE", length = 100, nullable = false)
    private String reviewTitle;

    @Column(name = "REVIEW_CONTENT", length = 1000, nullable = false)
    private String reviewContent;

    @Column(name = "REVIEW_CREATE_DATE", length = 100, nullable = false)
    private String reviewCreateDate;

    protected Review () {}

    public Review reviewCode(int reviewCode) {
        this.reviewCode = reviewCode;
        return this;
    }

    public Review productCode(int productCode) {
        this.productCode = productCode;
        return this;
    }

    public Review memberCode(int memberCode) {
        this.memberCode = memberCode;
        return this;
    }

    public Review reviewTitle(String reviewTitle) {
        this.reviewTitle = reviewTitle;
        return this;
    }

    public Review reviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
        return this;
    }

    public Review reviewCreateDate(String reviewCreateDate) {
        this.reviewCreateDate = reviewCreateDate;
        return this;
    }

    public Review build() {
        return new Review(reviewCode, productCode, memberCode, reviewTitle, reviewContent, reviewCreateDate);
    }

}
