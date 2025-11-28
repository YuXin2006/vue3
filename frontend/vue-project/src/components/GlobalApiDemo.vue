<script setup>
import { inject } from 'vue'

// 使用 inject() 接收我们在 main.js 中提供的全局 API_URL
const apiUrl = inject('API_URL')

// 假设有一个日期需要格式化
const rawDate = '2025-11-27T10:00:00Z'
</script>

<template>
  <div style="border: 1px dashed #ccc; padding: 15px; margin-bottom: 15px;">
    <h3>全局资源消费演示:</h3>
    
    <input v-focus placeholder="使用 v-focus 指令，自动聚焦" style="padding: 5px; margin-bottom: 10px;">
    
    <p>API URL (来自 provide/inject): <code>{{ apiUrl }}</code></p>
    
    <p>格式化日期 (来自 $formatDate): 
      <code>{{ $formatDate(rawDate) }}</code>
    </p>

  </div>
</template>