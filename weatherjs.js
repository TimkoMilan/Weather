$(function(){

$("#submit").click(function(){
    var city = $("#city").val();
    var country = $("#country").val();

    if(city.length > 1){
        var urlLink = 'http://api.openweathermap.org/data/2.5/weather?q=';
        urlLink = urlLink + city;
    }

    if(country.length == 2){
        urlLink = urlLink + ',' + country;
        
    }

    urlLink = urlLink + '&APPID=a61d75f85751f6111397e5a96d6484d7 ';
    console.log(urlLink);

        $.ajax({
            url:urlLink,
            data: { format: 'json'},
            error: function(){
                console.log('error');
            },
            dataType: "json",
            success : createTable,
            type: 'GET'

        });

});

function createTable(data){

    $("#main").empty();

    var table = $('<table/>');
    table.addClass('table table-bordered');
    $("#main").append(table);

    table.append(getTableRow('Temperature: ', Math.round(data.main.temp-273.15),'Humidity: ',data.main.humidity+'%' ));
    table.append(getTableRow('Description: ', data.weather[0].description,'Pressure: ',data.main.pressure + ' hPa' ));

    if($('#showDetails').is(":checked")){

        table.append(getTableRow('Sunrise: ', data.sys.sunrise,'Sunset: ',data.sys.sunset ));
        table.append(getTableRow('Wind speed: ', data.wind.speed + 'm/s','Visibility: ',data.visibility ));
        table.append(getTableRow('Min temperature: ', Math.round(data.main.temp_min-273.15),'Max temperature: ',Math.round(data.main.temp_max-273.15) ));

    }

}

function getTableRow(name1,data1,name2,data2){
    var row = $('<tr/>');
    var column = $('<td/>');
    var column2 = $('<td/>');
    row.append(column);
    column.html(name1 + data1);
    row.append(column2);
    column2.html(name2 + data2);
    return row;
}

});