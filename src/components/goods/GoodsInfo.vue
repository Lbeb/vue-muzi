<template>
  <div class="goodsinfo-container">
    <!-- 小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 图片轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunboList="Lunbo" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card ballpos">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
            销售价：
            <span class="now-price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsinfo.add_time | Time }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="gocomment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/Swiper.vue";
import numberbox from "../goods/GoodsInfo_numberbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      Lunbo: [],
      goodsinfo: {},
      ballFlag: false,
      selectedCount: 1
    };
  },
  props: ["lunboList"],
  created() {
    this.getLunBo();
    this.getGoodsInfo();
  },
  methods: {
    getLunBo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.Lunbo = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    godesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    gocomment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      }

      this.$store.commit('addToCar', goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      const ballPositiom = this.$refs.ball.getBoundingClientRect();
      const badgePositiom = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePositiom.left - ballPositiom.left;
      const yDist = badgePositiom.top - ballPositiom.top;

      el.style.transform = `translate(${xDist}px , ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4, -0.3, 1, .68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
      console.log(this.selectedCount);
    }
  },
  components: {
    swiper,
    numberbox
  }
};
</script>

<style lang="less" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now-price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    z-index: 88;
    position: absolute;
    top: 407px;
    left: 152px;
  }
}
</style>
