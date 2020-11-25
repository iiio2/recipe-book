<template>
    <div>
        <router-link to="/add-recipe">Add New Recipe</router-link>
                <div id="recipes" class="mt-3">
               <div class="row">
                <div class="col-sm-4" v-for="recipe in recipes" :key="recipe.id">
                    <div class="card">   
                    <div class="card-body">
                        <i @click="editRecipePath(recipe.slug)" class="fas fa-pen">
                            
                        </i>

                        <i @click="deleteRecipe(recipe.id)" class="fas fa-trash-alt"></i>
                   
                        <h4 class="mt-2">{{ recipe.title }}</h4>
                        <ul>
                            <li :key="index" v-for="(ing,index) in recipe.ingredients">
                                <span>{{ ing }}</span>
                            </li>
                        </ul>      
                    </div>                
                    </div>
                    </div>
                </div>
            </div>
    </div>

</template>


<script>

import { db } from '../firebase';
//import { auth } from '../firebase';

export default {
    props:['user'],
    data(){
        return {
            recipes:[],
        }
    }, 
    created(){
        console.log(this.user); 
        if(this.user != null){
        db.collection('recipes').where('owner','==', this.user.uid).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var id = doc.id; 
                var data = doc.data(); 
                data.id = id; 
                this.recipes.push(data);   
            })
            console.log(this.recipes);
        }).catch(error=>{
            console.log(error); 
        })
        }
    },
    methods:{
        deleteRecipe(id){
            db.collection('recipes').doc(id).delete()
            .then(()=>{
                this.recipes = this.recipes.filter(recipe => recipe.id != id ); 
            })
            .catch(error=>{
                console.log(error); 
            })
        },
        editRecipePath(slug){
            this.$router.push({name:'EditRecipe', params:{recipe_slug:slug}}); 
        }
    }
}
</script>


<style scoped>
     
    li span{
        display: inline-block; 
    }
    .fa-trash-alt{
        color: #e74c3c;
        cursor: pointer;
        margin-left: .5rem;
    }
    .fa-pen{
        color:#3498db; 
        cursor: pointer;
    }
</style>