<template>
    <div class="admin">
     <!-- 为了防止重复，前面加app- -->
        <el-container>
               <!-- 公共头部 -->
        <el-header>
            <!-- 公共头部，下面有定义过 -->
            <app-header></app-header>
        </el-header>
        <el-container class="admin_content">
                <!-- 公共左侧 -->
            <el-aside width="200px">
            <app-aside></app-aside>
            </el-aside>
            <!-- 变化的后台管理子页面 -->
            <el-main>          
              <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
   
     
  

    </div>
</template>

<script>
import Header from './subcom/Header.vue';
import Aside from './subcom/Aside.vue';
    export default {
        // 注册子组件
        components: {
            appHeader:Header,
            appAside:Aside
        }
    }
</script>

<style scoped lang="less">
.admin{
    height: 100%;
       color: #333;
 .el-header{
     line-height: 60px;
 }   

.el-container{
    height: 100%;
}
&_content{
    background-color: red;
}
.el-aside{
 background-color: yellow;
}
}
//  &对父集的延用
 
</style>