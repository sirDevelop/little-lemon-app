import axios from "axios"

const App = () => {
	const sendGetFetch = () => {
		fetch("http://localhost:9000/api/test/get")
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			})
	}
	const sendPostFetch = () => {
		fetch("http://localhost:9000/api/test/post", {
			method: "POST",
			headers: {
				Accept: "application.json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ a: 1, b: "Text" }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			})
	}
	const sendGetAxios = () => {
		// defends xsrf attacks
		axios.get("http://localhost:9000/api/test/get").then((response) => {
			console.log(response)
		})
	}
	const sendPostAxios = () => {
		axios
			.post(
				"http://localhost:9000/api/test/post",
				{
					a: 1,
					b: "Text",
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `test`,
					},
				}
			)
			.then((response) => {
				console.log(response)
			})
	}
	const sendPostAnotherAxios = () => {
		axios({
			method: "post",
			url: "http://localhost:9000/api/test/post",
			withCredentials: true,
			headers: {
				Authorization: `test`,
			},
			data: {
				a: 1,
				b: "Text",
			},
		}).then((response) => {
			console.log(response)
		})
	}
	const sendPostAxiosInstance = () => {
		const axiosInstance = axios.create({
			baseURL: "http://localhost:9000/api/",
			withCredentials: true,
			headers: {
				Authorization: `test`,
			},
		})
		axiosInstance
			.post(`/test/post`, { a: 1, b: "test" })
			.then((response) => {
				console.log(response)
			})
	}
	return (
		<>
			<button onClick={sendGetFetch}>Send Get Fetch</button>
			<button onClick={sendPostFetch}>Send Post Fetch</button>
			<button onClick={sendGetAxios}>Send Get Axios</button>
			<button onClick={sendPostAxios}>Send Post Axios</button>
			<button onClick={sendPostAnotherAxios}>
				Send Post Another Axios
			</button>
			<button onClick={sendPostAxiosInstance}>
				Send Post Axios Instance
			</button>
		</>
	)
}

export default App
