import '../EmailPassword.css';

function EmailPassword() {
    return (
        <div className="centered-container">
            <div className="form-container">
                <img src="/mgb.png" alt="Mass General Brigham" className="logo" width={50} />
                <h2>Mass General Brigham Login</h2>
                <form>
                    <label>
                        Email:
                        <input type={'email'} name={'email'} />
                    </label>
                    <label>
                        Password:
                        <input type={'password'} name={'password'} placeholder="" />
                    </label>
                    <div id={'rememberMe'}>
                        <div className={'flex'}>
                            <label>Remember Me:</label>
                            <input id={'checkbox'} type={'checkbox'} name={'remember'}/>
                        </div>
                    </div>
                    <div className={"fle"}>
                        <button type="submit">Login</button>
                        <button type="submit">Guest Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmailPassword;
