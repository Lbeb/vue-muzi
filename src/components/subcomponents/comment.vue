<template>
  <div class="comment-container">
    <h3>评论内容</h3>

    <textarea placeholder="写评论 (最大120个字数)" maxlength="120"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <li class="mui-table-view-cell" v-for="item in commentslist" :key="item.id">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <h4 class="mui-ellipsis username">{{ item.user_name }}</h4>
            <p class="mui-h6 mui-ellipsis">{{ item.content === 'undefined' ? '此用户很懒，啥都没说' : item.content  }}</p>
          </div>
          <div class="mui-table-cell mui-col-xs-2 mui-text-right">
            <span class="mui-h5">{{ item.add_time | Time('HH:mm:ss') }}</span>
          </div>
        </div>
      </li>
    </ul>

    <mt-button type="danger" size="large" class="btn" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
  data() {
    return {
      pageIndex: 1,
      commentslist: []
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    getComment() {
      this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
        if(result.body.status === 0) {
          this.commentslist = this.commentslist.concat(result.body.message)
        }else{
          Toast('获取评论失败...')
        }
      })
    },
    getMore() {
      this.pageIndex++
      this.getComment()
    }
  },
  props: ['id']
}
</script>

<style lang="less" scoped>
.comment-container {
  margin-top: 50px;
  h3 {
    margin-bottom: 15px;
    font-size: 14px;
  }
  textarea {
    border-radius: 10px;
    height: 80px;
    font-size: 13px;
  }
  textarea::-webkit-input-placeholder {
    /*WebKit browsers*/
    font-size: 14px;
  }

  textarea::-moz-input-placeholder {
    /*Mozilla Firefox*/
    font-size: 14px;
  }

  textarea::-ms-input-placeholder {
    /*Internet Explorer*/
    font-size: 14px;
  }
  h3::before {
    content: "";
    border: 2px solid red;
    margin-right: 10px;
  }
  .btn {
    margin-bottom: 10px;
  }

  .mui-table-view-condensed {
    margin: 10px 0;
    .username {
      font-size: 12px;
      color: #3498db;
    }
    .mui-h6 {
      font-size: 13px;
    }
  }
}
</style>
