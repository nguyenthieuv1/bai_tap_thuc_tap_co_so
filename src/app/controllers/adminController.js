const adminModal = require('../modals/adminModal')
const connection = require('../modals/config')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const XLSX = require('xlsx');
const moment = require('moment') // sửa đinh dạng ngày tháng
var jwt = require('jsonwebtoken')
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var cnt = randomNumber(1, 100)
var cntIdlop = randomNumber(1, 100)
var cntIdNk = randomNumber(1, 100)
var cntIdGV = randomNumber(1, 100)
var cntKs = randomNumber(1, 100)
var cntTKB = randomNumber(1, 100)
var cntTKBHS = randomNumber(1, 100)
var cntIdTB = randomNumber(1, 100)
var username = ''
function toArrayObject(data) {
    return data.map(dt => {
        return { ...dt }
    })
}
function toOneObject(data) {
    let [res] = data
    return { ...res }
}

class adminController {
    showProfile(req, res) {
        var token = req.cookies.token
        var idAdmin = jwt.verify(token, '123').id
        adminModal.adminInfor({ idAdmin: idAdmin }, (result) => {
            username = result.ten

            res.render('admin/admin-profile', { user: result, func: 'profile-bar', username })
        })
    }

    //    showManageClassroom(req, res) {    
    //         let lophoc =[]  , nienkhoa = [] 
    //         connection.query('select ten from lop', (err,result)=>{
    //             if (err) {
    //                 console.log('loi: ' + err)
    //             }
    //             else {
    //                 lophoc = toArrayObject(result)
    //                 console.log(lophoc)
    //             }

    //         })    
    //         connection.query('select ten from nienkhoa ', (err,result)=>{
    //             if (err) {
    //                 console.log('loi: ' + err)
    //             }
    //             else {
    //                 nienkhoa = toArrayObject(result)
    //             }
    //         })   
    //         console.log(lophoc, nienkhoa)
    //         res.render('admin/manage-class',{func: 'classroom-bar'})
    //     }
    // showManageStudent(req, res) {
    //     let lophoc = [], nienkhoa = [];

    //     const getLopHoc = new Promise((resolve, reject) => {
    //         connection.query('SELECT * FROM lop ', (err, result) => {
    //             if (err) {
    //                 console.log('Lỗi: ' + err);
    //                 reject(err);
    //             } else {
    //                 lophoc = toArrayObject(result);
    //                 // console.log(lophoc);
    //                 resolve();
    //             }
    //         });
    //     });

    //     const getNienKhoa = new Promise((resolve, reject) => {
    //         connection.query('SELECT ten FROM nienkhoa', (err, result) => {
    //             if (err) {
    //                 console.log('Lỗi: ' + err);
    //                 reject(err);
    //             } else {
    //                 nienkhoa = toArrayObject(result);
    //                 resolve();
    //             }
    //         });
    //     });

    //     Promise.all([getLopHoc, getNienKhoa])
    //         .then(() => {
    //             // console.log(lophoc, nienkhoa);
    //             res.render('admin/manage-student', { func: 'student-bar', lop: lophoc, nienkhoa });
    //         })
    //         .catch(err => {
    //             console.error('Lỗi khi lấy dữ liệu: ' + err);
    //             // Xử lý lỗi tại đây nếu cần
    //         });
    // }
    showManageStudent(req, res) {
        adminModal.selectNienKhoa(result => {
            console.log('username: ', username)
            res.render('admin/manage-student', { nienkhoa: result, func: 'student-bar', username })
        })
    }
    processManageStudentSelectClass(req, res) {
        var condition = { idnk: req.params.nienkhoa }
        adminModal.selectLopHocByNienKhoa(condition, (result) => {
            res.json(result)

        })
    }
    processManageStudent(req, res) {
        var data = req.body
        // console.log(data)
        let lophoc, gvcn
        const getLopHoc = new Promise((resolve, reject) => {
            adminModal.managerStudent(data, (result) => {

                // res.render('admin/manage-class', {lophoc: result, func: 'classroom-bar'})  
                lophoc = result
                resolve()
            })
        })
        const getGVCN = new Promise((resolve, reject) => {
            connection.query(`SELECT giaovien.ten AS gvcn, lop.ten AS lop
            FROM ((lop
            INNER JOIN gvcn ON lop.idlop = gvcn.idlop)
            INNER JOIN giaovien ON giaovien.idGV = gvcn.idGV)
            WHERE lop.idlop = '${data.lop}'`, (err, result) => {
                if (err) {
                    console.log('Lỗi: ' + err);
                    reject(err);
                } else {
                    gvcn = toOneObject(result);
                    resolve();
                }
            });
        })
        Promise.all([getGVCN, getLopHoc])
            .then(() => {

                res.json({ lophoc, gvcn })
            })
            .catch(err => {
                console.error('Lỗi khi lấy dữ liệu: ' + err);
                // Xử lý lỗi tại đây nếu cần
            });

    }
    showSelectNk(req, res) {
        adminModal.selectNienKhoa(result => {
            // console.log(result)
            res.render('admin/selectNK', { nienkhoa: result, username })
        })
    }
    processSelectNk(req, res) {
        var data = req.body
        res.redirect(`/admin/add-student/${data.nienkhoa}`)
    }
    showAddNewStudent(req, res) {
        let lophoc = []

        const getLopHoc = new Promise((resolve, reject) => {
            connection.query(`SELECT lop.ten
            FROM lop 
            WHERE lop.idnk in (SELECT idnk FROM nienkhoa WHERE ten = '${req.params.nienkhoa}') 
            `, (err, result) => {
                if (err) {
                    console.log('Lỗi: ' + err);
                    reject(err);
                } else {
                    lophoc = toArrayObject(result);

                    // console.log(lophoc);
                    resolve();
                }
            });
        });
        Promise.all([getLopHoc])
            .then(() => {
                // console.log(lophoc, nienkhoa);
                // console.log(lophoc)
                res.render('admin/add-student', { lop: lophoc, nienkhoa: req.params.nienkhoa, username });
            })
            .catch(err => {
                console.error('Lỗi khi lấy dữ liệu: ' + err);
                // Xử lý lỗi tại đây nếu cần
            });
    }
    storeNewStudent(req, res) {
        adminModal.findClass(req.body, (result) => {
            let tmp = `${cnt}`
            while (tmp.length < 3) {
                tmp = '0' + tmp
            }
            tmp = 'd1hs' + tmp
            cnt++
            let data = { ...req.body, idhs: tmp, ...result }
            adminModal.storeNewStudent(data, (result) => {
                res.redirect('/admin/admin-student')
            })


        })
    }
    showUpdateStudent(req, res) {
        // console.log(req.params)
        let student, lophoc = []
        const getLopHoc = new Promise((resolve, reject) => {
            connection.query(`SELECT lop.ten ,lop.idlop
            FROM lop
            WHERE lop.idnk = (SELECT nienkhoa.idnk
            FROM ((hocsinh
            INNER JOIN lop ON hocsinh.idlop = lop.idlop)
            INNER JOIN nienkhoa ON lop.idnk = nienkhoa.idnk)
            WHERE hocsinh.idhs='${req.params.idhs}')`, (err, result) => {
                if (err) {
                    console.log('Lỗi: ' + err);
                    reject(err);
                } else {

                    lophoc = toArrayObject(result);

                    // console.log(lophoc);
                    resolve();
                }
            });
        });
        const getStudent = new Promise((resolve, reject) => {
            connection.query(`SELECT idhs ,hocsinh.name, hocsinh.dob, gioitinh, diachi, lop.ten AS tenlop, username, password, lop.idlop
            FROM lop, hocsinh
            WHERE hocsinh.idlop = lop.idlop AND hocsinh.idhs = '${req.params.idhs}'
            `, (err, result) => {
                if (err) {
                    console.log('Lỗi: ' + err);
                    reject(err);
                } else {
                    student = toOneObject(result);
                    // console.log(lophoc);
                    resolve();
                }
            });
        });
        Promise.all([getLopHoc, getStudent])
            .then(() => {
                // console.log(student.dob);
                let formattedDate = moment(student.dob).format('YYYY-MM-DD'); // sử dụng moment để định dạng ngày tháng
                student.dob = formattedDate

                res.render('admin/update-student', { lop: lophoc, student, username, username });
            })
            .catch(err => {
                console.error('Lỗi khi lấy dữ liệu: ' + err);
                // Xử lý lỗi tại đây nếu cần
            });
    }
    proccessUpdateStudent(req, res) {

        let data = { ...req.body, idhs: req.params.idhs }
        // console.log(data)
        adminModal.updateStudent(data, (result) => {
            res.redirect('/admin/admin-student')

        })
    }
    deleteStudent(req, res) {
        adminModal.deleteStudent(req.params.idhs, (result) => {
            res.json('đã xóa thanh công')
        })

    }
    showManageClassroom(req, res) {
        adminModal.selectNienKhoa(result => {
            res.render('admin/manage-class', { nienkhoa: result, func: 'classroom-bar', username })
        })

    }
    processManageClassroom(req, res) {
        var data = req.body

        adminModal.selectInforClass(data, (result) => {
            res.json(result)
        })

    }
    showAddNewClassroom(req, res) {
        var data = req.params.nienkhoa
        adminModal.selectTeacher(result => {
            res.render('admin/add-classroom', { nienkhoa: data, giaovien: result, username })
        })
    }
    selectNienKhoaForClass(req, res) {
        adminModal.selectNienKhoa(result => {
            res.render('admin/selectNK-class', { nienkhoa: result, username })
        })
    }
    proccessNienKhoaForClass(req, res) {
        var data = req.body
        res.redirect(`/admin/add-classroom/${data.nienkhoa}`)

    }

    storeNewClassroom(req, res) {
        var idlop = `${cntIdlop}`
        while (idlop.length < 3) {
            idlop = '0' + idlop
        }
        idlop = 'l' + idlop
        cntIdlop++
        var idGVCN = `${cntIdlop}`
        while (idGVCN.length < 3) {
            idGVCN = '0' + idGVCN
        }
        idGVCN = 'k1cn' + idGVCN

        var nienkhoa = req.params.nienkhoa
        var data = req.body
        var tenlop = data.ten

        adminModal.storeNewClassroom({ tenlop, idGV: data.idGV, idlop, idnk: req.params.nienkhoa, idGVCN, }, (result) => {
            res.redirect('/admin/admin-classroom')
        })
        // console.log({tenlop,idGV:data.idGV,idlop,idnk:req.params.nienkhoa,idGVCN,})
    }
    showUpdateClassroom(req, res) {
        adminModal.selectForUpadateClass(req.params, (resultClass) => {
            adminModal.selectTeacher(resultTeacher => {
                adminModal.selectNienKhoa(resultNk => {
                    res.render('admin/update-classroom', { lop: resultClass, giaovien: resultTeacher, nienkhoa: resultNk, username })

                })
            })
        })
    }
    proccessUpdateClassroom(req, res) {
        var data = req.body
        data = { ...data, idlop: req.params.idlop }
        adminModal.updateClassroom(data, (result) => {
            res.redirect('/admin/admin-classroom')
        })
        // console.log(data)
    }
    showAddNewNienKhoa(req, res) {
        res.render('admin/add-nienkhoa', { username })
    }
    storeNewNienKhoa(req, res) {
        var data = req.body
        var idnk = `${cntIdNk}`
        while (idnk.length < 3) {
            idnk = '0' + idnk
        }
        idnk = 'nk' + idnk
        cntIdNk++
        data = { ...data, idnk }
        // console.log(data)
        adminModal.storeNewNienKhoa(data, (result) => {
            res.redirect('/admin/admin-classroom')
        })
        // console.log(data)
    }
    showManageTeacher(req, res) {
        adminModal.selectTeacher(result => {
            res.render('admin/teacher/manage-teacher', { giaovien: result, func: 'teacher-bar', username })
        })
    }
    showAddNewTeacher(req, res) {
        res.render('admin/teacher/add-teacher', { username })
    }
    storeNewTeacher(req, res) {
        var data = req.body
        var idGV = `${cntIdGV}`
        while (idGV.length < 3) {
            idGV = '0' + idGV
        }
        idGV = 'gv' + idGV
        cntIdGV++
        data = { ...data, idGV }
        adminModal.storeNewTeacher(data, (result) => {
            res.redirect('/admin/admin-teacher')
        })
        // console.log(data)
    }
    showUpdateTeacher(req, res) {

        adminModal.selectOneTeacher({ idGV: req.params.idgv }, (result) => {

            res.render('admin/teacher/update-teacher', { giaovien: result, username })
        })

    }
    proccessUpdateTeacher(req, res) {
        var data = req.body
        data = { ...data, idGV: req.params.idgv }
        console.log(data)
        adminModal.updateTeacher(data, (result) => {
            res.redirect('/admin/admin-teacher')
        })
        // console.log(data)

    }
    deleteTeacher(req, res) {
        adminModal.deleteTeacher(req.params.idgv, (result) => {
            res.json(result)
        })
    }
    deleteClassroom(req, res) {
        adminModal.deleteClassroom(req.params, (result) => {
            res.json(result)
        })
    }
    showManageScore(req, res) {
        adminModal.selectNienKhoa(result => {
            res.render('admin/score/manage-score', { nienkhoa: result, func: 'score-servey-bar', username })
        })

    }

    proccessManageScoreNK(req, res) {
        // console.log(req.params.nienkhoa)
        adminModal.selectTenDotThibyNK(req.params.nienkhoa, (result) => {
            res.json(result)
        })
    }
    proccessManageScore(req, res) {
        var data = req.body
        adminModal.selectTableScore(data, (result) => {
            result.map(item_result => {
                let formattedDate = moment(item_result.dob).format('YYYY-MM-DD'); // sử dụng moment để định dạng ngày tháng
                item_result.dob = formattedDate
                return item_result
            })
            res.json(result)
        })
    }
    ShowAddScoreKS(req, res) {
        adminModal.selectNienkhoa(result => {

            res.render('admin/score/add-score-ks', { nienkhoa: result, username })
        })
    }
    ProccessAddScoreKS(req, res) {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const workbook = XLSX.readFile(req.file.path);
        // console.log(workbook.SheetNames[0]);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        var data = jsonData.map(item => {
            let idks = `${cntKs}`
            while (idks.length < 3) {
                idks = '0' + idks
            }
            cntKs++
            idks = 'k1ks' + idks

            const { toan, ly, tienganh } = item;
            const diem1 = toan;
            const diem2 = ly;
            const diem3 = tienganh;
            return { ...item, diem1, diem2, diem3, idks, ...req.body }
        })

        // adminModal.insertScoreKS(data, (result) => {
        //     console.log(result)
        // })
        try {
            data.forEach(item => {
                console.log(item)
                adminModal.insertScoreKS(item, (result) => {

                })
            })
            res.redirect('/admin/admin-score')
        } catch (error) {
            res.json('có lỗi xảy ra')
        }
    }
    showTKBGV(req, res) {
        adminModal.selectTeacher(result => {
            res.render('admin/teacher/tkb-gv', { giaovien: result, func: 'teacher-schedule-bar', username })

        })
    }
    proccessTKBGV(req, res) {
        adminModal.selectTKBGV(req.params.idGV, (result) => {

            res.json(result)
        })
    }
    showUpdateTKBGV(req, res) {
        adminModal.selectToUpdateTKBGV(req.params.idtkb, (result) => {
            res.render('admin/teacher/update-tkb', { tkb: result, username })
        })
    }
    proccessUpdateTKBGV(req, res) {
        var data = req.body
        data = { ...data, idtkb: req.params.idtkb }
        console.log(data)
        adminModal.updateTKBGV(data, (result) => {
            res.redirect('/admin/thoi-khoa-bieu-gv')
        })
    }
    showAddTKBGV(req, res) {

        res.render('admin/teacher/add-tkb-gv', { idgv: req.params.giaovien, username })
    }
    proccessAddTKBGV(req, res) {
        var idtkb_GV = `${cntTKB}`
        while (idtkb_GV.length < 3) {
            idtkb_GV = '0' + idtkb_GV
        }
        idtkb_GV = 'tkb' + idtkb_GV
        cntTKB++
        var data = { ...req.body, idgv: req.params.giaovien, idtkb_GV }
        adminModal.addTKBGV(data, (result) => {
            res.redirect('/admin/thoi-khoa-bieu-gv')
        })
        // console.log(data)
    }
    deleteTKBGV(req, res) {

        adminModal.deleteTKBGV(req.params.idtkb, (result) => {
            res.json(result)
        })
    }
    showTKBHocSinh(req, res) {
        adminModal.selectLop(result => {

            res.render('admin/student/tkb-student', { lop: result, func: 'student-schedule-bar', username })
        })
    }
    ProccessTKBHocSinh(req, res) {
        var data = req.params.idlop
        // console.log(data)

        adminModal.selectTKBHocSinh(data, (result) => {
            // console.log(result)
            res.json(result)
        })
    }
    showAddTKBHocSinh(req, res) {

        var idlop = req.params.idlop

        res.render('admin/student/add-tkb-student', { idlop: idlop, username })
    }
    proccessAddTKBHocSinh(req, res) {
        // console.log(req.body)
        var idTKBHS = `${cntTKBHS}`
        while (idTKBHS.length < 3) {
            idTKBHS = '0' + idTKBHS
        }
        idTKBHS = 'tkb' + idTKBHS
        cntTKBHS++
        var data = { ...req.body, idtkb: idTKBHS, idlop: req.params.idlop }
        adminModal.addTKBHocSinh(data, (result) => {
            res.redirect('/admin/tkb-student')
        })
    }
    showUpdateTKBHocSinh(req, res) {
        adminModal.selectToUpdateTKBHocSinh(req.params.idtkb, (result) => {

            res.render('admin/student/update-tkb-student', { lop: result, username })
        })
    }
    proccessUpdateTKBHocSinh(req, res) {
        // console.log(req.params.idtkb)
        var data = { ...req.body, idtkb: req.params.idtkb }
        // console.log(data)
        adminModal.updateTKBHocSinh(data, (result) => {
            res.redirect('/admin/tkb-student')
        })
    }
    deleteTKBHocSinh(req, res) {
        console.log(req.params.idtkb)
        adminModal.deleteTKBHS(req.params.idtkb, (result) => {
            res.json(result)
        })
    }
    showThongBao(req, res) {
        adminModal.selectThongBao(result => {
            // console.log(result)
            var data = result.map(item => {
                let formattedDate = moment(item.ngaytao).format('HH:mm DD-MM-YYYY'); // sử dụng moment để định dạng ngày tháng
                item.ngaytao = formattedDate
                return item
            })

            res.render('admin/thongbao/thongbao', { thongbao: data, func: 'notification-bar', username })
        })
    }
    DeleteThongBao(req, res) {
        // console.log(req.params.idtb)
        adminModal.deleteThongBao(req.params.idtb, (result) => {
            res.json(result)
        })
    }
    addThongBao(req, res) {
        // console.log(req.body)
        var idTB = `${cntIdTB}`
        while (idTB.length < 3) {
            idTB = '0' + idTB

        }
        idTB = 'tb' + idTB
        cntIdTB++
        var data = { ...req.body, idtb: idTB }
        // console.log(data)
        adminModal.addThongBao(data, (result) => {
            res.redirect('/admin/thongbao')
        })

    }
    showSetting(req, res) {
        res.render('admin/account/setting', { func: 'setting-bar', username })
    }
    processSetting(req, res) {
        var token = req.cookies.token
        var idAdmin = jwt.verify(token, '123').id

        adminModal.selectOldPassword({ idAdmin, ...req.body }, (result) => {

            res.json(result)
        })
    }
    deleteScore(req, res) {
        adminModal.deleteScore(req.body, (result) => {
            res.json(result)
        })
        // console.log(req.body)
    }
}

module.exports = new adminController