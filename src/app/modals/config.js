const mysql = require('mysql')
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "baitap_ttcs"
})

    connection.connect((err)=>{
        if(err){
            console.log('ket noi database khong thanh cong, loi: '+err)
        }
        console.log('ket noi thanh cong database')
    })

module.exports = connection