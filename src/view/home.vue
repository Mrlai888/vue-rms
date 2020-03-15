<template>
  <div class="home_page">
    <el-container>
      <el-header class="headers">
        <div class="home_deader">电商后台管理系统</div>
        <button @click="singout">退出</button>
      </el-header>
      <el-container>
        <el-aside :width='width' ref="aside">
          <div class="shoujing">
          <el-radio-group v-model="isCollapse" @change="getData">
          <el-radio-button :label="istrue" v-if="istrue===false">
            <i  class="el-icon-caret-right"></i>
          </el-radio-button>
          <el-radio-button :label="istrue" v-if="istrue===true">
            <i  class="el-icon-caret-left"></i>
          </el-radio-button>
        </el-radio-group>
        </div>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            unique-opened
            background-color="#333744"
            text-color="#ffffff"
            :collapse-transition='false'
            :default-active='active'
          >

            <el-submenu index="1" :show-timeout='time' :hide-timeout='time' :popper-append-to-body='false'>
              <template slot="title">
                <i class="iconfont icon-yonghu1"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item index='/home/user' @click="_normalize('/home/user')">用户列表</el-menu-item>
            </el-submenu>

            <el-submenu index="2" :show-timeout='time' :hide-timeout='time' :popper-append-to-body='false'>
              <template slot="title">
                <i class="iconfont icon-quanxian"></i>
                <span slot="title">权限管理</span>
              </template>
              <el-menu-item index='/home/limit' @click="_normalize('/home/limit')">角色列表</el-menu-item>
              <el-menu-item index='/home/role' @click="_normalize('/home/role')">权限列表</el-menu-item>
            </el-submenu>

          <el-submenu index="3" :show-timeout='time' :hide-timeout='time' :popper-append-to-body='false'>
              <template slot="title">
                <i class="iconfont icon-shangpin"></i>
                <span slot="title">商品管理</span>
              </template>
              <el-menu-item index='/home/goodslist' @click="_normalize('/home/goodslist')">商品列表</el-menu-item>
              <el-menu-item index='/home/goodsagm' @click="_normalize('/home/goodsagm')">分类参数</el-menu-item>
              <el-menu-item index='/home/goodslei' @click="_normalize('/home/goodslei')">商品分类</el-menu-item>
          </el-submenu>

          <el-submenu index="4" :show-timeout='time' :hide-timeout='time' :popper-append-to-body='false'>
              <template slot="title">
                <i class="iconfont icon-icon-"></i>
                <span slot="title">订单管理</span>
              </template>
              <el-menu-item index='/home/order' @click="_normalize('/home/order')">订单列表</el-menu-item>
          </el-submenu>

          <el-submenu index="5" :show-timeout='time' :hide-timeout='time' :popper-append-to-body='false'>
            <template slot="title">
              <i class="iconfont icon-shuju"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index='/home/datalist' @click="_normalize('/home/datalist')">数据报表</el-menu-item>
          </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
// import { Menu } from 'element-ui'
import {
  RadioGroup,
  RadioButton,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Container,
  Header,
  Aside,
  Main,
  Icon
} from 'element-ui'
// Vue.use(Menu)
Vue.use(RadioGroup)
  .use(RadioButton)
  .use(Menu)
  .use(Submenu)
  .use(MenuItemGroup)
  .use(MenuItem)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Icon)
export default {
  created () {
    this.active = window.sessionStorage.getItem('active')
  },
  data () {
    return {
      isCollapse: false,
      istrue: true,
      time: 0,
      width: '200px',
      active: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    _normalize (value) {
      this.$router.push({ path: value })
      window.sessionStorage.setItem('active', value)
      this.active = value
    },
    getData () {
      console.log(666)
      if (this.istrue === true) {
        this.istrue = false
        this.width = '64px'
      } else {
        this.istrue = true
        this.width = '200px'
      }
    },
    singout () {
      window.sessionStorage.clear()
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>

<style>
.shoujing{
  background: #333744;
}
.el-radio-button__inner{
background: #333744!important;
border-color: #333744;
outline: none;
padding: 10px 12px;

}
.el-radio-button{
  background: #333744;
  outline: none;
}
.headers{
  display: flex;
  justify-content: space-between;
  padding:0 60px;
}
.headers button{
  height: 40px;
  border-radius: 5px;
  border: 0;
  margin-top: 10px;
}

.el-radio-button:first-child .el-radio-button__inner{
  border-left: 0;
  /* border-right: 1.5px solid #333744; */
  background: #333744;

}
.el-icon-caret-left:before{
  padding: 0 80px;
  border: 0;
  background: #333744;
}
.el-icon-caret-right:before{
    border: 0;
    padding:0 4px;
  background: #333744;

}
.home_deader{
  height: 60px;
  line-height: 60px;
  font-weight: bold;
}

.icon-quanxian:before, .icon-yonghu1:before,
 .icon-shangpin:before, .icon-icon-:before, .icon-shuju:before{
  font-size: 20px;
  padding-right: 10px;
  /* color: #333744; */
}
.el-aside{
  overflow: hidden;
  background: #333744;
  min-height: 660px;
}
.el-menu{
  border-right: 0;
  /* height: 600; */
}
.el-header{
  background: #333744;
  color: #ffffff;
}

</style>
