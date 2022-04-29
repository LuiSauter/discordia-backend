import { Router } from 'express'
import * as channelCtrl from '../controllers/channel.controll'

const router = Router()

router.post('/:myId/:yourId', channelCtrl.createChannel)

export default router
