package com.ohgiraffers.restapi.member.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberRoleDTO {

    private int memberNo;

    private int authorityCode;

    private AuthorityDTO authority;

    public MemberRoleDTO() {
    }

    public MemberRoleDTO(int memberNo, int authorityCode) {
        this.memberNo = memberNo;
        this.authorityCode = authorityCode;
    }

    public MemberRoleDTO(int memberNo, int authorityCode, AuthorityDTO authority) {
        this.memberNo = memberNo;
        this.authorityCode = authorityCode;
        this.authority = authority;
    }
}
