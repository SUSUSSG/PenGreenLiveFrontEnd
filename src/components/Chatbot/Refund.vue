<template>
  <div>
    <div class="order-history">
      <p class="ai-card-title">주문 상품 채널 정보</p>
      <ul>
        <li v-for="(order, index) in orders" :key="order.orderSeq">
          <div class="col">
            <p class="text-order-date">{{ formatDate(order.orderDate) }}</p>
            <div class="row" style="margin-bottom: 1rem;">
              <img
                :src="order.productImage"
                alt="productImage"
                class="img-product"
              />
              <p class="text-product-name" >{{ order.productName }}</p>
            </div>
            <div class="row">
              <img
                :src="
                  order.channelImage
                    ? order.channelImage
                    : 'https://placehold.co/80x80'
                "
                alt="channelImage"
                class="img-channel"
              />
              <div class="col">
                <p class="text-channel-name" style="font-size: 1.2rem;">{{ order.channelName }}</p>
              </div>
              <div class="channel-move-button"><a :href= "order.channelUrl" class="text-move">바로가기</a></div>
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
      axios
        .get(`http://localhost:8090/openai/recent-orders`)
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
.text-move{
  word-wrap: break-word;
  white-space: normal;
  min-width:fit-content;
}
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
  border-radius: 20cm;
  margin-top: 1rem;
  font-weight: bold;
  color: #111111;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.1s ease;
}

.img-product {
  width: 40px;
  height: 40px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
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
  width: 100%;
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

/* 긴 텍스트 줄바꿈 추가 */
.text-product-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 310px;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
  text-indent: 0 !important;
  margin-left: 1rem;
}

/* 채널 이미지 */
.img-channel {
  width: 80px;
  height: 80px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-right: 1rem;
  border-radius:100%;
}

/* 요소 사이 가로선 */
.divider {
  width: 100%;
  border: 0.5px solid #ccc;
  margin: 1rem 0;
}

.channel-move-button{
  min-width: fit-content;
  background-color: darkgreen;
  padding: 0.5rem 1rem;
  color: white;
border-radius: 10px;
}

.text-order-date{
  font-weight: bold;
  margin-bottom:0.5rem;
}
</style>
