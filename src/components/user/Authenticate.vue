<template>
	<div>
		<el-form ref="form" label-width="120px" name='myForm'>
		  <el-form-item label="真实姓名:">
		    <el-input name='realname'></el-input>
		  </el-form-item>
		  <el-form-item label="性别:" >
		    <el-radio-group v-model='sex' @change='chooseSex'>
		      <el-radio label="男"></el-radio>
		      <el-radio label="女"></el-radio>
		      <input type='hidden' name='sex' value='0'/>	<!-- 隐藏域 -->
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="手机号:">
		    <el-input name='telphone'></el-input>
		  </el-form-item>
		  <el-form-item label="身份证号:">
		    <el-input name='idcardnum'></el-input>
		  </el-form-item>
		  <el-form-item label="身份证正面照:">
		    <el-input type='file' name='idcardface'></el-input>
		  </el-form-item>
		  <el-form-item label="身份证背面照:">
		    <el-input type='file' name='idcardback'></el-input>
		  </el-form-item>
		  <el-form-item label="手持身份证照:">
		    <el-input type='file' name='idcardme'></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click='onsub'>提交认证</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {postBinaryHttp} from '../../js/HttpServer.js';
	let sex={'男':0,'女':1}
	let thisa = null;
	export default {
		data(){
			return{
				sex:'男'
			}
		},
		methods:{
			chooseSex:function(evt){
				// alert(Sex[evt]);
				myForm.sex.value = Sex[evt];
			},
			onsub:function(){
				postBinaryHttp('/restful/privatehome/authenticate',myForm,function(res){
						let homehead = thisa.$parent.$parent.$parent.$refs.homehead;
						homehead.loginbean = res.data;
						homehead.$emit('loginbeanChange',homehead.loginbean);
					})
			}
		}
	}

</script>
<style scoped>
	.el-form-item{
		margin-bottom: 1px;
	}
</style>