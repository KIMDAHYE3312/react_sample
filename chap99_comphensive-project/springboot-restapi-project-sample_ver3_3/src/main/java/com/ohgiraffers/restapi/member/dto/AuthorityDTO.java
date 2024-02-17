package com.ohgiraffers.restapi.member.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AuthorityDTO {

    private int authorityCode;
    private String authorityName;
    private String authorityDesc;
}
