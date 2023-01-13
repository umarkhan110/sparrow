import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Toast } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/authentication/Logout'
// import Swal from 'sweetalert2'
import { navList } from './NavbarList'
import { onMessageListener } from '../../firebase/FireBase'
import { Online } from 'react-detect-offline'
// import { deleteToken, getMessaging } from 'firebase/messaging'
// import { requestForToken } from '../../firebase/Token'
import { deleteTokenFunc } from '../../firebase/deleteToken'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'
// import AuthContext from '../../context/AuthContext'

const DashboardNav = () => {
	// const app = initializeApp(firebaseConfig);
	// const db = getFirestore(app)

	const auth = useContext(AuthContext);

	const [expanded, setExpanded] = useState(false);

	// for showing dot icon in sideBar
	useEffect(() => {
		// debugger
		const unreadNotifications = auth?.notifications?.filter((item) => {
			return item.read_at === null
		})
		if (unreadNotifications?.length > 0) {
			// 571 id is for bell icon 
			if (document.getElementById("571")) {
				let id = document.getElementById("571")
				id.classList.add("dot")
			}
		};
	}, [auth?.notifications])

	// loder
	const [loader, setLoader] = useState(false)
	const showMenuu = (e) => {
		e.target.closest(".actionContent").classList.toggle("block");
	}

	// logout
	const navigate = useNavigate()
	const { handleSubmit, formState: { errors } } = useForm();

	const logOut = async () => {

		setLoader(true)
		const data = {
			email: JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.email
		}
		// debugger
		const resp = await logout(data);

		if (resp.status !== 200) {
			// Swal.fire({
			// 	title: resp.data.message,
			// 	timer: 1500,
			// 	icon: 'error',
			// 	showConfirmButton: false,
			// })
			// due to unauthorized 401 error
			// removing notification states from useContext

			// auth.clearNotifications()
			// localStorage.removeItem('sparrowSignIn');
			// setTimeout(() => {
			// 	navigate("/signin");
			// }, 500);


			// removing token
			// removing from local storage
			// await deleteTokenFunc().then(async (isDeleted) => {
			// 	if (isDeleted) {
			// 		// console.log(isDeleted)
			// 		localStorage.removeItem('sparrowSignIn');
			// 		setTimeout(() => {
			// 			navigate("/signin");
			// 		}, 500);
			// 	}
			// }).catch((err) => {
			// 	console.log("An error occurred while retrieving token. ", err);
			// });

		} else {
			// removing notification states from useContext
			auth.clearNotifications()
			localStorage.removeItem('sparrowSignIn');
			setTimeout(() => {
				navigate("/signin");
			}, 500);
			// removing token and from local storage
			// await deleteTokenFunc().then(async (isDeleted) => {
			// 	if (isDeleted) {
			// 		localStorage.removeItem('sparrowSignIn');
			// 		setTimeout(() => {
			// 			navigate("/signin");
			// 		}, 500);
			// 	}
			// }).catch((err) => {
			// 	console.log("An error occurred while retrieving token. ", err);
			// });
		}

	}

	// firebase notifications
	useEffect(() => {
		requestPermission();
	}, []);

	function requestPermission() {
		// check for iPhone
		// check for https location.protocol !== 'https:'
		if (window.navigator.platform != 'iPhone') {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					// console.log("Notification permission granted.");
				}
			});
		}
	}
	// toster show
	const [show, setShow] = useState(false);
	// notify is printing in console
	const [notification, setNotification] = useState({ title: "", body: "" });
	// setting show true so react toast will be shown
	const notify = () => setShow(true);

	onMessageListener()
		.then((payload) => {
			setNotification({
				title: payload?.notification?.title,
				body: payload?.notification?.body,
			});
		}).catch((err) => console.log("failed: ", err));


	useEffect(() => {
		if (notification?.title) {
			notify();
		}
	}, [notification]);



	// loggin icon work
	const [iconAfterLogedIn, setIconAfterLogedIn] = useState(false);

	const loginIcon = (item) => {
		if (!iconAfterLogedIn) {
			return (
				setIconAfterLogedIn(<div className='actionContent'>
					<Online><div className='colorGreen'></div></Online>

					<img className='userHedrImg' onClick={showMenuu} src={JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.image} alt="" />

					{loader ?
						<div className="dropdownn setLogoutWidth">
							<form className="dropdown-contentt">
								<div className="relative">
									<div className="loader alignLoader"></div>
									<span>Log Out</span>
								</div>
							</form>
						</div>
						:
						<div className="dropdownn">
							<form className="dropdown-contentt">
								<span onClick={handleSubmit(logOut)} >Log Out</span>
								<Link to={JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role === "client" ? "/dashboardRoute/customer-profile/" : JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role === "student" ? "/dashboardRoute/student-profile/" : ""}>
									<span>Profile</span>
								</Link>
							</form>
						</div>
					}
				</div>)
			)
		}
	}


	return (
		<div className='dashboardheader'>
			<Toast className='ToatserSparrow' onClose={() => setShow(false)} show={show} delay={4000} autohide>
				<Toast.Header>
					{notification?.title}
				</Toast.Header>
			</Toast>
			<Navbar expanded={expanded} expand="lg">
				<img className='blockipad MENUImg' src="/assets/images/Menu.png" alt="" />
				<Container>
					{/* <span onClick={dot}>Test</span> */}
					<div className='headerLeft'>
						<Link to="/" className='setResonive'><img src="/assets/images/signUpNav/Group 666.svg" alt="" /></Link>
						<Link to="/" className='d-none makeMobileOnly'><img src="/assets/images/signUpNav/newLogoWithHeight100.svg" alt="" /></Link>

					</div>

					{/* show if system is logged in mobile*/}
					<div className='d-none makeMobileOnly also_in_tablet'>{iconAfterLogedIn && iconAfterLogedIn}</div>

					<div className='headerRight'>
						<Navbar.Toggle aria-controls="basic-navbar-nav" data-toggle="collapse" data-target="#basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setExpanded(expanded ? false : "expanded")} />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								{
									navList.map((item) => {
										return <>
											{item.imageName === "Image" && JSON.parse(localStorage.getItem('sparrowSignIn')) ?
												<>
													{loginIcon(item)}
													<div className='none'>{iconAfterLogedIn && iconAfterLogedIn}</div>
												</>
												:
												item.taskName === "Create Task" && JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role === "client" ? <Link to={item.link} className='primary dashboardHederBtn'>{item.taskName}</Link>
													:
													item.auth === "Sign In" && !(JSON.parse(localStorage.getItem('sparrowSignIn'))) ? <Link to={item.link} className='primary dashboardHederBtn'>{item.auth}</Link>
														:
														""
											}
											{item.link === "/" ? 
												<NavLink end to={item.link}>{item.name}</NavLink>
												 :  
												 	item.type === 'global' ?
												 		<NavLink data-toggle="collapse" to={item.link} onClick={() => setExpanded(false)} >{item.name}</NavLink>
													: 
														null
											}

										</>
									})
								}
							</Nav>
						</Navbar.Collapse>
					</div>

				</Container>
			</Navbar>
		</div>
	)
}

export default DashboardNav