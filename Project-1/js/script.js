const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const email =
        document.getElementById("loginEmail").value.trim();

        const password =
        document.getElementById("loginPassword").value;

        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){

            alert("Please enter a valid email address");

            return;
        }

        if(password.length < 8){

            alert("Password must contain at least 8 characters");

            return;
        }

        alert("Login Successful (Frontend Demo)");

    });

}

/* =========================
   SHOW PASSWORD
========================= */

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const input = document.getElementById(targetId);

        if(input.type === "password"){

            input.type = "text";
            button.textContent = "Hide";

        }else{

            input.type = "password";
            button.textContent = "Show";
        }

    });

});

/* =========================
   REGISTER VALIDATION
========================= */

const registerForm = document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name=document.getElementById("name").value.trim();

        const phone=document.getElementById("phone").value.trim();

        const email = document.getElementById("email").value.trim();

        const emailRegex =
                 /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const password=document.getElementById("password").value;

        const confirmPassword=document.getElementById("confirmPassword").value;

        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if(name.length < 3){

            alert("Name must contain at least 3 characters");
            return;
        }


        if(!emailRegex.test(email)){

            alert("Please enter a valid email address");

             return;
        }
 
        if(!/^\d{10}$/.test(phone)){

            alert("Enter a valid 10-digit phone number");
            return;
        }

        if(!passwordRegex.test(password)){

            alert(
                "Password must contain 8 characters, one uppercase letter, one lowercase letter and one number."
            );

            return;
        }

        if(password !== confirmPassword){

            alert("Passwords do not match");
            return;
        }

        alert("Registration Successful (Frontend Demo)");

    });

}

/* =========================
   MARKETPLACE FILTERS
========================= */

const filterButtons =
document.querySelectorAll(".filter-btn");

const products =
document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active-filter");
        });

        button.classList.add("active-filter");

        const filter =
        button.dataset.filter;

        products.forEach(product => {

            const type =
            product.dataset.type;

            if(filter === "all"){

                product.style.display = "block";

            }
            else if(type === filter){

                product.style.display = "block";

            }
            else{

                product.style.display = "none";
            }

        });

    });

});