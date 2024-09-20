<template>
  <div>
    <p>binding property</p>
    <ul>
      <li>1 v-bind</li>
      <li>2 v-if,v-else, v-else-if</li>
      <li>3 v-show</li>
      <li>4 v-for</li>
      <li>5 v-model</li>
    </ul>
    <img v-bind:src="urlImage" alt="">
    <div v-bind:style="{ 'font-size' : size }">
      <p>hello</p>
    </div>
    <div v-bind:class="className">
      The class is set with Vue
    </div>


    <p>V-if</p>
    <p v-if="isVif">hiện thị nếu điều kiện v-if đúng</p>

    <p>v-show</p>
    <p v-show="isVShow">hiện thị nếu v-show thảo mãn</p>

    <ul>
      <li v-if="age>30">tuổi trung niên </li>
      <li v-else-if="age>18">tuổi thanh niên</li>
      <li v-else-if="age>6">tuổi trưởng thành</li>
      <li v-else>trẻ nhỏ</li>

    </ul>
    <input :value="inputText" type="text" @input="handlechange">
    <p>giá trị nhập vào :{{ inputText }}</p>
  </div>
</template>

<script setup>
const students=[
  {
    id:1,

  }
]
  import {ref} from "vue";
  const urlImage="https://png.pngtree.com/png-clipart/20230413/original/pngtree-duck-little-yellow-duck-png-image_9051570.png";
  const size="50px";
  const className="heading";
  const isVif= true;
  const isVShow = true;
  const age=20;
  const inputText=ref("hello");
  const handlechange = (event) =>{
    console.log(event.target.value);
    inputText.value=event.target.value;
  }

  /*
    phân biệt v-if và v-show
    đối với v-if
      + nếu điền kiện đúng thì render ra DOM
      + nếu điều kiện sai thì không render ra DOM
      đối với v-show thì nếu điều kiện đúng hay sai thì element vẫn đc render ra DOM,
      chỉ khác nếu điều kiện đúng thì hiện thị ra DOM, chỉ khác nếu điện kiện sai thì : display:none
      ngoài ra đổi với v-if thì có thể dụng thêm v-else, v-else-if
    */
</script>

<style>
  .heading{
    color: green;
  }
</style>