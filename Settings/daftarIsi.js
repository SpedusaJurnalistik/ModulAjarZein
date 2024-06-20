// Input Daftar Isi
    daftarIsi("Zoom In", "4");
    daftarIsi("Spedusa Chayoo", "6");
    daftarIsi("Profil", "7");
    daftarIsi("Event", "8");
    daftarIsi("Outdoor", "10");
    daftarIsi("perform", "11");
    daftarIsi("Zoom out", "12");
    daftarIsi("moment", "13");
    daftarIsi("resensi", "16");
    daftarIsi("cermin", "17");
    daftarIsi("i say", "18");
    daftarIsi("my inspiration", "19");
    daftarIsi("cape dehh", "20");
    daftarIsi("pelita", "22");
    daftarIsi("new member", "23");
    daftarIsi("cikal", "24");
    daftarIsi("poem", "25");
    daftarIsi("festival", "26");
    daftarIsi("have fun", "28");
    daftarIsi("religi", "29");
    daftarIsi("lecture", "30");
    daftarIsi("the captains", "32");
    daftarIsi("TTS SPEDUSA", "34");
    daftarIsi("winner corner", "36");
// End

    function daftarIsi(judul, nomor) {
        let divbar = $("<div class=' w-full cursor-pointer'>");
    
        let h = $("<h1>");
        h.text(judul);
    
        h.addClass(" mt-1 text-2xl capitalize text-center w-full font-light");
    
        divbar.append(h);
        divbar.addClass(
          "flex justify-start item-center py-3 hover:bg-white/50 active:bg-white/50 px-3 gap-5"
        );
        $("#daftarisi").append(divbar);
        $(divbar).click(function () {
          $("#daftarisi").hide();
          cektable = false;
          let SecondPage = parseInt(nomor);
          let currentSecondPage = SecondPage + 1;
          //start
          let currentPage = zein;
          if (hard) {
            if (nomor % 2 != 0) {
              while (currentPage <= nomor) {
                let achmad = currentPage + 1;
                let img = $("<img class='loader' />");
                let img2 = $("<img class='loader' />");
                let element = $("<div class='hard' />");
                let element2 = $("<div class='hard' />");
                $("#majalahdigital").turn("addPage", element);
                $("#majalahdigital").turn("addPage", element2);
                img.attr("src", "pages/" + namaHalaman + currentPage + formatPage);
                img2.attr("src", "pages/" + namaHalaman + achmad + formatPage);
                $(img).css({ width: "100%", height: "100%" });
                $(img2).css({ width: "100%", height: "100%" });
                $(img).appendTo(element);
                $(img2).appendTo(element2);
                img.removeClass("loader");
                img2.removeClass("loader");
                currentPage = currentPage + 2;
              }
            } else if (nomor % 2 == 0) {
              while (currentPage <= currentSecondPage) {
                let achmad = currentPage + 1;
                let img = $("<img class='loader' />");
                let img2 = $("<img class='loader' />");
                let element = $("<div class='hard' />");
                let element2 = $("<div class='hard' />");
                $("#majalahdigital").turn("addPage", element);
                $("#majalahdigital").turn("addPage", element2);
                img.attr("src", "pages/" + namaHalaman + currentPage + formatPage);
                img2.attr("src", "pages/" + namaHalaman + achmad + formatPage);
                $(img).css({ width: "100%", height: "100%" });
                $(img2).css({ width: "100%", height: "100%" });
                $(img).appendTo(element);
                $(img2).appendTo(element2);
                img.removeClass("loader");
                img2.removeClass("loader");
                currentPage = currentPage + 2;
              }
            }
          } else {
            if (nomor % 2 != 0) {
              while (currentPage <= nomor) {
                let achmad = currentPage + 1;
                let img = $("<img class='loader' />");
                let img2 = $("<img class='loader' />");
                let element = $("<div />");
                let element2 = $("<div />");
                $("#majalahdigital").turn("addPage", element);
                $("#majalahdigital").turn("addPage", element2);
                img.attr("src", "pages/" + namaHalaman + currentPage + formatPage);
                img2.attr("src", "pages/" + namaHalaman + achmad + formatPage);
                $(img).css({ width: "100%", height: "100%" });
                $(img2).css({ width: "100%", height: "100%" });
                $(img).appendTo(element);
                $(img2).appendTo(element2);
                img.removeClass("loader");
                img2.removeClass("loader");
                currentPage = currentPage + 2;
              }
            } else if (nomor % 2 == 0) {
              while (currentPage <= currentSecondPage) {
                let achmad = currentPage + 1;
                let img = $("<img class='loader' />");
                let img2 = $("<img class='loader' />");
                let element = $("<div />");
                let element2 = $("<div />");
                $("#majalahdigital").turn("addPage", element);
                $("#majalahdigital").turn("addPage", element2);
                img.attr("src", "pages/" + namaHalaman + currentPage + formatPage);
                img2.attr("src", "pages/" + namaHalaman + achmad + formatPage);
                $(img).css({ width: "100%", height: "100%" });
                $(img2).css({ width: "100%", height: "100%" });
                $(img).appendTo(element);
                $(img2).appendTo(element2);
                img.removeClass("loader");
                img2.removeClass("loader");
                currentPage = currentPage + 2;
              }
            }
          }
    
          zein = currentPage;
          achmad = currentPage + 1;
    
          // end
          $(".magazine").turn("page", nomor);
          if (tanda != 0) {
            tanda = nomor;
            if (tanda % 2 == 0 && tanda > 0) {
              $("#box").removeClass("kanan");
              $("#box").addClass("kiri");
            } else {
              $("#box").addClass("kanan");
              $("#box").removeClass("kiri");
            }
          }
        });
      }