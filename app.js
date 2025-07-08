//External packages
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

//Internal imports
const {notFoundErrorHandler, defaultErrorHandler} = require('./middlewares/common/errorHandler');
const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/userRouter');
const inboxRouter = require('./routers/inboxRouter');
// const { getLogin } = require('./controllers/loginController');
// const { getUsers } = require('./controllers/userController');
// const { getInbox } = require('./controllers/inboxController');

dotenv.config();

//Scaffolding
const app = express();
const PORT = process.env.PORT || 3000;

//Connect to Database
mongoose.connect(process.env.MONGO_CONNECTION_STR);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('✅ Connected to MongoDB');
});

//Handle requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set view engine
app.set('view engine', 'ejs');

//Set static folders
app.use(express.static(path.join(__dirname, "public")));

//Coockie parser
app.use(cookieParser(process.env.COOCKIE_SECRET));

//Routing
app.use('/', loginRouter);
app.use('/users', userRouter);
app.use('/inbox', inboxRouter);

//Error handlers
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);

//Start the Server
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});