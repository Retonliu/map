<template>
    <div id="WorldMap" ref="worldmap"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
import { geoData } from '../data/store.js'
import generateColorArr from '../data/generateColors.js'
export default {
    name: 'WorldMap',
    props: ['data', 'hosts'],
    data() {
        return {
            myChart: null,
            geoCoorMap: geoData,
        }
    },
    computed: {
    },
    methods: {
        convertData(host) {
            let res = [];
            let that = this;
            //console.log(this.data);
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].host === host) {
                    let geoCoord = this.geoCoorMap[this.data[i].area];
                    if (geoCoord) {
                        res.push({
                            value: [...geoCoord, that.data[i].length, that.data[i].tissue, that.data[i].genus, 
                                    that.data[i].time, that.data[i].area],
                            symbolOffset: [Math.floor((Math.random()*100)+1)+'%', Math.floor((Math.random()*100)+1)+'%'],
                        });
                    }
                }
            }
            //console.log(res);
            return res;
        },
        handleMapOption() {
            let seriesArr = [],
                that = this;
            for (const host of this.hosts) {
                const serie = {
                    name: host.host,
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    type: "scatter",
                    data: that.convertData(host.host),
                    symbolSize: 20,
                    roam: true,
                    animation: true,
                    encode: {
                        value: 2,
                        tooltip: [2, 3, 4, 5, 6]
                    },
                    tooltip: {
                        //formatter: '',
                        //trigger: 'item'
                    },
                    animationDuration: function (idx) {
                        return idx * 200;
                    },
                    animationDelay: function (idx) {
                        return idx * 200;
                    },
                    animationEasing: function (k) {
                        return --k * k * k + 1;
                    },
                }
                seriesArr.push(serie);
            }
            return seriesArr;
        },
        handleVisualMap() {
            //that = this,
            if (!localStorage.getItem("colorsArrOfMap")) {
                const tmpColors = generateColorArr();
                localStorage.setItem("colorsArrOfMap", JSON.stringify(tmpColors));
            }
            const colors = JSON.parse(localStorage.getItem("colorsArrOfMap"));
            console.log(colors);
            let visualMaps = [];
            for (let i = 0, len = this.hosts.length; i < len; i++) {
                const visualMap = {
                    show: false,
                    min: 0,
                    max: 1000,
                    seriesIndex: i,
                    dimension: 2,
                    color: colors[i],
                    type: 'continuous',
                }
                visualMaps.push(visualMap);
            }
            return visualMaps;
        },
        initMap: function() {
            /*console.log(this.data);
            let that = this;
            let easingFuncs = {
                cubicOut: function (k) {
                    return --k * k * k + 1;
                }
            }*/
            let option = {
                backgroundColor: '#F3F3F3',//'#A2CD5A'
                tooltip: {
                    //formatter: 'a: {a}<br/>c:{c1}',//a是系列名，b是res中每个元素的name属性，c是value属性
                    trigger: 'item'
                },
                /*title: {
                    text: '毒株检索',
                    left: 'center',
                    textStyle: {
                        fontSize: 30,
                        color: '#666666'
                    }
                },*/
                label: {
                    show: false,
                    formatter: '{a}',
                    position: 'right',
                },
                geo: {
                    map: 'world',
                    roam: true,
                    top: 80,
                    //left: 50,
                    zoom: 1,
                    itemStyle: {
                        normal: {
                            areaColor: '#A2CD5A',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#ffff'
                        }
                    }
                },
                visualMap: this.handleVisualMap(),
                series: this.handleMapOption()
            };
            this.myChart.setOption(option);
            //console.log(option);
        }
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.worldmap);
        this.initMap();
    },
    watch: {
        data() {
            let option = this.myChart.getOption();
            this.myChart.clear(option);
            this.initMap();
        }
    }
}
</script>

<style scoped>
#WorldMap {
    width: 99%; 
    height: 500px; 
    z-index: 1;
    margin: 0 auto;
}
</style>