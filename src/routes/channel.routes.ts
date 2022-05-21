import { Router } from 'express'
import * as channelCtrl from '../controllers/channel.controll'
import * as messageCtrl from '../controllers/message.controll'

const router = Router()
// Messages
router.get('/msg', messageCtrl.getAllMessages)

router.post('/msg', messageCtrl.createMessage)

router.delete('/msg/:msgId/:channelId', messageCtrl.deleteMessage)

router.get('/test', messageCtrl.test)

// Channel
router.get('/', channelCtrl.getAllChannel)

router.get('/:id', channelCtrl.getChannel)

router.delete('/:userId/:channelId', channelCtrl.deleteChannel)

export default router
