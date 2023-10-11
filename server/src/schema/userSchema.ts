import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface userInstance {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    profilePic: string,
    confirmPassword: string
}

const UserSchema = new Schema(
    {
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
        confirmPassword: {
            type: String,
            required: true,

        },
        profilePic: {
            type: String,
            default: "/images/profilePic.png"
        }
    },
    {
        timestamps: true

    })

const User = mongoose.model<userInstance>('User', UserSchema)
export default User