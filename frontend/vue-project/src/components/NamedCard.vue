<template>
  <div class="named-card">
    
    <header class="card-header">
      <slot name="header">
        [默认卡片头部]
      </slot>
    </header>

    <main class="card-main">
      <slot>
        [默认卡片内容]
      </slot>
    </main>
    
    <footer class="card-footer">
      <slot name="footer">
        [默认卡片底部]
      </slot>
    </footer>

    <aside class="card-sidebar">
      <slot name="sidebar">
        </slot>
    </aside>
    
  </div>
</template>

<script>
export default {
    name: 'NamedCard'
}
</script>

<style scoped>
.named-card {
  border: 2px solid #333;
  padding: 10px;
  border-radius: 8px;
  display: grid;
  grid-template-areas: 
    "header sidebar"
    "main sidebar"
    "footer footer";
  grid-template-columns: 3fr 1fr;
  gap: 10px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-header   { grid-area: header; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
.card-main     { grid-area: main; }
.card-footer   { grid-area: footer; border-top: 1px solid #ddd; padding-top: 5px; text-align: right; }
.card-sidebar  { grid-area: sidebar; background: #e0f7fa; padding: 10px; border-radius: 4px; }
</style>