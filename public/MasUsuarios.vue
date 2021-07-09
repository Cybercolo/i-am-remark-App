<template>
<div>
  <Canvas3dJs />
  <Header />
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Canvas3dJs from '@/components/Canvas3dJs.vue'

export default {
  name: 'MasUsuarios',
  components: {
    Header,
    Canvas3dJs,
  }
}
</script>

<style>
body,
html {
  overflow: hidden;
}
</style>
