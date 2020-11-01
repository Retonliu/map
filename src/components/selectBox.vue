<template>
    <div id="selectBox">
        <div class="wrap">
            <input type="text" :placeholder="text" readonly="readonly">
            <span class="iconfont icon-down" @click="isShow = !isShow"></span>
        </div>
        <ul v-show="isShow" @click="setChecked">
            <li v-for="item in list" :key="item.index">{{ item[text] }}</li>
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
            content: this.text
        }
    },
    methods: {
        setChecked() {

        }
    },
    mounted() {
        //console.log(this.list);
    }
}
</script>

<style scoped>
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
    background-color: #F5F5F5;
}
ul li {
    border-bottom: solid 1px #000000;
    font-size: 15px;
    color: #8888;
    list-style: none;
}
</style>