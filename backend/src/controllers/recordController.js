import { getUserRecordsService } from '../services/recordService.js'

export async function getUserRecords(req, res, next) {
  try {
    const records = await getUserRecordsService({
      userId: req.query.userId,
      role: req.query.role,
    })
    res.json(records)
  } catch (err) {
    next(err)
  }
}
