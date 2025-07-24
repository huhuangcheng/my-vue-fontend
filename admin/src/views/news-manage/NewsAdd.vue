<template>
    <div>
      <el-page-header icon="" title="创建新闻">
              <template #content>
                <span class="text-large font-600 mr-3"> 新闻管理 </span>
            </template>
        </el-page-header>
        <el-form ref='newsFormRef' :model="newsForm" :rules="newsFormRules" label-width="80px" style="max-width: 800px"
            class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor @event="handleChange" />
            </el-form-item>
            <el-form-item label="分类" prop="catagory">
                <el-select v-model="newsForm.category" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片" prop="cover">
                <Upload :avatar="newsForm.cover" @kerwinchange="handleUploadChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()" v-loading.fullscreen.lock="fullscreenLoading">
                    添加新闻
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'

const router =useRouter()
const newsFormRef = ref()
const newsForm = reactive({
    title: "",
    content: "",
    category: 1, //1.最新动态  2。典型案例  3.通知公告
    cover: "",
    file: null,
    isPublish: 0 //0未发布  1已发布
})

const newsFormRules = reactive({
    title: [
        { required: true, message: "请输入标题", trigger: "blur" }
    ],
    content: [
        { required: true, message: "请输入内容", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请选择分类", trigger: "blur" }
    ],
    cover: [
        { required: true, message: "请上传图片", trigger: "blur" }
    ],
})

//每次editor内容改变的回调
const handleChange = (data) => {
    console.log(data)
    newsForm.content = data
}

const options = [{
    label: "最新动态",
    value: 1,
},
{
    label: "典型案例",
    value: 2,
},
{
    label: "通知公告",
    value: 3,
}]

//每次选择完图片之后的回调
const handleUploadChange = (file) => {
    // console.log(file.raw)
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

const submitForm=()=>{
    newsFormRef.value.validate(async(valid)=>{
        if(valid){
            console.log(newsForm)
            //后台通信
            await upload("/adminapi/news/add",newsForm)

            router.push(`/news-manage/newslist`)
        }
    })
}
</script>