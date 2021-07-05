<template>
  <div>
    <body>
      <div class="container">
        <div class="container02">
          <Header/>
          <section class="main-2">
              <Register/>
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

