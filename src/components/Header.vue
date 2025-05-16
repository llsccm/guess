<template>
  <header class="header">
    <h1>这是头部</h1>
    <div class="link">
      <icon-font
        name="iconfont icon-setting"
        :url="newIconfontUrl"
      />
      <icon-font
        name="iconfont icon-help"
        :url="newIconfontUrl"
      />
      <icon-font
        name="iconfont icon-github"
        :url="newIconfontUrl"
      />
    </div>
  </header>
</template>


<script lang="ts" setup>
import { IconFont } from 'tdesign-icons-vue-next'

const newIconfontUrl = 'https://at.alicdn.com/t/c/font_3327901_w6evwfodcj.css'
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  background-color: #40957e;
  color: #fff;
  justify-content: center;
  align-items: center;
}

.link {
  position: absolute;
  display: flex;
  gap: 12px;
  font-size: 24px;
  right: 20px;
}

.iconfont {
  font-size: 24px;
}
</style>
