<template>
  <div class="container">
    <Header />
    <div class="main_title_pg_01">
      #IamRemarkable is a Google initiative  empowering women and other underrepresented groups to celebrate their achievements in the workplace  and beyond.
    </div>
    <div class="main_title_pg_01">
      <p class="main_message_pg_01"> Tell to the World,</p>
      <img class="main_pic_flecha_pg_01" src="../images/Vector_flecha.svg" alt="">
    </div> 
    <div class="main_button_why_you_pg_01">
      <button class="button_pg_01" type="text" placeholder="Why are you Remarkable?" size="10">Why are you Remarkable? </button>
    </div>
    <div style= "margin-top:35px">
      <img class="main_pic_allPeople_pg_01" src="../images/allPeople.png" alt="">
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header,
    
  
  }
}
</script>

<style scoped>

</style>