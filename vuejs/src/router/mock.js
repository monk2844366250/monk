import Mock from 'mockjs' // 引入mock

var dataList = []
for (var i = 0; i < 15; i++) {
    dataList.push(Mock.mock({
        "name":"@cname",
        'kill|1-50': 1,
        'death|1-50': 1,
        'assists|1-50': 1,
        'battle|1-50': 1,
        'suffer|1000-500000': 1,
        'output|1000-500000': 1,
        'economic|1000-500000': 1,

    }))
}



export default dataList
