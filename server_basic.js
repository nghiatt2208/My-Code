// const http = require('http');
import http from 'http';
http.createServer((req,res)=>{
    // console.log(req);
    if (req.url=='/') {
        res.end('Day la trang chu');
    }else if (req.url=='/products') {
        res.end('Day la trang san pham');
    }else{
        res.end('404! Page not found');
    }
    // res.end('Hello,world!');
}).listen(8080,()=>{
    console.log('listening on port 8080');
});