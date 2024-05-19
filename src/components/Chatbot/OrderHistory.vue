<template>
  <div>
    <div class="order-history">
      <ul>
        <li v-for="order in orders" :key="order.orderSeq">
          <div class="row">
            <div class="img-wrapper">
              <img :src="order.productImage" alt="productImage" />
            </div>
            <div class="col">
              <div class="row" style="justify-content: space-between">
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
        </li>
      </ul>
    </div>
    <div class="card-button" @click="goToOrderList">
      <p class="card-text">자세히 보러가기</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      const userUuid = "f23a72e0-1347-11ef-b085-f220affc9a21";
      axios
        .get(`http://localhost:8090/unreviewed-orders/${userUuid}`)
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
        this.$router.push('/order-list');
      }, 150);
    },
  },
};
</script>

<style scoped>
.order-history {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-button {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20cm;
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
  -webkit-line-clamp: 2; /* 두 줄을 넘으면 ... 표시 */
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
