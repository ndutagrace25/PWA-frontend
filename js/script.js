const base_url = "https://destination-backend.mawingunetworks.com/";

// Service worker registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
      // console.log('service worker registered', reg);
    })
    .catch(e => {
      // console.log('service worker not registered', e);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, {
    edge: "right"
  });
});
