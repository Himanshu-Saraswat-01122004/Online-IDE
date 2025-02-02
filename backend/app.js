const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const { connectToDB } = require('./util/database');
require('dotenv').config();
const cors = require('cors')

const { isAuth, isAdmin, isDev, isUser } = require('./middlewares/auth')

const { authRouter } = require("./routes/auth");
const { containerRouter } = require('./routes/container');
const { adminRouter } = require('./routes/admin')
const { devRouter } = require('./routes/dev')
const { userRouter } = require('./routes/user')

const { findUserByEmail } = require("./models/user");
const { allTemplate } = require("./models/template")

const app = express();
const bodyParser = require('body-parser');
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors());

app.use('/auth', authRouter)

app.use(isAuth);

app.get("/getuser", async (req, res) => {
    try {
        const emailOfUser = req.userData.email;
        const data = await findUserByEmail(emailOfUser);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send();
    }
});

app.get('/getAllTemplates', async (req, res) => {
    const data = await allTemplate();
    console.log(data);
    if (!data) {
        res.status(500);
        res.send();
    }
    res.json(data);
})

app.use('/container', containerRouter)

app.use('/admin', isAdmin, adminRouter)

app.use('/dev', isDev, devRouter)

app.use('/user', userRouter);


app.use((req, res) => {
    res.status(404);
    res.send();
})



const main = async () => {
    try {
        await connectToDB();
        console.log("Connection Established")
        server.listen(3000);
    }
    catch (error) {
        throw error;
    }
}
main();