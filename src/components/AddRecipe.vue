<template>
    <div class="add-recipe">
        <User #user="{ user }">

            <div v-if="user">
                <form @submit.prevent="addRecipe">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" name="title" v-model="title" />
            </div>

            <div class="form-group" v-for="(ingredient,index) in ingredients" :key="index">
                <label for="ingredients">Ingredients</label>
                <input type="text" class="form-control" v-model="ingredients[index]" />
                <i @click="dsIng(index)" class="fas fa-trash"></i>
            </div>


            <div class="form-group">
                <label for="ingredient">Ingredient</label>
                <input @keydown.tab.prevent="addIng" type="text" class="form-control" name="ingredient" v-model="ingredient" />
            </div>

                 <input :disabled="showBtn" type="submit" class="btn btn-primary" value="Add Recipe" />
               </form>
            </div>

            <div class="container" v-else>
                <p class="lead">Loading...</p>
            </div>

        </User>
    </div>
</template>


<script>

import { db } from "../firebase"; 
import { auth } from '../firebase'; 
import slugify from "slugify"; 
import User from './User'; 

export default {
    components:{
        User,
    },
    data(){
        return {
            title:'',
            ingredient:'',
            ingredients:[],
            slug:'',
            owner:'',
            showBtn:false,
        }
    }, 
    methods:{
        addRecipe(){ 
             if(this.title.trim()){
                 this.showBtn = true;
                 this.slug = slugify(this.title,{
                 replacement:'-',
                 remove:/[*+~.()'"!:@]/g,
                 lower:false,
                });
                this.ingredients = [...new Set(this.ingredients)];
                db.collection('recipes').add({
                     title:this.title,
                     ingredients:this.ingredients.filter(Boolean),
                     slug:this.slug,
                     owner:auth.currentUser.uid,
                 }).then(()=>{
                     this.$router.push("/recipes"); 
                 })
             } 
        },
        addIng(){
            if(this.ingredient.trim()){
                this.ingredients.push(this.ingredient); 
                console.log(this.ingredients); 
                this.ingredient = ''; 
            }
        },
        dsIng(id){
            this.ingredients = this.ingredients.filter((ingredient,index)=>{
                return index != id; 
            })
        }
    }
}
</script>


<style scoped>
    form {
        width:75%; 
        margin: auto;
    }
    .add-recipe{
     padding-top:2rem;    
    }
    .fa-trash{
        color:#eb2f06;
        cursor: pointer;
    }
</style>