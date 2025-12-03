<script>
// 使用 Options API 结构来保持和你的代码风格一致

import GlobalApiDemo from './components/GlobalApiDemo.vue'

export default {
  components: { GlobalApiDemo },
  
  data() {
    return {
      // 模块一：组件通信的数据
      message: '等待 BaseButton 的点击事件报告...',
      
      // 模块二：条件渲染的数据
      isLoggedIn: true,    
      isVisible: true,

      // 模块三：列表渲染的数据
      shoppingList: [
        { id: 101, name: '牛奶', done: false },
        { id: 102, name: '鸡蛋', done: true },
        { id: 103, name: '面包', done: false },
        { id: 104, name: '咖啡豆', done: false },
      ],
      
      // 模块五：v-model 的数据
      searchQuery: '',        // 绑定到文本输入框
      isSubscribed: false,    // 绑定到复选框
    }
  },
  
  methods: {
    handleButtonClickReport(payload) {
      console.log('App.vue 收到报告:', payload);
      this.message = `✅ 收到来自子组件的报告！状态：${payload.status}`;
    },
    
    // 模块四：事件修饰符的方法
    logClick(event) {
        console.log(`接收到点击事件，来自: ${event.currentTarget.id}`);
    },
    logClickStopped(event) {
        console.log(`阻止了事件冒泡，只接收到来自: ${event.currentTarget.id}`);
        event.stopPropagation();
    } 
},
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
    <!--列表渲染-->
    <div style="padding: 15px; background: #fffbe6; border-radius: 4px; margin-bottom: 30px;">
      <h2>三、列表渲染演示 (v-for)</h2>
      <h4 style="margin-top:0;">购物清单 (共 {{ shoppingList.length }} 项)</h4>

      <ul style="list-style: none; padding: 0;">
        <li 
          v-for="(item, index) in shoppingList" 
          :key="item.id" 
          :style="{
            textDecoration: item.done ? 'line-through' : 'none',
            color: item.done ? '#888' : '#333',
            marginBottom: '5px'
          }"
        >
          [{{ index + 1 }}] **{{ item.name }}** - ID: {{ item.id }}
        </li>
      </ul>
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
        
        <button @click="IsLoggedIn = !IsLoggedIn">
          切换 v-if 状态 (当前: {{ IsLoggedIn ? '已登录' : '未登录' }})
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


    <hr style="margin: 20px 0; border-color: #eee;">
    <div style="padding: 15px; background: #f0f8ff; border-radius: 4px; margin-bottom: 30px;">
      <h2>四、事件修饰符演示 (.stop)</h2>
      
      <div id="parent" @click="logClick" style="border: 2px solid #333; padding: 20px;">
        <h4>父级容器 (ID: parent)</h4>
        <p>点击这里会触发父级容器的 logClick 事件。</p>
        
        <button id="child-1" @click="logClick" style="margin-right: 10px;">
          点击我 (冒泡)
        </button>
        
        <button id="child-2" @click.stop="logClickStopped" style="background: #ff5555; color: white;">
          点击我 (.stop 阻止冒泡)
        </button>
      </div>

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