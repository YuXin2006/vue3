<template>
  <div style="border: 1px dashed #009688; padding: 20px; margin-top: 15px;">
    <h3>Composition API 基础 (ref, reactive)</h3>

    <p>计数器 (ref): {{ count }}</p>
    <button @click="count++">Ref ++</button>
    <p>ref在script中的值：{{ refValueInScript }}</p>

    <hr>

    <p>用户名称 (reactive)：{{ user.name }}</p>
    <p>用户年龄 (reactive)：{{ user.age }}</p>
    <button @click="updateUser">Reactive 修改年龄</button>
  </div>
</template>

<script setup>
// 使用 <script setup> 语法，这是 Composition API 的推荐用法

import { ref, reactive, computed,watch,watchEffect } from 'vue';

// 1. 定义 ref 响应式状态
const count = ref(0); // count 是一个包含 { value: 0 } 的对象

// 2. 定义 reactive 响应式状态
const user = reactive({
    name: 'Vue Dev',
    age: 25,
    hasChanged: false
});

// 3. 在 Script 中访问 ref 时，必须使用 .value
const refValueInScript = computed(() => {
    return `当前值是: ${count.value} (需要在 script 中使用 .value)`; 
});
watch(count, (newValue, oldValue) => {
    console.log(`[WATCH 1] count 变了：从 ${oldValue} 到 ${newValue}`);
    // 逻辑：当 count 达到 5 时，执行一次提醒
    if (newValue === 5) {
        console.warn('--- 计数达到 5，执行特殊操作！---');
    }
});
// ✅ watch 示例 2: 侦听 reactive 对象的一个属性 (必须使用 Getter 函数)
watch(() => user.age, (newAge, oldAge) => {
    // 注意：如果是侦听 reactive 对象本身，oldValue 和 newValue 可能是同一个对象引用
    console.log(`[WATCH 2] user.age 变了：从 ${oldAge} 到 ${newAge}`);
    user.hasChanged = true; // 侦听到变化后修改另一个状态
});


// 4. 定义方法 (Action)
const updateUser = () => {
    // 访问 ref 需要 .value (虽然本例未修改 ref)
    // 访问 reactive 不需要 .value
    user.age++;
    console.log(`用户年龄已更新为: ${user.age}`);
};

</script>