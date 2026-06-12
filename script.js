/* Lógica de consulta automatizada de la API de GitHub */
window.addEventListener("DOMContentLoaded", () => {
  
  /* Configuracion del repositorio objetivo */
  const cuentaGitHub = "SrFaper";
  const repoGitHub = "feed95";
  const urlApi = `https://api.github.com/repos/${cuentaGitHub}/${repoGitHub}/releases`;

  /* Peticion asincrona a los Releases de GitHub */
  fetch(urlApi)
    .then(respuesta => {
      if (!respuesta.ok) throw new Error("Error de red");
      return respuesta.json();
    })
    .then(datosReleases => {
      if (datosReleases && datosReleases.length > 0) {
        /* Lectura del lanzamiento mas reciente */
        const ultimoRelease = datosReleases[0];
        const nombreVersion = ultimoRelease.tag_name; // Ejemplo: 'v1.0.0-beta'

        /* Actualizacion de texto en los botones HTML correspondientes */
        const tagApk = document.querySelector("#btn-apk .version-tag");
        const tagWindows = document.querySelector("#btn-windows .version-tag");

        if (tagApk) tagApk.textContent = nombreVersion;
        if (tagWindows) tagWindows.textContent = nombreVersion;
      }
    })
    .catch(error => {
      /* Control alternativo si falla la API o no encuentra datos */
      console.log("No se pudieron cargar dinámicamente los tags de versión:", error);
      const etiquetasModificables = document.querySelectorAll(".version-tag");
      etiquetasModificables.forEach(etiqueta => {
        etiqueta.textContent = "Última versión";
      });
    });
});