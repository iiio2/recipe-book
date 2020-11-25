<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse container" id="navbarNavAltMarkup">
    <div class="navbar-nav">

      <router-link  v-if="!token" class="nav-link" to="/">Home</router-link>

      <router-link class="nav-link" to="/recipes" v-if="token != null">Recipes</router-link>

      <p v-if="token != null" class="nav-link" @click="logout">
        Logout
      </p>
      
    </div>
  </div>
</nav>
</template>


<script>

import { auth } from '../firebase';

var token = localStorage.getItem('token');

export default {
  data(){
    return{
      auth,
      token,
    }
  },
    methods:{
      logout(){
        auth.signOut()
        .then(()=>{
          console.log("Logged Out");
          localStorage.removeItem("token"); 
          window.location.href = "/";
        })
        .catch(error=>{
          console.log(error); 
        })
      }
    }
}
</script>


<style scoped>
  p{
    cursor: pointer;
  }

  
</style>