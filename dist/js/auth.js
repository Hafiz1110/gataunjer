let user = [];

async function MemuatUser() {
    try {
        const response = await fetch("js/user.json");
        if (!response.ok) {throw new Error("Network response was not ok");}
        user = await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
MemuatUser();

async function login() {

    if (user.length === 0) {
        await MemuatUser();
    }

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let ditemukan = false;
    for (let i = 0; i < user.length; i++) {
        if (user[i].email === email && user[i].password === password) {
            sessionStorage.setItem("name", user[i].name);
            window.location.href = "index.html";
            ditemukan = true;
            break;
        }
    }
    if (!ditemukan) {
        alert("Email atau password salah!");
    }
}



