// src/composables/useMouseTracker.js

import { ref, onMounted, onUnmounted } from 'vue';

// Composable 函数通常以 useXxx 命名
export function useMouseTracker() {
    
    // 1. 定义响应式状态
    const x = ref(0);
    const y = ref(0);

    // 2. 定义核心逻辑函数
    function update(event) {
        x.value = event.pageX;
        y.value = event.pageY;
    }

    // 3. 管理副作用 (生命周期钩子)
    onMounted(() => window.addEventListener('mousemove', update));
    onUnmounted(() => window.removeEventListener('mousemove', update));

    // 4. 返回状态和方法 (必须返回 ref/reactive 对象以保持响应性)
    return { x, y };
}