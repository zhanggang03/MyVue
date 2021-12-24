<template>
    <div class="container">
        <Category title="游戏">
            <template scope="jojo">
                <ul>
					<li v-for="(g,index) in jojo.games" :key="index">{{g}}</li>
				</ul>
            </template>
        </Category>

        <Category title="游戏">
            <template scope="jojo">
                <ol>
                    <li v-for="(g,index) in jojo.games" :key="index">{{g}}</li>
                </ol>
            </template>
        </Category>

        <Category title="游戏">
            <template scope="jojo">
                <h4 v-for="(g,index) in jojo.games" :key="index">{{g}}</h4>
            </template>
        </Category>
        
        <Category title="游戏">
        </Category>
    </div>
</template>

<script>
import Category from './Category.vue'
export default {
    name:'ScopeIndex',
    components:{Category},
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style scoped>
    .container,.foot{
		display: flex;
		justify-content: space-around;
	}
	h4{
		text-align: center;
	}
</style>