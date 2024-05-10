var jwt = require('jsonwebtoken')
const moment = require('moment')
const studentModal = require('../modals/studentModal')
const adminModal = require('../modals/adminModal')
var username =''
function toArrayObject(data) {
    return data.map(dt => {
        return { ...dt }
    })
}
function toOneObject(data) {
    let [res] = data
    return { ...res }
}
class studentController {
    showProfile(req, res) {
        var token = req.cookies.token
        var idhs = jwt.verify(token, '123').id

        studentModal.studentInfor(idhs, (result) => {
            result.ten = result.name
            // console.log(result)
            username =result.name
            let formattedDate = moment(result.dob).format('YYYY-MM-DD'); // sử dụng moment để định dạng ngày tháng
            result.dob = formattedDate            
            res.render('students/student-profile', { user: result, func: 'profile-bar', layout: 'student' ,username})
        })
        // console.log('ok')
    }
    showLopHoc(req, res) {
        var token = req.cookies.token
        var idhs = jwt.verify(token, '123').id
        studentModal.studentLop(idhs, result => {
            // console.log(result)
            res.render('students/lop-hoc-student', { hocsinh: result, lop: result[0].lop, gvcn: result[0].gvcn, func: 'classroom-bar', layout: 'student',username })
        })
    }
    showDiemKhaoSat(req, res) {
        studentModal.selectNienKhoa(result => {

            res.render('students/score-ks', { nienkhoa: result, layout: 'student', func: 'score-servey-bar',username })
        })
    }
    proccessStudentScoreNK(req, res) {
        // console.log(req.params.nienkhoa)
        studentModal.selectTenDotThibyNK(req.params.nienkhoa, (result) => {
            res.json(result)
        })
    }
    proccessManageScore(req, res) {
        var data = req.body
        studentModal.selectTableScore(data, (result) => {
            result.map(item_result => {
                let formattedDate = moment(item_result.dob).format('YYYY-MM-DD'); // sử dụng moment để định dạng ngày tháng
                item_result.dob = formattedDate
                return item_result
            })

            res.json(result)
        })
    }
    showThoiKhoaBieu(req, res) {
        var token = req.cookies.token
        var idhs = jwt.verify(token, '123').id
        studentModal.selectThoiKhoaBieuHocSinh(idhs, result => {
            res.render('students/thoi-khoa-bieu-stu', { tkb: result, lop: result[0].lop, layout: 'student', func: 'tkb-bar' ,username})
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

            res.render('students/thongbao', { thongbao: data, func: 'notification-bar',layout: 'student' ,username})
        })
    }
    showSetting(req, res) {
        res.render('students/setting', { func: 'setting-bar',layout: 'student' ,username})
    }
    processSetting(req, res) {
        var token = req.cookies.token
        var idhs = jwt.verify(token, '123').id

        studentModal.selectOldPassword({ idhs, ...req.body }, (result) => {
            res.json(result)
        })
    }
    logout(req,res) {
        res.clearCookie("token");
       
        res.redirect('/login')
    }

}
module.exports = new studentController