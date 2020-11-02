<template>
    <div id="selectBox">
        <div class="wrap">
            <input type="text" :placeholder="text" readonly="readonly">
            <span class="iconfont icon-Down" @click="isShow = !isShow"></span>
        </div>
        <ul v-show="isShow">
            <li v-for="(item, index) in list" :key="item[text]" @click="setChecked(index)">
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
    methods: {
        setChecked(index) {
            this.$set(this.checkedList, index, !this.checkedList[index]) //this.checkedList[index] = true
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
    margin: 0 4px;
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