package com.ohgiraffers.restapi.member.repository;

import com.ohgiraffers.restapi.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findByMemberId(String memberId);  // 회원아이디로 조회

    Member findByMemberEmail(String memberEmail);

    /* purchase 도메인 추가하면서 추가한 메소드 */
    @Query("SELECT a.memberCode FROM Member a WHERE a.memberId = ?1")
    int findMemberCodeByMemberId(String orderMemberId);

}
