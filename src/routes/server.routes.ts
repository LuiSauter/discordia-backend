import { Router } from 'express'
import * as serverCtrl from '../controllers/server.controllers'
const router = Router()

router.post('/add', serverCtrl.createServer)

router.post('/invite/:serverId/:userId/', serverCtrl.invitation)

router.get('/', serverCtrl.allServers)

router.get('/:id', serverCtrl.getServer)

router.delete('/:myId/:serverId', serverCtrl.deleteServer)

export default router
