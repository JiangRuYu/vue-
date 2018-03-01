<template>
  <div class="login">
    <section>
      <!-- :model用来设置表单的所有字段 -->
      <!-- ref是给dom 元素随便取个名字，将来可以通过$refs 去拿到-->
      <!-- :rules  校验表单规则 -->
      <el-form :model="ruleForm2" label-position='top' status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!-- prop:用来指定当前表单代表的字段名 -->
        <el-form-item label="账号" prop="uname">
          <el-input type="password" v-model="ruleForm2.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <!-- vmodel 用来双向绑定数据，需要绑定data的数据，将来把这些数据提交给后台 -->
          <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
        </el-form-item>
      
        <el-form-item >
          <el-button type="success" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button type="primary" @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
  //  检验函数，rules可以拿到校验字段的信息和检验规则，value拿到字段的值，如果检验通过必须使用callback

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm2: {
        // 这里的字段要根据文档接口填写
       uname: "",
        upwd: "",

      },
      rules2: {
        // 这里添加的校验规则，每个字段可以加多个，所以是个数组
        uname: [{ required: true, message: '请输入用户名', trigger: "blur" }],
        upwd: [{required: true, message: '请输入密码', trigger: "blur" }],
    
      }
    };
  },
  methods: {
    // 发送请求
    login(){
     this.$http.post(this.$api.login,this.ruleForm2).then((res)=>{
       console.log(res);
       if(res.data.status == 0){
      this.$alert('登录成功', '提示', {    
          callback: ()=> {
            // 保存用户姓名
            localStorage.setItem('uname',res.data.message.uname)
        //  使用了路由插件之后,组件实例就有了该对象,对象有push方法，可以进行路由跳转            
           this.$router.push({name:'admin'});
           console.log(1213);
          }
        });
      
       
       }else{
         this.$alert(res.data.message)
       }
     }) 
    },
    // 登录按钮方法
    // this.$refs用来换取页面中的元素或是组件 ，通过它拿到form表单组件，读取validate方法，给所有表单验证 
    submitForm(formName) {
      // validate 传入一个回调，如果valid为true，证明通过，否则不通过
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
// 右侧弹出成功提示          
        this.$notify({
          title: '成功',
          message: '您太棒了',
          type: 'success'
        })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置按钮方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
// lang="less"加预处理器 scoped:当前页面生效
<style scoped lang="less">
.login {
  background-color: aqua;
  //  如果组件中加入div标签，那么也需要给组件的div 设置高度百分百
  height: 100%;
  section {
    width: 400px;
    height: 300px;
    padding:10px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border: 3px solid #fff;
    border-radius: 5px;
  }
}
</style>


