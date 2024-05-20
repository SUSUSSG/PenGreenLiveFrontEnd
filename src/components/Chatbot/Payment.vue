<template>
  <div>
    <div class="order-history">
      <div class="col">
        <p class="ai-card-title">나의 결제수단</p>
        <BrandpayRegister/>
      </div>
    </div>
    <div class="card-button" @click="goToPaymentRegister">
      <p class="card-text">결제수단 관리하기</p>
    </div>
  </div>
</template>

<script>
import BrandpayRegister from "@/components/Pay/brandpay-register.vue";

export default {
  data() {
    return {
      orders: [],
    };
  },
  components: {
    BrandpayRegister,
  },
  methods: {
   
    goToPaymentRegister() {
      this.$el.querySelector(".card-button").classList.add("clicked");
      setTimeout(() => {
        this.$router.push("/payment-register");
      }, 150);
    },
  },
};
</script>

<style scoped>
.ai-card-title{
  font-size:1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color:darkgreen;
}
.order-history {
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-button {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 100px;
  margin-top: 1rem;
  font-weight: bold;
  color: #111111;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.1s ease;
}

.card-button:hover {
  transform: scale(1.02);
}

.card-button.clicked {
  transform: scale(0.98);
}

.card-text {
  width: 100%;
  font-size: 1.2rem;
  color: #037a00;
  text-align: center;
}

.col {
  width: 290px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.row {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name-wrapper {
  width: 290px;
}

.img-wrapper {
  width: 90px;
  height: 90px;
  margin-right: 1rem;
}

.img-wrapper img {
  aspect-ratio: 1/1;
  object-fit: cover;
}

.text-wrapper {
  margin-left: 10px;
}

.text-order-product-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 290px;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
}

.text-order-delivery-status {
  font-weight: bold;
  color: darkgreen;
  white-space: pre;
}

.text-order-price {
  font-weight: bold;
}

.text-order-date {
  font-weight: bold;
}
</style>
