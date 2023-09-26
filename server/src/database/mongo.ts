import mongoose from 'mongoose';

export class Database {

    constructor() {
        this.connect()
    }
    connect() {
        mongoose.connect("mongodb+srv://ogbonnayakingsike:D0r0vJMUAxTGoIqN@twitterclonecluster.orrepqm.mongodb.net/")
            .then(() => console.log('Connected!'))
            .catch((err) => {
                console.log('Error connecting' + err)
            })
    }
}

// export function Database() {
//     mongoose.connect("mongodb+srv://ogbonnayakingsike:D0r0vJMUAxTGoIqN@twitterclonecluster.orrepqm.mongodb.net/")
//     .then(() => console.log('Connected!'))
//     .catch((err) => {
//         console.log('Error connecting' + err)
//     })
// }
