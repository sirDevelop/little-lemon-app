import React, { useContext, useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { useCookies } from "react-cookie"


const GlobalsContent = React.createContext()

export function useGlobals() {
	return useContext(GlobalsContent)
}

const GlobalsComponent = ({ children }) => {
	const [cookie, setCookie, removeCookie] = useCookies(["cart"])
	const [cartOpen, setCartOpen] = useState(false)
	const [cart, setCart] = useState([])
	const axiosApi = useMemo(() => {
		return axios.create({ baseURL: "http://localhost:9000/api/" })
	}, [])

	const [menuOptions, setMenuOptions] = useState([])

	useEffect(() => {
		axiosApi
			.get("/menuOptions/getMenuOptions")
			.then((response) => {
				setMenuOptions(response.data.getAllMenuOptions)
			})
			.catch((error) => {
				alert("something went wrong")
			})
	}, [])


	// login

	const navigate = useNavigate()
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

	// do not allow users to click login button if already logging in
	const [loadingLogin, setLoadingLogin] = useState(false)

	const [loggedIn, setLoggedIn] = useState()

	// autologin if the cookie gets stored in the frontend
	const authApi = axios.create({
		baseURL: "http://localhost:9000/",
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${cookie.cs}`,
		},
	})

	useEffect(() => {
		if (loggedIn === undefined && !loadingLogin) {
			authApi
				.get(`/api/users/get/`)
				.then((data) => {
					setUser(data)
					setLoggedIn(true)
				})
				.catch(() => {
					setLoggedIn(false)
				})
		}
	}, [authApi, loadingLogin, loggedIn, user])

	// authentication
	// email, password sent to server side from client. Server validate email and password
	// server generates 2 tokens, one for client and one for server
	// server stores the server side to mongoDB, and client token back to client side
	// when client receives it, client stores it as a cookie with setCookie("cs")
	// when cookies is stored, we will autologin next time

	const [formData, setFormData] = useState({})
	const [isLogin, setIsLogin] = useState(false)

	const openLogin = () => {
		setIsLogin(true);
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: "btn btn-success",
			  cancelButton: "btn btn-warning"
			},
			buttonsStyling: false
		  });

		const { value: formValues } = swalWithBootstrapButtons.fire({
			html:
			`<input id="swal-input1" type="email" placeholder="Email" class="swal2-input" required>
			<input id="swal-input2" type="password" placeholder="Password" class="swal2-input" required>`
			,
			confirmButtonText:
				`Login`,
			showCancelButton: true,
			cancelButtonText: "Create New Account",
			focusConfirm: false,
			preConfirm: () => {
				setFormData({ email: document.getElementById("swal-input1").value, password: document.getElementById("swal-input2").value })
				// validate the form data and then return true
				return true
			}
		}).then((result) => {
			if (result.isConfirmed) {
				if (formData.email && formData.password) {
					Swal.fire({
						didOpen: () => {
							Swal.showLoading()
						}
					})
				} else {
					Swal.fire({
						icon: "error",
						title: "Please enter a valid email and password",
					})
				}
			} else if (result.isDismissed) {
				createNewAccount()
			}
		})
	}
	// do the register later today
	useEffect(() => {
		console.log(isLogin);
		if (formData && formData.email && formData.password && isLogin) {
			login(formData.email, formData.password)
			console.log(1)
		} else if (formData && formData.email && formData.password && formData.firstname && formData.lastname && !isLogin) {
			register(formData.firstname, formData.lastname, formData.email, formData.password)
		}
	}, [formData])

	// code doesnt work not sure why
	const createNewAccount = () => {
		setIsLogin(false);
		const { value: formValues } = Swal.fire({
			html:
			`<input id="swal-input1" placeholder="First Name" class="swal2-input" required>
			<input id="swal-input2" placeholder="Last Name" class="swal2-input" required>
			<input id="swal-input3" type=email placeholder="Email" class="swal2-input" required>
			<input id="swal-input4" type="password" placeholder="Password" class="swal2-input" required>`
			,
			confirmButtonText:
				`Create Account`,
			focusConfirm: false,
			preConfirm: () => {
				setFormData({ firstname: document.getElementById("swal-input1").value, lastname: document.getElementById("swal-input2").value, email: document.getElementById("swal-input3").value, password: document.getElementById("swal-input4").value })
				// validate the form data and then return true
				return true
			}
		}).then((result) => {
			if (result.isConfirmed) {
				console.log('formData', formData)
				if (formData.firstname && formData.lastname && formData.email && formData.password) {
					Swal.fire({
						didOpen: () => {
							Swal.showLoading()
						}
					})
				} else {
					Swal.fire({
						icon: "error",
						title: "Please enter valid inputs",
					})
				}
			}
		})
	}
	const login = (email, pass) => {
		if (email.length && pass.length) {
			if (!loadingLogin) {
				setLoadingLogin(true)
				authApi
					.post(`/api/users/login/`, { email, password: pass })
					.then((response) => {
						setUser(response)
						setCookie("cs", response.data.csrf, {
							path: "/", sameSite: "Strict",
							secure: true
						})
						setLoggedIn(true)
						navigate("/")
						Toast.fire({
							icon: "success",
							title: "Successfully logged in",
						})
					})
					.catch((Error) => {
						Toast.fire({
							icon: "error",
							title: "Something went wrong",
						})
					})
					.finally(() => {
						setLoadingLogin(false)
					})
			}
		}
	}
	const register = (firstname, lastname, email, pass) => {
		if (firstname.length && lastname.length && email.length && pass.length) {
			if (!loadingLogin) {
				setLoadingLogin(true)
				authApi
					.post(`/api/users/register/`, { firstname, lastname, email, pass })
					.then((response) => {
						setUser({ ...user, email: response.data.email })
						setCookie("cs", response.data.csrf, {
							path: "/", sameSite: "Strict",
							secure: true
						})
						setLoggedIn(true)
					})
					.catch(() => {
						Toast.fire({
							icon: "error",
							title: "Something went wrong.",
						})
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
				.get(`/api/users/logout/`)
				.then(() => {
					setUser({})
					setLoggedIn(false)

					// we remove the authentication cookie
					removeCookie("cs", { path: "/", })
				})
				.catch(() => {
					Toast.fire({
						icon: "error",
						title: "Something went wrong.",
					})
				})
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
				axiosApi,
				cartOpen,
				setCartOpen,
				openLogin,
				loggedIn
			}}
		>
			{children}
		</GlobalsContent.Provider>
	)
}

export default GlobalsComponent
