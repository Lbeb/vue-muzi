<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <div class="click-time">
      <span>发布时间: {{ photoinfo.add_time | Time }}</span>
      <span>点击次数: {{ photoinfo.click }}次</span>
    </div>
    <hr />

      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>


    <div class="content" v-html="photoinfo.content"></div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      slide1: [
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          }
        ]
    };
  },
  created() {
    this.getphotoinfo();
    // this.getThumbs()
  },
  methods: {
     handleClose () {
        console.log('close event')
      },
    getphotoinfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      })
    },
    getThumbs() {
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if(result.body.status === 0) {  
          result.body.message.forEach(item => {
            item.w = 800
            item.h = 500
          })
          this.slide1 = result.body.message
        }
      })
    }
  },
  components: {
    comment
  }
};
</script>


<style lang="less" scoped>
.photoinfo-container {
  padding: 0 10px;
  h3 {
    font-size: 16px;
    color: skyblue;
    text-align: center;
    margin: 15px 0;
  }
  .click-time {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
