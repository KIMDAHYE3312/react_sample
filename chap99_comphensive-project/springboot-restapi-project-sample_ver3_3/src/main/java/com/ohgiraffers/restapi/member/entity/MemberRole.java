package com.ohgiraffers.restapi.member.entity;

import jakarta.persistence.*;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.ToString;


@Entity
@Table(name = "TBL_MEMBER_ROLE")
@IdClass(MemberRolePK.class)
@Getter
@ToString
public class MemberRole {

    @Id
    @Column(name = "MEMBER_CODE", nullable = false)
    private int memberNo;

    @Id
    @Column(name = "AUTHORITY_CODE", nullable = false)
    private int authorityCode;

    /* Authority 타입의 속성은 조회할 때 Join용으로는 쓰지만 insert나 update할 때는 무시하라고 설정 */
    @ManyToOne
    @JoinColumn(name = "AUTHORITY_CODE", insertable = false, updatable = false)
    private Authority authority;

    protected MemberRole() {
    }

    public MemberRole(int memberNo, int authorityCode) {
        this.memberNo = memberNo;
        this.authorityCode = authorityCode;
    }

    public MemberRole(int memberNo, int authorityCode, Authority authority) {
        this.memberNo = memberNo;
        this.authorityCode = authorityCode;
        this.authority = authority;
    }

    public MemberRole memberNo(int memberNo) {
        this.memberNo = memberNo;
        return this;
    }

    public MemberRole authorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
        return this;
    }

    public MemberRole authority(Authority authority) {
        this.authority = authority;
        return this;
    }

    public MemberRole build() {
        return new MemberRole(memberNo, authorityCode, authority);
    }
}
