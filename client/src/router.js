import Vue from "vue";
import Router from 'vue-router'
import Words from "@/views/Words.vue";
import New from "@/views/New.vue";
import Show from "@/views/Show.vue";
import Test from "@/views/Test.vue";
import Welcome from "@/views/Welcome.vue";

Vue.use(Router)

export default new Router({
    mode : 'history',
    base : '',
    linkActiveClass : 'active',
    routes: [
        {
            path : '/',
            redirect : '/words'
        },
        {
            path : '/words',
            name : 'words',
            component : Words
        },
        {
            path : '/words/new',
            name : 'new-word',
            component : New
        },
        {
            path : '/words/:id',
            name : 'show',
            component : Show
        },
        {
            path : '/welcome',
            name : 'welcome',
            component : Welcome
        },
        {
            path : '/test',
            name : 'test',
            component : Test
        }
    ]
})