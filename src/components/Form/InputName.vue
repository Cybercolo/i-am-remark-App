<template>
    <input @change="dataLocal" v-model="Name" class="main-alias-2" type="text" maxlength="10" placeholder="Name / Alias" size="10" >
</template>

<script>

export default {
    name:"InputName",
    data() {
        return {
            Name: ""
        }
    },
    mounted() {
        this.Name = localStorage.nameLS;
    },
    methods:{
        dataLocal() {
            localStorage.nameLS = this.Name;
            console.log("NAME-->", localStorage)
        }
    }    
}
</script>

<style>

</style>
