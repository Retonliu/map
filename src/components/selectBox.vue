<template>
    <div id="selectBox" @mouseleave="hidePane">
        <div class="wrap">
            <input type="text" :placeholder="text" readonly="readonly" class="bg">
            <span class="iconfont icon-Down" @mouseover="showPane"></span>
        </div>
        <ul v-show="isShow" v-on:click="handleChecked($event), sendChecked($event)">
            <li v-for="(item, index) in list" :key="item" :data-index="index">
                {{ item }}
                <span class="iconfont icon-finish" v-show="checkedList[index]"></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { debounce } from '../constant/utils.js'
export default {
    name: 'selectBox',
    props: ['text', 'list'],
    data() {
        return {
            isShow: false,
            checkedList: new Array(this.list.length).fill(false),
        }
    },
    methods: {
        showPane() {
            this.isShow = true;
        },
        hidePane() {
            this.isShow = false;
        },
        sendChecked: debounce(function() {
            this.$emit('handleList', this.text, this.checkedList); //this.checkedList[index] = true
        }, 1000),
        handleChecked(event) {
            const index = event.target.getAttribute('data-index');
            this.$set(this.checkedList, index, !this.checkedList[index]); //this.checkedList[index] = true
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
    margin: 0;
    width: 140px;
}
.wrap {
    display: inline-block;
    border: solid 1px #8888;
    border-radius: 12px;
    background-color: #FFFFEC;
    cursor: pointer;
}
input {
    padding: 0;
    border: none;
    width: 80px;
    font-size: 20px;
    text-align: center;
}
ul {
    position: absolute;
    padding: 0;
    margin-top: 0;
    height: 220px;
    width: 200px;
    background-color: #FFFFEC;
    overflow: scroll;
    overflow-x: hidden;
    z-index: 2;
}
ul li {
    margin-bottom: 4px;
    text-align: left;
    font-size: 4px;
    list-style: none;
    cursor: pointer;
}
li:hover {
    color: #fff;
    background-color: #1E90FF;
}
</style>