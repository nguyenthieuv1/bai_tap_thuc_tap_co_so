const adminModal = require('../modals/adminModal')
const studentModal = require('../modals/studentModal')
const teacherModal = require('../modals/teacherModal')
var jwt = require('jsonwebtoken')
class loginController {
    showLoginForm(req, res) {
        res.render('login', { layout: null })
    }
    checkLogin(req, res) {
        const { username, password } = req.body
        
        adminModal.findOne({ username, password }, (result) => {            
            if (Object.keys(result).length !== 0) {               
                var token = jwt.sign({ id: result.idAdmin }, '123');                              
                res.json({token:token,role:'admin'})                
            }
            else{               
                studentModal.findOne({username, password},(result)=>{                    
                    if (Object.keys(result).length !== 0) {                       
                        var token = jwt.sign({ id: result.idhs }, '123');                                      
                        res.json({token:token,role:'student'})                        
                    }
                    else{
                        teacherModal.findOne({username, password},(result)=>{                    
                            if (Object.keys(result).length !== 0) {  
                                // console.log(result)                                                   
                                var token = jwt.sign({ id: result.idGV }, '123');                                      
                                res.json({token:token,role:'teacher'})                        
                            }                                                        
                        })
                    }
                    
                })
            }
        })
    }

    logout(req,res){
        res.clearCookie("token");
        // console.log(123)
        res.redirect('/login')
    }
    
}
module.exports = new loginController