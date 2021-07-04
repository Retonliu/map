<template>
    <div id="WorldMap" ref="worldmap"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
import { geoData } from '../data/store.js'
import generateColorArr from '../data/generateColors.js'
import { iden } from'../data/data.js'
export default {
    name: 'WorldMap',
    props: ['data', 'hosts'],
    data() {
        return {
            myChart: null,
            geoCoorMap: geoData,
        }
    },
    methods: {
        convertData(host) {
            let res = [];
            //console.log(this.data);
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].host === host) {
                    let geoCoord = this.geoCoorMap[this.data[i].area];
                    if (geoCoord) {
                        res.push({
                            value: [...geoCoord, this.data[i].length, this.data[i].tissue, this.data[i].genus, 
                                    this.data[i].time, this.data[i].area, this.data[i].accession, this.data[i].virusGenes, this.data[i].host],
                            symbolOffset: [Math.floor((Math.random()*200)+1)+'%', Math.floor((Math.random()*200)+1)+'%'],
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
                    name: host,
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    type: "scatter",
                    data: that.convertData(host),
                    symbolSize: 20,
                    roam: true,
                    animation: true,
                    encode: {
                        tooltip: [2, 3, 4, 5, 6, 7]
                    },
                    tooltip: {
                        formatter: function(params) {
                            let valueArr = params.value;
                            //console.log("value[2]:", valueArr[2]);
                            return `
                                    host: ${valueArr[9]} <br/>
                                    length: ${valueArr[2]} <br/>
                                    tissue: ${valueArr[3]} <br/>
                                    genus: ${valueArr[4]} <br/>
                                    time: ${valueArr[5]} <br/> 
                                    area: ${valueArr[6]} <br/>
                                    accession: ${valueArr[7]} <br/>
                                    `
                        }
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
            if (!localStorage.getItem("colorsArrOfMap")) {
                const tmpColors = generateColorArr();
                localStorage.setItem("colorsArrOfMap", JSON.stringify(tmpColors));
            }
            if (!localStorage.getItem("iden")) {
                localStorage.setItem("iden", iden);
            }
            if (localStorage.getItem("iden") !== iden) {
                const tmpColors = generateColorArr();
                console.log(tmpColors);
                localStorage.setItem("colorsArrOfMap", JSON.stringify(tmpColors));
                localStorage.setItem("iden", iden);
            }
            const colors = JSON.parse(localStorage.getItem("colorsArrOfMap"));
            //console.log(colors);
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
        initMap() {
            let option = {
                backgroundColor: '#F3F3F3',//'#A2CD5A'
                label: {
                    show: false,
                    formatter: '{a}',
                    position: 'right',
                },
                tooltip: {
                    trigger: 'item'
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
            //console.log(this.data);
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