<template>
    <div>
        <h1>当前求和为：{{$store.state.sum}}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</Option>
            <option value="3">3</Option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">当前求和为奇数再加</button>
        <button @click="decrementWait">等一等再加</button>
    </div>
</template>

<script>
export default {
    name:"CountVuex",
    data() {
        return {
            n:1,  //当前选择的数字
        }
    },
    methods: {
        increment(){
            this.$store.commit('JIA',this.n);
        },
        decrement(){
            this.$store.commit('JIAN',this.n);
        },
        incrementOdd(){
            this.$store.dispatch('jiaOdd',this.n);

        },
        decrementWait(){
            this.$store.dispatch('jiaWait',this.n);
        }
    },
    mounted() {
        console.log(this);
    },
}
</script>

<style lang="css">
    button{
        margin: 5px;
    }
</style>