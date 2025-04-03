import storeLogin from "../hooks/storeLogin.ts";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        storeLogin(email, password);
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 p-5 rounded-lg shadow-md text-center">
                <div className={'flex items-center justify-center p-2'}>
                    <img className="logo w-10" src="/mgb.png" alt="Mass General Brigham" />
                    <div className={'text-xl font-bold'}>
                        <h2>Mass General Brigham</h2>
                    </div>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 text-left">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Guest Login
                        </button>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
