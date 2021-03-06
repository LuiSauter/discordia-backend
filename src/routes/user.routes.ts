import { Router } from 'express'
import * as userCtrl from '../controllers/user.controller'

const router = Router()

router.post('/auth', userCtrl.login)

router.get('/:username', userCtrl.getUser)

router.get('/', userCtrl.getAllUsers)

router.get('/search/:username', userCtrl.searchUser)

export default router
