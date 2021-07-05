<template>
  <div>
    <body>
      <div class="container">
        <div class="container02">
          <Header/>
          <section class="main-2">
            <div class="main-origen-2">
              <Register/>
            </div>
            <div class="final03">
              <div class="final02">
                <img class="estrellas1" src="../images/2conjuntoestrellas.png">
                <img class="corona2" src="../images/2corona.png">
                <a href="Usuario.vue">
                    <button @click="dataLocal" class="button-send-2" href="Usuario.vue" type="button_send">Share</button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Register from '@/components/Register.vue'
export default {
  name:'Formulario',
  components: {
    Register,
    Header
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

