// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/basebutton.vue' // 导入基础组件
import router from './router/index' // 导入路由配置
// 1. 创建应用实例
const app = createApp(App)

// --- 注册全局资源 (Application API) ---

// 2. app.component()：注册全局组件 (让 BaseButton 在任何组件中都可用)
app.component('BaseButton', BaseButton)

// 3. app.directive()：注册全局指令（例如：自动聚焦）
app.directive('focus', {
  mounted (el) {
    el.focus()
  }
})

// 4. app.provide()：全局依赖注入 (设置一个公共资源箱)
app.provide('API_URL', 'https://api.my-study-app.com')

// 5. app.config.globalProperties：挂载全局属性 (添加快速工具)
// 挂载一个全局的日期格式化工具
app.config.globalProperties.$formatDate = (date: string | number | Date) => new Date(date).toLocaleDateString()


// ✅ 关键修复：激活路由功能
// 必须在 app.mount() 之前调用 app.use(router)
app.use(router) // 使用路由插件
// 6. 挂载应用
app.mount('#app')