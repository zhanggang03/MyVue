<template>
  <div class="todo-footer" v-show="todos.length">
      <label>
          <!--check change分开写-->
          <!-- <input type="checkbox" :checked="isAll" @change="checkAll"> -->
          <input type="checkbox" v-model="isAll">
      </label>
      <span>
          <span>已完成{{doneTotal}}</span>/ 全部{{todos.length}}
      </span>
      <button class="btn btn-danger" @click="clearDone">清除已完成任务</button>
  </div>
</template>

<script>
export default {
    name:'',
    props:['todos'],
    methods:{
        checkAll(e){
            this.$emit('checkAllTodo',e.target.value);
        },
        clearDone(){
            this.$emit('clearAllTodo');
        }
    },
    computed:{
        doneTotal(){
            return this.todos.reduce((pre,current) => pre + (current.done ? 1 : 0 ) ,0);
        },
        /*
        isAll(){
            return this.todos.length === this.doneTotal && this.todos.length > 0;
        }
        */
       isAll:{
           get(){
               return this.todos.length === this.doneTotal && this.todos.length > 0;;
           },
           set(value){
                this.$emit('checkAllTodo',value);
           }
       }
    }
}
</script>

<style scoped>
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
        }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>