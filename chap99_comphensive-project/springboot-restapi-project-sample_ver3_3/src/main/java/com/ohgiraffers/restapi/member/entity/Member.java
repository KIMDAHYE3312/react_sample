package com.ohgiraffers.restapi.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Table(name = "TBL_MEMBER")
@AllArgsConstructor
@Getter
@ToString
public class Member {

    @Id
    @Column(name = "MEMBER_CODE")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberCode;

    @Column(name = "MEMBER_ID", length = 100, unique = true, nullable = false)
    private String memberId;

    @Column(name = "MEMBER_PASSWORD", length = 500, nullable = false)
    private String memberPassword;

    @Column(name = "MEMBER_NAME", length = 100, nullable = false)
    private String memberName;

    @Column(name = "MEMBER_EMAIL", length = 100)
    private String memberEmail;

    @OneToMany
    @JoinColumn(name = "MEMBER_CODE")
    private List<MemberRole> memberRole;

    @Column(name="MEMBER_STATUS")
    private String memberStatus;

    protected Member() {}

    public Member memberCode(int memberCode) {
        this.memberCode = memberCode;
        return this;
    }

    public Member memberId(String memberId) {
        this.memberId = memberId;
        return this;
    }

    public Member memberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
        return this;
    }

    public Member memberName(String memberName) {
        this.memberName = memberName;
        return this;
    }

    public Member memberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
        return this;
    }

    public Member memberRole(List<MemberRole> memberRole) {
        this.memberRole = memberRole;
        return this;
    }

    public Member memberStatus(String memberStatus){
        this.memberStatus = memberStatus;
        return this;
    }

    public Member build() {
        return new Member(memberCode, memberId, memberPassword, memberName, memberEmail, memberRole, memberStatus);
    }

    @Override
    public String toString() {
        return "Member [memberCode=" + memberCode + ", memberId=" + memberId + ", memberPassword=" + memberPassword
                + ", memberName=" + memberName + ", memberEmail=" + memberEmail + ", memberRole=" + memberRole
                + ", memberStatus=" + memberStatus + "]";
    }
}
