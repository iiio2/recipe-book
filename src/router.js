import Vue from 'vue';
import VueRouter from 'vue-router'; 
import Home from './components/Home';
import Register from './components/Register'; 
import Recipes from './components/Recipes'; 
import AddRecipe from './components/AddRecipe'; 
import EditRecipe from './components/EditRecipe';

Vue.use(VueRouter); 

//import { auth } from './firebase'; 

var token = localStorage.getItem('token');

export const router  = new VueRouter({
    mode:'history', 
    routes:[
        {path:'/', component:Home, name:'Home', meta:{
            noNeedAuth:true, 
        }},
        {path:'/join', component:Register, name:'Register', meta:{
            noNeedAuth:true,
        }},
        {path:'/recipes', component:Recipes, name:'Recipes', 
        meta:{
            requiresAuth:true, 
         } 
        },
        {path:'/add-recipe', component:AddRecipe, name:'AddRecipe',
        meta:{
            requiresAuth:true, 
         } }, 
        {path:'/edit-recipe/:recipe_slug', component: EditRecipe, name:'EditRecipe', meta:{
            requiresAuth:true,
        } },
    ]
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (token == null) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })


  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.noNeedAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (token) {
        next({
          path: '/recipes',
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })