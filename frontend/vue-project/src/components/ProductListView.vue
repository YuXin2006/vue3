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
<!--beforeRouteEnter和beforeRouteLeave守卫演示 -->
  <div style="/* ... 样式 */">
    <div style="margin-top: 20px; padding: 10px; background: #ffe0b2; border: 1px dashed orange;">
        <h3>数据加载演示 (beforeRouteEnter)</h3>
        <p>加载状态：{{ listData ? '加载成功！' : '加载中...' }}</p>
        <p v-if="listData">{{ listData }}</p>
    </div>

    <div style="margin-top: 20px;">
        <button @click="hasUnsavedChanges = false" 
          style="background: #4caf50; color: white; padding: 10px; border: none;">
          点击保存 (允许离开)
        </button>
    </div>

  </div>
<!--beforeRouteUpdate守卫演示-->
  <div>
    <h2>商品列表 (Product List)</h2>
    <p>当前页面路径: {{ $route.fullPath }}</p>

    <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; background: #e0f7fa;">
        <strong>内部筛选演示（点击触发 beforeRouteUpdate）：</strong>
        <router-link :to="{ path: '/products', query: { category: 'electronics' } }" style="margin-right: 15px;">电子产品</router-link>
        <router-link :to="{ path: '/products', query: { category: 'books' } }" style="margin-right: 15px;">书籍</router-link>
        <router-link :to="{ path: '/products', query: { category: 'clothing' } }">服装</router-link>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #ffe0b2; border: 1px dashed orange;">
        <h3>数据加载与更新演示</h3>
        <p>上一次导航来源 (from)：{{ updateFrom }}</p>
        <p>加载状态：{{ listData ? '加载成功！' : '加载中...' }}</p>
        <p v-if="listData">{{ listData }}</p>
    </div>
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
    },
    data() {
        return {
            hasUnsavedChanges: true,
            listData: null,
    }
    },
    // ✅ 守卫 1: 阻止离开 (使用 this 访问实例)
    beforeRouteLeave(to, from, next) {
        // 如果有未保存的更改
        if (this.hasUnsavedChanges && !window.confirm('您有未保存的筛选条件，确定要离开吗？')) {
            // next(false) 阻止路由导航
            next(false); 
        } else {
            // next() 允许路由继续跳转
            next();
        }
    },
    // ✅ 守卫 2: 进入前获取数据 (无法访问 this)
    beforeRouteEnter(to, from, next) {
        console.log("➡️ beforeRouteEnter: 组件实例尚未创建，正在模拟数据获取...");
        
        // 模拟异步数据获取，通常是一个 API 调用
        setTimeout(() => {
            const fetchedData = `从服务器获取的商品列表数据：${to.query.category || '全部'}类产品`;
            
            // 必须使用 next(vm => {...}) 才能在数据获取后访问组件实例 (vm 即 this)
            next(vm => {
                // 在 next 回调中，可以安全地访问 vm (组件实例) 并更新 data
                vm.listData = fetchedData;
                console.log("✅ beforeRouteEnter: 数据获取完成，已注入到组件实例。");
            });
        }, 500); // 模拟 500ms 的网络延迟
    },
    beforeRouteUpdate(to, from, next) {
        console.log(`🔄 beforeRouteUpdate: 路由更新，从 ${from.fullPath} 到 ${to.fullPath}`);
        
        // 1. 记录更新信息
        this.updateFrom = from.path;
        
        // 2. 模拟根据新参数重新获取数据
        this.listData = `正在重新获取数据：${to.query.category || '全部'}类产品`;
        
        // 3. 必须调用 next() 以完成导航
        next(); 
    }
}
</script>