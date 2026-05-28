console.log("Feed95 website loaded!");

/*
  Ideas futuras:
  - cambiar fondo dinámicamente
  - consumir releases desde GitHub API
  - mostrar versión automáticamente
  - animaciones
  - changelog dinámico
  - tema oscuro/claro
*/

// Pequeña animación de entrada

window.addEventListener("load", () => {

  const hero = document.querySelector(".hero-content");

  hero.animate(
    [
      {
        opacity: 0,
        transform: "translateY(20px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 800,
      easing: "ease-out"
    }
  );

});