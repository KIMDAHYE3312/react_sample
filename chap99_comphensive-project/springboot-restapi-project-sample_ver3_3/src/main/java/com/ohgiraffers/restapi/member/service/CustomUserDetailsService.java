package com.ohgiraffers.restapi.member.service;

import com.ohgiraffers.restapi.member.dto.MemberDTO;
import com.ohgiraffers.restapi.member.entity.Member;
import com.ohgiraffers.restapi.member.entity.MemberRole;
import com.ohgiraffers.restapi.member.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    private final ModelMapper modelMapper;

    public CustomUserDetailsService(MemberRepository memberRepository,
                                    ModelMapper modelMapper){
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {

        Member member = memberRepository.findByMemberId(memberId);
        /* MemberDTO는 엔티티를 옮겨 담는 DTO이자 UserDetails이다. */
        MemberDTO memberDTO = modelMapper.map(member, MemberDTO.class);

        List<GrantedAuthority> authorities = new ArrayList<>();
        for(MemberRole memberRole : member.getMemberRole()){
            String authorityName = memberRole.getAuthority().getAuthorityName();
            authorities.add(new SimpleGrantedAuthority(authorityName));
        }

        memberDTO.setAuthorities(authorities);

        return memberDTO;
    }
}
