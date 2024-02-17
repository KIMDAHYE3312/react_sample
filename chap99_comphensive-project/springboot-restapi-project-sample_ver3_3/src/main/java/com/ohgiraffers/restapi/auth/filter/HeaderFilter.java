package com.ohgiraffers.restapi.auth.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * cors 설정을 위한 fiter 설정
 * */
public class HeaderFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse res = (HttpServletResponse) response;
        res.setHeader("Access-Control-Allow-Origin", "*");  //다른 외부 요청의 응답을 허용할 것 인가?
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  //외부 요청에 허용할 메서드
        res.setHeader("Access-Control-Max-Age", "3600"); // 캐싱을 허용할 시간
        res.setHeader("Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin, Access-Control-Allow-Headers, X-Requested-With, Content-Type, Authorization, X-XSRF-token"
        );
        res.setHeader("Access-Control-Allow-Credentials", "false");
        chain.doFilter(request,response);
    }
}
