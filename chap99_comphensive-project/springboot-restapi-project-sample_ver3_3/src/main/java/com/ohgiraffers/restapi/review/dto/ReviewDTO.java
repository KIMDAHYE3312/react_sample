package com.ohgiraffers.restapi.review.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewDTO {

    private int reviewCode;
    private int productCode;
    private int memberCode;
    private String reviewTitle;
    private String reviewContent;
    private String reviewCreateDate;
}
