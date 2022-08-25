<template>
  <div class="side-bar">
    <div class="animation">
      <img :src="imgUrl" class="img-auto"/>
      <h1 class="animation-text">Animation Speed</h1>
      <div class="components-slider-demo-mark">
        <a-slider
          :marks="marks"
          v-model="speed"
          :max="max"
          :min="min"
          :step="speed < 1 ? 0.5 : 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueMapTestSidebar',

  data() {
    return {
      imgUrl: require("../assets/bg_self_driving01.svg"),
      marks: {
        0.1: {
          label: <strong>0.1</strong>,
        },

        5.0: {
          label: <strong>5.0</strong>,
        },
      },
      min: 0,
      max: 5.0,
      speed: 1,
    };
  },

  mounted() {

  },

  methods: {
    zerocho() {
      console.log('0.5')
    },
    onecho() {
      console.log('1')
    },
    twocho() {
      console.log('2')
    },
    threecho() {
      console.log('3')
    },
    fourcho() {
      console.log('4')
    },
    fivecho() {
      console.log('5')
    },
  },
};
</script>

<style>
  .side-bar {
    margin-top: 60px;
    height: 100%;
    width: 300px;
    background-color: #F9F9F9;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .animation {
  }
  .animation-text {
    text-align: center;
    font-size: 17px;
    font-weight: 800;
    margin-top: 30px;
  }
  .img-auto {
    position: absolute;
    margin-left: 50px;
  }
  .components-slider-demo-mark {
    width: 250px;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -50%);
  }
</style>