package com.ohgiraffers.restapi.member.entity;

import lombok.*;

import java.io.Serializable;

/* 복합키 타입을 정의할 때는 Serializable을 반드시 구현 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MemberRolePK implements Serializable {

    private int memberNo;
    private int authorityCode;

}
