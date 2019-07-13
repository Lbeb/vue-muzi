<template>
  <div>
    <!-- 顶部滑动导航条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id==0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getCateList(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <!-- 图片区域 -->
    <ul class="photos-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photosinfo/'+ item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="title-info">{{ item.title }}</h1>
          <div class="photos-info">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1.导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    this.getCateList(0);
  },
  mounted() {
    // 当 组件中的DOM结构被渲染到页面中后，会执行这个钩子函数
    // 2.初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getCateList(CateId) {
      this.$http.get("api/getimages/" + CateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: pan-x; //解决滑动警告
}

.photos-list {
  margin: 0;
  padding: 10px;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0 0 9px #999;
    list-style: none;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: #fff;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      max-height: 84px;
      .photos-info {
        font-size: 12px;
      }
      .title-info {
        font-size: 13px;
      }
    }
  }
}
</style>
