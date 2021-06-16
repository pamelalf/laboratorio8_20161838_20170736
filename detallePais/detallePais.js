const urlParams = new URLSearchParams(window.location.search);

const nameCountry = urlParams.get('name');
const slug = urlParams.get('slug');
const countryCode = urlParams.get('countryCode');

const url = window.location.href;
const dif = "detallePais".length + 1;

$(document).ready(function () {
    $("#titulo").html('Resumen del país ' + nameCountry);
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://restcountries.eu/rest/v2/alpha/" + countryCode
    }).done(function (info) {
        $("#bandera-div").after(
            "<img style='width: 100px; height: 50px' src= " + info.flag + ">"
        );

        $("#capital").html(info.name);
        $("#population").html(info.population);
        $("#subregion").html(info.subregion);

    }).fail(function (err) {
        console.log(err);
        alert("no se puedo cargar la página");
    });
    obtenerDataPais(urlParams.get('caseCovid'));
});

function seleccionarCasos() {
    var valSeleccionado = document.getElementById("caseCovid").value;
    obtenerDataPais(valSeleccionado);
}

function obtenerDataPais(caseCovid) {

    if(caseCovid == "confirmed"){
        caseCovid == "confirmed";
    }

    const newUrl = oldURL.replace(
        url.substring(url.lastIndexOf("detallePais") - dif ) ,
        "grafico/graficoEvolutivo.html?name="+nameCountry+"&slug="+slug+"&countryCode="+countryCode+"&caseCovid="+caseCovid);
    $("#redirect-grafico").attr("href",newUrl);

    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (info) {
        let contentHTML = "";
        let formatoFecha = "";
        $.each(info, function (cont, case ){
            formatoFecha = formatDate(casoCovid["Date"]);
            contentHTML += "<tr>";
            contentHTML += "<td>"+formatoFecha+"</td>";
            contentHTML += "<td>"+case["Cases"]+"</td>";
            contentHTML += "</tr>";
        });
        $("#body-paises").html(contentHTML);
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
    let fecha = date.split("T");
    let date1 = fecha[0];
    let date2 = date1.replaceAll("-","/");
    return date2;
}