const express = require('express');
const dbConnect = require('./Config/DbConnect');
const app = express();
const body = require('body-parser');
const cors = require('cors')

app.use(cors())

app.use(body.json());











// routing 

app.use('/api/users', require('./Routes/User.routes'));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
    dbConnect();
});