<script>
import { RouterView } from 'vue-router';

// 使用 Options API 结构来保持和你的代码风格一致


//import GlobalApiDemo from './components/GlobalApiDemo.vue'

export default {
  //components: { GlobalApiDemo },
}
</script>

<template>
  <div class="main-layout-container" style="padding: 20px;">
    
    <div style="padding: 15px; background: #eee; border-radius: 4px; margin-bottom: 20px;">
      <h2>Vue 路由主导航</h2>
      <router-link to="/" style="margin-right: 15px;">主页 (Index)</router-link>
      <router-link to="/study-modules" style="margin-right: 15px;">学习模块</router-link>
      <router-link to="/about">关于 (About)</router-link>
    </div>
    <div style="padding: 15px; background: #eee; border-radius: 4px; margin-bottom: 20px;">
      </div>
<!--Vue Router 尝试将 default: HomeView 渲染到 所有未命名的 <router-view> 标签 中-->
    <div style="display: flex; gap: 20px;">
        
        <div style="flex-basis: 80%; min-width: 0;">
            <router-view></router-view> 
        </div>

        <div style="flex-basis: 20%; min-width: 0;">
            <router-view name="sidebar"></router-view> 
        </div>
        
    </div>
  </div>

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