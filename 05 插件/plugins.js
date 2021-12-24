export default {
    install(Vue,x,y,z){
        console.log(x,y,z);
        //定义全局过滤器
        Vue.filter('mySlice',function(value){
            return value.slice(0,4);
        })

        //定义全局指令（以后补充）
        Vue.directive()

        //定义全局混入
        Vue.mixin({
            data() {
                return {
                    x:100,
                    y:200
                }
            },
        })

        //给Vue原型上链添加一个方法（VM和VC都可以使用了）
        Vue.prototype.hello = () => {
            alert('hello');
        }

    }
}