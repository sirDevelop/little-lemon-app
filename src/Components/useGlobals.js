import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const GlobalsContent = React.createContext()

export function useGlobals() {
	return useContext(GlobalsContent)
}

const GlobalsComponent = ({ children }) => {
	const navigate = useNavigate()
	const pathName = useLocation().pathname
	const [cookie, setCookie, removeCookie] = useCookies(["cart"])
	const [cartOpen, setCartOpen] = useState(false)
	const [cart, setCart] = useState([])

	// do not allow users to click login button if already logging in
	const [loadingLogin, setLoadingLogin] = useState(false)

	const [loggedIn, setLoggedIn] = useState()

	const authApi = axios.create({
		baseURL: process.env.REACT_APP_SERVER_URL+"/api",
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${cookie.cs ? cookie.cs : ""}`,
		},
	})
	const [menuOptions, setMenuOptions] = useState([])

	useEffect(() => {
		authApi.get("/menuOptions/getMenuOptions").then((response) => {
			setMenuOptions(response.data.getAllMenuOptions)
		})
	}, [])

	// login

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer)
			toast.addEventListener("mouseleave", Swal.resumeTimer)
		},
	})
	const [user, setUser] = useState({})

	// autologin if the cookie gets stored in the frontend
	useEffect(() => {
		if (loggedIn === undefined && !loadingLogin) {
			setLoadingLogin(true)
			authApi
				.get(`/users/get/`)
				.then((response) => {
					setUser(response)
					setLoggedIn(true)
				})
				.catch(() => {
					setLoggedIn(false)
				})
				.finally(() => setLoadingLogin(false))
		}
	}, [])

	// authentication
	// email, password sent to server side from client. Server validate email and password
	// server generates 2 tokens, one for client and one for server
	// server stores the server side to mongoDB, and client token back to client side
	// when client receives it, client stores it as a cookie with setCookie("cs")
	// when cookies is stored, we will autologin next time

	// state(variable/object) for form data (firstname,lastname,email,password)
	const [formData, setFormData] = useState({})
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: "btn btn-success",
			cancelButton: "btn btn-dark",
			denyButton: "btn btn-warning",
		},
		buttonsStyling: false,
	})
	const openLogin = () => {
		swalWithBootstrapButtons
			.fire({
				html: `<input id="swal-input1" type="email" placeholder="Email" class="swal2-input" required>
			<input id="swal-input2" type="password" placeholder="Password" class="swal2-input" required>`,
				confirmButtonText: `Login`,
				showCancelButton: true,
				cancelButtonText: "Cancel",
				denyButtonText: "Create New Account",
				showDenyButton: true,
				focusConfirm: false,
				onClose: () => {
					setFormData({})
				},
				preConfirm: () => {
					setFormData({
						email: document.getElementById("swal-input1").value,
						password: document.getElementById("swal-input2").value,
						type: "login",
					})
					return [
						document.getElementById("swal-input1").value,
						document.getElementById("swal-input2").value,
					]
				},
			})
			.then((result) => {
				if (result.isConfirmed) {
					if (
						result.value[0] &&
						result.value[1] &&
						result.value[0].length &&
						result.value[0].length
					) {
						swalWithBootstrapButtons.fire({
							didOpen: () => {
								swalWithBootstrapButtons.showLoading()
							},
						})
					} else {
						swalWithBootstrapButtons
							.fire({
								icon: "error",
								title: "Please enter a valid email and password",
							})
							.then(() => {
								openLogin()
							})
					}
				} else if (result.isDenied) {
					// create new account
					openRegister()
				} else if (result.isDismissed) {
					// close the modal
					if (pathName.indexOf("user") !== -1) navigate("/")
					swalWithBootstrapButtons.close()
				}
			})
	}

	const openRegister = () => {
		swalWithBootstrapButtons
			.fire({
				html: `<input id="swal-input1" placeholder="First Name" class="swal2-input" required>
			<input id="swal-input2" placeholder="Last Name" class="swal2-input" required>
			<input id="swal-input3" type=email placeholder="Email" class="swal2-input" required>
			<input id="swal-input4" type="password" placeholder="Password" class="swal2-input" required>`,
				confirmButtonText: `Create New Account`,
				showCancelButton: true,
				cancelButtonText: "Cancel",
				denyButtonText: "Back to Login",
				showDenyButton: true,
				focusConfirm: false,
				onClose: () => {
					setFormData({})
				},
				preConfirm: () => {
					setFormData({
						firstname: document.getElementById("swal-input1").value,
						lastname: document.getElementById("swal-input2").value,
						email: document.getElementById("swal-input3").value,
						password: document.getElementById("swal-input4").value,
						type: "register",
					})
					// validate the form data and then return true
					return [
						document.getElementById("swal-input1").value,
						document.getElementById("swal-input2").value,
						document.getElementById("swal-input3").value,
						document.getElementById("swal-input4").value,
					]
				},
			})
			.then((result) => {
				if (result.isConfirmed) {
					if (
						result.value[0] &&
						result.value[1] &&
						result.value[2] &&
						result.value[3] &&
						result.value[0].length &&
						result.value[1].length &&
						result.value[2].length &&
						result.value[3].length
					) {
						swalWithBootstrapButtons.fire({
							didOpen: () => {
								swalWithBootstrapButtons.showLoading()
							},
						})
					} else {
						swalWithBootstrapButtons
							.fire({
								icon: "error",
								title: "Please enter a valid email and password",
							})
							.then(() => {
								openRegister()
							})
					}
				} else if (result.isDenied) {
					openLogin()
				} else if (result.isDismissed) {
					if (pathName.indexOf("user") !== -1) navigate("/")
					swalWithBootstrapButtons.close()
				}
			})
	}

	useEffect(() => {
		if (formData) {
			switch (formData.type) {
				case "login":
					if (
						formData.email &&
						formData.password &&
						formData.email.length &&
						formData.password.length
					) {
						login(formData.email, formData.password)
					}
					break

				case "register":
					if (
						formData.email &&
						formData.password &&
						formData.firstname &&
						formData.lastname
					) {
						register(
							formData.firstname,
							formData.lastname,
							formData.email,
							formData.password
						)
					}
					break
				default:
			}
		}
	}, [formData])
	const login = (email, pass) => {
		if (email.length && pass.length) {
			if (!loadingLogin) {
				setLoadingLogin(true)
				authApi
					.post(`/users/login/`, { email, password: pass })
					.then((response) => {
						setCookie("cs", response.data.csrf, {
							path: "/",
							sameSite: "Strict",
							secure: true,
						})
						setLoggedIn(true)
						setUser(response)
						Toast.fire({
							icon: "success",
							title: "Successfully logged in",
						})
					})
					.catch((e) => {
						swalWithBootstrapButtons
							.fire({
								icon: "error",
								title: "Please enter valid login credentials",
							})
							.then(() => {
								openLogin()
							})
					})
					.finally(() => {
						setLoadingLogin(false)
					})
			}
		}
	}
	const register = (firstname, lastname, email, password) => {
		if (
			firstname.length &&
			lastname.length &&
			email.length &&
			password.length
		) {
			if (!loadingLogin) {
				setLoadingLogin(true)
				authApi
					.post(`/users/register/`, {
						firstname,
						lastname,
						email,
						password,
					})
					.then((response) => {
						setUser(response)
						setCookie("cs", response.data.csrf, {
							path: "/",
							sameSite: "Strict",
							secure: true,
						})
						setLoggedIn(true)
						Toast.fire({
							icon: "success",
							title: "Successfully registered and logged in",
						})
					})
					.catch((e) => {
						if(e.response && e.response.status)
							switch (e.response.status) {
								case 401:
									swalWithBootstrapButtons
										.fire({
											icon: "error",
											title: "User already exists",
										})
										.then(() => {
											openRegister()
										})
									break
								default:
									Toast.fire({
										icon: "error",
										title: "Something went wrong.",
									})
							}
					})
					.finally(() => {
						setLoadingLogin(false)
					})
			}
		}
	}
	const logout = () => {
		if (!loadingLogin) {
			authApi
				.get(`/users/logout/`)
				.then(() => {
					setUser({})
					setLoggedIn(false)
					// we remove the authentication cookie
					removeCookie("cs", { path: "/" })
				})
				.catch(() => {
					Toast.fire({
						icon: "error",
						title: "Something went wrong.",
					})
				})
				.finally(() => setFormData({}))
		}
	}

	// login

	return (
		<GlobalsContent.Provider
			value={{
				cart,
				setCart,
				menuOptions,
				setMenuOptions,
				authApi,
				cartOpen,
				setCartOpen,
				openLogin,
				loggedIn,
				loadingLogin,
				logout,
				user,
				setUser,
				formData,
			}}
		>
			{children}
		</GlobalsContent.Provider>
	)
}

export default GlobalsComponent
