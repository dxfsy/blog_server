const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname,'../','../','logs','access.log')
const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
    input:readStream
})

let edgeNum = 0
let sum = 0
// 监听每行
rl.on('line',lineData=> {
    if(!lineData) {
        return
    }
    // 记录总行数
    sum++

    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Edg')>0) {
        // 累计edge数量
        edgeNum++
    }
})
// 监听读取完成
rl.on('close',()=> {
    console.log('edge 占比：'+ edgeNum / sum)
})