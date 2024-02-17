package com.ohgiraffers.restapi.purchase.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OrderDTO {

    private int orderCode;
    private int productCode;
    private int orderMember;
    private String orderPhone;
    private String orderEmail;
    private String orderReceiver;
    private String orderAddress;
    private String orderAmount;
    private String orderDate;
}
