package com.ohgiraffers.restapi.member.repository;

import com.ohgiraffers.restapi.member.entity.MemberRole;
import com.ohgiraffers.restapi.member.entity.MemberRolePK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRoleRepository extends JpaRepository<MemberRole, MemberRolePK> {
}
