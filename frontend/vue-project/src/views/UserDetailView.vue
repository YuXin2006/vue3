<template>
  <div style="padding: 20px; border: 1px solid #35495e; margin-top: 20px;">
    
    <h2>用户详情页</h2>
    
    <p>当前路由路径: <strong>{{ $route.path }}</strong></p>
    <p style="font-size: 1.2em;">正在查看的用户 ID 是: 
      <strong style="color: #42b883;">{{ userId }}</strong>
    </p>

    <div v-if="userId == '101'" style="background: #e6f3ff; padding: 10px;">
        加载用户 ID 101: 张三的资料...
    </div>
    <div v-else-if="userId == '202'" style="background: #fff0e6; padding: 10px;">
        加载用户 ID 202: 李四的资料...
    </div>
    <div v-else style="background: #f7f7f7; padding: 10px;">
        加载其他用户 {{ userId }} 的通用资料...
    </div>

  </div>
</template>

<script>
export default {
    computed: {
        // 通过 $route.params 对象获取 URL 中 :id 的值
        userId() {
            return this.$route.params.id;
        }
    },
    // 监听路由变化：如果用户在同一组件内跳转（如从 /user/101 跳到 /user/202），
    // 默认组件不会重新创建。你需要手动 watch $route 来响应变化。
    watch: {
        '$route'(to, from) {
            console.log(`路由已从 ${from.path} 切换到 ${to.path}，组件正在更新内容...`);
            // 在这里可以重新获取数据
        }
    }
}
</script>