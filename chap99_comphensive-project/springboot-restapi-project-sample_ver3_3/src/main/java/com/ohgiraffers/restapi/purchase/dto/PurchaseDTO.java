package com.ohgiraffers.restapi.purchase.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PurchaseDTO {

    private String memberId;
    private String orderAddress;
    private int orderAmount;
    private String orderEmail;
    private String orderPhone;
    private String orderReceiver;
    private int productCode;
}
