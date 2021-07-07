<template>
<div>
  <Canvas3dJs />
  <Header />
  <Card />

</div>
</template>

<script>
import Header from '@/components/Header.vue'
import Canvas3dJs from '@/components/Canvas3dJs.vue'
import Card from '@/components/Card.vue'


export default {
  name: 'MasUsuarios',
  components: {
    Header,
    Canvas3dJs,
    Card,
  }
}
</script>
