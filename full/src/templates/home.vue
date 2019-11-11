<template>
    <div class="container home">
        <div class="visual-block">
            <div class="visual-block__rect"></div>
            <div class="visual-block__img"><img src="dist/img/image1.png"></div>
            <h1 class=" visual-block__title">MAY THE FORCE BE WITH YOU</h1>
        </div>
        <div class="container container--md">
            <p class="content__title">Our starships</p>
            <main class="content">
                <div class="noShrink">
                    <nav class="nav-filter home__nav-filter" v-if="!$parent.$data.isMobile || openedFilter">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="nav-filter__title">Pilots</h3>
                            <p class="nav-filter__amout nav-filter__figure .mb--30">({{pilots.length}})</p>
                        </div>
                        <label class="nav-filter__check" v-for="(pilot,index) in pilots" v-if="index < pilotShow" >
                            <input type="checkbox" v-on:click="pilotFilter(pilot.starships,$event)">
                            <div class="nav-filter__custom-checkbox" ></div>
                            <p class="nav-filter__text">{{pilot.name}}</p>
                        </label>
                        <button type="button" class="nav-filter__view-all .mb--30" v-on:click="showAllPilots()" v-if="!allPilotShow">View All</button>
                        <h3 class="nav-filter__title">Crew size</h3>
                        <div class="rangeSlider .mb--30">
                            <div class="d-flex justify-content-between">
                                <p class="rangeSlider__value-field">{{range1Min}}</p>
                                <p class="rangeSlider__value-field">{{range1Max}}</p>
                            </div>
                            <VueSlider class="rangeSlider__itself" v-model="value1" v-bind="optionsSlider1" v-on:change="sliderCheck($event)"></VueSlider>
                        </div>
                        <h3 class="nav-filter__title">Passengers capacity</h3>
                        <div class="rangeSlider">
                            <div class="d-flex justify-content-between">
                                <p class="rangeSlider__value-field">{{range2Min}}</p>
                                <p class="rangeSlider__value-field">{{range2Max}}</p>
                            </div>
                            <VueSlider class="rangeSlider__itself" v-model="value2" v-bind="optionsSlider2" v-on:change="sliderCheck2($event)"></VueSlider>
                        </div>
                    </nav>
                </div>
                <div class="w-100">
                    <div class="d-flex w-100 align-items-center ">
                        <v-select class=" home__sort-select btn--xl btn" label="name" @input="mysort" :options="options"></v-select>
                        <div class="filter-btn" v-on:click="switchFilter" :class="[openedFilter ? 'filter-btn--active' : '', '']">
                            <div class="filter-btn__line"></div>
                            <div class="filter-btn__line"></div>
                            <div class="filter-btn__line"></div>
                        </div>
                    </div>
                    <div class="card-layout">
                        <div class="main-card main-card--small" v-for="(ship,index) in starships" v-if="index < shipShow" v-on:click="setItem(ship)">
                            <router-link to="/vessel" class="main-card__link" ></router-link>
                            <div class="main-card__square">
                                <div class="main-card__square-content">
                                    <abbr class="main-card__abbr">{{ship.name.match(/\b([A-Z])/g).join('')}}</abbr>
                                    <h5 class="main-card__subtitle">MGLT: {{ship.MGLT }}</h5>
                                </div>
                            </div>
                            <h6 class="main-card__title">{{ship.name}}</h6>
                            <p class="main-card__desc">CR: {{ship.cost_in_credits }}</p>
                            <p class="main-card__desc">CREW: {{ship.crew }}</p>
                            <p class="main-card__desc">PSNGS: {{ship.passengers}}</p>
                        </div>
                    </div>
                    <button class="card-layout__btn btn btn--xl" v-on:click="moreCards()" v-if="!allShipsShowed && starships.length > 6">VIEW MORE <img class="btn__icon" src="dist/img/Vector.png"></button>

                </div>
            </main>
        </div>
        <div class="home__feedback">
            <feedback></feedback>
            <div class="feedback__img">
                <img src="dist/img/plane.png">
            </div>
        </div>
    </div>
</template>

<script>
    import feedback from "./parts/feedbackForm.vue";
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        components:{
            feedback,
            VueSlider
        },
        data: function(){
            return {
                pilots: null,
                starships: null,
                allShipReserve: null,
                shipShow: 6,
                pilotShow: 5,
                allPilotShow: false,
                allShipsShowed: false,
                pilotFilterOn: false,
                filtered: false,
                openedFilter:false,
                range1Max:200,
                range1Min: 0,
                range2Max:200,
                range2Min: 0,
                filterStarships: [],
                value1: [0, 200],
                value2: [0, 200],
                optionsSlider1: {
                    dotSize: 17,
                    width: 'auto',
                    height: 4,
                    contained: false,
                    direction: 'ltr',
                    data: null,
                    min: 0,
                    max: 200,
                    interval: 1,
                    disabled: false,
                    clickable: true,
                    duration: 0.5,
                    adsorb: false,
                    lazy: false,
                    tooltip: 'none',
                    tooltipPlacement: 'top',
                    tooltipFormatter: void 0,
                },
                optionsSlider2: {
                    dotSize: 17,
                    width: 'auto',
                    height: 4,
                    direction: 'ltr',
                    min: 0,
                    max: 200,
                    interval: 1,
                    clickable: true,
                    duration: 0.5,
                    tooltip: 'none',
                    tooltipPlacement: 'top',
                },
                options:[
                    {
                        code: "crew",
                        name: "By crew size"
                    },
                    {
                        code: "cost_in_credits",
                        name: "By Cost in credits"
                    },
                    {
                        code: "MGLT",
                        name: "By MGLT NUMBER"
                    }
                ]
            }
        },
        mounted: function() {
            axios
                .get('https://swapi.co/api/people/')
                .then(response => (this.pilots = response.data.results));
            axios
                .get('https://swapi.co/api/starships/')
                .then(response => {
                    this.starships = response.data.results;
                    this.allShipReserve = response.data.results;
                    let tempArrayCrew = [];
                    let tempArrayPasg = [];
                    for(let i = 0, l = this.allShipReserve.length; i < l; i++){
                        tempArrayCrew.push(+this.allShipReserve[i].crew);
                        tempArrayPasg.push(+this.allShipReserve[i].passengers);
                    }
                    let maxCrew =  Math.max.apply(null,tempArrayCrew);
                    this.range1Max = maxCrew;
                    this.optionsSlider1.max = maxCrew;
                    this.value1[1] = maxCrew;
                    this.range2Max = Math.max.apply(null,tempArrayPasg);
                    this.optionsSlider2.max = Math.max.apply(null,tempArrayPasg);
                    this.value2[1] = Math.max.apply(null,tempArrayPasg);

                });

        },
        methods:{
            sliderCheck(ev){
                this.range1Max = ev[1];
                this.range1Min = ev[0];
                let tempValue;
                let tempArray = [];
                if(this.filtered){
                   tempValue = this.filterStarships;
                }else{
                    tempValue = this.allShipReserve;
                }
                for(let i = 0, l = tempValue.length; i < l; i++){
                    if(tempValue[i].crew >= this.range1Min && tempValue[i].crew <= this.range1Max ){
                        tempArray.push(tempValue[i]);
                    }
                }
                console.log(tempArray);
                this.starships = tempArray;

            },

            sliderCheck2(ev){
                this.range2Max = ev[1];
                this.range2Min = ev[0];
                let tempValue;
                let tempArray = [];
                if(this.filtered){
                    tempValue = this.filterStarships;
                }else{
                    tempValue = this.allShipReserve;
                }
                for(let i = 0, l = tempValue.length; i < l; i++){
                    if(tempValue[i].passengers >= this.range2Min && tempValue[i].passengers <= this.range2Max ){
                        tempArray.push(tempValue[i]);
                    }
                }
                console.log(tempArray);
                this.starships = tempArray;
            },
            mysort(e){
                let currentValue = e.code;
                this.starships = this.starships.sort((a, b) => (a[currentValue] > b[currentValue]) ? 1 : -1);
            },
            showAllPilots(){
                this.pilotShow = this.pilots.length;
                this.allPilotShow = true
            },
            pilotFilter(starShipNew,event) {
                    let self = this;
                    for (let i = 0, l = starShipNew.length; i < l; i++) {
                        let myResult = "";
                        let tempResult = starShipNew[i];
                        axios
                            .get(starShipNew[i])
                            .then(response => {
                                myResult = response.data;
                                if (event.target.checked) {
                                    this.filtered = true;
                                    if (self.pilotFilterOn) {
                                        self.filterStarships.push(myResult);
                                        self.starships = self.filterStarships;
                                    } else {
                                        self.filterStarships.push(myResult);
                                        self.starships = self.filterStarships;
                                        self.pilotFilterOn = true;
                                    }
                                }else{
                                    for(let i = 0, l = self.filterStarships.length; i < l ; i++ ){
                                        if(this.filterStarships[i].url === myResult.url){
                                            self.filterStarships.splice(i, 1);
                                        }
                                    }
                                    this.starships = this.filterStarships;
                                    if(this.starships.length == 0){
                                        this.starships = this.allShipReserve;
                                        this.filtered = false;
                                    }
                                }
                            });

                    }

            },
            moreCards(){
                if(this.shipShow + 6 < this.starships.length){
                    this.shipShow += 6;
                }else{
                    this.allShipsShowed = true;
                    this.shipShow = this.starships.length;
                }
            },
            setItem(e){
                this.$parent.$data.item = e;
            },
            switchFilter(){
                if(this.openedFilter){
                    this.openedFilter = false;
                }else{
                    this.openedFilter = true;
                }
            }
        }
    }
</script>