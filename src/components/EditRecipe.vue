<template>
    <div>
        <div class="add-recipe">

        <User #user="{ user }" >

            <div v-if="user">
                <form @submit.prevent="updateRecipe">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" name="title" v-model="recipe.title" />
            </div>

            <div class="form-group" v-for="(ingredient,index) in recipe.ingredients" :key="index">
                <label for="ingredients">Ingredients</label>
                <input type="text" class="form-control" v-model="recipe.ingredients[index]" />
                <i @click="dsIng(index)" class="fas fa-trash"></i>
            </div>

            <div class="form-group">
                <label for="ingredient">Ingredient</label>
                <input @keydown.tab.prevent="addIng" type="text" class="form-control" name="ingredient" v-model="ingredient" />
            </div>

            <input :disabled="showBtn" v-if="recipe.owner == user.uid" type="submit" class="btn btn-primary" value="Update Recipe" />
                </form>
            </div>
                

            <div class="container" v-else>
                <p class="lead">Loading...</p>
            </div>

        </User>
    </div>
    </div>
</template>

<script>

import { db } from "../firebase";
import slugify from "slugify"; 
import User from './User';
import { set } from '@vue/composition-api';


export default {
    name:'EditRecipe', 
    components:{
        User,
    },
    data(){
        return {
            recipe:'',
            ingredient:'',
            slug:'',
            showBtn:false, 
        }
    },
    created(){
        db.collection('recipes').where('slug', '==', this.$route.params.recipe_slug)
        .get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.recipe = doc.data(); 
                this.recipe.id = doc.id; 
                console.log(this.recipe); 
            })
        })
    }, 
    methods:{
        updateRecipe(){
            if(this.recipe.title.trim() && this.recipe.ingredients.length > 0){
                this.showBtn = true;   
                this.slug = slugify(this.recipe.title,{
                replacement:'-',
                remove:/[*+~.()'"!:@]/g, 
                lower:true, 
            });
            
            var modifiedIngredients =  [...new Set(this.recipe.ingredients)];
            db.collection('recipes').doc(this.recipe.id).update({
                title:this.recipe.title,
                ingredients:modifiedIngredients.filter(Boolean),
                slug:this.slug,
            })
            .then(()=>{
                this.$router.push("/recipes"); 
            }) 
          }     
        },
        dsIng(id){
            this.recipe.ingredients = this.recipe.ingredients.filter((ingredient,index)=>{
                return index != id; 
            })
        },
        addIng(){
            if(this.ingredient.trim()){
                this.recipe.ingredients.push(this.ingredient); 
                console.log(this.recipe.ingredients); 
                this.ingredient = ''; 
            }
        },
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