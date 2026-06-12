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
        
        /* 1. Buscar de forma independiente cada lanzamiento por su tag_name o target_commitish */
        const releaseAndroid = datosReleases.find(rel => rel.tag_name.includes('android') || rel.tag_name === 'beta-android');
        const releaseWindows = datosReleases.find(rel => rel.tag_name.includes('windows') || rel.tag_name === 'beta-windows');

        /* 2. Capturar los elementos del DOM */
        const tagApk = document.querySelector("#btn-apk .version-tag");
        const tagWindows = document.querySelector("#btn-windows .version-tag");

        /* 3. Asignar a cada uno su versión real si se encuentra en GitHub */
        if (tagApk) {
          tagApk.textContent = releaseAndroid ? releaseAndroid.tag_name : "beta-android";
        }
        
        if (tagWindows) {
          tagWindows.textContent = releaseWindows ? releaseWindows.tag_name : "beta-windows";
        }
      }
    })
    .catch(error => {
      /* Control alternativo si falla la API o no encuentra datos */
      console.log("No se pudieron cargar dinámicamente los tags de versión:", error);
      
      // Como respaldo, asignamos nombres genéricos coherentes a cada uno
      const tagApk = document.querySelector("#btn-apk .version-tag");
      const tagWindows = document.querySelector("#btn-windows .version-tag");
      
      if (tagApk) tagApk.textContent = "beta-android";
      if (tagWindows) tagWindows.textContent = "beta-windows";
    });
});