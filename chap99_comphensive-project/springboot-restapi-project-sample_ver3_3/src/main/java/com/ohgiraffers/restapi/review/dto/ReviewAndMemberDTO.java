package com.ohgiraffers.restapi.review.dto;

import com.ohgiraffers.restapi.member.dto.MemberDTO;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewAndMemberDTO {

    private int reviewCode;
    private int productCode;
    private MemberDTO member;
    private String reviewTitle;
    private String reviewContent;
    private String reviewCreateDate;
}
