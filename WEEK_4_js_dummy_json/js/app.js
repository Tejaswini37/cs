function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (
    validate(username, 3, 20, "username") &&
    validate(password, 3, 20, "password")
  )
    authenticate(username, password);
  else return;
}
function validate(value, min, max, field) {
  const errorElement = document.getElementById(field + "Error");
  errorElement.innerHTML = "";
  if (value.length < min) {
    errorElement.innerHTML = `${field} must be atleast ${min} characters`;
    return false;
  }
  if (value.length > max) {
    errorElement.innerHTML = `${field} must be less than ${max} characters`;
    return false;
  }
  return true;
}
// function showerrorMessage(text){
//     message.innerHTML=text;
// }
async function authenticate(username, password) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      //   credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful");
      localStorage.setItem("token", data.accessToken);
      // console.log(data);
      location.replace("dashboard.html");
    } else {
      // showerrorMessage()
      alert(data.message);
      // console.log(data);
    }
  } catch (error) {
    alert("something went wrong");
    console.error(error);
  }
}

function redirectIfLoggedIn(){
  const token=localStorage.getItem("token");
  if(token) location.replace("dashboard.html");
}
