$(document).ready(function () {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/summary",
        headers: {"ID": "7f53064b-3a78-41a8-872e-8fc7de483575"}
}).done(function (info) {

        $("#newConfirmed").val(info.Global.NewConfirmed).html(info.Global.NewConfirmed);
        $("#newDeaths").val(info.Global.NewDeaths).html(info.Global.NewDeaths);
        $("#newRecovered").val(info.Global.NewRecovered).html(info.Global.NewRecovered);

        $("#totalConfirmed").val(info.Global.TotalConfirmed).html(info.Global.TotalConfirmed);
        $("#totalDeaths").val(info.Global.TotalDeaths).html(info.Global.TotalDeaths);
        $("#totalRecovered").val(info.Global.TotalRecovered).html(info.Global.TotalRecovered);

        var Globaldate = info.Global.Date;
        var newGlobalDate = fechaFormat(Globaldate);
        $("#titulo-resumen-global").html("Resumen global al " + newGlobalDate);

        var Paises_List= info.Countries;
        var listaPaises= Paises_List.sort(sortJson("TotalConfirmed"));

        var contentHTML="";

        $.each(listaPaises, function (i, value) {
            var parametros = "detallePais/detallePais.html?name="+value.Country+"&slug="+value.Slug+"&countryCode="+value.CountryCode+"&caseCovid=confirmed";
            var sUrl = window.location.href.replace("index.html",parametros);

            contentHTML += "<tr>";
            contentHTML += "<td>" + (i + 1) + "</td>";
            contentHTML += "<td>" + value.Country + "</td>";
            contentHTML += "<td>" + value.TotalConfirmed + "</td>";
            contentHTML += "<td>" + value.TotalDeaths + "</td>";
            contentHTML += "<td>" + value.TotalRecovered+ "</td>";
            contentHTML += "<td>" + value.NewConfirmed + "</td>";
            contentHTML += "<td>" + value.NewDeaths + "</td>";
            contentHTML += "<td>" + value.NewRecovered + "</td>";
            contentHTML += "<td><a href="+ sUrl +">Enviar</a></td>"
            contentHTML += "</tr>";
        })
        $("#body-paises").html(contentHTML);
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
});

function sortJson(key){
    return function(a,b){
        let comparador = 0;
        if (a[key] > b[key]) {
            comparador = 1;
        }
        if (b[key] > a[key]) {
            comparador = -1;
        }
        return comparador;
    };
}

function fechaFormat(fecha) {
    let date= fecha.split("T");
    let df1 = date[0];
    let df2 = df1.replaceAll("-","/");
    return df2;
}