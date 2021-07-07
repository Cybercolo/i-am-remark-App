<template>
    <div>
        <form>
            <div class="main-origen-2">
                <div class="main-principal-02">
                    <InputName/>
                    <img class="flecha02" src="../images/2flechita.png">
                    <img class="estrellitas02" src="../images/estrellas3.png">
                </div>
                <SelectCountries/>
                <div class="main-why-2">
                    <InputRemarkable/>
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
    import InputName from '@/components/Form/InputName.vue'
    import InputRemarkable from '@/components/Form/InputRemarkable.vue'
    
    export default {
        name: 'Register',
        components:{
            SelectCountries,
            InputName,
            InputRemarkable
        }
    }    
</script>


<style>

</style>