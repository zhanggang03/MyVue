<template>
    <div>
        <h1>当前求和为：{{$store.state.sum}}</h1>
        <h1>当前求和10倍为：{{$store.getters.bigSum}}</h1>
        <h1>当前求和为：{{sum}}</h1>
        <h1>当前求和10倍为：{{bigSum}}</h1>
        <h1>我正在{{school}},{{subject}}</h1>
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
import {mapState,mapGetters} from 'vuex'
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
    computed: {
        //借助mapState生成计算属性，从state中获取数据（对象写法）
        //...mapState({sum:'sum',school:'school',subject:'subject'}),
        //借助mapGetters生成计算属性，从getters中获取数据（对象写法）
        //...mapGetters({bigSum:'bigSum'}),

        //借助mapState生成计算属性，从state中获取数据（数组写法）
        ...mapState(['sum','school','subject']),
        //借助mapGetters生成计算属性，从getters中获取数据（数组写法）
        ...mapGetters(['bigSum']),
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