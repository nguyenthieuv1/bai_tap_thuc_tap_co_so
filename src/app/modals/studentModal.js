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
class student {
    findOne(condition, result) {
        connection.query('select * from hocsinh where username = ? and password = ?', [condition.username, condition.password], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    studentInfor(condition, result) {
        connection.query('SELECT hocsinh.idhs,hocsinh.dob, hocsinh.name, hocsinh.diachi, hocsinh.gioitinh, lop.ten as lop FROM hocsinh INNER JOIN lop ON hocsinh.idlop = lop.idlop where  idhs=?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    studentLop(condition, result) {
        connection.query(`SELECT hocsinh.idhs, hocsinh.name, hocsinh.dob, hocsinh.diachi, hocsinh.gioitinh, lop.ten AS lop , giaovien.ten AS gvcn
        FROM (((hocsinh
        left JOIN lop ON hocsinh.idlop = lop.idlop)
        LEFT JOIN gvcn ON lop.idlop = gvcn.idlop)
        LEFT JOIN giaovien ON giaovien.idGV = gvcn.idGV)
        where hocsinh.idlop = (SELECT hocsinh.idlop FROM hocsinh WHERE idhs = ?) `, [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    selectNienKhoa(result) {
        connection.query('select * from nienkhoa', (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    selectTenDotThibyNK(condition, result) {
        connection.query(`SELECT distinct ten FROM diemks WHERE idnk = ?`
            , [condition], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result(toArrayObject(res))
                }
            })
    }
    selectTableScore(condition, result) {
        connection.query(`SET @RANK = 0;`, (err, res) => {
            if (err) {
                console.log('loi: ' + err);
            } else {
                connection.query(`
                    SELECT hocsinh.idhs, hocsinh.name, diemks.diem1, diemks.diem2, diemks.diem3, (diemks.diem1+diemks.diem2+diemks.diem3) AS tongdiem,
                    (@RANK:=@RANK+1) as xephang, khoithi.mon1, khoithi.mon2,khoithi.mon3, hocsinh.dob
                    FROM ((hocsinh 
                    INNER JOIN diemks ON diemks.idhs = hocsinh.idhs)
                    INNER JOIN khoithi ON diemks.idkhoithi = khoithi.idkhoithi)
                    WHERE diemks.idnk = ? AND diemks.idkhoithi = ? AND diemks.ten = ? 
                    ORDER BY tongdiem DESC        
                `, [condition.idnk, condition.idkhoithi, condition.tendotks], (err, res) => {
                    if (err) {
                        console.log('loi: ' + err);
                    } else {
                        res = toArrayObject(res)


                        result(res);
                    }
                });
            }
        });
    }
    selectThoiKhoaBieuHocSinh(condition, result) {
        connection.query(`SELECT tkb_hs.idtkb, tkb_hs.thu, tkb_hs.tiet1, tkb_hs.tiet2, tkb_hs.tiet3, tkb_hs.tiet4, tkb_hs.tiet5,tkb_hs.ct1,tkb_hs.ct2,lop.ten AS lop
        FROM ((tkb_hs 
        INNER JOIN lop ON lop.idlop = tkb_hs.idlop)
        INNER JOIN hocsinh ON hocsinh.idlop = lop.idlop)
        WHERE hocsinh.idhs = ?`, [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err);
            } else {
                res = toArrayObject(res)
                result(res);
            }
        })
    }
    selectOldPassword(condition, result) {
        console.log('condition',condition)       
        connection.query('select * from hocsinh where idhs = ? and password = ?', [condition.idhs, condition.oldPassword], (err, res1) => {
            if (err) {
                console.log('có lỗi:' + err)
            }
            else {
                var old = toOneObject(res1)
                console.log('old',old)
                console.log(condition.oldPassword)
                if (old.password === condition.oldPassword) {
                    connection.query('update hocsinh set password = ? where idhs = ?', [condition.newPassword, condition.idhs], (err, res) => {
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
        connection.query('select * from hocsinh where idhs = ?', [condition.idhs], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
}
module.exports = new student