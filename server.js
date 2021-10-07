const express = require('express');
const bodyparser=require("body-parser")
// const {check,validationResult}=require('express-validator')
const path=require('path')

const app = express();


const port=3000

app.use(express.static('public'))


app.set('view engine', 'ejs')


// const urlencodedParser= bodyparser.urlencoded({extended:false})

    app.use(express.static(path.resolve('./public/image')));
    app.use('/public', express.static(path.resolve('./public/image'))); 

app.get('/', (req,res)=>{
    res.render('index')
})


app.get('/register', (req,res)=>{
    res.render('register')
})

app.get('/img', (req,res)=>{
    res.render('img')
})


// app.post('/register',urlencodedParser,(req,res)=>{
// res.redirect('/signup')
// })

 app.listen(port,()=>console.info(`App listening on port: $ {port}`))
