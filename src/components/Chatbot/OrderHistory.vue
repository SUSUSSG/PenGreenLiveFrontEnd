<template>
  <div>
    <div class="order-history">
      <p class="ai-card-title">나의 주문 내역</p>
      <ul>
        <li v-for="(order, index) in orders" :key="order.orderSeq">
          <div class="row">
            <div class="img-wrapper">
              <img :src="order.productImage" alt="productImage" />
            </div>
            <div class="col">
              <div
                class="row"
                style="
                  justify-content: space-between;
                  margin-left: 1rem;
                  width: 270px;
                "
              >
                <div class="row">
                  <p class="text-order-date">
                    {{ formatDate(order.orderDate) }}
                  </p>
                </div>
                <p class="text-order-delivery-status">
                  {{ order.deliveryStatus }}
                </p>
              </div>
              <div class="col name-wrapper">
                <p class="text-order-product-name">{{ order.productNm }}</p>
              </div>
            </div>
          </div>
          <hr v-if="index < orders.length - 1" class="divider" />
        </li>
      </ul>
    </div>
    <div class="card-button" @click="goToOrderList">
      <p class="card-text">자세히 보러가기</p>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      axios
        .get(`/unreviewed-orders`)
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the orders:", error);
        });
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    },
    goToOrderList() {
      this.$el.querySelector(".card-button").classList.add("clicked");
      setTimeout(() => {
        this.$router.push("/order-list");
      }, 150);
    },
  },
};
</script>

<style scoped>
.order-history {
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.ai-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: darkgreen;
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

/* 긴 텍스트 줄바꿈 추가 */
.text-order-product-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 280px;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
  text-indent: 0 !important;
  margin-left: 1rem;
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

/* 요소 사이 가로선 */
.divider {
  width: 100%;
  border: 0.5px solid #ccc;
  margin: 1rem 0;
}
</style>
