<template>
  <div class="large-chart-container">
    <h3 style="color: #c62828;">📊 异步加载组件已完成</h3>
    <p>这个组件的代码是在你需要时才从服务器下载的！</p>
  </div>
</template>

<script>
// 模拟加载延迟 (在实际项目中，这是网络延迟)
export default {
    name: 'LargeChart',
    created() {
        console.log('LargeChart 组件代码已加载并创建。');
    }
}
</script>

<style scoped>
.large-chart-container {
    border: 2px dashed #c62828;
    padding: 20px;
    background: #ffebee;
    margin-top: 15px;
}
</style>