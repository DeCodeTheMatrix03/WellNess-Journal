const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema


const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    }
})

//sign up method, using bcrypt to hash users passwords
userSchema.statics.signup= async function(email, password){
    
    //validator package
    if(!email || !password){
        throw Error('All fields must be completed')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email is not unique')
    }
   //encrypting the password using .genSalt
    const encryption = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, encryption)
    
    const user = await this.create({ email,password: hash})

    return user
}

//login method
userSchema.statics.login = async function(email, password){
    //password and email must exist
    if(!email || !password){
        throw Error('All fields must be completed')
    }
    
    const user = await this.findOne({ email })

    if(!user){
        throw Error('Email or Password are Incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Email or Password are Incorrect')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)