var request = require('request');


// request.get(
//     'http://localhost:3000/getip/qq',
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//         }
//     }
// );

for (var i = 0; i < 30; i++) {
    setTimeout(async function(){
        console.log(i)
        await request.get(
            'http://localhost:3000/getip/name' + i,
            async function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    }, 30*i)
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


