<template>
    <div class="container">
        <footer class="footer">
            <router-link to="/" class="logo">
                <img src="dist/img/logotype.png">
            </router-link>
            <navMenu class="footer__nav-menu"></navMenu>
            <button type="button" class="footer__btn btn btn__md"  v-scroll-to="'#header'">MNE NAVERH</button>
        </footer>
    </div>
</template>
<script>
    import navMenu from "./navmenu.vue";
    export default {
        components:{
            navMenu,
        },
        data(){
            return{

            }
        }
    }
</script>