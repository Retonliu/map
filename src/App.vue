<template>
    <div id="MapContainer">
        <div class="select-wrap">
            <select-box text="genus" v-bind:list="getGenus"></select-box>
            <select-box text="species" v-bind:list="getSpecies"></select-box>
            <select-box text="host" v-bind:list="getHost"></select-box>
            <select-box text="tissue" v-bind:list="getTissue"></select-box>
            <label class="inputThings">
                accession输入：
                <input v-model="things" @blur="validateThings">
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
            </div>
        </div>
        <!--<world-map v-bind:data="filterData"></world-map>-->
    </div>
</template>

<script>
//import WorldMap from './components/WorldMap.vue'
import selectBox from './components/selectBox.vue'
export default {
  name: 'MapContainer',
  components: {
    //WorldMap
    selectBox
  },
  data() {
    return {
          host: [],
          area: [],
          things: '',
          beginTime: '',
          endTime: '',
          minLen: 0,
          maxLen: 0,
          ifShow: false,
          tipMsg: '查无输入accession',
          data: [
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus B04",
                    host: "AmaZona vinacea",
                    tissue: "feces",
                    accession: "KP965434",
                    length: 200,
                    time: 20200927,
                    area: "Poland",
                    things: "aaaa",
                    gene: ""
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus B04",
                    host: "AmaZona vinacea",
                    tissue: "feces",
                    length: 600,
                    time: 20200927,
                    area: "China",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus B04",
                    host: "AmaZona vinacea",
                    tissue: "",
                    length: 800,
                    time: 20200927,
                    area: "China",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus B04",
                    host: "AmaZona vinacea",
                    tissue: "",
                    length: 900,
                    time: 20200927,
                    area: "China",
                    things: "aaaa"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "Anas acuta",
                    tissue: "",
                    length: 800,
                    time: 20200927,
                    area: "China",
                    things: "aaaa"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "Anas acuta",
                    tissue: "lung",
                    length: 600,
                    time: 20200927,
                    area: "China",
                    things: "aaaa"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "AmaZona vinacea",
                    tissue: "lung",
                    length: 130,
                    time: 20200926,
                    area: "Vietnam",
                    things: "cccc"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "AmaZona vinacea",
                    tissue: "lung",
                    length: 130,
                    time: 20200926,
                    area: "China",
                    things: "aaaa"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "Anas acuta",
                    tissue: "lung",
                    length: 230,
                    time: 20200926,
                    area: "Japan",
                    things: "dddd"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "Anas acuta",
                    tissue: "",
                    length: 130,
                    time: 20200926,
                    area: "Korea",
                    things: "nnnn"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "Anas crecca",
                    tissue: "",
                    length: 930,
                    time: 20200926,
                    area: "Canada",
                    things: "aaaa"
              },
              {
                    genus: "Deltacoronarirus",
                    species: "Deltacoronavirus",
                    host: "AmaZona vinacea",
                    tissue: "",
                    length: 30,
                    time: 20200926,
                    area: "Canada",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "Anas crecca",
                    tissue: "",
                    length: 930,
                    time: 20200926,
                    area: "Canada",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "AmaZona vinacea",
                    tissue: "",
                    length: 1000,
                    time: 20200926,
                    area: "Canada",
                    things: "dddd"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "Anas crecca",
                    tissue: "",
                    length: 30,
                    time: 20200926,
                    area: "Russia",
                    things: "nnnn"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "AmaZona vinacea",
                    tissue: "",
                    length: 930,
                    time: 20200926,
                    area: "Russia",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "Anas crecca",
                    tissue: "",
                    length: 500,
                    time: 20200926,
                    area: "Australia",
                    things: "dddd"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "AmaZona vinacea",
                    tissue: "",
                    length: 900,
                    time: 20200926,
                    area: "Australia",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "Anas crecca",
                    tissue: "",
                    length: 500,
                    time: 20200926,
                    area: "Australia",
                    things: "aaaa"
              },
              {
                    genus: "Gammacoronavirus",
                    species: "Deltacoronavirus",
                    host: "Anas crecca",
                    tissue: "",
                    length: 500,
                    time: 20200926,
                    area: "Turkey",
                    things: "nnnn"
              },
          ]
            
        }
  },
  computed: {
        getGenus() {
            const res = new Map();
            return this.data.filter((arr) => !res.has(arr.genus) && res.set(arr.genus, 1))
        },
        getHost() {
            const res = new Map();
            return this.data.filter((arr) => !res.has(arr.host) && res.set(arr.host, 1))
        },
        getArea() {
            const res = new Map();
            return this.data.filter((arr) => !res.has(arr.area) && res.set(arr.area, 1))
        },
        getSpecies() {
            const res = new Map();
            return this.data.filter((arr) => !res.has(arr.species) && res.set(arr.species, 1))
        },
        getTissue() {
            const res = new Map();
            return this.data.filter((arr) => !res.has(arr.species) && res.set(arr.species, 1))
        },
        filterData() {
            // 对多选框的内容进行过滤得到res4数组
            let res = this.data.filter((item1) => genus.some((item2) => item1.genus===item2.genus))
                .filter((item1) => host.some((item2) => item1.host === item2.host))
                .filter((item1) => species.some((item2) => item1.species === item2.species))
                .filter((item1) => tissue.some((item2) => item1.tissue === item2.tissue))
                .filter((item) => item.accession===aeecssion)
                .filter((item) => this.minLen <= item.length && item.length <= this.maxLen),
                bT = new Date(this.beginTime.replace("-", "/")),
                eT = new Date(this.endTime.replace("-", "/"));
            
            res = res.filter(function(item) {
                let time = item.time.toString();
                let curT = time.slice(0, 4) + '/' + time.slice(4, 6) + '/' + time.slice(6, 8);
                let cT = new Date(curT);
                return bT <= cT && cT <= eT;
            });

            /*let res = [];
            for (let i = 0; i < this.data.length; i++) { //双重循环判断
                //判断是否有host
                for (let j = 0; j < this.host.length; j++) { 
                    if (this.data[i].host === this.host[j]) {
                        //判断是否有area
                        //console.log("host");
                        for (let z = 0; z < this.area.length; z++) {
                            if (this.data[i].area === this.area[z]) {
                                //console.log("area");
                                //判断是否为things
                                if (this.data[i].things === this.things) {
                                    //console.log("things");
                                    //判断长度范围
                                    if (this.minLen <= this.data[i].length && this.data[i].length <= this.maxLen) {

                                        //判断时间范围
                                        let time = this.data[i].time.toString();
                                        //console.log(typeof(time));
                                        let curT = time.slice(0, 4) + '/' + time.slice(4, 6) + '/' + time.slice(6, 8);
                                        let cT = new Date(curT);
                                        if (bT <= cT && cT <= eT) {
                                            //console.log("time");
                                            res.push(this.data[i]);
                                        }

                                    }

                                }
                            }
                        }

                    }
                }

            }*/
            //console.log(res);
            return res;
      }
  },
  methods: {
    validateThings: function() {
            //console.log(this.ifShow);
            let flag = false;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].things === this.things) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.ifShow = true;
            } else {
                this.ifShow = false;
            }
            
        }
  }

}
</script>

<style>
.select-wrap {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}
select[multiple="multiple"] {
    width: auto;
    margin-right: 20px;
}
input {
    outline: none;
    border-radius: 12px;
}
.inputThings {
    font-size: 20px;
}
.inputThings input{
    width: 50px;
}
.tip {
    width: auto;
    border: solid 1px #888;
    font-size: 20px;
}
label p {
    color: red;
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
