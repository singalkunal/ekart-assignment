const express = require('express');

const dbConnect = require('./db/db');

// middlewares
const errorHandler = require('./middlewares/error-handler');

// routers
const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 3080;

app.use(indexRouter);
app.use(authRouter);

// error handler middleware
app.use(errorHandler);

const startUp = async () => {
    await dbConnect();
    console.log('Connected to database...');

    await app.listen(PORT, () => console.log(`Listening on ::${PORT}`));
};

startUp();