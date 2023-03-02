<!--  -->
<template>
<div class='all'>
    <el-row class="tac">
        <el-col :span="4">
            <el-menu
            default-active="3"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @select="selectOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#000"
            style="height: 800px;box-sizing: border-box;"
            active-text-color="#FF011C">
                <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-s-custom"></i>
                      用户管理
                    </template>
                    <el-menu-item  index="1-1">用户数据</el-menu-item>
                    <el-menu-item index="1-2">echarts图表展示</el-menu-item>
                    <el-menu-item index="1-3">设置权限</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-picture-outline"></i>
                    <span slot="title">轮播图</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20">
            <router-view/>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  name: 'IndexHome',
  components: {},
  data () {
    // 这里存放数据
    return {
      toRouter: [
        { index: '2', path: '/swiperset', num: 'one' }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleOpen (key, keyPath) {
      console.log('1', key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log('2', key, keyPath)
    },
    selectOpen (key, keyPath) {
      console.log('3', key, keyPath)
      this.toRouter.forEach(val => {
        if (val.num === 'one') {
          if (keyPath[0] === val.index) {
            this.$router.push({ path: `${val.path}` })
          }
        } else {
          if (keyPath[1] === val.index) {
            this.$router.push({ path: `${val.path}` })
          }
        }
      })
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created () {

  },
  // 生命周期 - 挂载完成(可以访问DOM元素)
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能,这个函数会触发
}
</script>
<style scoped lang="less">
</style>
