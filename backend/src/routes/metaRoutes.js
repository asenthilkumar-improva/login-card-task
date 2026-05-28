import { Router } from 'express'
import { getServiceInfo } from '../controllers/metaController.js'

const router = Router()

router.get('/service-info', getServiceInfo)

export default router
