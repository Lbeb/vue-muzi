<template>
  <div class="newsinfo-container">
    <!-- 新闻标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 作者 -->
    <div class="author">
      <div class="author_img">
        <img src="../../images/newsinfo_img.jpg" alt />
      </div>
      <div class="author_box">
        <h5 class="author_name">
          一点资讯
          <span>· muzi</span>
        </h5>
        <span class="author_time">{{ newsinfo.add_time | Time }}</span>
      </div>
      <button class="btn">关注</button>
    </div>
    <div style="clear: both"></div>
    <!-- 新闻内容 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue' //导入评论组件

import { Toast } from "mint-ui"
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    }
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0]
        } else {
          Toast("获取新闻失败...");
        }
      })
    }
  },
  components:{
    'comment-box': comment
  }
}
</script>


<style lang="less" scoped>
.newsinfo-container {
  padding: 0 10px;

  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }

  .author {
    margin-top: 30px;
    .author_img img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
    }
    .author_box {
      margin-top: 7px;
      float: left;
      .author_name {
        color: black;
        padding: 0;
        margin: 0;
        span {
          font-size: 12px;
          font-weight: 400;
        }
      }
      .author_time {
        font-size: 12px;
        color: #ccc;
        padding: 0;
        margin: 0;
      }
    }
    .btn {
      border-radius: 30px;
      padding: 3px 15px;
      color: #fff;
      background-color: skyblue;
      float: right;
      font-size: 14px;
      margin-top: 7px;
    }
  }
  .content {
    margin-top: 30px;
  }
}
</style>
