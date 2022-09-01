const express = require('express');
const app = express();
const routerCategory = require('./routes/categoryRoute');
const routerTransaction = require('./routes/transactionRoute');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*
1. สร้าง file.js ใช้ read write ไฟล์ ใน dbs
2. สร้าง router 
2.1 path ของ category
2.2 path ของ transaction 
3. middleware 
4. controller 
*/
app.use('/category', routerCategory);
app.use('/transaction', routerTransaction);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(8001, console.log('server is running on port : 8001'));
