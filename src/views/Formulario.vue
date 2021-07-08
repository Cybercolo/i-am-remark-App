<template>
  <div class= "container02">
    <Header />
    <Register/> 
  </div>  
</template>

  <!-- <input class="main-input-2" type="text"  maxlength="250" size="10" placeholder="i'm remarkable because">   -->
  <!-- TODO <div class="container02">
              <div>
                <img class="corner" src="../images/Vectorcorner.png">
                <Header/>
              </div>
              <section class="main-2">
                <Register/>
              </section>
            </div>-->

<script>
import Header from "@/components/Header.vue";
import Register from "@/components/Register.vue";
export default {
  name:'Formulario',
  components: {
   Header,
   Register
  }
}

</script>

