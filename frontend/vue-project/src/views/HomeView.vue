<script>
import Basebutton from '../components/basebutton.vue';
import GlobalApiDemo from '../components/GlobalApiDemo.vue'
import NamedCard from '../components/NamedCard.vue';
import DataList from '../components/DataList.vue';
import { defineAsyncComponent } from 'vue';
import { useUserStore } from '../stores/user'; // 导入 Store
const LargeChartAsync=defineAsyncComponent(() =>
  import('../components/LargeChart.vue')
);//javascript 的动态import语法


export default {
 components: { GlobalApiDemo,Basebutton,NamedCard ,DataList,LargeChartAsync},

  data() {
    return {
      // 模块一：组件通信的数据
      message: '等待 BaseButton 的点击事件报告...',
      
      // 模块二：条件渲染的数据
      isLoggedIn: false,    
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
      lazyInput: '',         // 绑定到 .lazy 演示
      numberInput: 0,        // 绑定到 .number 演示
      trimInput: '   ',      // 绑定到 .trim 演示 (注意初始值带空格)
      // 用于演示 updated 钩子
      updateCount: 0, 
      //模块十三：异步组件显示控制
      showChart: false,
    }
  },
  setup() {
        const userStore = useUserStore(); // 访问 Store 实例
        
        return {
            userStore // 暴露给模板
        };
    },
  computed: {
    // 派生出未完成任务的数量
    incompleteCount() {
      // 过滤出 done: false 的项，返回其数量
      console.log('💡 计算属性：正在重新计算未完成任务数...');
      return this.shoppingList.filter(item => !item.done).length;
    }
  },
  watch: {
    // 侦听 searchQuery 数据的变化
    searchQuery(newValue, oldValue) {
      console.log(`💡 Watcher 侦听到变化：新值 "${newValue}", 旧值 "${oldValue}"`);
      if (newValue.length > 15) {
        console.warn(`💡 Watcher 警告: 搜索关键词长度超过 15 个字符!`);
      }
    }
  },
  // ==================== 模块八：生命周期钩子 ====================
  created() {
    console.log('🚀 App.vue 已创建 (created 钩子)');
  },
  mounted() {
    console.log('🚀 App.vue 已挂载到 DOM (mounted 钩子)');
  },
  updated(){
    console.log(`🚀 App.vue 已更新 (updated 钩子),当前更新次数：${this.updateCount}`);
  },
  unmounted() {
    console.log('🚀 App.vue 已从 DOM 卸载 (unmounted 钩子)');
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
    } ,
    triggerUpdate(){
      this.updateCount +=1;
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
    <!--列表渲染-->
    <div style="padding: 15px; background: #fffbe6; border-radius: 4px; margin-bottom: 30px;">
      <h2>三、列表渲染演示 (v-for)</h2>
      <h4>购物清单 (共 {{ shoppingList.length }} 项, 未完成: <span style="color: red; font-weight: bold;">{{ incompleteCount }}</span>项)</h4>
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


    <hr style="margin: 20px 0; border-color: #eee;">
    <div style="padding: 15px; background: #e6f7ff; border-radius: 4px; margin-bottom: 30px;">
      <h2>五、表单输入绑定 (v-model)</h2>
      <div style="margin-bottom: 15px;">
        <h4>文本输入绑定: (<span style="color: purple;">被 Watcher 实时侦听</span>)</h4>
        <input 
          v-model="searchQuery" 
          placeholder="输入内容，观察下方实时变化" 
          style="padding: 8px; border: 1px solid #ccc; width: 100%; box-sizing: border-box;"
        />
        <p style="margin-top: 5px;">
          **数据实时状态 (searchQuery):** <code>{{ searchQuery }}</code>
        </p>
      </div>
      <div>
        <h4>复选框绑定:</h4>
        <input 
          type="checkbox" 
          id="subscribe" 
          v-model="isSubscribed"
        >
        <label for="subscribe">7天记住我登陆</label>
        <p style="margin-top: 5px;">
          **数据实时状态 (isSubscribed):** <code>{{ isSubscribed }}</code>
        </p>
      </div>
    </div>


    <hr style="margin: 20px 0; border-color: #eee;">
    <div style="padding: 15px; background: #fdf5e6; border-radius: 4px; margin-bottom: 30px;">
      <h2>六、v-model 修饰符演示 (.lazy, .number, .trim)</h2>
      <!--v-model.lazy 失焦才更新-->
      <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #f0ad4e;">
        <h4>v-model.lazy (失焦才更新)</h4>
        <input v-model.lazy="lazyInput" placeholder="输入并观察">
        <p>数据状态：<code>{{ lazyInput }}</code></p>
        <p style="color: #f0ad4e;">**提示：** 只有当你**点击输入框外部**或**按回车**时，上方数据才会同步。</p>
      </div>
      <!--v-model.number 转为数字类型-->
      <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #5bc0de;">
        <h4>v-model.number (转为数字类型)</h4>
        <input v-model.number="numberInput" type="number" placeholder="输入一个数字">
        <p>数据状态：<code>{{ numberInput }}</code></p>
        <p>数据类型：<code style="color: blue;">{{ typeof numberInput }}</code></p>
      </div>
      <!--v-model.trim 去除首尾空格-->
      <div style="padding: 10px; border: 1px solid #5cb85c;">
        <h4>v-model.trim (去除首尾空格)</h4>
        <input v-model.trim="trimInput" placeholder="输入时前后加空格">
        <p>数据状态：<code>{{ JSON.stringify(trimInput) }}</code></p>
        <p style="color: green;">**提示：** 尝试输入 **[空格]test[空格]**，数据中不会包含空格。</p>
      </div>
    </div>

    <hr style="margin: 20px 0; border-color: #eee;">
    <div style="padding: 15px; background: #e0fff0; border-radius: 4px; margin-bottom: 30px;">
      <h2>八、生命周期钩子演示 (Lifecycle Hooks)</h2>
      <p>当前更新次数: {{ updateCount }}</p>
      <button @click="triggerUpdate" style="background: #e0fff0; border: 1px solid #00c853;">
        点击我触发数据更新 (观察 Console 中的 updated 钩子)
      </button>
      <p style="color: #00c853; margin-top: 10px;">请打开浏览器控制台 (Console) 观察输出。</p>
    </div>


    <hr style="margin: 30px 0;">
    <div style="padding: 15px; background: #f0f0f0; border-radius: 4px;">
      <h2>九、具名插槽演示 (Named Slots)</h2>
      <NamedCard>
        <template #header>
          <h3 style="margin: 0; color: #42b983;">🌟 自定义卡片头部</h3>
        </template>
        
        这是卡片的主要内容区域。你可以在这里放置任何你想要的内容。
        
        <template #footer>
          <button style="background: #42b983; color: white; border: none; padding: 8px 12px; border-radius: 4px;">
            点击我
          </button>
        </template>
        
        <template #sidebar>
          <p style="margin: 0; font-size: 14px;">侧边栏内容，可以放置链接或广告。</p>
        </template>
      </NamedCard>
    </div>

    <hr style="margin: 30px 0;">

<div style="padding: 15px; background: #fff; border-radius: 4px; margin-bottom: 30px;">
  <h2>十二、路由参数演示 (Route Parameters)</h2>

  <p>点击下方链接，访问同一个组件但带有不同的 URL 参数：</p>
  
  <ul style="list-style: none; padding-left: 0;">
    <li>
      <router-link to="/user/101" style="color: #35495e;">查看用户张三 (ID: 101)</router-link>
    </li>
    <li>
      <router-link to="/user/202" style="color: #35495e;">查看用户李四 (ID: 202)</router-link>
    </li>
    <li>
      <router-link to="/user/999" style="color: #35495e;">查看用户 (ID: 999)</router-link>
    </li>
  </ul>
</div>
    

<hr style="margin: 30px 0;">
<div style="padding: 15px; background: #fff; border-radius: 4px; margin-bottom: 30px;">
  <h2>十三、作用域插槽演示 (Scoped Slots)</h2>
  <DataList>
    <template v-slot:default="{ item, index, isLast }"><!--父组件通过 v-slot 指令（或简写 #default）来接收这些插槽属性-->
      <span style="font-weight: bold; margin-right: 10px;">
        {{ index + 1 }}. {{ item.name }}
      </span>
      <span :style="{ color: item.price > 500 ? 'red' : 'green' }">
        ¥ {{ item.price }}
      </span>
      <span v-if="isLast" style="color: blue; margin-left: 10px;">
        (本月特价!)
      </span>
      <p style="font-size: 12px; color: #666; margin: 5px 0 0;">
          [父组件使用子组件数据]
      </p>
    </template>
    
  </DataList>
</div>


<hr style="margin: 30px 0;">

<div style="padding: 15px; background: #fff; border-radius: 4px; margin-bottom: 30px;">
  <h2>十四、异步组件演示 (Asynchronous Components)</h2>
  
  <button @click="showChart = true" :disabled="showChart" 
    style="background: #e91e63; color: white; padding: 10px 20px; border: none; cursor: pointer;">
    {{ showChart ? '图表已加载' : '点击加载大型图表组件' }}
  </button>
  
  <LargeChartAsync v-if="showChart" />
</div>


<hr style="margin: 30px 0;">

<div style="padding: 15px; background: #fff; border-radius: 4px; margin-bottom: 30px;">
  <h2>十五、查询参数演示 (Query Parameters)</h2>
  <p>使用 `router-link` 的 `to` 属性传递查询参数：</p>
  <ul style="list-style: none; padding-left: 0;">
    <li>
      <!--使用 `router-link` 的 `to` 属性传递查询参数-->
      <router-link :to="{ path: '/products', query: { category: 'tech', sort: 'price' } }" style="color: #35495e;">
        🖥️ 科技产品 (按价格排序)
      </router-link>
    </li>
    <li>
      <router-link :to="{ path: '/products', query: { category: 'home' } }" style="color: #35495e;">
        🏠 家居产品 (默认排序)
      </router-link>
    </li>
    <li>
      <router-link to="/products" style="color: #35495e;">
        🌐 查看所有产品
      </router-link>
    </li>
  </ul>
</div>


<hr style="margin: 30px 0;">

<div style="padding: 15px; background: #fff; border-radius: 4px; margin-bottom: 30px; border: 1px solid #00c853;">
  <h2>二十、Pinia 状态管理演示</h2>
  
  <p>登录状态 (Getter):<strong style="color: #00c853;">{{ userStore.welcomeMessage }}</strong></p>
  
  <p>用户 ID (State):{{ userStore.userId }}</p>

  <div style="margin-top: 15px;">
      <button v-if="!userStore.isAuthenticated" @click="userStore.login(1001, '张三')" 
          style="background: #4caf50; color: white; padding: 10px; margin-right: 10px;">
          点击登录 (张三)
      </button>

      <button v-if="!userStore.isAuthenticated" @click="userStore.login(9999, '管理员')" 
          style="background: #ff9800; color: white; padding: 10px; margin-right: 10px;">
          点击登录 (管理员)
      </button>
      
      <button v-if="userStore.isAuthenticated" @click="userStore.logout()" 
          style="background: #e53935; color: white; padding: 10px;">
          点击登出
      </button>
      
      <p v-if="userStore.isAdmin" style="color: red; font-weight: bold; margin-top: 10px;">
          ⚠️ 恭喜！您是管理员！
      </p>
  </div>
</div>

  </main>
</template>
