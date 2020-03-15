<template>
  <div class="user_page">
<el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item >用户管理</el-breadcrumb-item>
  <el-breadcrumb-item replace :to ="{path:'/home/user'}">用户列表</el-breadcrumb-item>
</el-breadcrumb>

<el-card class="User_card">
<el-input
  placeholder="请输入内容"
  v-model="queryInfo.query"
  clearable
  @clear='getUserList'>
<el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
</el-input>
<el-button type="primary" @click="centerDialogVisible = true">添加用户</el-button>
 <el-table
    :data="userList"
    style="width: 100%"
    stripe
    border>
    <el-table-column
      type='index'
      label="#"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column
      prop="mg_state"
      label="状态"
      width='100'>
      <template slot-scope="scope">
        <!-- {{scope.row}} -->
      <el-switch
      v-model="scope.row.mg_state"
       @change="change(scope.row)">
      </el-switch>
      </template>
    </el-table-column>
     <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click ='deletes(scope.row)'></el-button>
        <el-tooltip effect="dark" content="角色分配" placement="top">
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[1, 2, 5, 10, 15]"
    :page-size="queryInfo.pagesize"
    :total="total">
    </el-pagination>
</el-card>
<el-dialog
  title="添加用户"
  :visible.sync="centerDialogVisible"
  width="50%"
  center
  @close='centerDialogcClose'>
  <el-form ref="addFormRef" :model="addForm" :rules='rules' label-width="100px">
  <el-form-item label="用户名" prop='username'>
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop='password'>
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop='email'>
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机" prop='mobile'>
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduser">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  :visible.sync="editDialogVisible"
  width="50%"
  center
  @close="editDialogClose">
  <el-form :model="editForm" :rules="editrules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名">
    <el-input :placeholder="editName"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop='email'>
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机号" prop='mobile'>
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="upData">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import Vue from 'vue'
import { Breadcrumb, BreadcrumbItem, Card, Button, Table, TableColumn, Switch, Tooltip, Pagination, Dialog } from 'element-ui'
Vue.use(Breadcrumb).use(BreadcrumbItem).use(Card).use(Button).use(Table).use(TableColumn).use(Switch).use(Tooltip).use(Pagination).use(Dialog)
export default {
  created () {
    this.getUserList()
  },
  data () {
    var isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码')
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        const isPhone = reg.test(value)
        // 转换为数字
        value = Number(value)
        // 判断是否为数字
        if (typeof value === 'number' && !isNaN(value)) {
          // 转换成字符串
          value = value.toString()
          if (value.length < 0 || value.length > 12 || !isPhone) {
            // 判断是否为11位手机号
            callback(new Error('手机号码格式如:138xxxx8754'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入电话号码'))
        }
      }
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      userList: [],
      currentPage: 1,
      centerDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱号', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isMobileNumber, trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editId: '',
      editForm: {
        email: '',
        mobile: ''
      },
      editName: 'lailai',
      editrules: {
        email: [
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        mobile: [
          { validator: isMobileNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status === 200) {
        this.userList = res.data.users
        this.total = parseInt(res.data.total)
        // console.log('user', this.userList)
      }
    },
    // 监听pagesize事件
    handleSizeChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagesize = newPage
      this.getUserList()
    },
    // 监听currentPage事件
    handleCurrentChange (currenttPage) {
      // console.log(currenttPage)
      this.queryInfo.pagenum = currenttPage
      this.getUserList()
    },
    async change (userinfo) {
      // console.log(userinfo)
      this.$http.put('users/' + userinfo.id + '/state/' + userinfo.mg_state + '').then((res) => {
        const { data } = res
        if (data.meta.status !== 200) {
          userinfo.mg_state = !userinfo.mg_state
          return this.$message.error('更新状态失败')
        }
        this.$message.success('更新状态成功')
      })
    },
    centerDialogcClose () {
      this.$refs.addFormRef.resetFields()
    },
    adduser () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          console.log(this.$refs.addFormRef)
          const { data: res } = await this.$http.post('users', this.addForm)
          console.log(res)
          if (res.meta.status !== 201) {
            this.$message.error('添加用户失败')
          } else {
            this.$message.success('添加用户成功')
          }
        } else return false
        this.centerDialogVisible = false
        this.getUserList()
      })
    },
    edit (msg) {
      this.editId = msg.id
      this.editName = msg.username
      this.editDialogVisible = true
    },
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    upData () {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // console.log(this.editId)
        const { data: res } = await this.$http.put(`users/${this.editId}`, this.editForm)
        // console.log(res)
        if (res.meta.status !== 200) this.$message.error('更新数据失败')
        this.$message.success('更新数据成功')
        this.editDialogVisible = false
        this.getUserList()
      })
    },
    deletes (deleteDate) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        console.log(res)
        this.$http.delete(`users/${deleteDate.id}`).then(res => {
          if (res.data.meta.status !== 200) this.$message.error('删除用户失败')
          this.$message.success('删除用户成功')
          this.getUserList()
        })
      }).catch(err => {
        return err
      })
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-input{
  width:400px;
  margin-right: 40px;
}
.el-table{
  margin-top: 20px;
}
.el-switch{
  padding: 0 20px;
}
.el-pagination{
  margin-top: 20px;
}
</style>
