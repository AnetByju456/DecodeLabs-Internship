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
   COMBINED MARKETPLACE FILTER
========================= */

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const filterButtons =
document.querySelectorAll(".filter-btn");

const productCards =
document.querySelectorAll(".product-card");

let currentType = "all";

/* MAIN FILTER FUNCTION */

function filterProducts(){

    const searchText =
    searchInput.value.toLowerCase();

    const selectedCategory =
    categoryFilter.value;

    productCards.forEach(card=>{

        const title =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

        const category =
        card.dataset.category;

        const type =
        card.dataset.type;

        const matchesSearch =
        title.includes(searchText);

        const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

        const matchesType =
        currentType === "all" ||
        type === currentType;

        if(
            matchesSearch &&
            matchesCategory &&
            matchesType
        ){

            card.style.display = "flex";

        }else{

            card.style.display = "none";
        }

    });


    sortProducts();
}

/* SEARCH */

if(searchInput){

    searchInput.addEventListener(
        "input",
        filterProducts
    );
}

/* CATEGORY */

if(categoryFilter){

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );
}

/* TYPE FILTER */

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove(
                "active-filter"
            );

        });

        button.classList.add(
            "active-filter"
        );

        currentType =
        button.dataset.filter;

        filterProducts();

    });

});


/* =========================
   SORTING
========================= */

const sortSelect =
document.getElementById("sort");

function sortProducts(){

    const productGrid =
    document.querySelector(".product-grid");

    if(!productGrid) return;

    const cards =
    Array.from(
        productGrid.querySelectorAll(".product-card")
    );

    const sortValue =
    sortSelect.value;

    if(sortValue === "low"){

        cards.sort((a,b)=>
            Number(a.dataset.price) -
            Number(b.dataset.price)
        );

    }

    else if(sortValue === "high"){

        cards.sort((a,b)=>
            Number(b.dataset.price) -
            Number(a.dataset.price)
        );

    }

    cards.forEach(card=>{

        productGrid.appendChild(card);

    });

}

if(sortSelect){

    sortSelect.addEventListener(
        "change",
        sortProducts
    );

}


const themeToggle =
document.getElementById(
"themeToggle"
);

if(themeToggle){

themeToggle.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark-theme"
);

themeToggle.textContent =
document.body.classList.contains(
"dark-theme"
)

? "☀️"
: "🌙";

}

);

}

/* =========================
ACTIVE NAV
========================= */

const currentPage =
window.location.pathname
.split("/")
.pop();

document
.querySelectorAll(
".nav-links a"
)
.forEach(link=>{

const href =
link.getAttribute(
"href"
);

if(href===currentPage){

link.classList.add(
"active"
);

}

});



const visible =

Array.from(
productCards
)

.some(
p=>
p.style.display!=="none"
);

document
.getElementById(
"emptyState"
)
.style.display=

visible
? "none"
: "block";