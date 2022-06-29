import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUSer = await user.findOne({ email })

        if (!existingUSer) return res.status(404).json({message:"User doesn't exist"})
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUSer.password)
   
        if (!isPasswordCorrect) return res.status(404).json({ message: 'Invalid credentials' })
    
        const token = jwt.sign({ email: existingUSer.email, id: existingUSer._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({result:existingUSer,token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body

    try {
        const existingUser = await user.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User already exist" })
        
        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })
        
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await user.create({ email, password: hashedPassword, name: `${firstName}, ${lastName}` })
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({result,token})

    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
    
}