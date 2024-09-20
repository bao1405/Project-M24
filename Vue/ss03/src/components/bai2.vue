<template>
  <div>
    <div :id="elementId" :class="elementClass">
      Đây là một phần tử với id và class được gán từ biến.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elementId: 'myElementId',
      elementClass: ['class1', 'class2', 'class3'] // Có thể dùng một hoặc nhiều class
    };
  }
};
</script>

<style scoped>
.class1 {
  color: red;
}
.class2 {
  font-weight: bold;
}
.class3 {
  font-size: 20px;
}
</style>
