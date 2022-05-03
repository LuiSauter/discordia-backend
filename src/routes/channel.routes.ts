import { Router } from 'express'
import * as channelCtrl from '../controllers/channel.controll'

const router = Router()

router.get('/', channelCtrl.getAllChannel)

router.get('/msg', channelCtrl.getAllMessages)

router.get('/:id', channelCtrl.getChannel)

router.post('/:myId/:yourId', channelCtrl.createChannel)

router.delete('/:userId/:channelId', channelCtrl.deleteChannel)

export default router
