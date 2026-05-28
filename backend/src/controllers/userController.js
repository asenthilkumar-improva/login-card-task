import {
  addUserService,
  getAllUsersService,
  getUserProfileService,
  updateUserRoleService,
} from '../services/userService.js'

export async function getUserProfile(req, res, next) {
  try {
    const profile = await getUserProfileService(req.params.userId)
    res.json(profile)
  } catch (err) {
    next(err)
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await getAllUsersService()
    res.json(users)
  } catch (err) {
    next(err)
  }
}

export async function addUser(req, res, next) {
  try {
    const user = await addUserService(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const user = await updateUserRoleService(req.params.userId, req.body.role)
    res.json(user)
  } catch (err) {
    next(err)
  }
}
