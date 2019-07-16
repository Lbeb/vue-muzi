<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-item">
            <!-- 开关 -->
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <!-- 图片 -->
            <img :src="item.thumb_path" alt />
            <!-- 信息区域 -->
            <div class="info">
              <h1>{{ item.title }}</h1>
              <div class="goods-info">
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}</span>件，总价
                <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>

    <p>{{ $store.getters.getGoodsSelected }}</p>
  </div>
</template>

<script>
import numbox from "../goods/ShopCar_number.vue";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  components: {
    numbox
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));

      if (idArr.length <= 0) {
        return;
      }

      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id, val) {
      // console.log(id + '----' + val)
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }
  .goods-item {
    display: flex;
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}

.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
