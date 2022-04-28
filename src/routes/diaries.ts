import express from 'express'
import * as diaryServices from '../services/diaryServices'
import { toNewDiaryEntry } from '../utils'

const router = express.Router()

router.get('/', (_request, response) => {
  return response.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (request, response) => {
  const diary = diaryServices.findById(+request.params.id)
  return diary !== null ? response.send(diary) : response.sendStatus(404)
})

router.post('/', (request, response) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(request.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)
    response.json(addedDiaryEntry)
  } catch (e: any) {
    response.status(400).send(e.message)
  }
})

export default router
