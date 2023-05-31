import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' })
}

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password.')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('An account with this email address has already been registered')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: genToken(updatedUser._id),
            createdAt: updatedUser.createdAt,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

export {loginUser, registerUser, updateProfile}