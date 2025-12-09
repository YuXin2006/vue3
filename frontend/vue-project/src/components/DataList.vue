<template>
  <div class="data-list-container">
    <h3>数据列表 (子组件内部数据)</h3>
    <ul class="item-list">
      <li v-for="(item, index) in items" :key="item.id" class="list-item">
        <slot 
          :item="item" 
          :index="index"
          :is-last="index === items.length - 1"
        ><!--子组件的 <slot> 标签不再只是一个占位符，它变成了一个 数据出口。
            这里，item, index, is-last 就是子组件向外暴露的数据。这些属性的集合被称为 插槽属性 (Slot Props)。-->
          [默认显示: {{ item.name }}]
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'DataList',
    data() {
        return {
            // 这是子组件内部维护的列表数据
            items: [
                { id: 1, name: '笔记本电脑', price: 5500 },
                { id: 2, name: '机械键盘', price: 680 },
                { id: 3, name: '无线鼠标', price: 199 }
            ]
        };
    }
}
</script>

<style scoped>
.data-list-container {
    border: 1px solid #00bcd4;
    padding: 15px;
    background: #e0f7fa;
    border-radius: 4px;
}
.item-list {
    list-style: none;
    padding: 0;
}
.list-item {
    margin-bottom: 8px;
    padding: 5px;
    background: #fff;
    border-left: 5px solid #00bcd4;
}
</style>