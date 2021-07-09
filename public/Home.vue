<template>
<div class="containerlandpage">
  <Header />
  <div class="main_title_pg_01">
    #IamRemarkable is a Google initiative empowering women and other underrepresented groups to celebrate their achievements in the workplace and beyond.
  </div>

  <div class="main-center-1">
    <p class="main_message_pg_01"> Tell to the World,</p>
    <img class="main_pic_flecha_pg_01" src="../images/Vector_flecha.svg" alt="" />

    <router-link to="/Formulario" class="btn-01">
      Why are you remarkable?
    </router-link>
  </div>


  <div class="all">
    <img class="main_pic_allPeople_pg_01" src="../images/allPeople.png" />
  </div>
</div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,


  }
};
</script>
