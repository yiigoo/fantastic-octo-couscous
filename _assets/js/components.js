Vue.use(vant);
Vue.component('header-search', {
    props: {
        placeholder: {
            type: String,
            default: '搜索你感兴趣的内容'
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            currentValue: ''
        }
    },
    methods: {
        enter() {
            this.$emit('input',this.currentValue)
            this.$emit('enter',this.currentValue)
        },
        clear() {
            this.currentValue = ''
            this.focus()
        },
        focus() {
            this.$refs['input'].focus()
        }
    },
    template: 
    `<div class="page-search-md">
        <div class="input-wrapper">
            <span class="icon icon-search"></span>
            <input ref="input" :disabled="disabled" @keyup.enter ="enter" type="text" :placeholder="placeholder" v-model="currentValue" />
            <span class="icon icon-clear" v-show="currentValue" @click="clear"></span>
        </div>
    </div>`
});
Vue.component('share-bar', {
    props: {
        count: {
            type: Boolean,
            default: 0
        },
        // 文章id
        id: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            tempCount: this.count,
        }
    },
    methods: {
        addLikes() {
            this.tempCount += 1
            this.$toast('点赞+1')
        },
        share() {
            console.log('调用分享')
        }
    },
    template: 
    `<div class="share-bar">
        <div class="item" @click="addLikes"><span class="icon icon-favourite"></span> 点赞 {{ tempCount }}</div>
        <div class="item" @click="share"><span class="icon icon-share"></span> 分享</div>
    </div>`
})

Vue.component('likes', {
    props: {
        count: {
            type: Boolean,
            default: 0
        },
        // 文章id
        id: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            tempCount: this.count,
        }
    },
    methods: {
        addLike() {
            this.tempCount += 1
            this.$toast('点赞+1')
        },
    },
    template: `<span><span class="icon icon-like" @click="addLike"></span> {{ tempCount }}</span>`
})