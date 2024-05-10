const express = require('express')
const teacherController = require('../app/controllers/teacherController')
const route = express.Router()


route.get('/',teacherController.showProfile)
route.get('/teacher-student',teacherController.showManageStudent)
route.post('/teacher-student/:nienkhoa',teacherController.processManageStudentSelectClass)
route.post('/teacher-student',teacherController.processManageStudent)

route.get('/teacher-score',teacherController.showManageScore)
route.post('/teacher-score/:nienkhoa',teacherController.proccessManageScoreNK)
route.post('/teacher-score',teacherController.proccessManageScore)
route.get('/thoi-khoa-bieu-gv',teacherController.showTKBGV)

route.get('/thongbao',teacherController.showThongBao)

route.get('/teacher-setting',teacherController.showSetting)
route.post('/teacher-setting',teacherController.processSetting)

module.exports = route