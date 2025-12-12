<template>
  <div class="side-nav-container">
    <h3>路由命名视图 (Sidebar)</h3>
    <p>当前路径: {{ $route.path }}</p>
    <p style="font-size: 12px; color: #666;">
        这个组件与 HomeView 同时被渲染。
    </p>
  </div>
</template>

<script>
export default {
    name: 'SideNav'
}
</script>

<style scoped>
.side-nav-container {
    border: 1px solid #ff9800;
    padding: 15px;
    background: #fff3e0;
    border-radius: 4px;
    margin-top: 10px;
}
</style>