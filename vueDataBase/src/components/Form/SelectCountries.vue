<template>
    <div>
        <select @click="dataLocal" v-model="country">
            <option disabled selected value> Country </option>
            <option>España</option>
            <option>Francia</option>
            <option>Portugal</option>
            <option>Colombia</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SelectCountries',
    components:{

    },
    data() {
        return {
            country: ""
        }
    },
    mounted() {
        this.country = localStorage.country;
    },
    methods:{
        dataLocal() {
            localStorage.country = this.country;
            console.log(localStorage, "pais")
        }
    }
}
   
</script>

<style scoped>

</style>
