const storeLogin = (username: string, password: string) => {
    try {
        localStorage.setItem(username, password);
    } catch (error) {
        console.error("Error storing login data: ", error);
    }
}

export default storeLogin;