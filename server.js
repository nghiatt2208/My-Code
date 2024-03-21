import express from 'express';
import router from './routers/product.js';
import connectdb from './connect/connect.js';
import videoRouter from './routers/video.js';
import authrouter from './routers/auth.js';
import bookRouter from './routers/book.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use('/api',router);
app.use('/api',videoRouter);
app.use('/auth',authrouter);
app.use('/books',bookRouter);
app.listen(port, async()=>{
    await connectdb();
    console.log(`Endpoint: http://localhost:${port}`);
})