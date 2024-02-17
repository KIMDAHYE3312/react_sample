package com.ohgiraffers.restapi.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "TBL_AUTHORITY")
@AllArgsConstructor
@Getter
@ToString
public class Authority {

    @Id
    @Column(name = "AUTHORITY_CODE", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authorityCode;

    @Column(name = "AUTHORITY_NAME", length = 255, nullable = false)
    private String authorityName;

    @Column(name = "AUTHORITY_DESC", length = 4000, nullable = false)
    private String authorityDesc;

    protected Authority() {}

    public Authority authorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
        return this;
    }

    public Authority authorityName(String authorityName) {
        this.authorityName = authorityName;
        return this;
    }

    public Authority authorityDesc(String authorityDesc) {
        this.authorityDesc = authorityDesc;
        return this;
    }

    public Authority build() {
        return new Authority(authorityCode, authorityName, authorityDesc);
    }
}
