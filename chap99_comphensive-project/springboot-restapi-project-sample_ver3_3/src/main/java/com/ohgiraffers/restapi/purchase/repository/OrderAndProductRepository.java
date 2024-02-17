package com.ohgiraffers.restapi.purchase.repository;

import com.ohgiraffers.restapi.purchase.entity.OrderAndProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderAndProductRepository extends JpaRepository<OrderAndProduct, Integer> {

    List<OrderAndProduct> findByOrderMember(int memberId);
}
