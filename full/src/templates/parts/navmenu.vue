<template>
    <nav class="nav-menu">
        <a href="#" class="nav-menu__link">Hero</a>
        <a href="#" class="nav-menu__link">List</a>
        <a href="#" class="nav-menu__link">CTA Block</a>
        <a href="#" class="nav-menu__link">Footer</a>
        <button type="button" class="btn btn__md mobile">Fake Sign Up</button>
    </nav>
</template>
<script>
    export default {
        data() {
            return{

            }
        },
        mounted() {
            console.log(this.$root);
        }
    }
</script>