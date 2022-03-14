const { engine, create } = require('express-handlebars')
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// HTTP middleware
app.use(morgan('combined'))

// .hbs
const hbs = create({
  extname: 'hbs'
})

// template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views',__dirname + '\\resources\\views');


app.get('/', (req, res) => {
  return res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})