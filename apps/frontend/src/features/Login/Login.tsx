import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar.tsx";
import axios from "axios";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [incorrectLogin, setIncorrectLogin] = useState(''); //to add a popup if the user logs in incorrectly

    // useEffect(() => {
    //     fetch('/api/login')
    //         .then(res => res.json())
    //         .then((data) => setIncorrectLogin(data.message))
    // })

////////////////////////////////////////////////////////////////////////////
async function handleLogin(){
    if (!username || !password) return;
    try {
        /////////////////////////////////////////////////////////////////
        //client side console.logs will be seen in the browser (inspect)
        console.log("sending username and password to the server");

        //axios will handle the content-type and header for you, just need to set the body
        const response = await axios.post("/api/login/", {
            //////////////////////////////////////////////////////////////////////////////
            //here is where we are setting the body that will be sent to the server
            //backend needs to know what variables you are sending and what the are called
            username: username,
            password: password
        })
        console.log("username and password sent to the server");
        console.log("response.data is an object: ", response.data);
        ////////////////////////////////////////////////////////////////////////////////////
        //example - getting userType from backend - now use this information to decide display
        console.log("userType: ", response.data.userType);
        if(response.data.message == "User verified"){
            console.log("yippee user is verified");
            navigate('/directory');
        }
        //clear();
    } catch (error) {
        console.log(error);
    }
}

    

    const storeLogin = (username: string, password: string) => {
        try {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        } catch (e) {
            console.error('Error storing login data:', e);
        }
    }

    //function to login user to the application if they sign in as admin
    // const handleLogin = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     storeLogin(username, password);
    //     /*
    //     if (username == "admin" && password == "admin") {
    //         navigate('/directory'); //successful login
    //     }
    //     else {
    //         //unsuccessful login
    //         setIncorrectLogin(true);
    //     }*/
    // }

    //function to ignore login and continue as guest
    const handleGuestLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/directory');
    }

    return (
        <div className={"bg-[#449aa4] flex-col h-screen"}>
            <div className={""}>
                <NavBar page={"login"}/>
            </div>
            <div className="flex justify-center items-center bg-[url(/heropage.jpeg)] bg-gray-500 bg-blend-soft-light bg-no-repeat bg-cover h-6/7">
                <div className="bg-gray-100 p-5 rounded-lg shadow-md ring-2 text-center w-24/100">
                    <div className={'flex items-center justify-center p-2'}>
                        <img className="logo w-10" src="/mgb.png" alt="Mass General Brigham" />
                        <div className={'text-xl font-bold font-sans'}>
                            <h2>Mass General Brigham</h2>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-left">
                                Username:
                                <input
                                    type="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border border-gray-300 bg-white rounded"
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block mb-1 text-left">
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 bg-white rounded"
                                />
                            </label>
                        </div>
                        <div id="rememberMe" className="flex items-center space-x-0.5">
                            <label className={'text-xs'}>Remember Me:</label>
                            <input id="checkbox" type="checkbox" name="remember" />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 text-xs"
                                onClick={(e) => handleGuestLogin(e)}
                            >
                                Continue as Guest
                            </button>
                            <button
                                type="submit"
                                onClick={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {incorrectLogin == "User verified" && ( //for adding popup if the user logs in with the wrong username and/or password
                        <div>
                            <br />
                            <div className={"flex items-center bg-[#ff0000]/50 justify-center w-full rounded-md"}>
                                <p className={"inline text-xl p-1 font-bold text-[#c50101] opacity-100"}>!</p>
                                <p className={"inline text-xs p-1 font-bold text-[#151A1A]"}>Username and/or password are incorrect.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
