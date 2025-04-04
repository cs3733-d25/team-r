var storeLogin = function (username, password) {
    try {
        localStorage.setItem(username, password);
    }
    catch (error) {
        console.error("Error storing login data: ", error);
    }
};
export default storeLogin;
