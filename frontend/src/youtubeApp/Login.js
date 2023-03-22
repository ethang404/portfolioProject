import { useParams, useNavigate, Routes, Route, Link } from "react-router-dom";
import { useEffect,useState } from "react";

import jwt_decode from "jwt-decode"

import YouTubeHomePage from "./Homepage";

export default function Login() {
	const navigate = useNavigate()

	const [user, setUser] = useState({})
	const [token,setToken] = useState("")

	function handleLogin(response){
		console.log("call back response",response)
		console.log("encoded JWT", response.credential)
		var access_token = response.credential
		setToken(response.credential)
		var userObj = jwt_decode(response.credential)
		console.log(userObj)
		setUser(userObj)

		if(user){
			console.log("test")
			localStorage.setItem("accessToken", JSON.stringify(response.credential));
			navigate("/Project/YoutubeApp/Home",{replace:true})
		}
		else{
			alert("There has been an error with Login")
		}
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_CLIENT_ID,
			callback: handleLogin
		})

		google.accounts.id.renderButton(document.getElementById("SignIn"),{theme:"outline",size: "large"})
	},[])

	async function googleOAuth() {
		//	<Navigate to="https://accounts.google.com/o/oauth2/auth?response_type=token&scope=https://www.googleapis.com/auth/youtube&redirect_uri=http://localhost:3000/Project/YoutubeApp/Home&client_id=97845079356-jftb8q0tkc7tkr36o9qpujpcp34a8sr5.apps.googleusercontent.com" />;
		//const { access_token } = useParams();

		
	}

	return (
		<div>
			<Routes>
				<Route exact path="/Project/YoutubeApp/Home" element={<YouTubeHomePage token={token} user={{user}} />}></Route>

			</Routes>
		
			<div id="SignIn"></div>


			This is my Login page(for OAUTH)
			<a href="https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/youtube&redirect_uri=http://localhost:3000/Project/YoutubeApp/Home&client_id=97845079356-jftb8q0tkc7tkr36o9qpujpcp34a8sr5.apps.googleusercontent.com">
				Click here to do request thing
			</a>
			<button onClick={googleOAuth}>Button to navigate</button>
		</div>
	);
}