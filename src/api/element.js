import Vue from 'vue'
import { Message, Form, FormItem, Input, MessageBox } from 'element-ui'

Vue.use(Form).use(FormItem).use(Input)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
