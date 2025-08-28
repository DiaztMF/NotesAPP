window.addEventListener("DOMContentLoaded", () => {
  let currentPath = window.location.pathname;

  // Normalisasi untuk halaman index
  if (currentPath === "/" || currentPath === "") {
    currentPath = "/index.html";
  }

  // Hapus slash awal supaya konsisten
  currentPath = currentPath.replace(/^\//, "");

  // Debugging
  console.log("Current path:", currentPath);

  // Loop semua link
  document.querySelectorAll(".opt a").forEach((link) => {
    // Ambil href, hapus # di depan
    let href = link.getAttribute("href").replace(/^#/, "");
    href = href.replace(/^\//, ""); // hapus slash awal

    console.log("Link href:", href);

    if (href === currentPath) {
      link.parentElement.classList.add("active");
    }
  });

  // Cek apakah ada elemen dengan class active
  const el = document.querySelector(".opt");
  if (el && el.classList.contains("active")) {
    console.log("Elemen ini sudah punya class active");
  } else {
    console.log("Belum punya class active");
  }

  document.querySelectorAll(".opt").forEach((opt) => {
    opt.addEventListener("click", () => {
      const link = opt.querySelector("a"); // cari <a> di dalam div
      if (link) {
        window.location.href = link.href; // pindah ke halaman link
      }
    });
  });

  const burger = document.getElementById("burger");
  const burger2 = document.getElementById("burger2");
  const sidebar = document.getElementById("sidebar");

  // Set nilai awal sidebar
  sidebar.style.left = "-250px";
  burger.checked = false;
  burger2.checked = false;

  burger.addEventListener("change", function () {
    if (burger.checked) {
      sidebar.style.left = "0px";
      burger2.checked = true;
      sessionStorage.setItem("sidebarOpen", "true");
    } else {
      sidebar.style.left = "-250px";
      burger2.checked = false;
      sessionStorage.setItem("sidebarOpen", "false");
    }
  });

  burger2.addEventListener("change", function () {
    if (burger2.checked) {
      sidebar.style.left = "0px";
      burger.checked = true;
      sessionStorage.setItem("sidebarOpen", "true");
    } else {
      burger.checked = false;
      sidebar.style.left = "-250px";
      sessionStorage.setItem("sidebarOpen", "false");
    }
  });

  // Check sessionStorage saat halaman dimuat
  if (sessionStorage.getItem("sidebarOpen") === "true") {
    sidebar.style.left = "0px";
    burger.checked = true;
    burger2.checked = true;
  }
});
