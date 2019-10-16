<template>
  <div class="hello">
    <ul>
      <li>
        <p>姓名</p>
        <p>英雄</p>
        <p>K/D/A</p>
        <p>经济</p>
        <p>参团率</p>
        <p>伤害转化</p>
        <p>承伤转化</p>
        <p>对位经济</p>
        <p>视野</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
    </ul>
    <ul>
      <li>
        <p>姓名</p>
        <p>英雄</p>
        <p>K/D/A</p>
        <p>经济</p>
        <p>参团率</p>
        <p>伤害转化</p>
        <p>承伤转化</p>
        <p>对位经济</p>
        <p>视野</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
      <li>
        <p>GimGoon</p>
        <p>头像</p>
        <p>5/2/10</p>
        <p>12836</p>
        <p>%25</p>
        <p>102%</p>
        <p>140%</p>
        <p>+156</p>
        <p>31</p>
      </li>
    </ul>
    {{data}}
  </div>
</template>

<script>

import Data from '../../public/data/shuju.json'

// console.log(Data)

export default {
  name: 'Queue',
  props: {
    msg: String
  },
  data:Data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  list-style: none;
  display: flex;
  justify-content: space-around;
}
p{
  width:70px;
  height:24px;

}
.hello{
  display: flex;
  justify-content: space-around;
}
</style>
