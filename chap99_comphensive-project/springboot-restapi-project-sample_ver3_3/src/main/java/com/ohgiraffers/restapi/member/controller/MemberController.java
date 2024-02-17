package com.ohgiraffers.restapi.member.controller;

import com.ohgiraffers.restapi.common.ResponseDTO;
import com.ohgiraffers.restapi.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class MemberController {

    private final MemberService memberService;  // service class 생성 이후 코드를 작성

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 조회 , /members/{memberId}
//    @ApiOperation(value = "회원 조회 요청", notes = "회원 한명이 조회됩니다.", tags = { "MemberController" })
    @GetMapping("/members/{memberId}")
    public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String memberId){

        log.info("[MemberController]  selectMyMemberInfo   Start =============== ");
        log.info("[MemberController]  selectMyMemberInfo   {} ====== ", memberId);

        log.info("[MemberController]  selectMyMemberInfo   End ================= ");
        return ResponseEntity
                    .ok()
                    .body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectMyInfo(memberId)));
    }
}
