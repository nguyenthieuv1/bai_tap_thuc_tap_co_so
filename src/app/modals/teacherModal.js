const connection = require('./config')
function toArrayObject(data) {
    return data.map(dt => {
        return { ...dt }
    })
}
function toOneObject(data) {
    let [res] = data
    return { ...res }
}
class teacher{
    findOne(condition, result) {
        connection.query('select * from giaovien where username = ? and password = ?', [condition.username, condition.password], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {                
                result(toOneObject(res))
            }
        })
    }
    teacherInfor(condition, result) {
        connection.query(`SELECT *
        FROM giaovien
        WHERE giaovien.idGV = ? `, [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    selectTKBGV(condition, result) {
        connection.query('select * from tkb_gv where idGV = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    selectOldPassword(condition, result) {
        console.log('condition',condition)       
        connection.query('select * from giaovien where idGV = ? and password = ?', [condition.idGV, condition.oldPassword], (err, res1) => {
            if (err) {
                console.log('có lỗi:' + err)
            }
            else {
                var old = toOneObject(res1)
                console.log('old',old)
                console.log(condition.oldPassword)
                if (old.password === condition.oldPassword) {
                    connection.query('update giaovien set password = ? where idGV = ?', [condition.newPassword, condition.idGV], (err, res) => {
                        if (err) {
                            console.log('lỗi: ' + err)
                        }
                        else {
                            result('đã cập nhật mật khẩu mới')
                        }
                    })

                }
                else{
                    result('mật khẩu cũ không đúng')
                }

            }
        })
    }

    findId(condition, result) {
        connection.query('select * from giaovien where idGV = ?', [condition.idGV], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
}

module.exports = new teacher