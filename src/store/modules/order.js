export default {
  state: {
    selectedProduct: null,
    orderForm: {
      orderId: "",
      productSeq: 0,
      orderQty: "",
      orderPayment: "",
      orderDate: 1,
      orderPayedPrice: 0,
      orderProductPrice: 0,
      broadcastSeq: 0,
      vendorSeq: 0,
      channelSeq: 0,
    },
  },
  mutations: {
    setBroadcastId(state, broadcastId) {
      state.orderForm.broadcastSeq = broadcastId;
    },
    setSelectedProduct(state, product) {
        const price = product.price || 0;
        const discountRate = product.discountRate || 0;
        const discountedPrice = price - (price * (discountRate / 100));
        state.selectedProduct = { ...product, discountedPrice };
        state.orderForm.productSeq = product.productSeq;
        state.orderForm.orderProductPrice = discountedPrice;
    },
    updateQuantity(state, quantity) {
      state.orderForm.orderQty = quantity;
    },
    updateTotalAmount(state, totalAmount) {
      state.orderForm.orderPayedPrice = totalAmount;
    },
    setOrderId(state, orderId) {
      state.orderForm.orderId = orderId;
    },
    setOrderForm(state, orderForm) {
      state.orderForm = orderForm;
    },
    resetState(state) {
      state.selectedProduct = null;
      state.orderForm = {
        orderId: "",
        productSeq: "",
        orderQty: "",
        orderPayment: "",
        orderDate: 1,
        orderPayedPrice: 0,
        orderProductPrice: 0,
        broadcastSeq: 0,
        vendorSeq: 0,
        channelSeq: 0,
      };
    },
  },
  actions: {
    async saveOrder({ state }) {
      try {
        const response = await axios.post("/api/order/save", state.orderForm, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          console.log("Order saved successfully:", response.data);
        } else {
          console.log(`Unexpected status code: ${response.status}`);
        }
      } catch (error) {
        console.error("Order saving failed:", error);
      }
    },
    async setOrderId({ commit }, orderId) {
      commit('setOrderId', orderId);
      return orderId;
    },
  },
  getters: {
    selectedProduct: (state) => state.selectedProduct,
    orderForm: (state) => state.orderForm,
    discountedPrice: (state) => state.selectedProduct?.discountedPrice || 0,
  },
  
};
