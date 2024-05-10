const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const router = require('./router/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        sum(a, b) { return a + b }, // định nghĩa function cho handlebars        
    }
}));


const Handlebars = require('handlebars');

Handlebars.registerHelper('sum', function(a, b) {
    return a + b;
});

router(app)


app.listen(3000, () => {
    console.log('app is running on port 3000')
})