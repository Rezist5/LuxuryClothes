<template>
  <div class="product-card">
    <!-- Существующий код продукта -->
    <div class="product-actions">
      <input 
        type="number" 
        v-model.number="quantity" 
        min="1" 
        :max="product.stock"
      >
      <button 
        @click="addToCart" 
        :disabled="!product.stock"
        class="add-to-cart-btn"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const quantity = ref(1)
const props = defineProps(['product'])

const addToCart = async () => {
  try {
    await axios.post('/api/cart/add', {
      product_id: props.product.id,
      quantity: quantity.value
    })
    // Показать уведомление об успехе
  } catch (error) {
    // Обработка ошибки
    console.error('Ошибка при добавлении в корзину:', error)
  }
}
</script>

<style scoped>
.product-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.add-to-cart-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 