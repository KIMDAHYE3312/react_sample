package com.ohgiraffers.restapi.purchase.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "TBL_ORDER")
@AllArgsConstructor
@Getter
@ToString
public class Order {

    @Id
    @Column(name = "ORDER_CODE", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderCode;

    @Column(name = "PRODUCT_CODE", nullable = false)
    private int productCode;

    @Column(name = "ORDER_MEMBER", nullable = false)
    private int orderMember;

    @Column(name = "ORDER_PHONE", length = 100, nullable = false)
    private String orderPhone;

    @Column(name = "ORDER_EMAIL", length = 100, nullable = false)
    private String orderEmail;

    @Column(name = "ORDER_RECEIVER", length = 100, nullable = false)
    private String orderReceiver;

    @Column(name = "ORDER_ADDRESS", length = 500, nullable = false)
    private String orderAddress;

    @Column(name = "ORDER_AMOUNT", length = 50, nullable = false)
    private String orderAmount;

    @Column(name = "ORDER_DATE", length = 100, nullable = false)
    private String orderDate;

    protected Order() {}

    public Order orderCode(int orderCode) {
        this.orderCode = orderCode;
        return this;
    }

    public Order productCode(int productCode) {
        this.productCode = productCode;
        return this;
    }

    public Order orderMember(int orderMember) {
        this.orderMember = orderMember;
        return this;
    }

    public Order orderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
        return this;
    }

    public Order orderEmail(String orderEmail) {
        this.orderEmail = orderEmail;
        return this;
    }

    public Order orderReceiver(String orderReceiver) {
        this.orderReceiver = orderReceiver;
        return this;
    }

    public Order orderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
        return this;
    }

    public Order orderAmount(String orderAmount) {
        this.orderAmount = orderAmount;
        return this;
    }

    public Order orderDate(String orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public Order build() {
        return new Order(orderCode, productCode, orderMember, orderPhone, orderEmail, orderReceiver, orderAddress, orderAmount, orderDate);
    }

}
