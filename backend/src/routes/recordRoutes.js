import { Router } from 'express'
import { getUserRecords } from '../controllers/recordController.js'

const router = Router()

router.get('/', getUserRecords)

export default router
