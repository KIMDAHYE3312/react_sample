package com.ohgiraffers.restapi.purchase.repository;

import com.ohgiraffers.restapi.purchase.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
