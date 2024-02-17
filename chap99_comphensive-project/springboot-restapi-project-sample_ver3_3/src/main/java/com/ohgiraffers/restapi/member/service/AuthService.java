package com.ohgiraffers.restapi.member.service;

import com.ohgiraffers.restapi.exception.DuplicatedMemberEmailException;
import com.ohgiraffers.restapi.member.dto.MemberDTO;
import com.ohgiraffers.restapi.member.entity.Member;
import com.ohgiraffers.restapi.member.entity.MemberRole;
import com.ohgiraffers.restapi.member.repository.MemberRepository;
import com.ohgiraffers.restapi.member.repository.MemberRoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final MemberRoleRepository memberRoleRepository;

    public AuthService(MemberRepository memberRepository
                        , PasswordEncoder passwordEncoder
                        , ModelMapper modelMapper
                        , MemberRoleRepository memberRoleRepository){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.memberRoleRepository = memberRoleRepository;
    }

    @Transactional   // DML작업은 Transactional 어노테이션 추가
    public Object signup(MemberDTO memberDTO) {

        log.info("[AuthService] signup Start ==================================");
        log.info("[AuthService] memberDTO {} =======> ", memberDTO);

        /* 이메일 중복 유효성 검사(선택적) */
        if(memberRepository.findByMemberEmail(memberDTO.getMemberEmail()) != null){ // 중복된 내용이 있으니 값을 가지고 온 것 (없으면 null)
            log.info("[AuthService] 이메일이 종복됩니다.");
            throw new DuplicatedMemberEmailException("이메일이 중복됩니다.");
        }

        Member registMember = modelMapper.map(memberDTO, Member.class);

        /* 1. TBL_MEMBER 테이블에 회원 insert */
        registMember = registMember.memberPassword(passwordEncoder.encode(registMember.getMemberPassword())).build(); // 평문의 암호문자열을 암호화시켜서 전달
        Member result1 = memberRepository.save(registMember);    // 반환형이 int값이 아니다.
        log.info("[AuthService] result1 ================== {} ", result1);

        /* 2. TBL_MEMBER_ROLE 테이블에 회원별 권한 insert (현재 엔티티에는 회원가입 후 pk값이 없는상태) */
        // 일반 권한의 회원을 추가(AuthorityCode값이 2번)

        /* 엔티티에는 추가 할 회원의 pk값이 아직 없으므로 기존 회원의 마지막 회원 번호를 조회
        *  하지만 jpql에 의해 앞선 save와 jpql이 flush()로 쿼리와 함께 날아가고 회원이 이미 sequence객체 값 증가와 함께
        *  insert가 되어 버린다. -> 고로, maxMemberCode가 현재 가입하는 회원의 번호를 의미한다.
        * */
        MemberRole registMemberRole = new MemberRole(result1.getMemberCode(), 2);
        MemberRole result2 = memberRoleRepository.save(registMemberRole);
        log.info("[AuthService] MemberInsert Result {}",
                        (result1 != null && result2 != null)? "회원 가입 성공" : "회원 가입 실패");

        log.info("[AuthService] signup End ==================================");

        return memberDTO;
    }
}
