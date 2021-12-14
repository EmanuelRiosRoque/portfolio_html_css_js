console.clear();

/*------------------ Preferencia Day/Dark Mode  -------------- */
document.addEventListener('DOMContentLoaded', () => {
    preferencesMode();
});


function preferencesMode() {
    const preferenceMode = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log(preferenceMode.matches);

    if (preferenceMode.matches) {
        document.body.classList.add("dark");
    }else {
        document.body.classList.remove("dark");
    }
    // Esta parte de la funcion hace que el cambio sea relativamente "permanete" a menos que lo cambies.
    preferenceMode.addEventListener("change",() => {
        if (preferenceMode.matches) {
            document.body.classList.add("dark");   
        }else {
            document.body.classList.remove("dark");   
        }
   });
}




/*----------------------------Toggle style switchers----------------------- */
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

styleSwitcherToggler.addEventListener("click",() => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

window.addEventListener("scroll", () =>{
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});


/*----------------------------------Theme Colors-----------------------------*/
const alternateStyles = document.querySelectorAll(".altenate-style");

function setActiveStyle(color) {
    localStorage.setItem("color",color);
    changeColor()
}

function changeColor() {
    alternateStyles.forEach((style) => {
        if (localStorage.getItem("color") === style.getAttribute("title")) {
            style.removeAttribute("disabled")
        }else{
            style.setAttribute("disabled","true");
         }
    });   
}

if (localStorage.getItem("color") !== null) {
    changeColor()
}
    


/*--------------------------------Theme DarkMode-----------------------------*/
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () =>{
    document.body.classList.toggle("dark")
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme","dark");
    }else {
        localStorage.setItem("theme","light")
    }
    updateIcon()
});

function themeMode() {
    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.remove("dark")
        }else {
            document.body.classList.add("dark")
        }
    

    }
    updateIcon()
}
themeMode()

function updateIcon() {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
    }else {
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}

