Vue.component('calendar', {
    props: {
        datas: {
            type: Array,
            default:  [
                '2020-09-01',
                '2020-10-01',
                '2020-11-01'
            ]
        }
    },
    data() {
        return {
            dates: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        }
    },
    methods: {
        getList() {
            let year = this.year
            let month = this.month
            this.dates = []
            let dates = new Date(year,month+1,0).getDate()
            let week = new Date(`${year}/${month + 1}/1`).getDay()
            for (let index = 0; index < week - 1; index++) {
                this.dates.push({
                    date: null,
                    fullDate: null
                })
            }
            for (let index = 1; index < dates + 1; index++) {
                // 补0
                let _index = index >= 10 ? index : `0${index}`
                let _month = month + 1 >= 10 ? month + 1 : `0${month+1}`
                this.dates.push({
                    date: index ,
                    fullDate: `${year}-${_month}-${_index}`
                })
            }
            //  补全
            if( this.dates.length % 7 !== 0) {
                let appendLenth = 7 - this.dates.length % 7
                appendLenth === 7 && (appendLenth = 0)
                for (let index = 0; index < appendLenth; index++) {
                    this.dates.push({
                        date: null,
                        fullDate: null
                    })
                }
            }
        },
        nextMonth() {
            this.month += 1
            if( this.month === 12 ) {
                this.month = 0
                this.year += 1
            }
            this.getList()
        },
        prevMonth() {
            this.month -= 1
            if( this.month === -1 ) {
                this.month = 11
                this.year -= 1
            }
            this.getList()
        },
        setActive(date) {
            if( date ){
                let status = false
                for (let index = 0; index < this.datas.length; index++) {
                    const item =  this.datas[index]
                    if( new Date(item).getTime() === new Date(date).getTime() ){
                        status = true
                    }
                }
                return status
            }
            return false
        },
        onClick(date) {
            this.$emit('on-click',date)
        },
        isToday( date ){
            if( !date ){
                return false
            }
            // 如果是今天
            let between = new Date().getTime()  - new Date(date).getTime()
            console.log(between)
            if( 0 < between && between  < 24 * 60 * 60 * 1000 ){
                return true
            }
            return false
        }
    },
    mounted() {
        this.getList()
    },
    template: `<div class="calendar-md">
        <div class="header-bar">
            <div class="prev" @click="prevMonth"><span class="icon icon-prev"></span></div>
            <div class="text">{{ year }} 年 {{ month + 1 >= 10 ? month + 1 : '0' + (month + 1) }}  月</div>
            <div class="next" @click="nextMonth"><span class="icon icon-next"></span></div>
        </div>
        <div class="dayPicker">
            <div class="header">
                <div class="cell">
                    一
                </div>
                <div class="cell">
                    二
                </div>
                <div class="cell">
                    三
                </div>
                <div class="cell">
                    四
                </div>
                <div class="cell">
                    五
                </div>
                <div class="cell">
                    六
                </div>
                <div class="cell">
                    日
                </div>
            </div>
            <div class="body clearfix">
                <div 
                    :class="{ isToday: isToday(item.fullDate) }"
                    class="cell" 
                    v-for="item in dates" 
                    :key="item.day">
                    <a class="item" 
                        v-if="setActive(item.fullDate)" 
                        @click="onClick(item.fullDate)">
                        {{ item.date }}
                        <span class="active"></span>
                    </a>
                    <span v-else>
                        {{ item.date }}
                    </span>
                </div>
            </div>
        </div>
        
    </div>`
});