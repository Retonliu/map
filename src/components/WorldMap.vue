<template>
    <div id="WorldMap" ref="worldmap"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
import geoData from '../data/geoData.js'
export default {
    name: 'WorldMap',
    props: ['data'],
    data() {
        return {
            myChart: Object,
            geoCoorMap: geoData,
        }
    },
    computed: {
        convertDataA() {
            let res = [];
            let that = this;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].host === 'AmaZona vinacea') {
                    let geoCoord = this.geoCoorMap[this.data[i].area];
                    if (geoCoord) {
                        res.push({
                            value: [...geoCoord, that.data[i].length, that.data[i].tissue, that.data[i].genus],
                            symbolOffset: [Math.floor((Math.random()*100)+1)+'%', Math.floor((Math.random()*100)+1)+'%'],
                        });
                    }
                }
            }
            //console.log(res);
            return res;
        },
        convertDataB() {
            let res = [];
            let that = this;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].host === 'Anas acuta') {
                    let geoCoord = this.geoCoorMap[this.data[i].area];
                    if (geoCoord) {
                        res.push({
                            value: [...geoCoord, that.data[i].length, that.data[i].tissue, that.data[i].genus],
                            symbolOffset: [Math.floor((Math.random()*100)+1)+'%', Math.floor((Math.random()*100)+1)+'%'],
                        });
                    }
                }
            }
            //console.log(res);
            return res;
        },
        convertDataC() {
            let res = [];
            let that = this;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].host === 'Anas crecca') {
                    let geoCoord = this.geoCoorMap[this.data[i].area];
                    if (geoCoord) {
                        res.push({
                            value: [...geoCoord, that.data[i].length, that.data[i].tissue, that.data[i].genus],
                            symbolOffset: [Math.floor((Math.random()*100)+1)+'%', Math.floor((Math.random()*100)+1)+'%'],
                        });
                    }
                }
            }
            //console.log(res);
            return res;
        },
    },
    methods: {
        handleMapOption() {

        },
        initMap: function() {
            //console.log(this.data);
            let that = this;
            let easingFuncs = {
                cubicOut: function (k) {
                    return --k * k * k + 1;
                }
            }
            let option = {
                backgroundColor: '#F3F3F3',//'#A2CD5A'
                tooltip: {
                    //formatter: 'a: {a}<br/>b: {b}<br/>c:{c1}</br>d:{d}',//a是系列名，b是res中每个元素的name属性，c是value属性
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
                    top: 120,
                    left: 30,
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
                visualMap: [
                    {
                        show: false,
                        min: 0,
                        max: 1000,
                        seriesIndex: 0,
                        dimension: 2,
                        color: ['#BBFFFF', '#53868B'],
                        type: 'continuous',
                    },
                    {
                        show: false,
                        min: 0,
                        max: 1000,
                        seriesIndex: 1,
                        dimension: 2,
                        color: ['#C1FFC1', '#2E8B57'],
                        type: 'continuous',
                    },
                    {
                        show: false,
                        min: 0,
                        max: 1000,
                        seriesIndex: 2,
                        dimension: 2,
                        color: ['#EEEE00', '#8B8B00'],
                        type: 'continuous',
                    },
                    /*{
                        show: false,
                        min: 0,
                        max: 1000,
                        seriesIndex: 3,
                        color: ['#D3D3D3', '#696969'],
                        type: 'continuous',
                    }*/
                ],
                series: [
                    {
                        name: "Amazona vinacea",
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        type: "scatter",
                        data: that.convertDataA,
                        symbolSize: 20,
                        roam: true,
                        animation: true,
                        encode: {
                            value: 2,
                            tooltip: [2, 3]
                        },
                        animationDuration: function (idx) {
                            return idx * 200;
                        },
                        animationDelay: function (idx) {
                            return idx * 200;
                        },
                        animationEasing: easingFuncs.cubicOut,
                    },
                    {
                        name: "Anas acuta",
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        type: "scatter",
                        data: that.convertDataB,
                        symbolSize: 20,
                        roam: true,
                        animation: true,
                        encode: {
                            value: 2,
                            tooltip: [2, 3]
                        },
                        animationDuration: function (idx) {
                            return idx * 200;
                        },
                        animationDelay: function (idx) {
                            return idx * 200;
                        },
                        animationEasing: easingFuncs.cubicOut,
                    },
                    {
                        name: "Anas creacca",
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        type: "scatter",
                        data: that.convertDataC,
                        symbolSize: 20,
                        roam: true,
                        animation: true,
                        encode: {
                            value: 2,
                            tooltip: [2, 3, 4]
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
                        animationEasing: easingFuncs.cubicOut,
                    },
                ]
            };
            this.myChart.setOption(option);
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
    width: 1000px; 
    height: 500px; 
    z-index: 1;
    margin: 0 auto;
}
</style>