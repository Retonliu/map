<template>
    <div id="APP">
        <div class="select-wrap">
            <select-box text="genus" v-bind:list="getGenus" class="box"></select-box>
            <select-box text="species" v-bind:list="getSpecies" class="box"></select-box>
            <select-box text="host" v-bind:list="getHost" class="box"></select-box>
            <select-box text="tissue" v-bind:list="getTissue" class="box"></select-box>
            <select-box text="area" v-bind:list="getArea" class="box"></select-box>
            <label class="inputAccession">
                accession：
                <input v-model="accession" @blur="validateAccession">
                <p style="display: inline-block;" v-show="ifShow">{{ tipMsg }}</p>
            </label>
            <div style="display: inline-block;" class="beginEnd">
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
                <label>
                    最小长度
                    <input type="number" min="0" max="1000" v-model="minLen">
                </label>
                <label>
                    最大长度
                    <input type="number" min="0" max="9999" v-model="maxLen">
                </label>
                <button @click="filterData" style=" outline: none; border-radius: 12px;margin-left: 4px; background-color: #FF9900; color: #ffffff; cursor: pointer; font-size: 20px; ">显示</button>
            </div>
        </div>
        <world-map v-bind:data="selectData" v-bind:hosts="getHost" style="margin-top: 50px;" ref="map"></world-map>
    </div>
</template>

<script>
import WorldMap from './components/WorldMap.vue'
import selectBox from './components/selectBox.vue'
import { randomData, store } from './data/store.js'
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
            data: randomData,
        }
    },
    computed: {
            getGenus() {
                const res = new Map();
                return this.data.filter((arr) => !res.has(arr.genus) && res.set(arr.genus, 1))
            },
            getArea() {
                const res = new Map();
                return this.data.filter((arr) => !res.has(arr.area) && res.set(arr.area, 1))
            },
            getHost() {
                const res = new Map();
                return this.data.filter((arr) => !res.has(arr.host) && res.set(arr.host, 1))
            },
            getSpecies() {
                const res = new Map();
                return this.data.filter((arr) => !res.has(arr.species) && res.set(arr.species, 1))
            },
            getTissue() {
                const res = new Map();
                return this.data.filter((arr) => !res.has(arr.tissue) && res.set(arr.tissue, 1))
            }
    },
    methods: {
        validateAccession() {
            //console.log(this.ifShow);
            let flag = false;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].accession === this.accession) {
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
        filterData() {
            // 对多选框的内容进行过滤得到res4数组
            //const that = this;
            let res = this.data.filter((item1) => store.state.genus.some((item2) => item1.genus===item2.genus))
                .filter((item1) => store.state.host.some((item2) => item1.host === item2.host))
                .filter((item1) => store.state.species.some((item2) => item1.species === item2.species))
                .filter((item1) => store.state.tissue.some((item2) => item1.tissue === item2.tissue))
                .filter((item1) => store.state.area.some((item2) => item1.area === item2.area))
                .filter((item) => item.accession===this.accession)
                .filter((item) => this.minLen <= item.length && item.length <= this.maxLen),
                bT = new Date(this.beginTime.replace("-", "/")),
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
            this.selectData = res;
        }
    },
    /*mounted() {
        //在这里通过axios引入服务器传来的数据
        let that = this;
        this.$axios
            .get(urlData) //get请求传入参数
            .then(response => {
                if (response.data.code == 0) { //如果发送get请求成功
                    this.data = response.data.data; //把获得的数据放到this.data里面。
                }
            }); 
    }*/
}
</script>

<style>
* {
    font-family: "Arial", "Helvetica", "sans-serif";
}
body {
    background-color: #FFFFFF;
}
.select-wrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    width: 99%;
    margin: 0 auto;
}
input {
    outline: none;
    border-radius: 12px;
    background-color: #FFFFEC;
}
.inputAccession {
    font-size: 10px;
}
.inputAccession input{
    width: 100px;
}
.tip {
    width: auto;
    border: solid 1px #888;
    font-size: 20px;
}
label p {
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
