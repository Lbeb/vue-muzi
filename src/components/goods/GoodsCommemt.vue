<template>
  <div class="goodscomment-container">
    <h1>发表评论</h1>
    <comment :id="$route.params.id" class="commemt"></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
  components: {
    comment
  }
}
</script>

<style lang="less" scoped>
.goodscomment-container {
  padding: 0 5px;
  h1 {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    padding: 0;
    color: skyblue;
  }
  .commemt {
    margin: 0;
  }
}
</style>
