const e = require('express')
const moment = require('moment')
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
class admin {
    findOne(condition, result) {
        connection.query('select idAdmin, username, password from admin where username = ? and password = ?', [condition.username, condition.password], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }

    adminInfor(condition, result) {
        connection.query(`SELECT giaovien.idGV,ten,dob,sdt,email,diachi,bomon, admin.img
        FROM admin , giaovien
        WHERE ADMIN.idGV = giaovien.idGV and idAdmin = ? `, [condition.idAdmin], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    findId(condition, result) {
        connection.query('select * from admin where idAdmin = ?', [condition.idAdmin], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    managerStudent(condition, result) {
        connection.query(`SELECT idhs, name, dob, gioitinh, diachi, lop.ten, hocsinh.username, hocsinh.password, nienkhoa.ten AS nienkhoa
        FROM hocsinh, lop, nienkhoa
        WHERE hocsinh.idlop = lop.idlop AND lop.idnk = nienkhoa.idnk AND lop.idlop = ? and nienkhoa.idnk =? `,
            [condition.lop, condition.nienkhoa], (err, res) => {
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

    selectLopHoc(result) {
        connection.query('select ten from lop ', (err, res) => {
            result(toArrayObject(res))
        })
    }
    selectLopHocByNienKhoa(condition, result) {
        connection.query('select * from lop where idnk = ?', [condition.idnk], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    storeNewStudent(values, result) {
        // console.log(values)
        connection.query('insert into hocsinh (idhs,name,dob,gioitinh,diachi,idlop,username,password) values (?,?,?,?,?,?,?,?)',
            [values.idhs, values.ten, values.dob, values.gioitinh, values.diachi, values.idlop, values.username, values.password], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result()

                }
            })
    }
    findClass(condition, result) {
        connection.query('select idlop from lop where ten = ?', [condition.lop], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    selectStudent(condition, result) {
        connection.query(`SELECT hocsinh.name, hocsinh.dob, gioitinh, diachi, lop.ten AS tenlop, username, password
        FROM lop, hocsinh
        WHERE hocsinh.idlop = lop.idlop AND hocsinh.idhs = '${condition.idhs}'
        `, (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    updateStudent(condition, result) {
        connection.query('update hocsinh set name = ?,dob = ?,gioitinh = ?,diachi = ?,idlop = ?,username = ?,password = ? where idhs = ?',
            [condition.ten, condition.dob, condition.gioitinh, condition.diachi, condition.lop, condition.username, condition.password, condition.idhs], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result()
                }
            })
    }
    deleteStudent(condition, result) {
        connection.query('delete from hocsinh where idhs = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result()
            }
        })
    }
    selectInforClass(condition, result) {
        connection.query(`SELECT lop.idlop, lop.ten AS lop, nienkhoa.ten AS nienkhoa, giaovien.ten as gvcn
        FROM ((lop
        left JOIN gvcn ON lop.idlop = gvcn.idlop)
        left JOIN nienkhoa ON lop.idnk = nienkhoa.idnk)
        left JOIN giaovien ON gvcn.idGV = giaovien.idGV
        WHERE nienkhoa.ten = ?
        `, [condition.nienkhoa], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {

                result(toArrayObject(res))
            }
        })
    }
    selectTeacher(result) {
        connection.query('select * from giaovien', (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    selectOneTeacher(condition, result) {
        connection.query('select * from giaovien where idGV = ?', [condition.idGV], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    storeNewClassroom(values, result) {
        connection.query(`INSERT INTO lop (idlop,ten,idnk) VALUES (?,?,?)`, [values.idlop, values.tenlop, values.idnk], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                connection.query(`INSERT INTO gvcn (idGVCN, idGV,idlop) VALUES (?,?,?)`, [values.idGVCN, values.idGV, values.idlop], (err, res) => {
                    if (err) {
                        console.log('loi: ' + err)
                    }
                    else {
                        result()
                    }
                })
            }
        })
    }
    selectForUpadateClass(condition, result) {
        connection.query(`SELECT lop.ten AS tenlop, giaovien.ten AS gvcn, nienkhoa.ten AS nienkhoa,nienkhoa.idnk ,giaovien.idGV AS idGV,lop.idlop AS idlop
        FROM ((lop 
        INNER JOIN gvcn ON lop.idlop = gvcn.idlop)
        INNER JOIN giaovien ON giaovien.idGV = gvcn.idGV)
        INNER JOIN nienkhoa ON lop.idnk = nienkhoa.idnk
        WHERE lop.idlop = ?
        `, [condition.idlop], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    selectNienkhoa(result) {
        connection.query('select * from nienkhoa', (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    updateClassroom(condition, result) {
        connection.query('update lop set ten = ?,idnk = ? where idlop = ?',
            [condition.tenlop, condition.idnk, condition.idlop], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    connection.query('update gvcn set idGV = ? where idlop = ?', [condition.idGV, condition.idlop], (err, res) => {
                        if (err) {
                            console.log('loi: ' + err)
                        }
                        else {
                            result()
                        }
                    })
                }
            })
    }
    storeNewNienKhoa(values, result) { //them nien khoa
        connection.query('insert into nienkhoa (idnk,ten) values (?,?)', [values.idnk, values.ten], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result()
            }
        })
    }
    storeNewTeacher(values, result) {
        connection.query('insert into giaovien (idGV,ten,dob,sdt,email,diachi,bomon,namCT,trangthai,username,password) values (?,?,?,?,?,?,?,?,?,?,?)',
            [values.idGV, values.ten, values.dob, values.sdt, values.email, values.diachi, values.bomon, values.namCT, values.trangthai, values.username, values.password], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result()
                }
            })
    }
    updateTeacher(condition, result) {
        connection.query('update giaovien set ten = ?,dob = ?,sdt = ?,email = ?,diachi = ?,bomon = ?,namCT = ?,trangthai = ?,username = ?,password = ? where idGV = ?',
            [condition.ten, condition.dob, condition.sdt, condition.email, condition.diachi, condition.bomon, condition.namCT, condition.trangthai, condition.username, condition.password, condition.idGV], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result()
                }
            })
    }
    deleteTeacher(condition, result) {

        connection.query('delete from giaovien where idGV = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
                result('đã xóa thất bại vì giáo viên đang là giáo viên chủ nhiệm của lớp học')
            }
            else {
                result('đã xóa thành công')
            }
        })

    }
    deleteClassroom(condition, result) {
        connection.query('delete from lop where idlop = ?', [condition], (err, res) => {
            if (err) {
                result('đã xóa thất bại vì lớp học đang có học sinh và giáo viên chủ nhiệm')
            }
            else {
                result('xóa thành công')
            }
        })
    }
    selectDiemKSByNienKhoa(condition, result) {
        connection.query(`SELECT distinct khoithi.idkhoithi, khoithi.ten, nienkhoa.idnk, nienkhoa.ten
        FROM (diemks
        INNER JOIN nienkhoa ON diemks.idnk = nienkhoa.idnk)
        INNER JOIN khoithi ON khoithi.idkhoithi = diemks.idkhoithi
        WHERE nienkhoa.idnk = ?
        `, [condition], (err, res) => {
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
    insertScoreKS(values, result) {
        connection.query(`INSERT INTO diemks(idks, ten, idkhoithi, diem1, diem2, diem3, idhs, idnk)
        VALUES (?,?,?,?,?,?,?,?)`, [values.idks, values.tendotks, values.khoithi, values.diem1, values.diem2, values.diem3, values.mahs, values.idnk], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result('đã thêm thành công')
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
    selectToUpdateTKBGV(condition, result) {
        connection.query('select * from tkb_gv where idtkb_GV = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    updateTKBGV(condition, result) {
        connection.query(`UPDATE tkb_gv 
        SET tiet1=?, tiet2=?, tiet3=? ,tiet4=? ,tiet5=?, ct1=?, ct2=?,thu = ?
        where idtkb_GV = ? `,
            [condition.tiet1, condition.tiet2, condition.tiet3, condition.tiet4, condition.tiet5, condition.ct1, condition.ct2, condition.thu, condition.idtkb], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result()
                }
            })
    }
    addTKBGV(values, result) {
        connection.query(`INSERT INTO tkb_gv(idtkb_GV, idgv, thu, tiet1, tiet2, tiet3, tiet4, tiet5, ct1, ct2)
        VALUES (?,?,?,?,?,?,?,?,?,?)`, [values.idtkb_GV, values.idgv, values.thu, values.tiet1, values.tiet2, values.tiet3, values.tiet4, values.tiet5, values.ct1, values.ct2], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result()
            }
        })
    }
    deleteTKBGV(condition, result) {
        connection.query('delete from tkb_gv where idtkb_GV = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result('đã xóa thành công')
            }
        })
    }
    selectLop(result) {
        connection.query('SELECT idnk FROM nienkhoa ORDER BY idnk desc LIMIT 1', (err, nienkhoaHT) => {
            var data = toOneObject(nienkhoaHT)

            connection.query('select * from lop where idnk = ? ', [data.idnk], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result(toArrayObject(res))
                }
            })
        })
    }
    selectTKBHocSinh(condition, result) {
        connection.query('select * from tkb_hs where idlop = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    selectToUpdateTKBHocSinh(condition, result) {
        connection.query('select * from tkb_hs where idtkb = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    addTKBHocSinh(condition, result) {
        connection.query(`INSERT INTO tkb_hs(idtkb, idlop, thu, tiet1, tiet2, tiet3, tiet4, tiet5, ct1, ct2)
        VALUES (?,?,?,?,?,?,?,?,?,?)`, [condition.idtkb, condition.idlop, condition.thu, condition.tiet1, condition.tiet2, condition.tiet3, condition.tiet4, condition.tiet5, condition.ct1, condition.ct2], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result()
            }
        })
    }
    selectToUpdateTKBHocSinh(condition, result) {
        connection.query('select * from tkb_hs where idtkb = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toOneObject(res))
            }
        })
    }
    updateTKBHocSinh(data, result) {
        connection.query(`UPDATE tkb_hs 
        SET tiet1=?, tiet2=?, tiet3=? ,tiet4=? ,tiet5=?, ct1=?, ct2=?,thu = ?
        where idtkb = ? `,
            [data.tiet1, data.tiet2, data.tiet3, data.tiet4, data.tiet5, data.ct1, data.ct2, data.thu, data.idtkb], (err, res) => {
                if (err) {
                    console.log('loi: ' + err)
                }
                else {
                    result()
                }
            })
    }
    deleteTKBHS(condition, result) {
        connection.query('delete from tkb_hs where idtkb = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result('đã xóa thành công')
            }
        })
    }
    selectThongBao(result) {
        connection.query('select * from thongbao1', (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result(toArrayObject(res))
            }
        })
    }
    deleteThongBao(condition, result) {
        connection.query('delete from thongbao1 where idtb = ?', [condition], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result('đã xóa thành công')
            }
        })
    }
    addThongBao(values, result) {
        connection.query(`INSERT INTO thongbao1(idtb, noidung, ngaytao)
        VALUES (?,?,?)`, [values.idtb, values.content, values.ngaytao], (err, res) => {
            if (err) {
                console.log('loi: ' + err)
            }
            else {
                result()
            }
        })
    }
    selectOldPassword(condition, result) {
        console.log('condition',condition)       
        connection.query('select * from admin where idAdmin = ? and password = ?', [condition.idAdmin, condition.oldPassword], (err, res1) => {
            if (err) {
                console.log('có lỗi:' + err)
            }
            else {
                var old = toOneObject(res1)
                console.log('old',old)
                console.log(condition.oldPassword)
                if (old.password === condition.oldPassword) {
                    connection.query('update admin set password = ? where idAdmin = ?', [condition.newPassword, condition.idAdmin], (err, res) => {
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
    deleteScore(condition, result) {
        connection.query('delete from diemks where ten = ? and idkhoithi =? and idnk =?', [condition.tendotks,condition.idkhoithi,condition.idnk], (err, res) => {
            if (err) {
                result('co loi: ' + err)
            }
            else {
                result('đã xóa thành công')
            }
        })
    }
}
module.exports = new admin