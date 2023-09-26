import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unqiue: true

    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    profilePic: {
        type: String,
        default: "/images/profilePic.png"
    }

})

export default mongoose.model('User', UserSchema)