<template>
    <div>
        <el-card>
            <el-page-header icon="" title="新闻管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 新闻列表 </span>
                </template>
            </el-page-header>
            <el-table :data="tableData" style="width: 100%" >
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="category" label="分类">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
                        <el-button circle :icon="Edit" type="" @click="handleEdit(scope.row)"></el-button>
                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消" width="160px"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
            <div>
                <h2>{{ previewDate.title }}</h2>
                <div style="font-size:12px; color:gray;">{{ formatTime.getTime(previewDate.editTime) }}</div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="previewDate.content" class="htmlContent"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const tableData = ref([])
const previewDate = ref({})
const dialogVisible = ref(false)
const router = useRouter()

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get("/adminapi/news/list")
    console.log(res.data.data)
    tableData.value = res.data.data
}

//格式化分类信息
const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category - 1]
}

//开关回调
const handleSwitchChange = async (item) => {
    await axios.put(`adminapi/news/publish`, { _id: item._id, isPublish: item.isPublish })
    getTableData()
}


//预览回调
const handlePreview = (data) => {
    console.log(data)
    nextTick(() => {
        previewDate.value = data
        dialogVisible.value = true
    })
}

//删除回调
const handleDelete = async (item) => {
    console.log(item)
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableData()
}

//编辑回调
const handleEdit = (item) => {
    //跳转到/news-manage/editnews/:id
    router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style lang="scss">
::v-deep .htmlContent {
    img {
        max-width: 100%;
    }
}


</style>