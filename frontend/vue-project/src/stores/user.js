// src/stores/user.js
import { defineStore } from 'pinia';
import { useCartStore } from './cart';
// 定义并导出一个 Store
export const useUserStore = defineStore('user', { // 'user' 是唯一的 ID

    // 1. State (状态) - 类似于组件的 data()
    state: () => ({
        userId: null,
        userName: 'Guest',
        isAuthenticated: false, // 是否已登录
    }),

    // 2. Getters (计算属性) - 类似于组件的 computed
    getters: {
        // 判断用户是否为管理员 (假设 ID 为 9999 是管理员)
        isAdmin: (state) => {
            return state.userId === 9999;
        },
        // 获取用户的欢迎信息
        welcomeMessage() {
            return this.isAuthenticated ? `欢迎，${this.userName}` : '请登录';
        }
    },

    // 3. Actions (操作) - 类似于组件的 methods
    actions: {
        // 登录操作
       login(id, name) {
            // 直接修改 State
            this.userId = id;
            this.userName = name;
            this.isAuthenticated = true;
            console.log(`${name} 已成功登录！`);

            const cartStore = useCartStore();
            if(cartStore.totalItemsCount > 0) {
                cartStore.clearCart(); // 调用 CartStore 的清空方法
                console.log('--- 购物车已根据登录事件清空 ---');
            }
        },
        // 登出操作 (可以包含异步逻辑)
        async logout() {
            // 模拟 API 调用延迟
            await new Promise(resolve => setTimeout(resolve, 300));
            
            this.userId = null;
            this.userName = 'Guest';
            this.isAuthenticated = false;
            console.log('用户已登出。');
        }
    }
});