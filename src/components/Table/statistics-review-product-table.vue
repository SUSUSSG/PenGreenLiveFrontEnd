<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="{ 'selected': selectedRow === rowIndex }"
          @click="selectRow(rowIndex, row)"
        >
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cellIndex === 2 && typeof cell === 'number' ? formatNumber(cell) : cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedRow: null,
    };
  },
  methods: {
    formatNumber(value) {
      if (!value) return '0';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    selectRow(index, row) {
      this.selectedRow = this.selectedRow === index ? null : index;
      this.$emit('product-click', row[0], row[3]); // 상품 코드와 productSeq를 전달
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: 451px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead {
  position: sticky;
  top: 0;
  background-color: #ece6cc;
}

th {
  white-space: nowrap; /* 헤더 텍스트 줄바꿈 방지 */
}

.selected {
  background-color: #f0f0f0;
}
</style>
