<template>
    <div id="APP">
        <div class="select-wrap">
            <div class="wrap-first">
                <div>
                    <label><input type="checkbox" v-model="genusAllSelected">全选</label>
                    <select-box text="genus" v-bind:list="getGenus" class="box" v-on:handleList="setChecked"></select-box>
                </div>
                <div>
                    <label><input type="checkbox" v-model="speciesAllSelected">全选</label>
                    <select-box text="species" v-bind:list="getSpecies" class="box" v-on:handleList="setChecked"></select-box>
                </div>
                <div>
                    <label><input type="checkbox" v-model="hostAllSelected">全选</label>
                    <select-box text="host" v-bind:list="getHost" class="box" v-on:handleList="setChecked"></select-box>
                </div>
                <div>
                    <label><input type="checkbox" v-model="tissueAllSelected">全选</label>
                    <select-box text="tissue" v-bind:list="getTissue" class="box" v-on:handleList="setChecked"></select-box> 
                </div>
                <div>
                    <label><input type="checkbox" v-model="areaAllSelected">全选</label>
                    <select-box text="area" v-bind:list="getArea" class="box" v-on:handleList="setChecked"></select-box>
                </div>
                <div>
                    <label><input type="checkbox" v-model="accessionAllSelected">全选</label>
                    <label class="inputAccession">
                        acc：
                        <input style="width: 80px;" v-model="accession" @blur="validateAccession">
                        <p style="display: inline-block;" v-show="ifShow">{{ tipMsg }}</p>
                    </label>
                </div>
            </div>
            <div class="wrap-second">
                <div style="display: inline-block;" class="beginEnd">
                    <label><input type="checkbox" v-model="timeAllSelected">全选</label>
                    <label>
                        开始时间:
                        <input id="date" type="date" value="2020-10-01" v-model="beginTime">
                    </label>
                    <label>
                        结束时间:
                        <input id="date" type="date" value="2020-10-01" v-model="endTime">
                    </label>
                </div>
                <div style="display: inline-block;" class="beginEnd">
                    <label><input type="checkbox" v-model="lengthAllSelected">全选</label>
                    <label>
                        最小长度
                        <input type="number" min="0" v-model="minLen">
                    </label>
                    <label>
                        最大长度
                        <input type="number" min="0" v-model="maxLen">
                    </label>
                    <button @click="filterData" style=" outline: none; border-radius: 12px;margin-left: 4px; background-color: #FF9900; color: #ffffff; cursor: pointer; font-size: 20px; ">显示</button>
                </div>
            </div>
        </div>
        <world-map v-bind:data="selectData" v-bind:hosts="getHost" style="margin-top: 50px;" ref="map"></world-map>
    </div>
</template>

<script>
import WorldMap from './components/WorldMap.vue'
import selectBox from './components/selectBox.vue'
import { allData } from './data/data.js'
import { debounce } from './constant/utils.js'
import { store } from './data/store.js'
export default {
    name: 'APP',
    components: {
        WorldMap,
        selectBox
    },
    data() {
        return {
            accession: '',
            beginTime: '',
            endTime: '',
            minLen: 0,
            maxLen: 0,
            ifShow: false,
            tipMsg: '查无输入accession',
            selectData: [],
            accessionAllSelected: false,
            speciesAllSelected: false,
            genusAllSelected: false,
            hostAllSelected: false,
            tissueAllSelected: false,
            areaAllSelected: false,
            timeAllSelected: false,
            lengthAllSelected: false,
        }
    },
    computed: {
        // 以下get使用computed是因为后续
        //获取要传给多选框组件的去重后的内容
            getGenus() {
                const map = new Map();
                const res = [];
                for (let i = 0, len = allData.length; i < len; i++) {
                    if (!map.has(allData[i].genus)) {
                        res.push(allData[i].genus);
                        map.set(allData[i].genus, 1);
                    }
                }
                return res;
            },
            getArea() {
                const map = new Map();
                const res = [];
                for (let i = 0, len = allData.length; i < len; i++) {
                    if (!map.has(allData[i].area)) {
                        res.push(allData[i].area);
                        map.set(allData[i].area, 1);
                    }
                }
                return res;
            },
            getHost() {
                const map = new Map();
                const res = [];
                for (let i = 0, len = allData.length; i < len; i++) {
                    if (!map.has(allData[i].host)) {
                        res.push(allData[i].host);
                        map.set(allData[i].host, 1);
                    }
                }
                return res;
            },
            getSpecies() {
                const map = new Map();
                const res = [];
                for (let i = 0, len = allData.length; i < len; i++) {
                    if (!map.has(allData[i].species)) {
                        res.push(allData[i].species);
                        map.set(allData[i].species, 1);
                    }
                }
                return res;
            },
            getTissue() {
                const map = new Map();
                const res = [];
                for (let i = 0, len = allData.length; i < len; i++) {
                    if (!map.has(allData[i].tissue)) {
                        res.push(allData[i].tissue);
                        map.set(allData[i].tissue, 1);
                    }
                }
                return res;
            }
    },
    methods: {
        //提示用户输入的accession是否存在
        validateAccession() {
            //console.log(this.ifShow);
            let flag = false;
            for (let i = 0; i < allData.length; i++) {
                if (allData.accession === this.accession) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.ifShow = true;
            } else {
                this.ifShow = false;
            }
                
        },
        setChecked(type, checkedList) {
            if (type === 'genus') {
                store.genus = this.getGenus.filter((item, index) => checkedList[index]);
                //console.log(store.genus);
            } else if (type === 'species') {
                store.species = this.getSpecies.filter((item, index) => checkedList[index]);
            } else if (type === 'host') {
                store.host = this.getHost.filter((item, index) => checkedList[index]);
            } else if (type === 'tissue') {
                store.tissue = this.getTissue.filter((item, index) => checkedList[index]);
            } else if (type === 'area') {
                store.area = this.getArea.filter((item, index) => checkedList[index]);  
            }
        },
        filterData: debounce(function() {
            // 用户点击自己想要的内容之后，对多选框的内容进行过滤得到res4数组
            let res = allData;
            if (!this.genusAllSelected) {
                //console.log(store.genus);
                res = res.filter((item) => store.genus.some((genus) => item.genus === genus));
            }
            if (!this.hostAllSelected) {
                res = res.filter((item) => store.host.some((host) => item.host === host));
            }
            if (!this.speciesAllSelected) {
                res = res.filter((item) => store.species.some((species) => item.species === species));
            }
            if (!this.tissueAllSelected) {
                res = res.filter((item) => store.tissue.some((tissue) => item.tissue === tissue));
            }
            if (!this.areaAllSelected) {
                res = res.filter((item) => store.area.some((area) => item.area === area));
            }
            if (!this.accessionAllSelected) {
                res = res.filter((item) => item.accession === this.accession);
            }
            if (!this.lengthAllSelected) {
                res = res.filter((item) => this.minLen <= item.length && item.length <= this.maxLen);
            }
            if (!this.timeAllSelected) {
                let bT = new Date(this.beginTime.replace("-", "/")),
                    eT = new Date(this.endTime.replace("-", "/"));
                res = res.filter(function(item) {
                    const pattern = /\d{4}-\d{2}-\d{2}/g;
                    let curT = null;
                    if (pattern.test(item.time)) {
                        curT = item.time.toString();
                    } else { //处理类似2020.0的日期
                        curT = item.time.toString().slice(0, 4);
                        curT = curT + '-' + '01' + '-' + '01';
                    }
                    const cT = new Date(curT);
                    return bT <= cT && cT <= eT;
                });
            }
            this.selectData = res;
        }, 800)
    }
}
</script>

<style>
* {
    font-family: "Arial", "Helvetica", "sans-serif";
}
label {
    font-size: 10px;
}
body {
    background-color: #FFFFFF;
}
.select-wrap {
    width: 99%;
    margin: 0 auto;
}
.wrap-first {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}
.wrap-second {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

input {
    outline: none;
    border-radius: 12px;
    background-color: #FFFFEC;
}
input[type="number"] {
    width: 100px;
}
input[type="date"] {
    width: 120px;
}
.inputAccession {
    width: 298px;
}
.inputAccession input{
    width: 100px;
}
.tip {
    width: auto;
    border: solid 1px #888;
    font-size: 20px;
}
label {
    margin: 0;
    color:#C9BC9C;
    font-size: 10px;
}
.beginEnd {
    font-size: 20px;
}
.beginEnd input {
    padding: 0 10px;
    text-align: center;
}
</style>
