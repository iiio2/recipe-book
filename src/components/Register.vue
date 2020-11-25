<template>
    <div>
        <form @submit.prevent="register" class="mt-5">
            <div class="form-group">
               <label for="name">Name</label>
               <input type="text" name="name" class="form-control" v-model="name" />
            </div>

            <div class="form-group">
               <label for="email">Email</label>
               <input type="email" name="email" class="form-control" v-model="email" />
               <p class="text-danger">{{ duplicateEmail }}</p>
               <p class="text-danger">{{ invalidEmail }}</p>
            </div>

            <div class="form-group">
               <label for="password">Password</label>
               <input type="password" name="password" class="form-control" v-model="password" />
               <p class="text-danger">{{ weakPassword }}</p>
            </div>

            <input type="submit" class="btn btn-info" value="Join" :disabled="name.length == 0 ||email.length == 0 || password.length == 0" />
        </form>
    </div>
</template>

<script>

import { auth } from '../firebase';

export default {
    data(){
        return {
            name:'',
            email:'', 
            password:'',
            duplicateEmail:'', 
            invalidEmail:'',
            weakPassword:'',
        }
    },
    methods:{
        register(){

            if(this.name.trim() && this.email.trim() && this.password){

            auth.createUserWithEmailAndPassword(this.email,this.password)
            .then(user=>{
                user.user.updateProfile({
                    displayName : this.name,
                }) 
                this.$router.push({
                    path:'/',
                    query:{ redirect: 'login'},
                }); 
                console.log(user);
            })
            .catch(error=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorCode == 'auth/email-already-in-use'){
                    this.duplicateEmail = errorMessage; 
                }
                if(errorCode == 'auth/invalid-email'){
                    this.invalidEmail = errorMessage;
                }
                if(errorCode == 'auth/weak-password'){
                    this.weakPassword = errorMessage;
                }
              })
            }       
        }
    }
}
</script>


<style scoped>
    form {
        width: 70%;
        margin:auto;
    }
</style>