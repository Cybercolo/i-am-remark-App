<template>
    <textarea @change="dataLocal" v-model="Remarkable" class="main-input-2" name="textarea" rows="6" cols="40" placeholder="I am remarkable because..." ></textarea>
</template>

<script>

export default {
    name:"InputRemarkable",
    data() {
        return {
            Remarkable: ""
        }
    },
    mounted() {
        this.Remarkable = localStorage.remarkableLS;
    },
    methods:{
        dataLocal() {
            localStorage.remarkableLS = this.Remarkable;
            console.log("REMARKABLE-->", localStorage)
        }
    }   
}
</script>

<style scoped>

</style>
