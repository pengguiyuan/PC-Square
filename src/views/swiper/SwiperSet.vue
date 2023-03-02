<!--  -->
<template>
<div class='all'>
  <el-card style="margin:auto">
      <div slot="header">
          <span>轮播图数据上传</span>
      </div>
      <!-- 拖拽图片上传 -->
      <div class="flexDragBox">
          <div class="dragBox">
              <div class="iconBox">
                  <div>
                    <i class="el-icon-upload el-icon--right dragIcon"></i>
                  </div>
                  <div>
                    <span>将文件拖到此处、或<a href="" style="color:cornflowerblue;padding: 0 5px;" @click.prevent="btnFile()">点击上传</a></span>
                  </div>
              </div>
              <input type="file" ref="inpFile" multiple name="avatar" id="inpFile" style="display: none;">
          </div>
          <div class="dragBtn"><div><el-button @click="uploading()" plain type="primary" >上传</el-button></div></div>
      </div>
  </el-card>
  <!-- table组件 -->
  <el-card style="margin-top: 20px;">
      <div slot="header">
          <span>轮播图数据管理</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          label="图片地址"
          align="center"
          width="400">
          <template slot-scope="scoped">
            <img
            style="width: 50px; height: 50px;object-fit: contain;"
            :src="scoped.row.swi_url" />
          </template>
        </el-table-column>
        <el-table-column
          label="启用状态"
          align="center"
          width="150">
          <template slot-scope="scoped">
            <div class="box">
              <div class="top">
                <el-tooltip class="item" effect="dark" content="开关启用状态将控制这些图片数据是否在小程序的轮播图中展示" placement="top">
                  <el-switch
                    v-model="scoped.row.swi_qiyong"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="switchChang(scoped.row)">
                  </el-switch>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="swi_type"
          label="分类"
          align="center"
          width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.typeShow">{{scope.row.swi_type}}</span>
              <el-input ref="typeInput" id="typeInput" v-else @blur="blurType(scope.row)" v-model="scope.row.swi_type" placeholder="请输入内容"></el-input>
            </template>
        </el-table-column>
        <el-table-column
          prop="swi_time"
          label="上传时间"
          align="center"
          width="220">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="display: flex;justify-content: center;margin: 15px 0;">
        <el-pagination
          background
          :page-size="count"
          layout="prev, pager, next"
          :current-page="number"
          @current-change="currentChange"
          :total="sum">
        </el-pagination>
      </div>
  </el-card>
</div>
</template>

<script>
import { postSwiper, getSwiper, editSwiper, getSwiqiyong,deleteSwiper } from '@/axios/swiper'
import moment from 'moment'
export default {
  name: 'SwiperSet',
  components: {},
  data () {
    // 这里存放数据
    return {
      obj: {
        file: [],
        swi_url: ''
      },
      value: false,
      typeShow: true,
      tableData: [],
      count: 5,
      number: 1,
      sum: 0,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击上传按钮
    uploading () {
      try {
        this.$nextTick(async () => {
          const formdata = new FormData()
          const inpFile = document.querySelector('#inpFile')
          if (this.obj.file[0] || inpFile.files[0]) {
            if (this.obj.file[0]) {
              if (this.obj.file.length > 0) {
                this.obj.file.forEach(val => {
                  formdata.append('avatar', val)
                })
              } else {
                formdata.append('avatar', this.obj.file[0])
              }
            } else {
              console.log('inpFile', inpFile.files)
              if (inpFile.files.length > 0) {
                let arrFile = Array.prototype.slice.call(inpFile.files)
                arrFile.forEach(val => {
                  formdata.append('avatar', val)
                })
                arrFile = []
              } else {
                formdata.append('avatar', inpFile.files[0])
              }
            }
            console.log('666')
            const { data } = await postSwiper(formdata)
            this.obj.swi_url = data.swi_url
            if (data.code === 200) {
              this.$message({
                message: '轮播活动图上传成功！',
                type: 'success'
              })
            }
            formdata.delete('avatar')
            this.obj.file = []
          } else {
            this.$message.error('请先选择文件再上传')
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // table组件中分类插槽中的input的失去焦点事件
    async blurType (row) {
      const obj = {
        id: row.id,
        swi_url: row.swi_url,
        swi_type: row.swi_type,
        swi_qiyong: row.swi_qiyong,
        swi_time: row.swi_time
      }
      const data = await editSwiper(obj)
      console.log('失去焦点', data)
      this.$message({
        message: '数据修改成功！',
        type: 'success'
      })
      row.typeShow = !row.typeShow
    },
    // table组件修改按钮
    handleEdit (index, row) {
      row.typeShow = !row.typeShow
      console.log(index, row)
      this.$nextTick(() => {
        this.$refs.typeInput.focus()
      })
    },
    // table组件删除按钮
    async handleDelete (index, row) {
      console.log(index, row)
      const data = await deleteSwiper({id:row.id})
      console.log(data);
      this.getSwiperData(this.number,this.count)
    },
    // 查询轮播图数据
    async getSwiperData (number, count) {
      const data = await getSwiper({ number, count })
      this.tableData = []
      this.sum = data.data.sum
      data.data.data.forEach((val, index) => {
        val.swi_time = moment(val.swi_time).format('YYYY-MM-DD HH:mm:ss')
        val.typeShow = true
        if (val.swi_qiyong === 'false') {
          val.swi_qiyong = false
        } else {
          val.swi_qiyong = true
        }
        this.tableData.push(val)
      })
    },
    // 分页组件页数发生变化时
    currentChange (e) {
      console.log(e)
      this.number = e
      console.log(this.number)
      this.getSwiperData(this.number, this.count)
    },
    // 点击字体：点击上传  触发点击事件
    btnFile () {
      this.$refs.inpFile.click()
    },
    // 开关状态change事件
    async switchChang (row) {
      const data = await getSwiqiyong({ name: 'swi_qiyong' })
      if (row.swi_qiyong === false) {
        if(data.data.sum === 1) {
          this.$message.error('最少需要一个，不能再取消启用')
          row.swi_qiyong = !row.swi_qiyong
          return
        }
        this.$message({
          message: `目前只启用了${data.data.sum - 1}张图片！`,
          type: 'success'
        })
        this.blurType(row)
      } else {
        if (data.data.sum === 3) {
          this.$message.error('图片最多启用3个')
          row.swi_qiyong = !row.swi_qiyong
          return
        }
        this.$message({
          message: `目前以启用${data.data.sum + 1}张图片！`,
          type: 'success'
        })
        this.blurType(row)
      }
      
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created () {
    this.getSwiperData(this.number, this.count)
  },
  // 生命周期 - 挂载完成(可以访问DOM元素)
  mounted () {
    const inpFile = document.querySelector('#inpFile')
    inpFile.addEventListener('change', () => {
      console.log(111111)
      if (inpFile.files.length > 3) {
        this.$message.error('最多只能上传三个文件')
        inpFile.value = ''
        return
      }
      const fileArr = Array.prototype.slice.call(inpFile.files)
      fileArr.forEach(val => {
        const index = val.name.indexOf('.')
        let name = val.name.substring(index + 1)
        if (name != 'png' &&  name != 'jpg') {
          this.$message.error('请上传jpg或者png格式的图片')
          inpFile.value = ''
          return
        }
      })
    })
    const dragBox = document.querySelector('.dragBox')
    dragBox.addEventListener('dragenter', function (ev) {
      ev.preventDefault()
      ev.target.style.borderColor = 'red'
    })
    dragBox.addEventListener('dragleave', function (ev) {
      ev.target.style.borderColor = ''
    })
    dragBox.addEventListener('dragend', function (ev) {
      ev.target.style.borderColor = ''
    })
    dragBox.addEventListener('dragover', function (ev) {
      ev.preventDefault()
    })
    dragBox.addEventListener('drop', (ev) => {
      ev.preventDefault()
      ev.target.style.borderColor = ''
      const items = Array.prototype.slice.call(ev.dataTransfer.items)
      console.log('ev.dataTransfer.items', items)
      items.forEach(val => {
        if (val.kind === 'file') {
          console.log('000000000000',val)
          const getFile = val.getAsFile()
          const index = getFile.name.indexOf('.')
          let name = getFile.name.substring(index + 1)
          if (name != 'png' &&  name != 'jpg') {
            this.$message.error('请上传jpg或者png格式的图片')
            inpFile.value = ''
            return
          }
          this.obj.file.push(getFile)
          console.log('file666', this.obj.file)
        }
      })
    })
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
.all {
  box-sizing: border-box;
  // 拖拽文件
  .flexDragBox {
    display: flex;
    justify-content: center;
    .dragBox {
      width: 500px;
      height: 300px;
      border: 3px dashed #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconBox {
        text-align: center;
        .dragIcon {
          font-size: 90px;
          color: #ccc;
        }
      }
    }
    .dragBtn {
      width: 200px;
      display: flex;
      justify-content: center;
      align-content: center;
      /deep/ .el-button {
        width: 120px;
        height: 40px;
        margin-top: 130px;
      }
    }
  }
  // 轮播图数据管理
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
}

</style>
