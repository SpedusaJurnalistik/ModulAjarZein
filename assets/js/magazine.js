/*
 * Magazine sample
 */

  // Zoom in / Zoom out
  function zoomTo(event) {
    setTimeout(function () {
      if ($(".magazine-viewport").data().regionClicked) {
        $(".magazine-viewport").data().regionClicked = false;
      } else {
        if ($(".magazine-viewport").zoom("value") == 1) {
          $(".magazine-viewport").zoom("zoomIn", event);
        } else {
          $(".magazine-viewport").zoom("zoomOut");
        }
      }
    }, 1);
  }
  // Load regions
  function loadRegions(page, element) {}
  // Add region
  function addRegion(region, pageElement) {
    var reg = $("<div />", { class: "region  " + region["class"] }),
      options = $(".magazine").turn("options"),
      pageWidth = options.width / 2,
      pageHeight = options.height;
    reg
      .css({
        top: Math.round((region.y / pageHeight) * 100) + "%",
        left: Math.round((region.x / pageWidth) * 100) + "%",
        width: Math.round((region.width / pageWidth) * 100) + "%",
        height: Math.round((region.height / pageHeight) * 100) + "%",
      })
      .attr("region-data", $.param(region.data || ""));
    reg.appendTo(pageElement);
  }
  // Process click on a region
  function regionClick(event) {
    var region = $(event.target);
    if (region.hasClass("region")) {
      $(".magazine-viewport").data().regionClicked = true;
      setTimeout(function () {
        $(".magazine-viewport").data().regionClicked = false;
      }, 100);
      var regionType = $.trim(region.attr("class").replace("region", ""));
      return processRegion(region, regionType);
    }
  }
  
  // Process the data of every region
  
  function processRegion(region, regionType) {
    data = decodeParams(region.attr("region-data"));
  
    switch (regionType) {
      case "link":
        window.open(data.url);
  
        break;
      case "zoom":
        var regionOffset = region.offset(),
          viewportOffset = $(".magazine-viewport").offset(),
          pos = {
            x: regionOffset.left - viewportOffset.left,
            y: regionOffset.top - viewportOffset.top,
          };
  
        $(".magazine-viewport").zoom("zoomIn", pos);
  
        break;
      case "to-page":
        $(".magazine").turn("page", data.page);
  
        break;
    }
  }
  
  // Load large page
  
  function loadLargePage(page, pageElement) {
    var img = $("<img />");
  
    img.load(function () {
      var prevImg = pageElement.find("img");
      $(this).css({ width: "100%", height: "100%" });
      $(this).appendTo(pageElement);
      prevImg.remove();
    });
  
    // Loadnew page
  
    img.attr("src", "pages/" + page + "-large.png");
  }
  
  // Load small page
  
  function loadSmallPage(page, pageElement) {
    var img = pageElement.find("img");
  
    img.css({ width: "100%", height: "100%" });
  
    img.unbind("load");
    // Loadnew page
  
    img.attr("src", "pages/" + page + ".png");
  }
  
  // http://code.google.com/p/chromium/issues/detail?id=128488
  
  function isChrome() {
    return navigator.userAgent.indexOf("Chrome") != -1;
  }
  
  function disableControls(page) {
    if (page == 1) $(".previous-button").hide();
    else $(".previous-button").show();
  
    if (page == $(".magazine").turn("pages")) $(".next-button").hide();
    else $(".next-button").show();
  }
  
  // Set the width and height for the viewport
  
  function resizeViewport() {
    var width = $(window).width(),
      height = $(window).height(),
      options = $(".magazine").turn("options");
  
    $(".magazine").removeClass("animated");
  
    $(".magazine-viewport").css({
      width: width,
      height: height,
    });
  
    if ($(".magazine").turn("zoom") == 1) {
      var bound = calculateBound({
        width: options.width,
        height: options.height,
        boundWidth: Math.min(options.width, width),
        boundHeight: Math.min(options.height, height),
      });
  
      if (bound.width % 2 !== 0) bound.width -= 1;
  
      if (
        bound.width != $(".magazine").width() ||
        bound.height != $(".magazine").height()
      ) {
        $(".magazine").turn("size", bound.width, bound.height);
  
        if ($(".magazine").turn("page") == 1) $(".magazine").turn("peel", "br");
  
        $(".next-button").css({
          height: bound.height,
          backgroundPosition: "-38px " + (bound.height / 2 - 32 / 2) + "px",
        });
        $(".previous-button").css({
          height: bound.height,
          backgroundPosition: "-4px " + (bound.height / 2 - 32 / 2) + "px",
        });
      }
  
      $(".magazine").css({ top: -bound.height / 2, left: -bound.width / 2 });
    }
  
    var magazineOffset = $(".magazine").offset(),
      boundH = height - magazineOffset.top - $(".magazine").height(),
      marginTop = (boundH - $(".thumbnails > div").height()) / 2;
  
    if (marginTop < 0) {
      $(".thumbnails").css({ height: 1 });
    } else {
      $(".thumbnails").css({ height: boundH });
      $(".thumbnails > div").css({ marginTop: marginTop });
    }
  
    if (magazineOffset.top < $(".made").height()) $(".made").hide();
    else $(".made").show();
  
    $(".magazine").addClass("animated");
  }
  
  // Number of views in a flipbook
  
  function numberOfViews(book) {
    return book.turn("pages") / 2 + 1;
  }
  
  // Current view in a flipbook
  
  function getViewNumber(book, page) {
    return parseInt((page || book.turn("page")) / 2 + 1, 10);
  }
  

  
  function setPreview(view) {
    var previewWidth = 112,
      previewHeight = 73,
      previewSrc = "pages/preview.jpg",
      preview = $(_thumbPreview.children(":first")),
      numPages =
        view == 1 || view == $("#slider").slider("option", "max") ? 1 : 2,
      width = numPages == 1 ? previewWidth / 2 : previewWidth;
  
    _thumbPreview.addClass("no-transition").css({
      width: width + 15,
      height: previewHeight + 15,
      top: -previewHeight - 30,
      left: ($($("#slider").children(":first")).width() - width - 15) / 2,
    });
  
    preview.css({
      width: width,
      height: previewHeight,
    });
  
    if (
      preview.css("background-image") === "" ||
      preview.css("background-image") == "none"
    ) {
      preview.css({ backgroundImage: "url(" + previewSrc + ")" });
  
      setTimeout(function () {
        _thumbPreview.removeClass("no-transition");
      }, 0);
    }
  
    preview.css({
      backgroundPosition: "0px -" + (view - 1) * previewHeight + "px",
    });
  }
  
  // Width of the flipbook when zoomed in
  
  function largeMagazineWidth() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return 1300;
    } else {
      return 2000;
    }
  }
  
  // decode URL Parameters
  
  function decodeParams(data) {
    var parts = data.split("&"),
      d,
      obj = {};
  
    for (var i = 0; i < parts.length; i++) {
      d = parts[i].split("=");
      obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
    }
  
    return obj;
  }
  
  // Calculate the width and height of a square within another square
  
  function calculateBound(d) {
    var bound = { width: d.width, height: d.height };
  
    if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
      var rel = bound.width / bound.height;
  
      if (
        d.boundWidth / rel > d.boundHeight &&
        d.boundHeight * rel <= d.boundWidth
      ) {
        bound.width = Math.round(d.boundHeight * rel);
        bound.height = d.boundHeight;
      } else {
        bound.width = d.boundWidth;
        bound.height = Math.round(d.boundWidth / rel);
      }
    }
  
    return bound;
  }
  
  let element = $("<div class='hard' />").html("Loading...");
  function currentView() {
    return $(".magazine").turn("page");
  }
  
  function SpawnPage() {
    for (let i = 2; i <= 4; i++) {
      let img = $("<img class='loader' />");
      let element = $("<div />");
      $("#majalahdigital").turn("addPage", element);
      img.attr("src", "pages/" + namaHalaman + i + formatPage);
      $(img).css({ width: "100%", height: "100%" });
      $(img).appendTo(element);
      img.removeClass("loader");
    }
  }
  
  function removePage() {
    if (zein == 5) {
      for (let a = 1; a <= 4; a++) {
        $(".magazine").turn("removePage", 1);
      }
    } else {
      for (let a = 1; a <= achmad - 2; a++) {
        $(".magazine").turn("removePage", 1);
      }
    }
  }
  
  function ChangeToSmoothMode() {
    hard = false;
    removePage();
    setTimeout(function () {
      let halamanLive = currentView();
      for (let i = 1; i <= 4; i++) {
        let img = $("<img class='loader' />");
        let element = $("<div />");
        $("#majalahdigital").turn("addPage", element);
        img.attr("src", "pages/" + namaHalaman + i + formatPage);
        $(img).css({ width: "100%", height: "100%" });
        $(img).appendTo(element);
        img.removeClass("loader");
        
      }
      if(cekSingle){
       
        $("#singlepage").click()
        $(".magazine").turn("page", 1)
        $('#MoreOptions').hide()
      }
    
      achmad = 6;
      zein = 5;
    }, 500);
  }
  
  function ChangeToHardMode() {
    removePage();
    setTimeout(function () {
      hard = true;
      let halamanLive = currentView();
      for (let i = 1; i <= 4; i++) {
        let img = $("<img class='loader' />");
        let element = $("<div class='hard' />");
        $("#majalahdigital").turn("addPage", element);
        img.attr("src", "pages/" + namaHalaman + i + formatPage);
        $(img).css({ width: "100%", height: "100%" });
        $(img).appendTo(element);
        img.removeClass("loader");
        
      }
      if(cekSingle){
        $("#singlepage").click()
          $(".magazine").turn("page", 1)
          $('#MoreOptions').hide()
      }
      achmad = 6;
      zein = 5;
    }, 500);
  }
  
  function defaultLoadPage() {
    removePage();
    setTimeout(function () {
      hard = true;
      let halamanLive = currentView();
      for (let i = 1; i <= 4; i++) {
        let img = $("<img class='loader' />");
        let element = $("<div class='hard' />");
        $("#majalahdigital").turn("addPage", element);
        img.attr("src", "pages/" + namaHalaman + i + formatPage);
        $(img).css({ width: "100%", height: "100%" });
        $(img).appendTo(element);
        img.removeClass("loader");
      }
      achmad = 6;
      zein = 5;
    }, 200);
  }