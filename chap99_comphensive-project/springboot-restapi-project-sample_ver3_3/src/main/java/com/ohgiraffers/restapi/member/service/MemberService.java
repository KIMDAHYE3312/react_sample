package com.ohgiraffers.restapi.member.service;

import com.ohgiraffers.restapi.member.dto.MemberDTO;
import com.ohgiraffers.restapi.member.entity.Member;
import com.ohgiraffers.restapi.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final ModelMapper modelMapper;

    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    public MemberDTO selectMyInfo(String memberId) {
        log.info("[MemberService]  selectMyInfo   Start =============== ");

        Member member = memberRepository.findByMemberId(memberId);
        log.info("[MemberService]  {} =============== ", member);
        log.info("[MemberService]  selectMyInfo   End =============== ");
        return modelMapper.map(member, MemberDTO.class);
    }
}
