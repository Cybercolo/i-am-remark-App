<template>
  <div class="home card-content">
    <Header />
    
          <div class="message-hero">
            #IamRemarkable is a Google initiative  empowering women and other underrepresented groups to celebrate their achievements in the workplace  and beyond.
          </div>
          <div class="message02">
            <p class="message"> Tell to the World,</p>
            <img class="main_pic_flecha_pg_01" src="../images/Vector_flecha.svg" alt="">
            <button class="why_you" type="text" size="10">Why are you Remarkable?</button>
          </div> 
          <div>
            <img class="allPeople" src="../images/allPeople.png" alt="">
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

.card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(112.66% 58.05% at 48.31% -1.3%, rgba(255, 255, 255, 0.54) 16.78%, rgba(135, 237, 255, 0) 82.33%),
  linear-gradient(0deg, #AEC8CF, #AEC8CF);
  
}
.message-hero {

  color: rgb(35, 35, 34);
  text-align: center;
  letter-spacing: 2px;
  width: 100%;
  margin-top: 76px;
  font-family: 'Roboto';
  font-style: 'Regular';
  font-size: 16px;
  line-height: 15px;
  color: rgb(35, 35, 34);
  text-align: center;
  letter-spacing: 2px;
  max-width: 1024px;
  padding-left: 30px;
  padding-right: 30px; 
}

.message  {
  display: flex;
  justify-content: center;
  color: darkgoldenrod;
  font-size: 24px;
  text-align: center;
  letter-spacing: 2px;   
}
.message02 {

  display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
}
.why_you {
  box-shadow: 0px 4px 6px 0px rgb(64, 73, 106);
  background: rgba(26, 33, 58, 1);
  color:aliceblue; 
  font-size: 19px;
  font-family:Arial, Helvetica, sans-serif;
  font-style: italic;
  border-radius: 30px;
  height: 51px;
  padding: 5px;  
 }
 
@media screen and (max-width: 360px) {
 
}

.frame {
  width: 100%;
  height: 100vh;
  position:fixed;
  border:solid darkgoldenrod 2px;
}
.allPeople {
  width:100%;
  max-width: 996px;
  max-height: 980px;
  
}

.why_you{
    
    background: #fff; /* color de fondo */
    color: #0D0C2F; /* color de fuente */
    border: 2px solid #0D0C2F; /* tamaño y color de borde */
    padding: 12px;
    border-radius: 30px; /* redondear bordes */
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: inline-block;
    text-decoration:none;
    font-family:Arial, Helvetica, sans-serif;
    font-style: italic;
    height: 51px;
    font-size: 20px;
    box-shadow: 0px 4px 6px 0px rgb(64, 73, 106);
    


}

.why_you:hover {
    color: #fff;/* color de fuente hover */
  }
  
.why_you::after {
    content: "";
    background: #0D0C2F; /* color de fondo hover */
    position: absolute;
    z-index: -1;
    padding: 12px;
    display: block;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: skewX(-45deg) scale(0, 1);
    transition: all 0.3s ease;
  }
  
.why_you:hover::after {
    transition: all 0.3s ease-out;
    transform: skewX(-45deg) scale(1, 1);
  }
  .flecha {
  Width:60.06px;
  Height:50.82px;
  margin-top: 260px;
  margin-left:325px;

  
}

</style>