<template>
    <div id="APP">
        <div class="select-wrap">
            <select-box text="genus" v-bind:list="getGenus" v-on:handleList="setGenus" class="box"></select-box>
            <select-box text="species" v-bind:list="getSpecies" v-on:handleList="setSpecies" class="box"></select-box>
            <select-box text="host" v-bind:list="getHost" v-on:handleList="setHost" class="box"></select-box>
            <select-box text="tissue" v-bind:list="getTissue" v-on:handleList="setTissue" class="box"></select-box>
            <select-box text="area" v-bind:list="getArea" v-on:handleList="setArea" class="box"></select-box>
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
                    <input type="number" min="0" max="1000" v-model="maxLen">
                </label>
                <button @click="filterData" style="margin-left: 4px; background-color: #FF9900; color: #ffffff; cursor: pointer; ">显示</button>
            </div>
        </div>
        <world-map v-bind:data="selectData" v-bind:hosts="getHost" style="margin-top: 50px;" ref="map"></world-map>
    </div>
</template>

<script>
import WorldMap from './components/WorldMap.vue'
import selectBox from './components/selectBox.vue'
import randomData from './data/config.js'
export default {
    name: 'APP',
    components: {
        WorldMap,
        selectBox
    },
    data() {
        return {
            genus: [],
            species: [],
            tissue: [],
            host: [],
            area: [],
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
        /*
         set方法设置
        */
        setGenus(genus) {
            this.genus = genus;
            //console.log(this.genus);
        },
        setTissue(tissue) {
            this.tissue = tissue;
        },
        setHost(host) {
            this.host = host;
        },
        setArea(area) {
            this.area = area;
        },
        setSpecies(species) {
            this.species = species;
        },
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
            let res = this.data.filter((item1) => this.genus.some((item2) => item1.genus===item2.genus))
                .filter((item1) => this.host.some((item2) => item1.host === item2.host))
                .filter((item1) => this.species.some((item2) => item1.species === item2.species))
                .filter((item1) => this.tissue.some((item2) => item1.tissue === item2.tissue))
                .filter((item1) => this.area.some((item2) => item1.area === item2.area))
                .filter((item) => item.accession===this.accession)
                .filter((item) => this.minLen <= item.length && item.length <= this.maxLen),
                bT = new Date(this.beginTime.replace("-", "/")),
                eT = new Date(this.endTime.replace("-", "/"));
            //console.log(res);
            res = res.filter(function(item) {
                let curT = item.time.toString().replace("-", "/");
                //console.log(curT);
                //let curT = time.slice(0, 4) + '/' + time.slice(4, 6) + '/' + time.slice(6, 8);
                let cT = new Date(curT);
                return bT <= cT && cT <= eT;
            });
            console.log(res);
            this.selectData = res;
            this.$nextTick(() => {
					// 2. 再调用子组件的方法使用该属性
					// 如果不使用 nextTick的话，子组件方法内获取到的有可能是这次赋值之前的值，下次调用时才能获取到此次赋值的值（应该是跟 Vue的异步事件队列有关系）
					//that.$refs.map.initData();
			})
            console.log(this.selectData);
        }
    },
    /*mounted() {
        this.$axios("get")
        .then() {
            this.data = ;
        }
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
