<template>
  <div class="goodsdesc-container">
    <h1>{{ info.title }}</h1>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() {
      this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
        if(result.body.status === 0) {
          this.info = result.body.message[0]
        }
      })
    }
  }
}
</script>

<style lang="less" >
.goodsdesc-container {
  padding: 0 5px;
  h1 {
    font-size: 14px;
    margin: 15px 0;
    text-align: center;
    color: skyblue;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
