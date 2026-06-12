/* Carga dinámica de versiones desde GitHub Releases */
window.addEventListener("DOMContentLoaded", () => {
  const OWNER = "SrFaper";
  const REPO  = "feed95";

  fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases`)
    .then(res => {
      if (!res.ok) throw new Error("GitHub API error");
      return res.json();
    })
    .then(releases => {
      const android = releases.find(r => r.tag_name === "beta" || r.tag_name.includes("android"));
      const windows = releases.find(r => r.tag_name === "beta-windows" || r.tag_name.includes("windows"));

      setVersionTag("#btn-apk",      android?.tag_name ?? "beta");
      setVersionTag("#btn-apk-2",    android?.tag_name ?? "beta");
      setVersionTag("#btn-windows",  windows?.tag_name ?? "beta-windows");
      setVersionTag("#btn-windows-2",windows?.tag_name ?? "beta-windows");
    })
    .catch(() => {
      setVersionTag("#btn-apk",       "beta");
      setVersionTag("#btn-apk-2",     "beta");
      setVersionTag("#btn-windows",   "beta-windows");
      setVersionTag("#btn-windows-2", "beta-windows");
    });

  function setVersionTag(selector, text) {
    const el = document.querySelector(`${selector} .version-tag`);
    if (el) el.textContent = text;
  }
});
