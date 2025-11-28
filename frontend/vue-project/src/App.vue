<script>
// 使用 Options API 结构来保持和你的代码风格一致

import GlobalApiDemo from './components/GlobalApiDemo.vue'
// BaseButton 已经在 main.js 中全局注册，无需再次导入

export default {
  // 注册组件
  components: { GlobalApiDemo },
  
  data() {
    return {
      message: '等待 BaseButton 的点击事件报告...'
    }
  },
  methods: {
    // 接收子组件发出的事件，并执行响应逻辑
    handleButtonClickReport(payload) {
      console.log('App.vue 收到报告:', payload);
      this.message = `✅ 收到来自子组件的报告！状态：${payload.status}`;
    }
  }
}
</script>

<template>
  <main style="padding: 20px; max-width: 800px; margin: 50px auto; border: 2px solid #ddd; border-radius: 8px;">
    
    <h1>Vue 学习成果演示</h1>
    
    <div style="margin-bottom: 30px; padding: 15px; background: #f9f9f9; border-radius: 4px;">
      <h2>一、组件通信演示 (Props & Events)</h2>
      <p style="color: #444; font-weight: bold;">{{ message }}</p>
      
      <BaseButton 
        label="点击发送报告" 
        color="#42b883" 
        @button-clicked="handleButtonClickReport"
      />
    </div>

    <hr style="margin: 20px 0; border-color: #eee;">
    
    <div style="padding: 15px; background: #f9f9f9; border-radius: 4px;">
      <h2>二、全局 API 演示组件 (Application API)</h2>
      <GlobalApiDemo />
    </div>
    
  </main>
</template>

<style scoped>
h1 {
  color: #35495e;
  text-align: center;
  margin-bottom: 25px;
}
h2 {
  color: #42b883;
  border-bottom: 1px solid #42b883;
  padding-bottom: 5px;
  margin-top: 0;
  margin-bottom: 15px;
}
</style>