import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from '@/views/IndexView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import ProductListView from '@/components/ProductListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      //路由元信息
      meta: {
        title: '首页',
        requireAuth: false,
        layout: 'default'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      // ✅ 添加路由元信息
      meta: {
        title: '关于我们',
        requiresAuth: false
      }
    },
    {
      path: '/study-modules',
      name: '/study-modules',
      component: HomeView,

    },
    {
      path: '/user/:id',
      name: 'user-detail',
      component: UserDetailView,
      // ✅ 新增：路由独享守卫 beforeEnter
      beforeEnter: (to, from, next) => {
        // ✅ 关键修正：安全提取 ID
        const idParam = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id;
        // 如果 ID 不存在，阻止导航
        if (!idParam) {
          console.warn('🛑 守卫拦截：缺少用户 ID。');
          return next(false);
        }
        // 将字符串 ID 安全地转换为数字
        const userId = parseInt(idParam);
        // 检查 ID 是否为有效的数字（可选，增强健壮性）
        if (isNaN(userId)) {
          console.warn(`🛑 守卫拦截：用户 ID "${idParam}" 不是数字。`);
          return next(false);
        }
        console.log(`🧭 路由独享守卫：正在检查用户 ID ${userId}`);
        // 假设只有 ID 101, 202 和 999 是有效的
        if ([101, 202, 999].includes(userId)) {
          console.log(`✅ 守卫放行：用户 ID ${userId} 有效。`);
          next();
        } else {
          console.warn(`🛑 守卫拦截：用户 ID ${userId} 无效，已阻止跳转。`);
          // next(false) 阻止跳转，停在 from 页面
          next(false);
        }
      },
      // ✅ 标记此页面需要登录才能访问
      meta: {
        title: 'Vue学习模块',
        requiresAuth: true,
        layout: 'Default'
      }
    },
    {
      path: '/products',
      name: 'product-list',
      component: ProductListView,
    }
  ],
})
const IS_LOGGED_IN = false; // 模拟：假设用户已经登录

router.beforeEach((to, from, next) => {
  // 1. 权限检查 (Authentication Check)
  // 检查目标路由记录 (to.meta) 是否需要认证
  if (to.meta.requiresAuth && !IS_LOGGED_IN) {
    // 如果需要认证且用户未登录
    console.warn(`🛑 路由 "${to.path}" 需要登录才能访问！`);
    // 阻止跳转，并重定向到主页或登录页
    // next('/'); 

    // 🚨 演示目的：为了不影响你的学习，我们暂时放行，但在控制台给出警告
    alert(`警告：路由 ${to.path} 需要登录，但我们已放行。`);
  }

  // 2. 动态设置页面标题 (Title Setting)
  if (to.meta.title) {
    document.title = to.meta.title + ' - Vue App'; // 设置浏览器标签页标题
    console.log(`✅ 页面标题已设置为: ${to.meta.title}`);
  } else {
    document.title = 'Vue App';
  }

  // 必须调用 next() 来放行路由，允许它继续跳转
  next();
});
export default router
