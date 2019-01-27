<template>
    <div>
        <upload-excel-component :on-success="clickSuccess" :before-upload="beforeUpload" />
        <el-table :data="results">
            <template v-for="(v,i) in hedaer">
                <el-table-column v-if="v!='Avatar'" :key="i" :label="v.toUpperCase()" :prop="v"></el-table-column>
                <el-table-column v-else :key="i">
                    <template slot-scope="scope">
                        <img :src="scope.row.Avatar" class="avatar" />
                    </template>
                </el-table-column>
                
            </template>
            
        </el-table>
    </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
    data(){
        return {
            hedaer:[],
            results:[]
        }
    },
    components:{
        UploadExcelComponent
    },
    methods:{
        clickSuccess(res){
            console.log(res)
            this.hedaer = res.header;
            this.results = res.results;
        },
        beforeUpload(file){
            return true
        }
    }
}
</script>

<style>
.avatar{
    width:40px;
    height:60px;
}
</style>
