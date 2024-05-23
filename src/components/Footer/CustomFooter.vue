<template>
  <footer class="footer">
    <div class="footer-menu">
      <a href="#">회사소개</a>
      <a href="#">이용약관</a>
      <a href="#"><b>개인정보처리방침</b></a>
      <a href="#">영상정보처리기기 운영 · 관리 방침</a>
      <a href="#">청소년보호정책</a>
      <a href="#">입점계약</a>
      <a href="#">판매관리(SPO)</a>
      <a href="#">고객센터</a>
    </div>
    <hr />
    <div class="footer-content">
      <div class="footer-logo">
        <img
          src="src/assets/images/logo/pengreenlive-logo-white.png"
          alt="Logo"
        />
      </div>
      <div class="footer-info">
        <p><strong>주식회사 PenGreenLive</strong></p>
        <p>대표팀장: 홍진욱 | 가산디지털단지2로 169-37</p>
        <p>
          사업자등록번호: 123-98-0225 | 통신판매업 신고번호:
          2024-서울강남-01056호
        </p>
        <p>개인정보보호책임자: 장서윤 | 이메일: susussg@pengreen.com</p>
        <p>호스팅 서비스: (주)신세계아이앤씨</p>
        <p>고객센터: 0105-6035 (운영시간 365일 24시간)</p>
        <p>&copy; 2024 SHINSEGAE LIVE SHOPPING INC. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  margin-top: 5rem;
  background-color: #f4f4f4;
  padding: 20px;
  color: #333;
}

.footer-menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.footer-menu a {
  margin: 0 16px;
  color: #333;
  text-decoration: none;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.footer-logo {
  text-align: center;
  margin-bottom: 20px;
}

.footer-logo img {
  max-width: 200px;
  margin-left: 20px;
  margin-top: 60px;
  margin-bottom: 10px;
}

.footer-info {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.footer-info p {
  margin: 5px 0;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: flex-start;
    gap: 60px;
    margin-top: 60px;
  }

  .footer-logo,
  .footer-info {
    flex: 1;
    margin: 0 20px;
  }

  .footer-logo {
    text-align: left;
    max-width: fit-content;
  }
}
</style>
