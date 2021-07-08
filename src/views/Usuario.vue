<template>
<div>
  <Canvas3dJs />
  <div class="container03">
    <header class="header03">
      <img class="header_logo" src="../images/brand.png" alt="">
    </header>
    <div id="ocultar-main_usuario_03" class="main_usuario_03">
      <div class="main_bocadillo">
        <img class="main_bocadillo1" src="../images/vector21.png" alt="" />
      </div>
      <div class="main_texto_03">
        <Description />
      </div>
    </div>

    <img id="ocultar-main_estrellas_03" class="main_estrellas_03" src="../images/estrellas.png" />
    <img id="ocultar-main_corona_03" class="main_corona_03" src="../images/corona.png" />

    <div @click="downloadImg" id="ocultar-main_compartir_03" class="main_compartir_03">
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
import Canvas3dJs from "@/components/Canvas3dJs";
import domtoimage from 'dom-to-image';

export default {
  name: "Usuario",
  components: {
    Description,
    Canvas3dJs
  },
  methods: {
    downloadImg: function() {
      console.log("descargaaaa");
      domtoimage.toJpeg(document.getElementById('app'), {
          quality: 0.95
        })
        .then(function(dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click();
        });
    }
  }


};
</script>

<style scoped>
html,
body {
  overflow: hidden;
}

.main_texto_03 {
  left: 15%;
  bottom: 75%;
  height: auto;
}

.main_corona_03 {
  position: relative;
  bottom: 150px;
  left: 10px;
}

.main_estrellas_03 {
  top: 50px;
}

.main_usuario_03 {
  margin-top: 225px;
  max-height: 100px;
}

.header03 {
  position: absolute;
  z-index: 100;
  margin: 0;
  top: 20px;
  right: 50%;
  max-width: 140px;
  transform: translateX(50%);
}
</style>
