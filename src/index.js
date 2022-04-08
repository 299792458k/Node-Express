const { engine, create } = require('express-handlebars');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const app = express();
const port = 3000;
const route = require('./routes/index');
const db = require('./config/db/index');

// method override express
app.use(methodOverride('_method'));

// helper handlebars
Handlebars.registerHelper('sum', (a, b) => {
    return a + b;
});

Handlebars.registerHelper('sort', (field, sort) => {
    const sortType = field === sort.col ? sort.type : 'default';
    const icons = {
        default: 'fa-solid fa-sort ms-2',
        asc: 'fa-solid fa-sort-up ms-2',
        desc: 'fa-solid fa-sort-down ms-2',
    };
    const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
    };
    const icon = icons[sortType];
    const type = types[sortType];
    return `
    <a href="?_sort&col=${field}&type=${type}">
        <i class="${icon}"></i>
    </a>
    `;
});

// middleware ~ body parser to access Form Data from post method
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//connect to DB
db.connect();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP middleware
// app.use(morgan('combined'));

// .hbs
const hbs = create({
    extname: 'hbs',
});

// template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`299792458 app listening on port ${port}`);
});
