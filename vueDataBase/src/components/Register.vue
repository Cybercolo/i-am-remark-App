<template>
    <div>
        <form>
            <input placeholder="Name / Alias" v-model="name">
            <SelectCountries/>
            <input placeholder="I am Remarkable because " v-model="remarkable">
            <input @click="dataLocal" type="button" value="Share">
        </form>
        
    </div>
</template>


<script>
    import SelectCountries from '@/components/Form/SelectCountries.vue'
    
    export default {
        name: 'Register',
        components:{
            SelectCountries,
        },
        data() {
            return {
                name: "",
                remarkable: ""
            }
        },
        mounted() {
            this.name = localStorage.name;
            this.remarkable = localStorage.remarkable;
        },
        methods:{
            dataLocal() {
                localStorage.name = this.name;
                localStorage.remarkable = this.remarkable;
                console.log(localStorage)
            }
        }
    }
</script>


<style>

</style>