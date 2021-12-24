<template>
  <div>
    <!-- 通过父组件给子组件传递函数类型的props实现： 子给父传递数据 -->
    <!-- <MyHearder :addTodo='addTodo'/> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现： 子给父传递数据（第一种写法，使用@或者v-on）-->
    <MyHearder @addTodo='addTodo'/>

    <!-- 通过父组件给子组件绑定一个自定义事件实现： 子给父传递数据（第二种写法，使用ref） -->
    <!--<MyHearder ref="myheader" /> -->

    <MyList :todos='todos'/>
    <MyFooter :todos='todos' @checkAllTodo='checkAllTodo' @clearAllTodo='clearAllTodo'/>
  </div>
</template>

<script>
  //引入组件
  import MyHearder from './components/MyHearder.vue';
  import MyList from './components/MyList.vue';
  import MyFooter from './components/MyFooter.vue';

  export default {
    name: 'App',
    data() {
      return {
        todos:[
          {id:'001', title:'抽烟' , done: false},
          {id:'002', title:'喝酒' , done: true},
          {id:'003', title:'学习' , done: false},
        ]
      }
    },
    methods:{
      //增加一个todo
      addTodo(obj){
        this.todos.unshift(obj);
      },
      //勾选或者取消勾选
      checkTodo(id){
        this.todos.forEach((todo)=>{
            if(todo.id === id) todo.done = !todo.done;
        })
      },
      //删除一个todo
      deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id !== id)
      },
      //全选or去选全选
      checkAllTodo(done){
        this.todos.forEach( todo => todo.done = done);
      },
      //清除所有已经完成的todo
      clearAllTodo(){
        this.todos = this.todos.filter(todo => {
          return !todo.done;
        })
      }
    },
    //局部组测组件
    components:{ MyHearder, MyList , MyFooter},
    mounted(){
      //使用ref+自定义事件 子传父
      //this.$refs.myheader.$on('addTodo',this.addTodo);

      this.$bus.$on("checkTodo",this.checkTodo);
      this.$bus.$on("deleteTodo",this.deleteTodo);

    },
    beforeDestroy(){
      //全局事件总线解绑
      this.$bus.$off('checkTodo');
      this.$bus.$off('deleteTodo');
    }
  }
</script>

<style>
    body {
      background: #fff;
    }

    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-danger:hover {
        color: #fff;
        background-color: #bd362f;
    }

    .btn:focus {
        outline: none;
    }

    .todo-container {
        width: 600px;
        margin: 0 auto;
    }
    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>