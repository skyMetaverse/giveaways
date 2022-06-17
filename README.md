# giveaways
自动参与Discord社区中的抽奖游戏

# 运行说明(Linux)
1、安装nodejs
```
    curl -fsSL https://fnm.vercel.app/install | bash
    fnm install 16
```
2、克隆仓库
```
git clone https://github.com/skyMetaverse/giveaways.git
```
3、将.env.example重名为.env，并修改里面的配置信息
```
#运行间隔
TIME = 要设置的时间间隔（1000=1s）
#频道id
CHANNEL_ID = 抽奖频道的链接
#账号的authorization
AUTHORIZATION = 自己账号的Token（注意不要泄露、注意不要泄露、注意不要泄露）
```
4、安装依赖
```
npm install
```
5、运行脚本
```
node run.js
nohup node run.js & //后台运行
```