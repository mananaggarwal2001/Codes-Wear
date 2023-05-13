// used for making the connection to the database for getting the things done in the database.
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI;
const connectToMongo = async () => {
    try {

        await mongoose.connect(mongoURI);
        console.log('The connection made successfully in the mongo connection')

    } catch (err) {
        console.log(err)
    }
}

export default connectToMongo