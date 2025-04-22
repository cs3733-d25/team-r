import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {NavbarMGH} from "@/components/NavbarMGH.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [incorrectLogin, setIncorrectLogin] = useState(''); //to add a popup if the user logs in incorrectly

async function handleLogin(){
    if (!username || !password) return;
    try {

        console.log("sending username and password to the server");


        const response = await axios.post("/api/login/", {
            username: username,
            password: password
        })
        console.log("username and password sent to the server");
        console.log("userType: ", response.data.userType);
        if(response.data.message == "User verified"){
            console.log("User verified");
            navigate('/external-map', {
                state: {
                    status: 'logged-in',
                    // Add any other props you want to pass
                }
            })
        }
        else {
            setIncorrectLogin(response.data.message);
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

    //function to ignore login and continue as guest
    const handleGuestLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/external-map');
    }

    return (
        <div className={"bg-primary flex-col h-screen"}>
            <div className={""}>
                <NavbarMGH page={"login"}/>
            </div>
            <div className="flex justify-center items-center bg-[url(/hero-page-3.jpeg)] bg-primary bg-blend-soft-light bg-no-repeat bg-cover h-6/7">
                <div className="bg-white p-5 rounded-lg shadow-md ring-2 text-center w-24/100 min-w-50">
                    <div className={'flex items-center justify-center p-2'}>
                        <img className="logo w-10" src="/mgb.png" alt="Mass General Brigham" />
                        <Label className={"text-2xl font-bold text-foreground"}>
                            Mass General Brigham
                        </Label>
                    </div>
                    <form className="space-y-4">
                        <br />
                        <div>
                            <Label className="block mb-1 text-left">
                                Username:
                            </Label>
                            <Input
                                type="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-ring bg-input rounded"
                            />
                        </div>
                        <div>
                            <Label className="block mb-1 text-left">
                                Password:
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-ring bg-input rounded"
                            />
                        </div>
                        <br />
                        <div id="rememberMe" className="flex items-center space-x-0.5">
                            <Label className={'text-xs pr-1'}>Remember Me:</Label>
                            <Checkbox id="checkbox" name="remember" className={"w-4 transition-all duration-100 text-white"} />
                        </div>
                        <div className="flex justify-between">
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    className="px-4 py-2 bg-mgb-light-blue-600 text-white rounded hover:bg-mgb-light-blue-700 active:bg-mgb-light-blue-800 text-xs"*/}
                            {/*    onClick={(e) => handleGuestLogin(e)}*/}
                            {/*>*/}
                            {/*    Continue as Guest*/}
                            {/*</button>*/}
                            <Button
                                type="submit"
                                onClick={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-foreground transition-colors duration-200"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                    {incorrectLogin && ( //for adding popup if the user logs in with the wrong username and/or password
                        <div>
                            <br />
                            <div className={"flex items-center bg-accent justify-center w-full rounded-md"}>
                                <p className={"inline text-xl p-1 font-bold text-destructive opacity-100"}>!</p>
                                <p className={"inline text-[13px] p-1 font-bold text-foreground font-trade"}>{incorrectLogin}</p> {/* displays error message from server */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
