<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/miao.webp" alt="" />
        <span>电商管理后台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu 
          background-color="#313743"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="subitem.path + ''" v-for="subitem in item.children" :key="subitem.id" @click="saveNavState(subitem.path + '')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{ subitem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "MyHome",
  data() {
    return {
      // 左侧菜单数据 
        menulist: [],
        iconsObj: {
            '125': 'iconfont icon-user',
            '103': 'iconfont icon-tijikongjian',
            '101': 'iconfont icon-shangpin',
            '102': 'iconfont icon-danju',
            '145': 'iconfont icon-baobiao',
        },
        // 是否折叠
        isCollapse: false,
        // 被激活的连接地址 
        activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.localStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    // 所有菜单
    async getMenuList() {
        const {data: res} = await this.$http.get('menus')
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
    },
    // 点击按钮切换菜单的折叠
    toggleCollapse() {
        this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.localStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
};
</script>
 
<style lang="less" scoped>
.home-container {
  height: 100vh;
}
.el-header {
  background-color: #363d40;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  img {
    height: 50px;
    margin: 2px 15px 2px 0;
  }
}
.el-aside {
  background-color: #313743;
  .el-menu {
    border-right: 0px;
  }
}
.el-main {
  background-color: #e9edf1;
}
.iconfont {
    margin-right: 10px;
}
.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>