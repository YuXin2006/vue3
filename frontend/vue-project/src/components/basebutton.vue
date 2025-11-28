<script setup>
// --- 1. 定义 Props (接收数据 - 父传子) ---
const props = defineProps({
  label: String, 
  color: {
    type: String,
    required: true 
  }
})

// --- 2. 定义 Events (发出信号 - 子传父) ---
const emit = defineEmits(['button-clicked'])

// 3. 事件处理函数
const handleClick = () => {
  // 触发 'button-clicked' 事件，并携带数据报告给父组件
  emit('button-clicked', { 
    id: 1, 
    status: 'Button was clicked' 
  })
}
</script>

<template>
  <button 
    :style="{ backgroundColor: props.color, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }"
    @click="handleClick"
  >
    {{ props.label || '默认按钮' }}
  </button>
  <p style="font-size: 12px; margin-top: 5px;">（颜色通过 Props 设定）</p>
</template>