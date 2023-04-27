<template>
	<div id="login_box" class = "mt-5 pr-5 pl-5 animate__animated animate__backInDown">
		<b-overlay :show="loading" rounded opacity="0.6" spinner spinner-variant="dark">
			<img class="mb-3 mt-5" src="../assets/DANTINO-removebg-preview.png"/>
			<h1>Digital Rocci Portal</h1>

			<b-form-input type="text" v-model="email" size="lg" placeholder="Email"  class="animate__animated animate__bounceIn animate__delay-1s edit mb-3 mt-5 text-left" @keyup.enter="signIn()"></b-form-input>
			<b-form-input type="password" v-model="password" size="lg" placeholder="Password" class="animate__animated animate__bounceIn animate__delay-2s edit mb-3 mt-2 text-left" @keyup.enter="signIn()"></b-form-input>
			<b-button variant="dark" size="lg" class="animate__animated animate__fadeInUp animate__delay-3s mb-3 mt-5 rocci_btn" @click="signIn()" :disabled="loading">Login</b-button>
			<br/>
		</b-overlay>
	</div>
</template>

<script>
export default {
	name: 'Index',
	data(){
		return{
			password: '',
			email: '',
			loading: false,
		}
	},
	created(){
		if(this.$store.getters.isAuth)
			this.$router.push('/profile');
	},
	methods:{
		showResetPass(){
			this.$bvModal.show('modal-resetPass');
		},
		signIn(){
			if(!this.email || !this.password)
				return this.showErrorTemp('fields are empty');
			this.loading = true;
			this.$store.dispatch('signIn', { 
				email: this.email,
				password: this.password
			}).then((err)=>{
				this.loading = false;
				if(err){
					return this.showErrorTemp(err);
				}
				this.$router.push({ name: 'Profile'});
			}).catch((err)=>{
				this.showErrorTemp(err);
				this.loading = false;
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#login_box{
	background: rgb(254, 224, 81,0.7);
    background: linear-gradient(to right bottom , rgba(255,255,255,255,0.7),rgba(255,255,255,255,0.3));
	direction: ltr !important;
	top: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 40%;
	min-width: 320px;
	max-width: 480px;
	height: 60%;
	text-align: center;
	box-shadow: 0 0 12px -9px black;
	border-radius: 15px;
	
}

.naked{
	border: none;
	outline: none;
	background: none;
	padding: none;
	margin: none;
}
.uli::after{
 content: '';
 display: block;
 width: 0;
 height: 2px;
 background:#424143;
 transition: width .3s;
}
.uli:hover::after{
 width: 100%;
 transition: width .3s;
}

.edit {
	color: #fee051;
	background-color: #424143;
	transition: 0.25s !important;
	box-shadow: 0 0 12px -9px black;
}
input[type='text']::placeholder,input[type='password']::placeholder{
color:rgb(243, 243, 243);
}



</style>
