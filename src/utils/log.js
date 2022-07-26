const fs = require('fs')
const path = require('path')

const writeLog = (writeStream,log)=> {
    writeStream.write(log + '\n') //关键代码
}

// 生成write Stream
const createWriteStream = (fileName)=> {
    const fullFileName = path.join(__dirname,'../','../','logs',fileName)
    const writeStream = fs.createWriteStream(fullFileName,{
        flags:'a'
    })
    return writeStream
}

const acessWriteStream = createWriteStream('access.log')
const access = (log)=> {
    writeLog(acessWriteStream,log)
}

module.exports = {
    access
}