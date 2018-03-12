<template>
	<div>
		<table align="center">
			<tr>
				<td align="right">活动名称</td>
				<td>{{rs.atitle}}</td>
			</tr>
			<tr>
				<td align="right">活动时间</td>
				<td>{{rs.adate}}</td>
			</tr>
			<tr>
				<td align="right">活动地点</td>
				<td>{{rs.address}}</td>
			</tr>
			<tr>
				<td align="right">活动类别</td>
				<td>{{rs.atype}}</td>
			</tr>
			<tr>
				<td align="right">费用</td>
				<td>{{rs.price}}</td>
			</tr>
			<tr>
				<td align="right">人数限制</td>
				<td>{{rs.limitnum}}</td>
			</tr>
			<tr>
				<td align="right">补充信息</td>
				<td>{{rs.otherinfo}}</td>
			</tr>
		</table>
		<div style="text-align: center;">
			评论({{remarkCount}}条)
			<div v-for="item in remarkRs">
				<table>
					<tr>
						<td><img src='../../assets/imgs/ulogo.jpg'/></td>
					<td align='left'>
						{{item.nicheng}}<br/><br/>
						{{item.content}}<br/><br/>
						{{item.createtime}}
					</td>
					</tr>
				</table>
			</div>
		</div>
		<div>
			<el-button type="text" size="medium" @click='joinActive'>
			参加活动
			</el-button>
			<attend/>
			<el-button type="text" size="medium" @click='remark'>
			发评论
			</el-button>
		</div>
		<div ref='remarkDiv' style="text-align: center;display:none;">
			<form name='remarkForm'>
			<el-input type="textarea" name='content' rows='6' cols='60'></el-input>

			    <el-radio-group v-model='visitmode'>
			      <el-radio name='whovisible' label="全部可见" value='0'></el-radio>
			      <el-radio name='whovisible' label="仅发布者可见" value='1'></el-radio>
			    </el-radio-group>
			    <br/>
			    <input type='hidden' name='aid' :value="rs._id"/>
			<el-button type="primary" round @click='pubRemark'>发表</el-button>
			</form>
		</div>
	</div>
</template>
<script>
	import {postHttp,getHttp} from '../../js/HttpServer.js'
	let thisa = null;

	export default {
		data(){
			thisa = this;
			return{
				rs:{
					atitle:'',
					adate:'',
					address:'',
					atype:'',
					price:'',
					limitnum:'',
					otherinfo:'',
				},
				visitmode:'全部可见',
				remarkCount:0,
				remarkRs:[],
			};
		},
		mounted(){
			let id = thisa.$parent.$parent.$parent.mateid;
			let url = '/restful/activity/getMateInfo?id='+id;
	    	getHttp(url,function(res){
	    		let arr = res.data;
	    		let rs = arr[0];
	    		rs.adate = arr[1];
	    		thisa.rs=arr[0];
	    		thisa.remarkCount=arr[2];
	    		thisa.remarkRs=arr[3];
	    	});
		},
		methods:{
			remark:function(e){
				if(thisa.$refs.remarkDiv.style.display=='none'){
					getHttp('/restful/user/getSession',function(res){
			      		if(res.data!=null&&res.data!=''){
				            thisa.$refs.remarkDiv.style.display='';
				        }else{
				        	// alert('登录过期,请重新登录');
				        	// thisa.$router.push('/');
				        	thisa.$parent.$parent.$parent.$refs.homehead.dialogVisible=true;
				        }
			      	});
			    }else{
			    	thisa.$refs.remarkDiv.style.display='none';
			    }
			},
			joinActive:function(e){
				if(thisa.$refs.remarkDiv.style.display=='none'){
					getHttp('/restful/user/getSession',function(res){
			      		if(res.data!=null&&res.data!=''){
				            thisa.$refs.remarkDiv.style.display='';
				        }else{
				        	thisa.$parent.$parent.$parent.$refs.homehead.dialogVisible=true;
				        }
			      	});
			    }else{
			    	thisa.$refs.remarkDiv.style.display='none';
			    }
			},
			pubRemark:function(e){
				// let obj = {'全部可见':0,'仅发布者可见':1};
				// alert(obj[remarkForm.whovisible.value]);
				// alert(remarkForm.content.value);
				// alert(remarkForm.activityid.value);
				postHttp('/restful/activity/pubremark',remarkForm,function(res){
		      		alert(res.data);
		      	});
			}
		}
	}
</script>