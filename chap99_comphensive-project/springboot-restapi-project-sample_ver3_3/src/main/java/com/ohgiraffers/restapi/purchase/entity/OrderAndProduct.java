package com.ohgiraffers.restapi.purchase.entity;

import com.ohgiraffers.restapi.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "TBL_ORDER")
@AllArgsConstructor
@Getter
@ToString
public class OrderAndProduct {

    @Id
    @Column(name = "ORDER_CODE")
    private int orderCode;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_CODE")
    private Product product;

    @Column(name = "ORDER_MEMBER")
    private int orderMember;

    @Column(name = "ORDER_PHONE")
    private String orderPhone;

    @Column(name = "ORDER_EMAIL")
    private String orderEmail;

    @Column(name = "ORDER_RECEIVER")
    private String orderReceiver;

    @Column(name = "ORDER_ADDRESS")
    private String orderAddress;

    @Column(name = "ORDER_AMOUNT")
    private String orderAmount;

    @Column(name = "ORDER_DATE")
    private String orderDate;

    protected OrderAndProduct () {};

    public OrderAndProduct orderCode(int orderCode) {
        this.orderCode = orderCode;
        return this;
    }

    public OrderAndProduct product(Product product) {
        this.product = product;
        return this;
    }

    public OrderAndProduct orderMember(int orderMember) {
        this.orderMember = orderMember;
        return this;
    }

    public OrderAndProduct orderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
        return this;
    }

    public OrderAndProduct orderEmail(String orderEmail) {
        this.orderEmail = orderEmail;
        return this;
    }

    public OrderAndProduct orderReceiver(String orderReceiver) {
        this.orderReceiver = orderReceiver;
        return this;
    }

    public OrderAndProduct orderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
        return this;
    }

    public OrderAndProduct orderAmount(String orderAmount) {
        this.orderAmount = orderAmount;
        return this;
    }

    public OrderAndProduct orderDate(String orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public OrderAndProduct build() {
        return new OrderAndProduct(orderCode, product, orderMember, orderPhone, orderEmail, orderReceiver, orderAddress, orderAmount, orderDate);
    }


}
