import { loginService } from '../services/authService.js'

export async function login(req, res, next) {
  try {
    const user = await loginService(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
}
