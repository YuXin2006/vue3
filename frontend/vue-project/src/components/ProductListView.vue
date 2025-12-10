<template>
  <div style="padding: 20px; border: 1px solid #00bcd4; margin-top: 20px;">
    
    <h2>🛍️ 商品列表</h2>
    
    <div style="background: #e0f7fa; padding: 10px; margin-bottom: 15px;">
        <p>当前筛选类别 (Category): 
            <strong style="color: #00838f;">{{ currentCategory }}</strong>
        </p>
        <p>当前排序方式 (Sort): 
            <strong style="color: #00838f;">{{ currentSort }}</strong>
        </p>
    </div>

    <p v-if="currentCategory === 'tech'" style="font-weight: bold;">
        💻 显示：笔记本电脑、手机等科技产品...
    </p>
    <p v-else-if="currentCategory === 'home'" style="font-weight: bold;">
        🛋️ 显示：沙发、餐桌等家居产品...
    </p>
    <p v-else style="font-style: italic;">
        🌐 显示：所有类别产品...
    </p>

    <p style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
        数据已按 **{{ currentSort === 'price' ? '价格' : '名称' }}** 进行排序。
    </p>

  </div>
</template>

<script>
export default {
    computed: {
        // 访问查询参数：$route.query
        currentCategory() {
            // 如果 URL 中没有 ?category=xxx，则返回 'all'
            return this.$route.query.category || 'all'; 
        },
        currentSort() {
            // 如果 URL 中没有 ?sort=xxx，则返回 'name'
            return this.$route.query.sort || 'name'; 
        }
    },
    watch: {
        // 监听 $route.query 的变化，在组件不销毁的情况下更新数据
        '$route.query'(newQuery, oldQuery) {
            console.log(`查询参数已变化，从 ${oldQuery.category} 变为 ${newQuery.category}，重新获取商品数据。`);
            // 真实项目中，在这里调用 API 重新请求数据
        }
    }
}
</script>