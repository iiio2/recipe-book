<template>
    <div class="container">
        <h3 class="mt-5">Recipes</h3>
        
        <User #user="{ user }">

            <div v-if="user">
                <UserProfile :user="user" />
            </div>
            <div v-else>
                 <p class="lead">Loading...</p>
            </div>

        </User>
    </div>
</template>

<script>

import User from './User'; 
import UserProfile from './UserProfile'; 

export default {
    components:{
        User, 
        UserProfile, 
    },
   
}
</script>


<style scoped>
   
</style>