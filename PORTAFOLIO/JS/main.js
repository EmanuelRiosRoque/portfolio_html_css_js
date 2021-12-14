console.clear();


/*------------------ Navegation menu ---------------------*/
(()=> {
  const hamburgerBtn  = document.querySelector(".hamburger-btn"),
        navMenu       = document.querySelector(".nav-menu"),
        closeNavBtn   = navMenu.querySelector(".close-nav-menu");
  
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);
  
  function showNavMenu() {
    navMenu.classList.add("open");
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  document.addEventListener("click", (event) =>{
    if (event.target.classList.contains('link-item')) {

      if (event.target.hash !=="") {
        event.preventDefault();
        const hash = event.target.hash;
        
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
        navMenu.querySelector(".active").classList.remove("active","inner-shadow");

        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active","inner-shadow");
          event.target.classList.remove("outer-shadow","hover-in-shadow");
          hideNavMenu();

        }else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
             item.classList.add("active","inner-shadow");
             item.classList.remove("outer-shadow","hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        window.location.hash = hash;
      } 
    }
  });

})();

/*------------------ About section tabs ----------------- */

(() => {
    const aboutSection  = document.querySelector(".about-section"),
          tabsContainer = document.querySelector(".about-tabs"); // Selecionamos los tabs

          // Escuchamos un evento por click 
          tabsContainer.addEventListener("click", ( event ) =>{ 
            // console.log(e.target);

            // Si el evento que le demos click contiene la clase "tab-item" y si el evento que seleccionemos no tiene la clase active ....
            if (event.target.classList.contains( "tab-item" ) &&  
               !event.target.classList.contains( "active" ) ) {
              
                // creamos una "variable que devuelva el elemento data target de nuestros botones"
                const target = event.target.getAttribute("data-target");
                // Si el seleccionamo un boton nuevo entonces removemos de ese boton con las clase .active los estilos
                tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
                // Y aqui se las agregamos a las que no lo tengan
                event.target.classList.add("active","outer-shadow");
                // Aqui quitaremos el contenido de cada tab
                aboutSection.querySelector(".tab-content.active").classList.remove("active");
                // Activamos el contenido del nuevo tab
                aboutSection.querySelector(target).classList.add("active");
            }

          });

})();


/*-----------------------------Portafolio filtera and popup------------------------------------*/
(()=>{
  const filterContainer    = document.querySelector(".portafolio-filter"),
  portafolioItemsContainer = document.querySelector(".portafolio-items"),
  portafolioItems         = document.querySelectorAll(".portafolio-item"),
  popup                    = document.querySelector(".portafolio-popup"),
  prevBtn                  = popup.querySelector(".pp-prev"),
  nextBtn                  = popup.querySelector(".pp-next"),
  closeBtn                 = popup.querySelector(".pp-close"),
  projectDetailsContainer  = popup.querySelector(".pp-details"),
  projectDetailsBtn        = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots;

  /* Filter portafolio items */
  filterContainer.addEventListener("click",(e) =>{
    // console.log(e.target);
    if (e.target.classList.contains("filter-item") && !e.target.classList.contains("active")) {
      // Desactivar la existencia de "active" "filter item"
      filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      // Activar al nuevo "filter item" 
      e.target.classList.add("active", "outer-shadow");
      const target = e.target.getAttribute("data-target");
      // console.log(target);

      portafolioItems.forEach((item) => {

        // console.log(item.getAttribute("data-category"));

        if (target === item.getAttribute("data-category") || target === 'all' ) {
          item.classList.remove("hide");
          item.classList.add("show");
        }else {
          item.classList.remove("show");
          item.classList.add("hiden");
        }

      });
    }
  });

function bodyScrollingToggle () {
  document.body.classList.toggle("stop-scrolling")
}

  portafolioItemsContainer.addEventListener("click", (e) => {
    // console.log(e.target.closest(".portafolio-item-inner"));
    if (e.target.closest(".portafolio-item-inner")) {
      const portafolioItem = e.target.closest(".portafolio-item-inner").parentElement;

      itemIndex = Array.from(portafolioItem.parentElement.children).indexOf(portafolioItem);

      screenshots = portafolioItems[itemIndex].querySelector(".portafolio-item-img img").getAttribute("data-screenshots");

      screenshots =  screenshots.split(",");  

      if (screenshots.length === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }else {
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
      }
      
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    } 
  });

  closeBtn.addEventListener("click", () =>{
    popupToggle()
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle()
    }
  });

  function popupToggle () {
    popup.classList.toggle("open");
    bodyScrollingToggle();  
  }

  function popupSlideshow () {
    const imgSrc = screenshots[slideIndex];
    // console.log(imgSrc);

    const popupImg = popup.querySelector(".pp-img");
    // Laoder
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // Desactivar loader despues de "cargar image"
      popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML =  (slideIndex + 1) + " of " + screenshots.length;
  }

  // Boton de siguiente img
  nextBtn.addEventListener("click",() =>{
    if (slideIndex === screenshots.length-1) {
      slideIndex = 0
    }else {
      slideIndex++;
    }
    popupSlideshow();
  });

  // Boton de img antrtior
  prevBtn.addEventListener("click",() =>{
    if (slideIndex === 0) {
      slideIndex = screenshots.length-1
    }else {
      slideIndex--;
    }
    popupSlideshow();
    console.log("slideIndex:" + slideIndex);
  });

  function popupDetails() {

    // Si portafolio-item-details no existe
    if (!portafolioItems[itemIndex].querySelector(".portafolio-item-details")) {
      projectDetailsBtn.style.display="none";
      return; 
    }
    projectDetailsBtn.style.display="block";


    // Dar los detalles del proyecto
    const details = portafolioItems[itemIndex].querySelector(".portafolio-item-details").innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;

    const title = portafolioItems[itemIndex].querySelector(".portafolio-item-title").innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;

    const category = portafolioItems[itemIndex].getAttribute("data-category");  
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("");
  }

  // Boton de detalles
  projectDetailsBtn.addEventListener("click", () =>{
    popupDetailsToggle();
  })
  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      // console.log("true");
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");

      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    }else {
      // console.log("false");

      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";

      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }

})();

/*------------------- Testimoniales Slider -------------------- */

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
  slides                = sliderContainer.querySelectorAll(".testi-item"),
  slideWidth            = sliderContainer.offsetWidth,
  prevBtn               = document.querySelector(".testi-slider-nav .prev"),
  nextBtn               = document.querySelector(".testi-slider-nav .next"),
  activeSlider          = sliderContainer.querySelector(".testi-item.active"); 

  let slideIndex = Array.from(activeSlider.parentElement.children).indexOf(activeSlider);




  // Set width of all slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  // Set width of sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", ()=>{
    if (slideIndex === slides.length-1) {
      slideIndex = 0;
    }else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", ()=>{
    if (slideIndex === 0) {
      slideIndex = slides.length-1;
    }else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // Desactivar slider activado
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    // Activar nuevo slider
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
  }
  slider();
  
})();

/*-------------Hide all sections except active  ---------------*/
(()=>{
  const sections = document.querySelectorAll(".section");
  sections.forEach((sections) => {
    if (!sections.classList.contains("active")) {
      sections.classList.add("hide");
    }
  })
})();

window.addEventListener("load", () =>{
  //Preloader
  document.querySelector(".preloader").classList.add("fade-out");

  setTimeout(() => {
  document.querySelector(".preloader").style.display = "none";
  },600);
});