<template>
    <div>
        <slot name="user" :user="user" ></slot>
    </div>
</template>


<script>
import { ref } from '@vue/composition-api';
import { auth } from '../firebase';

export default {
   setup(){
       var user = ref(null);
       var unsubscibe = auth.onAuthStateChanged(firebaseUser => user.value = firebaseUser); 
       return {
           user, 
           unsubscibe,
       }
   },
   destroyed(){
       this.unsubscibe(); 
   } 
}
</script>


<style scoped>

</style>