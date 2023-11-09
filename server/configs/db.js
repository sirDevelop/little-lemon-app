const mongoose = require("mongoose")
const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb+srv://little-lemon-user:OXfoU3i4mmG8239p@littlelemoncluster.avskecy.mongodb.net/')
		console.log(`MongoDB connected ${conn.connection.host}`)
	} catch (error) {
		console.log(error)
		// proccess.exit(1)
	}
}

module.exports = connectDB


//username: little-lemon-user
// password: OXfoU3i4mmG8239p


//mongodb+srv://little-lemon-user:<password>@littlelemoncluster.avskecy.mongodb.net/
//Replace <password> with the password for the little-lemon-user user.