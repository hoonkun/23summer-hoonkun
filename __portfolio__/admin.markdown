---
name: NextJS 기반 세탁물 관리 시스템 웹 어플리케이션
description: NextJS 를 사용하여 세탁 회사의 세탁물 처리 현황 및 거래 클라이언트를 관리하는 페이지를 개발했습니다.
tags: [Typescript, NextJS]
type: official
datetime: 2022
---

2022년에 진행된 프로젝트로, 프론트 전체와 백엔드 일부를 담당했으며 프론트에서는 간단하게 NextJS 만 사용된 프로젝트입니다.  
백엔드에서는 Django 를 사용했으며 도커를 통해 배포되었습니다.  

의류를 세탁하는 세탁 회사가 관리자가 되고, 세탁 회사의 작업자는 당일 진행된 세탁 업무를 기록하며, 거래 클라이언트는 해당 페이지에서 일부 보고서 등을 확인할 수 있는 페이지입니다.  

주된 기능으로는 세탁 회사의 작업자 각각이 어떤 클라이언트의 어떤 세탁물을 처리했는지를 날짜와 함께 표 형태로 기록하고, 그 기록을 취합하여 일별 / 월별 / 월간 보고서를 생성합니다.  
클라이언트 별로, 또 세탁물 별로 단가가 차등 설정될 수 있도록 설계되었고, 보고서는 세탁물 처리 현황 및 단가표, 연간 전체 보고서 등으로 구성됩니다.  

하나의 소스 코드로 여러 도커 컨테이너를 통해 여러 세탁 회사에게 서비스를 제공할 수 있도록 설계되었기도 합니다.
