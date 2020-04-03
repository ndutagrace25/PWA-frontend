const base_url = "https://destination-backend.mawingunetworks.com/";
// const base_url = "http://localhost:5001/";


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

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, {
    edge: "right"
  });
});


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var options = {
    direction: "top",
    hoverEnabled: false,
    toolbarEnabled: false
  };
  var instances = M.FloatingActionButton.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var options = {
    classes: "filter-wrapper"
  };
  var instances = M.FormSelect.init(elems, options);
});


function openSearch() {
  document.getElementById('modal-custom').style.display = 'block';
}


function closeSearch() {
  document.getElementById('modal-custom').style.display = 'none';
}

function openDesc() {
  document.getElementById('merchant-desc').style.display = 'block';
}

function closeDesc() {
  document.getElementById('merchant-desc').style.display = 'none';
}