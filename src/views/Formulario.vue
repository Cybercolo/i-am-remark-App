<template>
  
    <body>
      <div class= "container02">
            <Header />
            <Register/>  <!-- <input class="main-input-2" type="text"  maxlength="250" size="10" placeholder="i'm remarkable because">   -->    
        </div>


<!-- TODO 

      <div class="container02">
        <div>
          <img class="corner" src="../images/Vectorcorner.png">
          <Header/>
        </div>
        <section class="main-2">
            <Register/>
        </section>
      </div>-->
    </body>
  
</template>

<script>
import Header from "@/components/Header.vue";
import Register from "@/components/Register.vue";
export default {
  name:'Formulario',
  components: {
   Header,
   Register
  },
  data() {
    return {
      name: "",
      remarkable: ""
    }
  },
  mounted() {
    this.name = localStorage.name;
    this.remarkable = localStorage.remarkable;
  },
  methods:{
    dataLocal() {
      localStorage.name = this.name;
      localStorage.remarkable = this.remarkable;
      console.log(localStorage)
    }
  }
}

</script>

