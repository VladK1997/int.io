<template>
    <div class="container">
        <header class="header" id="header">
            <router-link to="/" class="logo">
                <img src="dist/img/logotype.png">
            </router-link>
            <navMenu class="header__nav-menu" v-if="menuOpened"></navMenu>
            <button type="button" class="header__btn btn btn__md notMobile">Fake Sign Up</button>
            <div class="burger" v-if="isMobile" v-on:click="menu" :class="[menuOpened ? 'burger--active' : '', '']">
                <div class="burger__line"></div>
                <div class="burger__line"></div>
                <div class="burger__line"></div>
            </div>
        </header>
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
                isMobile: window.innerWidth <= 768,
                menuOpened: true,
            }
        },
        methods:{
          menu(){
              if(this.menuOpened){
                  document.body.style.overflow = "auto";
                  this.menuOpened = false;
              }else{
                  this.menuOpened = true;
                  document.body.style.overflow = "hidden";
              }
          }
        },
        mounted() {
            if(this.isMobile){
                this.menuOpened = false;
            }
        }
    }
</script>