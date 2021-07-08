<template>
<div>
  <Canvas3dJs />
  <div class="container03">
    <Header />
    <div class="main_usuario_03">
      <div class="main_bocadillo">
        <img class="main_bocadillo1" src="../images/vector21.png" alt="" />
      </div>
      <div class="main_texto_03">
        <Description />
      </div>
    </div>

    <img class="main_estrellas_03" src="../images/estrellas.png" />
    <img class="main_corona_03" src="../images/corona.png" />

    <div class="main_compartir_03">
      <button class="main_com_03"></button>
      <img class="main_imgCompartir_03" src="../images/share-2.png" alt="" />
      <img class="elipse" src="../images/elipse.png" />
      <img class="circulo" src="../images/circulo.png" />
    </div>

  </div>

</div>
</template>

<script>
import Description from "@/components/Description.vue";
import Header from "@/components/Header.vue";
import Canvas3dJs from "@/components/Canvas3dJs";

console.log(document.getElementById("forwards"))
console.log(document.getElementById("backwards"))


export default {
  name: "Usuario",
  components: {
    Description,
    Header,
    Canvas3dJs
  },
};
</script>

<style>
html,
body {
  overflow: hidden;
}

.main_usuario_03 {}
</style>
