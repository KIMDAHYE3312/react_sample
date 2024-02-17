package com.ohgiraffers.restapi.review.entity;

import com.ohgiraffers.restapi.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;


@Entity
@Table(name = "TBL_REVIEW")
@AllArgsConstructor
@Getter
@ToString
public class ReviewAndMember {

    @Id
    @Column(name = "REVIEW_CODE", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewCode;

    @Column(name = "PRODUCT_CODE", nullable = false)
    private int productCode;

    @ManyToOne
    @JoinColumn(name = "MEMBER_CODE")
    private Member member;

    @Column(name = "REVIEW_TITLE", length = 100, nullable = false)
    private String reviewTitle;

    @Column(name = "REVIEW_CONTENT", length = 1000, nullable = false)
    private String reviewContent;

    @Column(name = "REVIEW_CREATE_DATE", length = 100, nullable = false)
    private String reviewCreateDate;

    protected ReviewAndMember() {}

    public ReviewAndMember reviewCode(int reviewCode) {
        this.reviewCode = reviewCode;
        return this;
    }

    public ReviewAndMember productCode(int productCode) {
        this.productCode = productCode;
        return this;
    }

    public ReviewAndMember member(Member member) {
        this.member = member;
        return this;
    }

    public ReviewAndMember reviewTitle(String reviewTitle) {
        this.reviewTitle = reviewTitle;
        return this;
    }

    public ReviewAndMember reviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
        return this;
    }

    public ReviewAndMember reviewCreateDate(String reviewCreateDate) {
        this.reviewCreateDate = reviewCreateDate;
        return this;
    }

    public ReviewAndMember build() {
        return new ReviewAndMember(reviewCode, productCode, member, reviewTitle, reviewContent, reviewCreateDate);
    }
}
