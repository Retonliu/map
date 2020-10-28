<template>
  <div id="MapContainer">
    <div class="select-wrap">
          <div>
              <div class="select">
                  <p v-for="item in getHost" v-bind:key="item.host"><input type="checkbox" name="item"><label>{{ item.host }}</label></p>
              </div>
              <select multiple="multiple" v-model="area">
                  <option v-for="item in getArea" v-bind:key="item.area">{{ item.area }}</option>
              </select>
              <label class="inputThings">
                  内容输入：
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
          <!--<div class="tip">
              <p>当前已选host: {{ host }}</p>
              <p>当前已选area: {{ area }}</p>
              <p>当前输入things: {{ things }}</p>
              <p>时间范围: {{ beginTime }}~{{ endTime }}</p>
              <p>长度范围: {{ minLen }}~{{ maxLen }}</p>
          </div>-->
    </div>
    <world-map v-bind:data="filterData"></world-map>
  </div>
</template>

<script>
import WorldMap from './components/WorldMap.vue'

export default {
  name: 'MapContainer',
  components: {
    WorldMap
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
          tipMsg: '查无当前输入内容',
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
                  host: "AmaZona vinacea",
                  length: 600,
                  time: 20200927,
                  area: "China",
                  things: "aaaa"
              },
              {
                  host: "AmaZona vinacea",
                  length: 800,
                  time: 20200927,
                  area: "China",
                  things: "aaaa"
              },
              {
                  host: "AmaZona vinacea",
                  length: 900,
                  time: 20200927,
                  area: "China",
                  things: "aaaa"
              },
              {
                  host: "Anas acuta",
                  length: 800,
                  time: 20200927,
                  area: "China",
                  things: "aaaa"
              },
              {
                  host: "Anas acuta",
                  length: 600,
                  time: 20200927,
                  area: "China",
                  things: "aaaa"
              },
              {
                  host: "AmaZona vinacea",
                  length: 130,
                  time: 20200926,
                  area: "Vietnam",
                  things: "cccc"
              },
              {
                  host: "AmaZona vinacea",
                  length: 130,
                  time: 20200926,
                  area: "China",
                  things: "aaaa"
              },
              {
                  host: "Anas acuta",
                  length: 230,
                  time: 20200926,
                  area: "Japan",
                  things: "dddd"
              },
              {
                  host: "Anas acuta",
                  length: 130,
                  time: 20200926,
                  area: "Korea",
                  things: "nnnn"
              },
              {
                  host: "Anas crecca",
                  length: 930,
                  time: 20200926,
                  area: "Canada",
                  things: "aaaa"
              },
              {
                  host: "AmaZona vinacea",
                  length: 30,
                  time: 20200926,
                  area: "Canada",
                  things: "aaaa"
              },
              {
                  host: "Anas crecca",
                  length: 930,
                  time: 20200926,
                  area: "Canada",
                  things: "aaaa"
              },
              {
                  host: "AmaZona vinacea",
                  length: 1000,
                  time: 20200926,
                  area: "Canada",
                  things: "dddd"
              },
              {
                  host: "Anas crecca",
                  length: 30,
                  time: 20200926,
                  area: "Russia",
                  things: "nnnn"
              },
              {
                  host: "AmaZona vinacea",
                  length: 930,
                  time: 20200926,
                  area: "Russia",
                  things: "aaaa"
              },
              {
                  host: "Anas crecca",
                  length: 500,
                  time: 20200926,
                  area: "Australia",
                  things: "dddd"
              },
              {
                  host: "AmaZona vinacea",
                  length: 900,
                  time: 20200926,
                  area: "Australia",
                  things: "aaaa"
              },
              {
                  host: "Anas crecca",
                  length: 500,
                  time: 20200926,
                  area: "Australia",
                  things: "aaaa"
              },
              {
                  host: "Anas crecca",
                  length: 500,
                  time: 20200926,
                  area: "Turkey",
                  things: "nnnn"
              },
          ]
            
        }
  },
  computed: {
      getHost() {
          const res = new Map();
          return this.data.filter((arr) => !res.has(arr.host) && res.set(arr.host, 1))
      },
      getArea() {
          const res = new Map();
          return this.data.filter((arr) => !res.has(arr.area) && res.set(arr.area, 1))
      },
      getThings() {
          const res = new Map();
          return this.data.filter((arr) => !res.has(arr.things) && res.set(arr.things, 1))
      },
      filterData() {
          let res = [];
          let bT = new Date(this.beginTime.replace("-", "/"));
          let eT = new Date(this.endTime.replace("-", "/"));
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

          }
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
select[multiple="multiple"] {
    width: auto;
    margin-right: 20px;
}
input {
    outline: none;
    border-radius: 12px;
}
.inputThings {
    position: relative;
    top: -20px;
    left: -10px;
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
    font-size: 20px;
}
.beginEnd {
    position: relative;
    top: -20px;
    font-size: 20px;
}
.beginEnd input {
    padding: 0 10px;
    text-align: center;
}
</style>
