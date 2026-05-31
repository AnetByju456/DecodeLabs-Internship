


const loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim();

            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;

            const selectedRole =
                document.querySelector(
                    'input[name="userRole"]:checked'
                );

            if (!selectedRole) {

                alert(
                    "Please select Buyer or Seller"
                );

                return;

            }

            const role =
                selectedRole.value;

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailRegex.test(
                    email
                )
            ) {

                alert(
                    "Enter valid email"
                );

                return;

            }

            if (
                password.length < 8
            ) {

                alert(
                    "Password minimum 8 characters"
                );

                return;

            }

            localStorage.setItem(
                "userRole",
                role
            );

            localStorage.setItem(
                "userLoggedIn",
                "true"
            );

            window.location.href =
                "dashboard.html";

        }

    );

}

/* =========================
   SHOW PASSWORD
========================= */

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const input = document.getElementById(targetId);

        if (input.type === "password") {

            input.type = "text";
            button.textContent = "Hide";

        } else {

            input.type = "password";
            button.textContent = "Show";
        }

    });

});

/* =========================
   REGISTER VALIDATION
========================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const email = document.getElementById("email").value.trim();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (name.length < 3) {

            alert("Name must contain at least 3 characters");
            return;
        }


        if (!emailRegex.test(email)) {

            alert("Please enter a valid email address");

            return;
        }

        if (!/^\d{10}$/.test(phone)) {

            alert("Enter a valid 10-digit phone number");
            return;
        }

        if (!passwordRegex.test(password)) {

            alert(
                "Password must contain 8 characters, one uppercase letter, one lowercase letter and one number."
            );

            return;
        }

        if (password !== confirmPassword) {

            alert("Passwords do not match");
            return;
        }

        alert("Registration Successful");

        window.location.href = "login.html";
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


function filterProducts() {

    if (
        !searchInput ||
        !categoryFilter
    ) return;

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    productCards.forEach(card => {

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

        if (
            matchesSearch &&
            matchesCategory &&
            matchesType
        ) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";
        }

    });


    sortProducts();

    // keep empty state visibility updated after filtering
    updateEmptyState();
}

/* SEARCH */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );
}

/* CATEGORY */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );
}

/* TYPE FILTER */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

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

function sortProducts() {

    const productGrid =
        document.querySelector(".product-grid");

    if (!productGrid) return;

    const cards =
        Array.from(
            productGrid.querySelectorAll(".product-card")
        );

    if (!sortSelect)
        return;

    const sortValue =
        sortSelect.value;

    if (sortValue === "low") {

        cards.sort((a, b) =>
            Number(a.dataset.price) -
            Number(b.dataset.price)
        );

    }

    else if (sortValue === "high") {

        cards.sort((a, b) =>
            Number(b.dataset.price) -
            Number(a.dataset.price)
        );

    }

    cards.forEach(card => {

        productGrid.appendChild(card);

    });

}

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        sortProducts
    );

}


const themeToggle =
    document.getElementById(
        "themeToggle"
    );

if (
    localStorage.getItem(
        "theme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark-theme"
    );

}

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-theme"
            );

            localStorage.setItem(

                "theme",

                document.body.classList.contains(
                    "dark-theme"
                )

                    ?

                    "dark"

                    :

                    "light"

            );

        });

}

/* =========================
ACTIVE NAV
========================= */

let currentPage = window.location.pathname.split("/").pop();
if (!currentPage) currentPage = "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("active");
});



const emptyStateEl = document.getElementById("emptyState");

function updateEmptyState() {
    if (!emptyStateEl) return;
    const visible = Array.from(productCards).some(p => p.style.display !== "none");
    emptyStateEl.style.display = visible ? "none" : "block";
}

updateEmptyState();



const sellerView =
    document.getElementById(
        "sellerView"
    );

const buyerView =
    document.getElementById(
        "buyerView"
    );

const dashboardTitle =
    document.getElementById(
        "dashboardTitle"
    );

const dashboardSubtitle =
    document.getElementById(
        "dashboardSubtitle"
    );

if (
    sellerView &&
    buyerView
) {

    const role =
        localStorage.getItem(
            "userRole"
        );

    /* SELLER */

    if (
        role === "seller"
    ) {

        sellerView.style.display =
            "block";

        buyerView.style.display =
            "none";

        dashboardTitle.textContent =
            "Welcome Seller";

        dashboardSubtitle.textContent =
            "Manage listings and requests.";

    }

    /* BUYER */

    else if (
        role === "buyer"
    ) {

        buyerView.style.display =
            "block";

        sellerView.style.display =
            "none";

        dashboardTitle.textContent =
            "Welcome Buyer";

        dashboardSubtitle.textContent =
            "Browse products and manage orders.";

    }

    /* DEFAULT */

    else {

        buyerView.style.display =
            "block";

        sellerView.style.display =
            "none";

        dashboardTitle.textContent =
            "Welcome";

        dashboardSubtitle.textContent =
            "Explore TradeMart.";

    }

}

const requestForm =
    document.getElementById(
        "requestForm"
    );

if (
    requestForm
) {

    requestForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            window.location.href =
                "cart.html";

        }

    );

}


const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

if (
    checkoutForm
) {

    checkoutForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            alert(
                "Order placed successfully!"
            );

            window.location.href =
                "dashboard.html";

        }

    );
}


document.addEventListener(
    "gesturestart",
    function (e) {

        e.preventDefault();

    }
);


/* =========================
MENU
========================= */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );

if (
    menuBtn &&
    navLinks
) {

    let menuOpen =
        false;

    /* OPEN / CLOSE */

    menuBtn.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            menuOpen =
                !menuOpen;

            if (menuOpen) {

                navLinks.classList.add(
                    "active"
                );

            } else {

                navLinks.classList.remove(
                    "active"
                );

            }

        });

    /* CLICK OUTSIDE */

    document.addEventListener(
        "click",
        (e) => {

            if (

                menuOpen &&

                !navLinks.contains(
                    e.target
                )

                &&

                !menuBtn.contains(
                    e.target
                )

            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuOpen =
                    false;

            }

        });

    /* KEEP OPEN INSIDE */

    navLinks.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

        });

    /* CLOSE WHEN LINK CLICKED */

    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuOpen =
                        false;

                });

        });

    /* CLOSE ON SCROLL */

    window.addEventListener(
        "scroll",
        () => {

            if (menuOpen) {

                navLinks.classList.remove(
                    "active"
                );

                menuOpen =
                    false;

            }

        });

}