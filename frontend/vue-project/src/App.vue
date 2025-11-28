<script>
// 使用 Options API 结构来保持和你的代码风格一致

import GlobalApiDemo from './components/GlobalApiDemo.vue'
// BaseButton 已经在 main.js 中全局注册，无需再次导入

export default {
  // 注册组件
  components: { GlobalApiDemo },
  
  data() {
    return {
      message: '等待 BaseButton 的点击事件报告...',
      IsLoggedIn:true,
      isvisible:true
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
    <!--条件渲染演示-->
    <div style="border: 1px solid #42b883; padding: 10px; margin-bottom: 15px;">
        <h4 style="margin-top:0;">v-if/v-else 演示 (DOM 销毁)</h4>
        
        <p v-if="isLoggedIn" style="color: green;">
          欢迎回来，用户！(v-if 渲染)
        </p>
        
        <p v-else style="color: red;">
          请先登录。(v-else 渲染)
        </p>
        
        <button @click="isLoggedIn = !isLoggedIn">
          切换 v-if 状态 (当前: {{ isLoggedIn ? '已登录' : '未登录' }})
        </button>
      </div>
      
      <div style="border: 1px solid #35495e; padding: 10px;">
        <h4 style="margin-top:0;">v-show 演示 (CSS display 切换)</h4>
        
        <p v-show="isVisible" style="color: blue;">
          v-show 元素可见。(检查开发者工具，它仍在 DOM 中)
        </p>
        
        <button @click="isVisible = !isVisible">
          切换 v-show 状态 (当前: {{ isVisible ? '可见' : '隐藏' }})
        </button>
      </div>


    
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