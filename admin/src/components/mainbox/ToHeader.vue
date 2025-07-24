<template>
    <el-header >
        <div class="left" @click="handleCollapse()">
            <el-icon style="cursor: pointer;"><Menu /></el-icon>
            <span style="margin-left: 10px;">企业门户网站管理系统</span>
        </div>
        <div class="right">
            <span>欢迎{{$store.state.userInfo.username}}回来</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon size="30px"><User /></el-icon>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown >
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup>
import { useStore } from 'vuex';
import { Menu,User} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const store = useStore()
const router=useRouter()

//侧边栏的收缩舒展
const handleCollapse = () => {
    store.commit("changeCollapsed")
}

//跳回个人中心页面
const handleCenter=()=>{
    router.push('/center')
}

//跳回登录主页login页面
const handleLogout=()=>{
    //清除token值
    localStorage.removeItem("token")
    //清除用户保存的信息
    store.commit("clearUserInfo")
    router.push("/login")
}

</script>
<style lang="scss" scoped>
    .el-header{
        background-color: #2d3a4b;
        color: white;
        width: 100%;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left,.right{
        display: flex;
    }
    .left{
        i{
            margin: auto;
        }
    }
    .right{
        .el-dropdown{
            margin: auto;
            color: white;
        }
    }
</style>