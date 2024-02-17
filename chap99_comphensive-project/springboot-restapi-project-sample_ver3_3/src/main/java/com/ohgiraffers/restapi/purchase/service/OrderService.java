package com.ohgiraffers.restapi.purchase.service;

import com.ohgiraffers.restapi.member.repository.MemberRepository;
import com.ohgiraffers.restapi.product.entity.Product;
import com.ohgiraffers.restapi.product.repository.ProductRepository;
import com.ohgiraffers.restapi.purchase.dto.OrderAndProductDTO;
import com.ohgiraffers.restapi.purchase.dto.PurchaseDTO;
import com.ohgiraffers.restapi.purchase.entity.Order;
import com.ohgiraffers.restapi.purchase.entity.OrderAndProduct;
import com.ohgiraffers.restapi.purchase.repository.OrderAndProductRepository;
import com.ohgiraffers.restapi.purchase.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderAndProductRepository orderAndProductRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OrderService(MemberRepository memberRepository, OrderRepository orderRepository, ProductRepository productRepository, OrderAndProductRepository orderAndProductRepository, ModelMapper modelMapper) {
        this.memberRepository = memberRepository;
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;
        this.orderAndProductRepository = orderAndProductRepository;
    }

    @Transactional
    public Object insertProduct(PurchaseDTO purchaseDTO) {
        log.info("[OrderService] insertPurchase Start ==============================");
        log.info("[OrderService] purchaseDTO : " + purchaseDTO);

        int result = 0;

        try {
            /* 해당 주문 회원 pk값 조회 */
            int memberCode = memberRepository.findMemberCodeByMemberId(purchaseDTO.getMemberId());

            java.util.Date now = new java.util.Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd HH:mm:ss");
            String orderDate = sdf.format(now);

            /* 주문 insert(주문건 저장을 위한 Order 엔티티 설정) */
            Order order = modelMapper.map(purchaseDTO, Order.class)
                    .orderMember(memberCode)
                    .orderDate(orderDate)
                    .build();

            orderRepository.save(order);

            /* 상품 재고 update */
            Product product = productRepository.findById(Integer.valueOf(order.getProductCode())).get();
            product = product.productStock(product.getProductStock() - purchaseDTO.getOrderAmount()).build();

            result = 1;

        } catch (Exception e) {
            log.info("[order] Exception!!");
        }

        log.info("[OrderService] insertPurchase End ==============================");
        return (result > 0) ? "주문 성공" : "주문 실패";
    }

    public Object selectPurchaseList(String memberId) {
        log.info("[OrderService] selectPurchaseList Start ==============================");

        int memberCode = memberRepository.findMemberCodeByMemberId(memberId);
        List<OrderAndProduct> orderList = orderAndProductRepository.findByOrderMember(memberCode);

        log.info("[OrderService] purchaseList {}", orderList);

        log.info("[OrderService] selectPurchaseList End ==============================");

        return orderList.stream().map(order -> modelMapper.map(order, OrderAndProductDTO.class)).collect(Collectors.toList());
    }
}
