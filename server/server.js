const net = require('net')
const server = net.createServer()
let port = 9000

// start the server to check is there any error with port
server.listen(port)
// if there is any error
server.once('error', (e) => {
	// if the error is port related
	if (e.code === 'EADDRINUSE') {
		// change the port
		port = port + 1
		// start the server again to test the new port
		server.listen(port)
	}
})
// close the server because its just for testing the port and checking is there any error
server.once('listening', function () { server.close() })
// if the server is closed which means we know the right port now then start the actual application
server.once('close', function () {

	const express = require('express')
	const router = express.Router()
	const cors = require('cors')
	const { errorHandler } = require('./middlewares/errorMiddleware')
	const connectDB = require('./configs/db')
	const app = express()
	const cookieParser = require('cookie-parser')
	const origins = ["http://127.0.0.1:3000", "http://localhost:3000", "http://127.0.0.1:3001", "http://localhost:3001"]

	connectDB()

	app.use(cookieParser())

	app.use(cors({
		origin: origins,
		credentials: true
	}))

	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))

	app.use("/api/reservation", require('./routes/reservationRoutes'))
	app.use("/api/users", require('./routes/userRoutes'))
	app.use("/api/menuOptions", require('./routes/menuOptionRoutes'))

	app.use(errorHandler)
	app.listen(port, () => { console.log(`Server started on port ${port}`) })

})