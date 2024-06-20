// variable declaration
let zoomSingleMark = false;
let zoomScale = 4;
let zoomMark = false;
let hard = false;
let zein = 5;
let achmad = 6;
let showMore = false;
let tanda = 0;
let audio1 = document.getElementById("audioPlayer");
let valueRange = $("#myrange").value;
let doneLoad = false;

// Hide Method
$("#share").hide();
$("#FlipMode").hide();
$("#daftarisi").hide();
$("#canvas").hide();
$("#MoreOptions").hide();

setTimeout(function () {
  if (doneLoad == false) {
    location.reload();
  }
}, 3000);

let view = function () {
  return $(".magazine").turn("page");
};


function cekMore() {
  if (showMore) {
    $("#MoreOptions").removeClass("animate__bounceOutUp");
    $("#MoreOptions").addClass("animate__bounceInDown");
    $("#MoreOptions").show();
  } else {
    $("#MoreOptions").removeClass("animate__bounceInDown");
    $("#MoreOptions").addClass("animate__bounceOutUp");
    $("#daftarisi").hide();
    cektable = false;
  }
}

function timeoutaa() {
  timeoutid = setTimeout(function () {
    showMore = false;
    cekMore();
  }, 1000);
}

$("#iconMore").click(function () {
  showMore = !showMore;
  cekMore();
});

let a = document.getElementById("fs");
a.addEventListener("click", function () {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

let cekSound = false;

function loadApp() {
  $("#canvas").fadeIn(1000);

  var flipbook = $(".magazine");

  // Check if the CSS was already loaded

  if (flipbook.width() == 0 || flipbook.height() == 0) {
    setTimeout(loadApp, 10);
    return;
  }

  // Create the flipbook

  let buku = flipbook.turn({
    page: 1,
    width: 1229.6,
    height: 800,
    duration: 1300,
    display: "double",
    acceleration: false,
    gradients: true,
    autoCenter: true,
    elevation: 0,

    when: {
      turning: function (event, page, view) {
        var book = $(this),
          currentPage = book.turn("page"),
          pages = book.turn("pages");
        disableControls(page);
        $(".thumbnails .page-" + currentPage)
          .parent()
          .removeClass("current");

        $(".thumbnails .page-" + page)
          .parent()
          .addClass("current");

        if (cekSound) {
          audio1.play();
          if (audio1.paused) {
            audio1.play();
          } else {
            audio1.currentTime = 0;
          }
        } else {
          audio1.paused;
        }

        if (hard) {
          if (zein <= totalHalaman && currentView() % 2 == 0) {
            let img = $("<img class='loader' />");
            let img2 = $("<img class='loader' />");
            let element = $("<div class='hard' />");
            let element2 = $("<div class='hard' />");
            $("#majalahdigital").turn("addPage", element);
            $("#majalahdigital").turn("addPage", element2);
            img.attr("src", "pages/" + namaHalaman + zein + formatPage);
            img2.attr("src", "pages/" + namaHalaman + achmad + formatPage);
            $(img).css({ width: "100%", height: "100%" });
            $(img2).css({ width: "100%", height: "100%" });
            $(img).appendTo(element);
            $(img2).appendTo(element2);
            img.removeClass("loader");
            img2.removeClass("loader");
            zein = zein + 2;
            achmad = achmad + 2;
          }
        } else {
          if (zein <= totalHalaman && currentView() % 2 == 0) {
            let img = $("<img class='loader' />");
            let img2 = $("<img class='loader' />");
            let element = $("<div />");
            let element2 = $("<div />");
            $("#majalahdigital").turn("addPage", element);
            $("#majalahdigital").turn("addPage", element2);
            img.attr("src", "pages/" + namaHalaman + zein + formatPage);
            img2.attr("src", "pages/" + namaHalaman + achmad + formatPage);
            $(img).css({ width: "100%", height: "100%" });
            $(img2).css({ width: "100%", height: "100%" });
            $(img).appendTo(element);
            $(img2).appendTo(element2);
            img.removeClass("loader");
            img2.removeClass("loader");
            zein = zein + 2;
            achmad = achmad + 2;
          }
        }
      },

      turned: function (event, page, view) {
        disableControls(page);
        $(this).turn("center");
        if (page == 1) {
          $(this).turn("peel", "br");
        }
      },
    },
  });

  // zoom
  $(".magazine-viewport").zoom({
    flipbook: $(".magazine"),
    max: function () {
      return zoomScale;
    },
  });

  $(window)
    .resize(function () {
      resizeViewport();
    })
    .bind("orientationchange", function () {
      resizeViewport();
    });

  smd = false;
  let s = document.getElementById("singlepage");



   function kembali() {
    if (tanda % 2 == 0 && tanda > 2 && tanda != totalHalaman) {
      $("#box").removeClass("kiri");
      $("#box").addClass("kanan");
      $(".magazine").turn("previous");
      tanda--;
    } else if (tanda % 2 != 0 && view() != 1) {
      $("#box").removeClass("kanan");
      $("#box").addClass("kiri");
      tanda--;
    } else if (tanda == 2) {
      $("#box").removeClass("kiri");
      $("#box").removeClass("kanan");
      $("#box").addClass("tengah");
      $(".magazine").turn("previous");
      tanda--;
    } else if (tanda == 0) {
      $(".magazine").turn("previous");
    } else if (tanda == 0 && view() == 2) {
      $(".magazine").turn("previous");

      tanda = tanda;
    } else if (tanda == totalHalaman) {
      $("#box").removeClass("tengah");
      $("#box").addClass("kanan");
      $(".magazine").turn("previous");
      tanda--;
    }
  }
  function lanjut() {
    if (tanda == 1) {
      $(".magazine").turn("next");
      $("#box").removeClass("tengah");
      $("#box").addClass("kiri");
      tanda++;
    } else if (tanda % 2 == 0 && tanda > 0 && view() != 1 && tanda < totalHalaman) {
      $("#box").removeClass("kiri");
      $("#box").addClass("kanan");
      tanda++;
    } else if (tanda % 2 != 0 && tanda > 0 && tanda < 38) {
      $("#box").removeClass("kanan");
      $("#box").addClass("kiri");
      $(".magazine").turn("next");
      tanda++;
    } else if (tanda == 0) {
      $(".magazine").turn("next");
    } else if (tanda > 0 && view() == 1) {
      $("#box").removeClass("tengah");
      $("#box").addClass("kiri");
      $(".magazine").turn("next");
    } else if (tanda == 39) {
      $("#box").removeClass("kanan");
      $("#box").addClass("tengah");
      $(".magazine").turn("next");
      tanda++;
    } else if (tanda == totalHalaman) {
      $("#box").addClass("tengah");
      tanda = tanda;
    }
  }

  $("#singlepage").click(function () {
    smd = !smd;
    if (smd) {
      // $("#singlepage").html("Double");
      if (view() == 1) {
        $("#box").addClass("tengah");
        tanda = 1;
      } else if (view() == totalHalaman) {
        $("#box").addClass("tengah");
        tanda = totalHalaman;
      } else if (view() != 1) {
        $("#box").removeClass("tengah");
        $("#box").addClass("kiri");
        tanda = view();
      }
    } else {
      // $("#singlepage").html("Sing");
      $("#box").removeClass("kanan");
      $("#box").removeClass("tengah");
      $("#box").removeClass("kiri");
      tanda = 0;
    }
  });

  $("#lanjut").click(function () {
    lanjut();
  });

  $("#kembali").click(function () {
    kembali();
  });

  // Using arrow keys to turn the page

  $(document).keydown(function (e) {
    var previous = 37,
      next = 39,
      esc = 27;
    let prev2 = false;
    switch (e.keyCode) {
      case previous:
        kembali();
        break;
      case next:
        lanjut();
    }
  });

  // URIs - Format #/page/1

  // Events for thumbnails

  // Regions

  // Events for the next button

  $(".next-button")
    .bind($.mouseEvents.over, function () {
      $(this).addClass("next-button-hover");
    })
    .bind($.mouseEvents.out, function () {
      $(this).removeClass("next-button-hover");
    })
    .bind($.mouseEvents.down, function () {
      $(this).addClass("next-button-down");
    })
    .bind($.mouseEvents.up, function () {
      $(this).removeClass("next-button-down");
    })
    .click(function () {
      $(".magazine").turn("next");
    });
  let timeoutid;
  let tanda2 = 0;
  function timeoutas() {
    timeoutid = setTimeout(function () {
      $("#navbar").addClass("-translate-y-[75px]");
      tanda2 = 1;
    }, 5000);
  }

  timeoutas();

  $("#hideNav").click(function () {
    $("#navbar").toggleClass("-translate-y-[75px]");
  });

  $("#navbar").mouseover(function () {
    $("#navbar").removeClass("-translate-y-[75px]");
  });
  document.getElementById("navbar").addEventListener("mouseenter", function () {
    clearTimeout(timeoutid);
  });
  document.getElementById("navbar").addEventListener("mouseleave", function () {
    timeoutas();
  });

  // Events for the next button

  resizeViewport();
}

$("#canvas").hide();

yepnope({
  test: Modernizr.csstransforms,
  yep: ["./assets/lib/turn.js"],
  both: [
    "./assets/lib/zoom.min.js",
    "assets/js/magazine.js",
    "/assets/css/magazine.css",
  ],
  complete: loadApp,
});

// Zoom icon

// Load the HTML4 version if there's not CSS transform

let preloader = document.getElementById("loader");
let konten = document.getElementById("canvas");
let i;

let cekSingle = false;
$("#single2").click(function () {
  cekSingle = !cekSingle;
  if (cekSingle) {
    $("#textid").html("Tunggal");
  } else {
    $("#textid").html("Ganda");
  }
});

$("#textid").click(function () {
  cekSingle = !cekSingle;
  if (cekSingle) {
    $("#singlepage").click();
  }
});

$("#daftarisi").hide();
let cektable = false;

function contentshow() {
  // cektable = !cektable;
  // if (cektable) {
  //   $("#daftarisi").show();
  // } else {
  //   $("#daftarisi").hide();
  // }
  alert("Daftar isi tidak ada")
}

function share() {}

function goWA() {
  const url = "https://api.whatsapp.com/send?text=";
  const message =
    "Kunjungi Majalah Digital Spedusa: https://spedusajurnalistik.github.io/MajalahDigital/";
  const encodedMessage = encodeURIComponent(message);
  const finalUrl = `${url}${encodedMessage}`;
  window.open(finalUrl, "_blank");
}

function goFB() {
  var quote =
    "Kunjungi Majalah Digital Spedusa: https://spedusajurnalistik.github.io/MajalahDigital/";
  var url =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(window.location.href) +
    "&quote=" +
    encodeURIComponent(quote);
  window.open(url, "_blank");
}

function goTELE() {
  const url = "https://t.me/share/url?url=";
  const message =
    "Kunjungi Majalah Digital Spedusa: https://spedusajurnalistik.github.io/MajalahDigital/";
  const encodedMessage = encodeURIComponent(message);
  const finalUrl = `${url}${encodedMessage}`;
  window.open(finalUrl, "_blank");
}

function goGIT() {
  var message =
    "Kunjungi Majalah Digital Spedusa: https://spedusajurnalistik.github.io/MajalahDigital/";
  var url =
    "https://github.com/login?return_to=" +
    encodeURIComponent(window.location.href) +
    "&text=" +
    encodeURIComponent(message);
  window.open(url, "_blank");
}

function copyUrl() {
  var url = "https://spedusajurnalistik.github.io/MajalahDigital/";
  navigator.clipboard.writeText(url);
}

function zoom() {
  zoomMark = !zoomMark;
  if (cekSingle && zoomMark) {
    $("#singlepage").click();
    $(".magazine-viewport").zoom("zoomIn");
    zoomSingleMark = true;
  } else if (cekSingle == false && zoomMark) {
    $(".magazine-viewport").zoom("zoomIn");
    zoomSingleMark = false;
  } else if (zoomSingleMark && zoomMark == false) {
    $(".magazine-viewport").zoom("zoomOut");
    $("#singlepage").click();
  } else if (zoomSingleMark == false && zoomMark == false) {
    $(".magazine-viewport").zoom("zoomOut");
  }
}

function SwitchSound() {
  cekSound = !cekSound;
  if (cekSound) {
    $("#iconSound").attr("src", "./assets/img/soundOn.png");
  } else {
    $("#loader").removeClass("hidden");
    $("#iconSound").attr("src", "./assets/img/suara.png");
    $("#iconSound").load(function () {
      $("#loader").addClass("hidden");
    });
  }
}

function zoomtes() {
  zoomMark = !zoomMark;
  if (zoomMark) {
    $(".magazine-viewport").zoom("zoomIn");
  } else {
    $(".magazine-viewport").zoom("zoomOut");
  }
}

$("#majalahdigital").hide();

// Load
$("#canvas").show();
setTimeout(function () {
  SpawnPage();
  // $("#singlepage").click();
  defaultLoadPage();
  $("#load1").removeClass("hidden");
  $("#load2").removeClass("hidden");
  $("#MoreOptions").hide();
  doneLoad = true;
  $("#loader").addClass("animate__animated animate__fadeOut");
  setTimeout(function () {
    $("#majalahdigital").show();
    $("#loader").remove();
  }, 800);
}, 1200);

SwitchSound();

function backgroundShowHide() {
  $("#backgroundContent").toggleClass("hidden");
}

backgroundChange(1);

// Background Change
function backgroundChange(n) {
  $("#canvas").css("background-image", 'url("./assets/css/bg/' + n + ".jpg");
  $("#canvas").css("background-position", "center");
  $("#backgroundContent").addClass("hidden");
}

$(".toggleHideNav").click(function () {
  $("#navbar").toggleClass("-translate-y-[75px]");
});
