const express = require('express')
const route = express.Router()
const studentController = require('../app/controllers/studentController')
route.get('/',studentController.showProfile)
route.get('/classroom',studentController.showLopHoc)
route.get('/diem-khao-sat',studentController.showDiemKhaoSat)
route.post('/diem-khao-sat/:nienkhoa',studentController.proccessStudentScoreNK)
route.post('/diem-khao-sat',studentController.proccessManageScore)
route.get('/thoi-khoa-bieu-hoc-sinh',studentController.showThoiKhoaBieu)
route.get('/thongBao',studentController.showThongBao)
route.get('/student-setting',studentController.showSetting)
route.post('/student-setting',studentController.processSetting)

module.exports = route