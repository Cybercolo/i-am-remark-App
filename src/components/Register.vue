<template>
    <div>
        <form>
            <div class="main-origen-2">
                <div class="main-principal-02">
                    <input  class="main-alias-2" type="text" maxlength="10" placeholder="Name / Alias" size="10" v-model="name">
                    <img class="flecha02" src="../images/2flechita.png">
                    <img class="estrellitas02" src="../images/estrellas3.png">
                </div>
                <SelectCountries/>
                <div class="main-why-2">
                    <textarea class="main-input-2" name="textarea" rows="6" cols="40" placeholder="I am remarkable because..." v-model="remarkable"></textarea>
                    <p>Max 200caracters</p>
                </div>
            </div>
            <div class="final02">
                <img class="estrellas1" src="../images/2conjuntoestrellas.png">
                <img class="corona2" src="../images/2corona.png">
                <button @click="dataLocal" class="button-send-2" href="../views/Usuario.vue" type="button_send">
                    <router-link to="/Usuario"> Share </router-link>
                </button>
            </div>
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