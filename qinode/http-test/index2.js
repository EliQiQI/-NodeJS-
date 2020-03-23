const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('req content-type: ', req.headers['content-type']);
        //接收数据
        let postData = ''
        req.on('data', chunk => {
            postData+=chunk.toString()
        })
        req.on('end', () => {
            console.log('postData:', postData);
            res.end(postData)
            
        })
        
    }
})
server.listen(8000);
console.log('listen:8000')