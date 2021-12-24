export const hunhe1 ={
    data() {
        return {
            x:100,
            y:200
        }
    },
    methods: {
        showName(){
           alert(this.name);
       } 
    },
}

export const hunhe2 ={
    mounted() {
        console.log('组件加载')
    },
}