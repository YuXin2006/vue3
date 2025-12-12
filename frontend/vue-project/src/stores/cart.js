// src/stores/cart.js

import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [], // 购物车商品列表
    }),
    
    getters: {
        // 计算购物车商品总数
        totalItemsCount: (state) => {
            return state.items.length;
        },
        // 计算购物车总金额 (简单假设每件商品 100 元)
        totalAmount() {
            return this.items.length * 100;
        }
    },
    
    actions: {
        // 添加商品到购物车
        addItem(name) {
            this.items.push({ id: Date.now(), name });
            console.log(`已添加商品: ${name}`);
        },
        // 清空购物车
        clearCart() {
            this.items = [];
            console.log('购物车已清空。');
        }
    }
});