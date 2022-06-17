require('dotenv').config()
const axios = require("axios");

const timeInterval = process.env.TIME; // 多少秒运行一次
const channel_id = process.env.CHANNEL_ID //频道id
const authorization = process.env.AUTHORIZATION // 账号的authorization

let monitortTime = new Date().getTime() // 监控时间,用于避免重新识别老消息

let header = {
    "Authorization": authorization,
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
}
// 关键词
const keywords = [
    'GIVEAWAY'
]

const monitor = () => {
    axios({
        method: 'GET',
        url: `https://discord.com/api/v9/channels/${channel_id}/messages?limit=5`,
        headers: header,
    }).then(res => {
        // 对聊天消息进行分析
        // console.log(res.data);
        messageParse(res.data)
        monitortTime = new Date().getTime()
        console.log(`当前时间:${monitortTime}`);
    }).catch(e => {
        console.log(e.message)
    })
}

/**
 * 判断消息是否含关键字
 */
 const isIncludeKeywords = (message) => {
    let flag = false
    keywords.forEach(keyword => {
        if(message.includes(keyword)){// 含关键字的消息
            flag = true
        }
    })
    return flag
}

// 消息信息解析
const messageParse = (data) => {

    data.forEach(item => {
        if(new Date(item.timestamp).getTime() < monitortTime){// 时间筛选,如果消息时间小于，当前时间，避免重新识别老消息
            console.log('老信息');
            return
        }
        let chatMessages;
        chatMessages = item.content;
        if(isIncludeKeywords(chatMessages)){
            console.log(`包含关键字的消息内容:${chatMessages}`);
            clickEmoj(item.id)
        }else{
            console.log('不包含关键字,不参与Giveaways');
        }
    })
}

const clickEmoj = (message_id) => {
    axios({
        method: 'put',
        url: `https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}/reactions/%F0%9F%8E%89/@me?location=Message`,
        headers: header,
    }).then(res => {
        console.log(res.data)
        console.log('参与Giveaways成功！！！');
    }).catch(e => {
        console.log(e)
        console.log('参与Giveaways失败！！！');
    })
}

setInterval(function () {// 监听器,每TIME执行一次
    monitor()
},timeInterval);