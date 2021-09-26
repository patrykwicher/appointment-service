const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport-config.js');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const clientsRouter = require('./routes/clients.js');
const employeesRouter = require('./routes/employees.js');
const servicesRouter = require('./routes/services.js');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to database'));

const server = express();

server.use(express.json());
server.use(cors());
server.use(cookieParser('cats'));
server.use(session({ 
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
}));
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());

server.use('/clients', clientsRouter);
server.use('/employees', employeesRouter);
server.use('/services', servicesRouter);

server.get('/', (req, res) => {
  res.send('Hello');
})

server.listen(3000, () => console.log('Server started!'));