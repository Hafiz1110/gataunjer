


function logout() {
    sessionStorage.removeItem("name");
    window.location.href = "login.html";
}


function login() {
    sessionStorage.setItem("name", name);
    window.location.href = "login.html";
}

