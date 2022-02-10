<template>
    <div>
        <h1>当前求和为：{{sum}}</h1>
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
    name:"Count",
    data() {
        return {
            n:1,  //当前选择的数字
            sum:0 //当前的和
        }
    },
    methods: {
        increment(){
            this.sum += this.n;
        },
        decrement(){
            this.sum -= this.n;
        },
        incrementOdd(){
            if(this.n % 2 === 1){
                this.sum += this.n;
            }
        },
        decrementWait(){
            setTimeout(() =>{
                this.sum += this.n;
            }, 1000);
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