<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12 title-flex">
                <h3 class="title">Join Our Recipebook</h3>
            </div>
                <div class="col-sm-12 col-md-6">
                <div class="card py-5">
                    <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" name="email" v-model="email" />
                        <p class="text-danger">{{invalidEmail}}</p>
                        <p class="text-danger">{{invalidUser}}</p>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" v-model="password" />
                        <p class="text-danger">{{wrongPassword}}</p>
                    </div>

                    <div class="input pt-2">
                       <input type="submit" class="btn btn-success" value="Login" :disabled="email.length == 0 || password.length == 0" />
                       <router-link to="/join">Not Registered Yet?</router-link>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>


<script>

import { auth } from '../firebase';

export default {
    data(){
        return {
            email:'',
            password:'', 
            invalidEmail:'',
            invalidUser:'',
            wrongPassword:'',
        }
    },
    methods:{
        login(){
            if(this.email.trim() && this.password){
                auth.signInWithEmailAndPassword(this.email,this.password)
            .then(user=>{
               user.user.getIdToken()
                .then(token=>{
                  localStorage.setItem("token", token);
                  window.location.href = "/recipes";  
                })
            })
            .catch(error=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorCode == 'auth/invalid-email'){
                    this.invalidEmail = errorMessage;
                }
                if(errorCode == 'auth/user-not-found'){
                    this.invalidUser = errorMessage; 
                }
                if(errorCode = 'auth/wrong-password'){
                    this.wrongPassword = errorMessage; 
                }
            })
            }
        }
    }
}
</script>


<style scoped>
    .content {
        background-color: #f5f6fa;
        padding: 4rem 0 5rem 0;
    }
    form{
        width: 80%;
        margin: auto;
    }
   .title{
       font-size: 4rem;
   }
   .title-flex{
       display: flex; 
       justify-content: center;
       align-items: center;
   }
   .input{
       display: flex;
       justify-content: space-between;
       align-items: center;
   }
</style>