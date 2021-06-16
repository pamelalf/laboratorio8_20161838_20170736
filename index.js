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

        var date = info.Global.Date;
        var newDate = fechaFormat(date);
        $("#titulo-resumen-global").html("Resumen global al " + newDate);

        var listaPaises= info.Countries;
        var listaPaisesSort = listaPaises.sort(sortJson("TotalConfirmed"));

        var contentHTML="";

        $.each(listaPaisesSort, function (i, valor) {
            var params = "detallePais/detallePais.html?name="+valor.Country+"&slug="+valor.Slug+"&countryCode="+valor.CountryCode+"&caseCovid=confirmed";
            var nextURL = window.location.href.replace("index.html",params);

            contentHTML += "<tr>";
            contentHTML += "<td>" + (i + 1) + "</td>";
            contentHTML += "<td>" + valor.Country + "</td>";
            contentHTML += "<td>" + valor.TotalConfirmed + "</td>";
            contentHTML += "<td>" + valor.TotalDeaths + "</td>";
            contentHTML += "<td>" + valor.TotalRecovered+ "</td>";
            contentHTML += "<td>" + valor.NewConfirmed + "</td>";
            contentHTML += "<td>" + valor.NewDeaths + "</td>";
            contentHTML += "<td>" + valor.NewRecovered + "</td>";
            contentHTML += "<td><a href="+ nextUrl +">Enviar</a></td>"
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
        let comparison = 0;
        if (a[key] > b[key]) {
            comparison = 1;
        }
        if (b[key] > a[key]) {
            comparison = -1;
        }
        return comparison;
    };
}

function fechaFormat(fecha) {
    let dateSplit = fecha.aplit("T");
    let df1 = dateSplit[0];
    let df2 = df1.replaceAll("-","/");
    return df2;
}