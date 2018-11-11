const express = require('express');
const app = express();
const port = 3000;
const redis = require("redis")

// 連接redis
client = redis.createClient();
client.on('connect', () => {
    console.log('Redis client connected');
});
client.on("error", function (err) {
    console.log("Error " + err);
});


// 模擬人數
let allPeople = [];
for (let i = 0; i < 10; i++) {
    allPeople.push({ name: 'number' + i })
}

// 模擬所有ip 從資料庫
const allIp = [
    { address: '127.0.0.1', own: '' },
    { address: '127.0.0.2', own: '' },
    { address: '127.0.0.3', own: '' },
    { address: '127.0.0.4', own: '' },
    { address: '127.0.0.5', own: '' },
    { address: '127.0.0.6', own: '' },
    { address: '127.0.0.7', own: '' },
    { address: '127.0.0.8', own: '' },
    { address: '127.0.0.9', own: '' },
    { address: '127.0.0.10', own: '' },
];

for (const oneIp of allIp) {
    client.hset('allIP', oneIp.address, '', redis.print);
}

async function getNotOwnIp() {
    return new Promise(resolve => {
        client.hgetall('allIP', async (error, result) => {
            if (error) {
                console.log(error);
            }
            for(const oneIp of Object.keys(result)){
                if(result[oneIp] == ''){
                    resolve(oneIp);
                }
            }
            resolve(null);
        });
    });
}


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/getip/:name', async (req, res) => {
    const getIp = await getNotOwnIp();
    console.log('null ip',getIp);
    if(getIp){
        client.hset('allIP', getIp, req.params.name, redis.print);
        res.send('add success');
    }else{
        res.send('add fail');
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));