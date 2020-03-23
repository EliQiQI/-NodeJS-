const qs = require('querystring');
const { access } = require('./src/utils/log');
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//过期时间
const getCookieExpire=()=>{
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString())
    return d.toGMTString()
}
//session数据
const SESSION_DATA = {}
//用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }

            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    //记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${new Date()}`);

    //设置返回JSON格式
    res.setHeader('Content-type', 'application/json');

    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = qs.parse(url.split('?')[1])
    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;

    });

    //解析session
    let needSetCookie = false;

    let userid = req.cookie.userid;
    if (userid) {
        if (!SESSION_DATA[userid]) {
            SESSION_DATA[userid] = {}            
        }          
    } else {
        needSetCookie = true;
        userid = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userid] = {}
    }
    req.session=SESSION_DATA[userid]

    //处理post data
    getPostData(req).then(postData => {
        req.body = postData
        //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userid};path=/;httpOnly;expires=${getCookieExpire()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userid};path=/;httpOnly;expires=${getCookieExpire()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })

            return
        }

        //未命中路由
        res.writeHead(404, {
            "Content-type": "text/plain"
        })
        res.write("404 Not Found")
        res.end()
    })



}
module.exports = serverHandle
//process.env.NODE_ENV