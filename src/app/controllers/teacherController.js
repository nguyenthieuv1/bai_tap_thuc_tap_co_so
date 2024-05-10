const connection = require('../modals/config')
const jwt = require('jsonwebtoken')
const teacherModal = require('../modals/teacherModal')
const adminModal = require('../modals/adminModal')
const moment = require('moment') // sửa đinh dạng ngày tháng
function toArrayObject(data) {
    return data.map(dt => {
        return { ...dt }
    })
}
function toOneObject(data) {
    let [res] = data
    return { ...res }
}
class teacher {    
    showProfile(req, res) {
        var token = req.cookies.token
        var idGV = jwt.verify(token, '123').id
        console.log(idGV)
        teacherModal.teacherInfor(idGV, (result) => {
            console.log(result)
            res.render('teacher/teacher-profile', { user: result, func: 'profile-bar',layout:'teacher' })
        })
    }
    showManageStudent(req, res) {
        adminModal.selectNienKhoa(result => {
            res.render('teacher/manage-student', { nienkhoa: result, func: 'student-bar',layout:'teacher' })
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
            console.log(data)
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
                // console.log({ lophoc, gvcn })
                res.json({ lophoc, gvcn })
            })
            .catch(err => {
                console.error('Lỗi khi lấy dữ liệu: ' + err);
                // Xử lý lỗi tại đây nếu cần
            });

    }

    showManageScore(req, res) {
        adminModal.selectNienKhoa(result => {
            res.render('teacher/diem-ks', { nienkhoa: result, func: 'score-servey-bar',layout:'teacher' })
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
    showTKBGV(req, res) {
        var token = req.cookies.token
        var idGV = jwt.verify(token, '123').id
        teacherModal.selectTKBGV(idGV,result => {
           
            res.render('teacher/thoi-khoa-bieu', { giaovien: result,func:'thoi-khoa-bieu-bar',layout:'teacher' })        
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

            res.render('students/thongbao', { thongbao: data, func: 'notification-bar',layout: 'teacher' })
        })
    }
    showSetting(req, res) {
        res.render('teacher/setting', { func: 'setting-bar',layout: 'teacher' })
    }
    processSetting(req, res) {
        var token = req.cookies.token
        var idGV = jwt.verify(token, '123').id  
       
        teacherModal.selectOldPassword({ idGV, ...req.body }, (result) => {
            res.json(result)
        })
    }
}
module.exports = new teacher