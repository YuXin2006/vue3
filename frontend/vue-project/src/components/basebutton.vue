<!--我们不需要创建新的组件，我们可以 升级 你现有的 BaseButton 组件，让它不再依赖 props 来设置标签文本，而是使用插槽，使其更加灵活。-->
<template>
  <button 
    :style="{ backgroundColor: color }" 
    @click="handleClick"
  >
    <slot>
        [点击按钮]
    </slot>
    
  </button>
</template>

<script>
export default {
    // ⚠️ 注意：由于我们不再使用 label props，理论上你可以将它从 props 列表中移除，
    // 但为了兼容旧代码，我们暂时保留它。
    props: {
        // label: { type: String, required: true }, // 移除这一行是最佳实践
        color: { type: String, default: '#333' }
    },
    // ... 其他 methods 保持不变
}
</script>