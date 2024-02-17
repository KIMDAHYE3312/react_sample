package com.ohgiraffers.restapi.purchase.controller;

import com.ohgiraffers.restapi.common.ResponseDTO;
import com.ohgiraffers.restapi.purchase.dto.PurchaseDTO;
import com.ohgiraffers.restapi.purchase.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

//    @ApiOperation(value = "상품 주문 요청", notes = "해당 상품 주문이 진행됩니다.", tags = { "OrderController" })
    @PostMapping("/purchase")
    public ResponseEntity<ResponseDTO> insertPurchase(@RequestBody PurchaseDTO purchaseDTO) {	// @RequestBody를 써서 넘어온 JSON 문자열을 모두 받아줄 DTO를 작성할 것(getter, setter 필수!)

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "주문 성공",  orderService.insertProduct(purchaseDTO)));
    }

//    @ApiOperation(value = "회원 주문 리스트 조회 요청", notes = "해당 회원의 주문건에 대한 상품 리스트 조회가 진행됩니다.", tags = { "OrderController" })
    @GetMapping("/purchase/{memberId}")
    public ResponseEntity<ResponseDTO> getPurchaseList(@PathVariable String memberId) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "주문리스트 조회 성공",  orderService.selectPurchaseList(memberId)));
    }
}
