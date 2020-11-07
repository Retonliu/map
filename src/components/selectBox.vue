<template>
    <div id="selectBox">
        <div class="wrap">
            <input type="text" :placeholder="text" readonly="readonly">
            <span class="iconfont icon-Down" @click="isShow = !isShow"></span>
        </div>
        <ul v-show="isShow">
            <li v-for="(item, index) in list" :key="item[text]" @click="handleChecked(index)">
                {{ item[text] }}
                <span class="iconfont icon-finish" v-show="checkedList[index]===true"></span>
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
            checkedList: [],
        }
    },
    computed: {
        collectChecked() {
            let that = this;
            //console.log(this.list);
            return this.list.filter((item, index) => that.checkedList[index]);
        }
    },
    methods: {
        setChecked(index) {
            this.$set(this.checkedList, index, !this.checkedList[index]) //this.checkedList[index] = true
        },
        handleChecked(index) {
            let that = this;
            this.setChecked(index);
            this.$emit('handleList', that.collectChecked);
            //console.log(that.collectChecked);
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
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
    height: 120px;
    width: 260px;
    background-color: #FFFAFA;
}
ul li {
    margin-bottom: 4px;
    text-align: center;
    font-size: 20px;
    list-style: none;
    cursor: pointer;
}
</style>