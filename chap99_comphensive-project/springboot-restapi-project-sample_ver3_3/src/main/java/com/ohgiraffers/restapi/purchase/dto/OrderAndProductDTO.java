package com.ohgiraffers.restapi.purchase.dto;

import com.ohgiraffers.restapi.product.dto.ProductDTO;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OrderAndProductDTO {

    private int orderCode;
    private ProductDTO product;
    private int orderMember;
    private String orderPhone;
    private String orderEmail;
    private String orderReceiver;
    private String orderAddress;
    private String orderAmount;
    private String orderDate;
}
