<template>
    <div id="selectBox">
        <div class="wrap">
            <input type="text" :placeholder="text" readonly="readonly" class="bg">
            <span class="iconfont icon-Down" @click="isShow = !isShow"></span>
        </div>
        <ul v-show="isShow">
            <li v-for="(item, index) in list" :key="item[text]" @click="handleChecked(index)">
                {{ item[text] }}
                <span class="iconfont icon-finish" v-show="checkedList[index]"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'selectBox',
    props: ['text', 'list'],
    data() {
        return {
            isShow: false,
            content: this.text,
            //dataMap: new Map()
            checkedList: []
        }
    },
    computed: {
        collectChecked() {
            //每次都要进行计算，影响性能
            let res = [];
            let that = this;
            res = this.list.filter((item, index) => that.checkedList[index]);
            return res;
        }
    },
    methods: {
        setChecked(index) {
            /*let value = this.dataMap.get(obj);
            this.dataMap.set(obj, !value);*/
            this.$set(this.checkedList, index, !this.checkedList[index]) //this.checkedList[index] = true
            
        },
        handleChecked(index) {
            //console.log(this.dataMap.get(obj) === true);
            let that = this;
            this.setChecked(index);
            this.$emit('handleList', that.collectChecked);
            //console.log(that.collectChecked);
        }
    }
}
</script>

<style scoped>
.bg {
    background-color: #FFFFEC;
}
.icon-finish {
    position: absolute;
    right: 20px;
}
#selectBox {
    display: inline-block;
    margin: 0 10px;
}
.wrap {
    display: inline-block;
    margin-bottom: 5px;
    border: solid 1px #8888;
    border-radius: 12px;
    padding: 1px;
    background-color: #FFFFEC;
}
.wrap {
    cursor: pointer;
}
input {
    padding: 0;
    border: none;
    font-size: 20px;
    text-align: center;
}
ul {
    position: absolute;
    padding: 0;
    margin-top: 0;
    height: 320px;
    width: 260px;
    background-color: #FFFFEC;
    overflow: scroll;
    z-index: 2;
}
ul li {
    margin-bottom: 4px;
    text-align: center;
    font-size: 20px;
    list-style: none;
    cursor: pointer;
}
li:hover {
    color: #fff;
    background-color: #1E90FF;
}
</style>