# 과학기술부 총합 민사페이 설명서
## 0. Introduction
#### Introduction
<span style="color:gray;">민사페이란 교내 파티 및 민족제에서 사용하는 결제 시스템이다. 	2024년에 새로 개발된 민사페이는 기존에 단순 결제 자체만 가능했던 기존의 민사페이를 개선	하여 상품 단위의 처리를 가능하게 하는 것을 골자로 하였다. 이 서비스는 부스 내 키오스크와 	부스 사용자, 개별 사용자의 상호작용으로 이루어진다.</span>

<span style="color:gray;">본 문서는 과학기술부 내부에서 이 서비스에 대한 공통적인 이해를 	확립하기 위한 목적으로 작성되었다.</span>

#### 목차
  1. 민사페이 사용자종류 및 로그인정보
  2. 민사페이 외/내부 상호작용
  3. 사용자 메뉴얼

## 1. 민사페이 사용자종류
### 사용자 종류
- **부스**: 동아리/부서 등 교내 파티 및 민족제에서의 판매자가 물건/서비스를 제공하는 장소를 말한다
    - **부스통합계정(cpu)**: 부스에서의 판매를 한번에 관리 가능한 계정, 총관리자 계정을 말한다
    - **키오스크 kiosk**: 구매자와 부스에서 물품/서비스를 소비할 수 있게 하는 계정이다
    - **부스 개별 사용자(seller)**: 부스 내에서의 주문 처리 단계에 점근 가능한 개인계정이다.
- **개별 구매자(buyer)**: 소비자, 구매자

## 2. 민사페이 외/내부 상호작용
<!-- ![민사페이_상호작용_구조](./src/images/manual/minsapayUserInteractionImage.png)<br/> -->
### 1. **로그인**
``` 
로그인  -> 1. cpu           
        -> 2. seller mobile
        -> 3. buyer
        -> 4. kiosk
```
(설명 1. firebase에서 아이디와 비밀번호 맞는지 체크
      2. 로그인 정보는 메뉴얼에서 확인)

### 2. **cpu**
```
cpu -menu 편집    -> menu 편집 [kiosk의 메뉴판에 즉시 적용된다]
    -부원 추가    -> add-seller [seller???]
    -로그(번호, 메뉴, 주문자명, 시간, 상태, 환불)
        -Refund   -> 
```
<!-- cpu 설명 듣기(부원추가, 환불) -->
(설명 1. 메뉴편집-firebase
      2. 부원추가-어떤메커니즘으로 추가되는지 seller에 어떻게, 어디에 작용하는지
      3. 로그-특히 환불 백엔드 설명)

### 3. **kiosk**
```
부서/동아리 지정화면(cover) -> authentication -> menu 추가 및 결제(home)-> thankyou -> cover {순환}
```
(설명 1. 지정화면 설정 - firebase
      2. authentication
      3. menu 결제
      4. thankyoupage )

### 4. **seller**
```
seller mobile -> 부스1(선택)->  -주문자
                                -제품명
                                -처리 단계 
                                -담당자
                                -처리단계 변경 버튼[cpu]
              -> 부스2
```
(설명 1. 주문자가 들어오는 과정
      2. 제품명이 들어오는 과정
      3. 처리단계에서 색이 바뀌는 과정
      4. 담당자 바뀌는 과정
      5. 처리단계 변경버튼 -> cpu로 가는 과정)

### 5. **buyer**
```
buyer -주문내역   -물품/서비스 이름
                  -부서/동아리
                  -금액
      -잔고
      -결제  -> keypad -> [kiosk authentication] -> buyer home
```
(설명 1. 주문내역에서 물품서비스 이름이 연동되는 과정
      2. kiosk authentication)

## 3. 사용자 메뉴얼
### 1. 로그인
- 부스
    - 부스통합계정(cpu): **(부서이름)@cpu**
    - 키오스크 kiosk: **(부서이름)@kiosk**
    - 부스 개별 사용자(seller): **(학번)@seller**
- 개별 구매자(buyer): **학번**
<!-- 비밀번호 어떻게 할건지 물어보기 -->

### 2. 부스
  1. cpu <br/>
      ![]() <!-- need to insert image -->
      (설명 1. 구성요소(각각의 구성요소 설명) 2. 부스 권고 내용)
  2. kiosk <br/>
      ![]() <!-- need to insert image -->
      (설명 1. 구성요소(각각의 구성요소 설명) 2. 부스 권고 내용)
  3. seller<br/>
      ![]() <!-- need to insert image -->
      (설명 1. 구성요소(각각의 구성요소 설명) 2. 부스 권고 내용)

### 3. buyer
(설명 1. 구성요소(각각의 구성요소 설명) 2. 부스 권고 내용 3. 환불)


# end of description
<!-- 과학기술부 공식 로그인 정보 
Admin
Admin@developer
happykwagi2024

Moderator
admin@moderator
moderator

CPU
kwagibu@cpu
kwagibu

Kiosk
kwagibu@kiosk
kwagibu

Seller&Buyer(조유찬)
231133 or 231133@seller
231133
-->
