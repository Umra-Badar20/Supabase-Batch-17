import supabase from "./supabase.js";
async function register() {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var password = document.getElementById("password").value;
  var cpassword = document.getElementById("cpassword").value;

  var data = {
    name: name,
    email,
    phone,
    password,
    cpassword,
  };
  if (!name) {
    alert("Name is required");
  } else if (password !== cpassword) {
    alert("Passwords should be identical");
  } else {
    // localStorage.setItem("data",JSON.stringify(data))
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data) console.log(data);
    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      alert(name + " Registered Successfully");
    }

    // window.location.href="/dashboard.html"
  }
}
// function renderData(){

//     var getData = JSON.parse(localStorage.getItem("data"))
//     // console.log(getData);
//    var displayData = document.getElementById("displayData")
//    displayData.innerHTML=`
//       <li> Name: ${getData.name}</li>
//       <li> Email: ${getData.email}</li>
//       <li> Phone: ${getData.phone}</li>
//    `
// }
// renderData()

async function login() {
  event.preventDefault();
  var loginEmail = document.getElementById("loginEmail").value;
  var loginPass = document.getElementById("loginPass").value;
  // var getData = JSON.parse(localStorage.getItem("data"))
  // console.log(loginEmail,getData.email, loginPass,getData.password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: loginPass,
  });
  if (data) console.log(data);
  if (error) {
    console.log(error);
    alert(error.message);
  } else {
    alert("Login Successful");
  }
  // window.location.href = "/dashboard.html";
}

function logout() {
  window.location.href = "/";

}
const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)

  if (event === 'INITIAL_SESSION') {
    alert("Welcome to my website, Please login or signup to continue")
  } else if (event === 'SIGNED_IN') {
    alert("Login Successful");
    window.location.href = "/dashboard.html";
  } 
})


window.register = register;
window.login = login;
window.logout = logout;
