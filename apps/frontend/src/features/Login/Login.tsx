import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { useAuth0 } from "@auth0/auth0-react";
//auth0 variables

interface loginProps {
    onLogin?: () => void;
}
function Login({ onLogin }: loginProps): JSX.Element {
    const navigate = useNavigate();
    const [incorrectLogin, setIncorrectLogin] = useState(''); //to add a popup if the user logs in incorrectly

    const [userTypeButtons, setUserTypeButtons] = useState(false);
    const [selectedUserType, setSelectedUserTpye] = useState<string | null>(null);

    const signUpClick = () => {
        setUserTypeButtons(true);
    }

    const handleUserType = async (userType: string) => {
        setSelectedUserTpye(userType);
        //save in local storage to later use for DB save
        localStorage.setItem("signup_role", userType);
        await loginWithRedirect({
            authorizationParams: {
                screen_hint: "signup", // tells Auth0 to show Signup instead of Login
            },
        });
    }
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    async function auth0Login() {
        if(!isAuthenticated){
            loginWithRedirect();
        } else{
            //get the username from auth0 and check the usertype from the database
            const email = user?.email;
            try{
                const response = await axios.post('/api/login/usertype', email);
                navigate('/external-map', {
                    state: {
                        status: 'logged-in',
                        userType: response.data.userType,
                    },
                });

            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        async function handleSignUp(){
            const userType = localStorage.getItem("signup_role");
            console.log("inside useeffect: ", userType);
            if(isAuthenticated && userType && user?.email){
                try{
                    await axios.post('/api/login/signup', {
                        userType: userType,
                        email: user?.email,
                        id: user?.name,
                    })
                    localStorage.removeItem("signup_role");
                } catch (error) {
                    console.error(error);
                }
            }
        }
        if(isAuthenticated){
            handleSignUp();
        }

    },[isAuthenticated, user]);

    return (
        <div className={'bg-primary flex-col h-screen'}>
            <div className="flex justify-center items-center bg-[url(/hero-page-3.jpeg)] bg-primary bg-blend-soft-light bg-no-repeat bg-cover h-6/7">
                <div className="bg-white p-5 rounded-lg shadow-md ring-2 text-center w-24/100 min-w-50">
                    <div className={'flex items-center justify-center p-2'}>
                        <img className="logo w-10" src="/mgb.png" alt="Mass General Brigham" />
                        <Label className={'text-2xl font-bold text-foreground'}>
                            Mass General Brigham
                        </Label>
                    </div>
                            <Button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    //handleLogin();
                                    auth0Login();
                                }}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-foreground transition-colors duration-200"
                            >
                                Login
                            </Button>
                    {!userTypeButtons && (
                        <Button
                            onClick={signUpClick}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-foreground transition-colors duration-200"
                        >
                            Sign Up
                        </Button>
                    )}
                    {userTypeButtons && (
                        <div className="flex flex-col gap-4 mt-4">
                            <h2 className="text-lg font-bold">Select User Type:</h2>
                            <Button
                                onClick={() => handleUserType("admin")}

                            >
                                Admin
                            </Button>
                            <Button
                                onClick={() => handleUserType("employee")}
                            >
                                Employee
                            </Button>
                            <Button
                                onClick={() => handleUserType("patient")}

                            >
                                Patient
                            </Button>
                        </div>
                    )}


                    {incorrectLogin && ( //for adding popup if the user logs in with the wrong username and/or password
                        <div>
                            <br />
                            <div
                                className={
                                    'flex items-center justify-center w-full rounded-md bg-destructive/40 border border-accent-foreground'
                                }
                            >
                                <p
                                    className={
                                        'inline text-xl p-1 font-bold text-destructive opacity-100'
                                    }
                                >
                                    !
                                </p>
                                <p
                                    className={
                                        'inline text-[13px] p-1 font-bold text-foreground font-trade'
                                    }
                                >
                                    {incorrectLogin}
                                </p>{' '}
                                {/* displays error message from server */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
