<template>
  <div id="app">

    <b-navbar type="dark" variant="dark" fixed="top" v-if="$store.getters.isAuth">
      <b-navbar-brand href="#">{{ $store.state.user.name }}</b-navbar-brand>
      <h3 id="label">Rocci</h3>
      <b-navbar-nav class="ml-auto">
        <b-icon id="menu_btn" icon="list" @click="visible = !visible" variant="warning" scale="2"></b-icon>
      </b-navbar-nav>
    </b-navbar>

    <b-sidebar id="menu" bg-variant="dark" text-variant="light" shadow left v-model="visible" v-if="$store.getters.isAuth">
      <h1 id="logo" alt="image 3">Rocci</h1>
      <br>
      <br>
      <b-button-group vertical class="w100 menu_group">
        <b-button v-if="$store.getters.isAdmin" variant="dark" @click="$router.push('/users')">Users</b-button>
        <b-button v-if="$store.getters.isAdmin" variant="dark" @click="$router.push('/discounts')">Discounts</b-button>
      </b-button-group>

      <template v-slot:footer>
        <b-button variant="dark" block size="md" class="rocci_btn" @click="signOut()">Logout</b-button>
      </template>
    </b-sidebar>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data(){
    return{
      visible: true,
    }
  },
  methods:{
      signOut(){
        this.$store.dispatch('signOut').then(()=>{
          this.$router.push({ name: 'Index' });
          this.showSuccessTemp('Logged Out');
          this.visible = false;
        }).catch((err)=>{
          this.showErrorTemp(err);
        });
      },
  }
}
</script>

<style>
@font-face{
  font-family: "Hacen Maghreb Lt";
  font-display: swap;
  src: url("./assets/Hacen-Maghreb-Lt.ttf");
}
*{
  font-family: "Hacen Maghreb Lt";
}
.ltr{
  direction: ltr !important;
}
.ltr{
  direction: ltr !important;
}
.modal-content .close{
  position: absolute !important;
  left: 0 !important;
}
.hide{
  display: none !important;
}
#menu_btn{
  /* width: 15px; */
  /* height: 15px; */
  padding-right : 220px;
  pointer-events: bounding-box;
}
#menu_btn:hover{
  cursor: pointer !important;
}
.rocci_btn{
	color:rgb(254, 224, 81) !important;
}
.rocci_btn2{
  border: none !important;
}
.w100{
  width: 100%;
}
.menu_group .btn{
	color:rgb(254, 224, 81) !important;
  height: 65px !important;
  margin-bottom: 1px !important;
  border-bottom: 1px solid rgb(254, 224, 81) !important;
}
#label{
  position: absolute;
  top: 12px;
  left: 800px;
	color:rgb(254, 224, 81) !important;
}
.wrapper{
  direction: ltr !important;
  margin: 10px;
  margin-top: 70px;
}
.mxw{
  max-width: 100% !important;
}
.rocci_page *{
	color:rgb(44, 49, 54) !important;
}
.rocci_page .active button{
	color:rgb(254, 224, 81) !important;
  background-color:rgb(44, 49, 54) !important;
  border-color:rgb(44, 49, 54) !important;
}
/* ------------------------------------------------------------------ modal */
.modal-title{
  direction: ltr !important;
  text-align: center !important;
  width: 100% !important;
}
.modal-footer{
  height: 80px;
}
.modal-footer .centered, .modal-footer .centered2{
  width: 200px !important;
  position: absolute !important;
  display: block !important;
}
.modal-footer .centered{
  left: 0 !important;
  right: 0 !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.modal-footer .centered2:first-child{
  left: 10px !important;
}
.modal-footer .centered2:last-child{
  right: 10px !important;
}
/* ------------------------------------------------------------------  */
/* ------------------------------------------ input group*/
.gp-25 .list-group *{
  padding: 5px !important;
  text-align: left !important;
}
.gp-20 .form-control, .gp-25 .form-control, .gp-30 .form-control, .gp-35 .form-control{
  direction: ltr;
  text-align: left;
}
.gp-20 .input-group-append{
  width: 20%;
}
.gp-25 .input-group-append{
  width: 25%;
}
.gp-30 .input-group-append{
  width: 30%;
}
.gp-35 .input-group-append{
  width: 35%;
}
.gp-20 .input-group-text, .gp-25 .input-group-text, .gp-30 .input-group-text, .gp-35 .input-group-text{
  direction: ltr;
  width: 100%;
}
/* ------------------------------------------*/
/* .custom-select{
  background-position: 10px center !important;
} */
.text-left{
  text-align: righ !important;
}
.b-form-tags-list{
  padding-right: 0 !important;
  margin-right: 0 !important;
}
.b-form-tag{
  position: relative !important;
  padding-left: 15px !important;
  margin-right: 2px !important;
  margin-left: 2px !important;
}
.b-form-tags-list .b-form-tag-remove{
  position: absolute !important;
  top: 20% !important;
  left: 5px !important;
}

.redText{
	color: red !important;
	font-weight: bold !important;
}
.greenText{
	color: green !important;
	font-weight: bold !important;
}
#logo{
  width: 80%;
  margin-left: 10%;
	color:rgb(254, 224, 81) !important;

}
</style>
