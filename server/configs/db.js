const mongoose = require("mongoose")
const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb+srv://little-lemon-user:SK0OcC9Z34IOWHvy@littlelemoncluster.avskecy.mongodb.net/')
		console.log(`MongoDB connected ${conn.connection.host}`)
	} catch (error) {
		console.log(error)
		// proccess.exit(1)
	}
}

module.exports = connectDB


//username: little-lemon-user
// password: SK0OcC9Z34IOWHvy


//mongodb+srv://little-lemon-user:<password>@littlelemoncluster.avskecy.mongodb.net/
//Replace <password> with the password for the little-lemon-user user.