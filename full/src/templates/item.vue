<template>
    <div class="container item">
        <div class="visual-block visual-block--small" >
            <div class="visual-block__rect">
                <h1 class=" visual-block__title">PROFILE DESCRIPTION</h1>
            </div>
            <img class="visual-block__img" src="dist/img/image1.png">
        </div>
        <div class="container--md">
            <div class="item__main-info">
                <div class="d-flex flex-direction-col">
                    <h3 class="item__subtitle">{{item.item.name}}</h3>
                    <p class="item__char">Model: {{item.item.model}}</p>
                    <p class="item__char">Manufacturer: {{item.item.manufacturer}}</p>
                    <p class="item__char">Starship_class: Star dreadnought: {{item.item.starship_class}}</p>
                    <p class="item__copy-url">Copy API URL</p>
                </div>
                <div class="main-card main-card--xl">
                    <div class="main-card__square">
                        <div class="main-card__square-content">
                            <abbr class="main-card__abbr">{{item.item.name.match(/\b([A-Z])/g).join('')}}</abbr>
                            <h5 class="main-card__subtitle">MGLT: {{item.item.MGLT }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item__layout">
                <div class="item__item-card item-card">
                    <h3 class="item__subtitle">cost in credits</h3>
                    <h2 class="item-card__desc">{{item.item.cost_in_credits}}</h2>
                </div>
                <div class="item__item-card item-card">
                    <h3 class="item__subtitle">crew</h3>
                    <h2 class="item-card__desc">{{item.item.crew}}</h2>
                </div>
                <div class="item__item-card item-card">
                    <h3 class="item__subtitle">passengers</h3>
                    <h2 class="item-card__desc">{{item.item.passengers}}</h2>
                </div>
                <div class="item__item-card item-card">
                    <h3 class="item__subtitle">CARGO CAPACITY</h3>
                    <h2 class="item-card__desc">{{item.item.cargo_capacity}}</h2>
                </div>
                <div class="item__item-card item-card">
                    <h3 class="item__subtitle">consumables</h3>
                    <h2 class="item-card__desc">{{item.item.consumables}}</h2>
                </div>
                <div class="item__item-card item-card">
                    <h3 class="item__subtitle">FILMS COUNTER</h3>
                    <h2 class="item-card__desc">{{item.item.films.length}}</h2>
                </div>

            </div>
        </div>
        <div class="item__feedback">
            <feedback></feedback>
            <div class="feedback__img">
                <img src="dist/img/deadStar.png">
            </div>
        </div>
    </div>

</template>
<script>
    import feedback from "./parts/feedbackForm.vue";

    export default {
        components: {
            feedback
        },
        data() {
            return {
                item:  this.$parent.$data,
            }
        },
    }
</script>
