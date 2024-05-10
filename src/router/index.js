const adminRouter = require('./adminRoute')
const loginRouter = require('./loginRoute')
const studentRouter = require('./studentRoute')
const teacherRouter = require('./teacherRoute')
const adminModal = require('../app/modals/adminModal')
const studentModal = require('../app/modals/studentModal')
const teacherModal = require('../app/modals/teacherModal')
var jwt = require('jsonwebtoken')

function checkLoginAdmin(req,res,next){
    try {
        var token = req.cookies.token
        var decoded = jwt.verify(token,'123')
        // console.log(decoded)
        adminModal.findId({idAdmin:decoded.id},(result)=>{
            // console.log(result)
            if(result.idAdmin){
                next()
            }
            else{
                res.redirect('/login')
            }
        })                
    }
    catch (err) {
        // console.log('co loi: ', err)
        res.redirect('/login')
    }
   
}

function checkLoginStudent(req,res,next){
    try {
        var token = req.cookies.token
        var decoded = jwt.verify(token,'123')
        // console.log(decoded)
        studentModal.findId({idhs:decoded.id},(result)=>{
           
            if(result.idhs){
                next()
            }
            else{
                res.redirect('/login')
            }
        })                
    }
    catch (err) {
        // console.log('co loi: ', err)
        res.redirect('/login')
    }
   
}


function checkLoginTeacher(req,res,next){
    try {
        var token = req.cookies.token
        var decoded = jwt.verify(token,'123')
        // console.log(decoded)
        teacherModal.findId({idGV:decoded.id},(result)=>{
           console.log(result)
            if(result.idGV){
                next()
            }
            else{
                res.redirect('/login')
            }
        })                
    }
    catch (err) {
        // console.log('co loi: ', err)
        res.redirect('/login')
    }
   
}

function route(app){
    app.use('/admin',checkLoginAdmin,adminRouter)
    app.use('/login',loginRouter)
    app.use('/student',checkLoginStudent,studentRouter)
    app.use('/teacher',checkLoginTeacher,teacherRouter)
}
module.exports = route