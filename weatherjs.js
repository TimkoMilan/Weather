$(document).ready(function(){
    $("#submit").click(function(){
        var city=$("#city").val();
        var code=$("#country").val();
        if (city.length>1) {
            var urllink='https://api.openweathermap.org/data/2.5/weather?q=';
            urllink=urllink + city;
            if (code.length==2){
                urllink=urllink+','+code;
            }
            urllink=urllink+'&APPID=a61d75f85751f6111397e5a96d6484d7';

            $.ajax(
            {
                url: urllink,
                data: {format: 'json'},
                error: function()
                {
                    //chyba
                },
                dataType: 'json',
                success: function(data)
                {
                    console.log("temp: "+data.main.temp);
                    console.log("desc: "+data.weather[0].description);
                    $( '#sunriseDiv' ).text("Sunreise: " + new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes() );
                    $( '#sunsetDiv' ).text("Sunset: " + new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes() );

                     $('#main').empty();
                var table=$('<table/>');

                $(table).addClass("weatherTable");

                var tr=getTr('City:', city);
                table.append(tr);
                $('#form').append(table);
                
                var tr=getTr('Country:', $('#country').val());
                table.append(tr);
                
                var tr=getTr('Temperature:', parseFloat(data.main.temp-273.15).toFixed(1)+" ℃")
                table.append(tr);
                
                var tr=getTr('Humidity:', data.main.humidity+" %");
                table.append(tr);
                
                var tr=getTr('Description:', data.weather[0].description);
                table.append(tr);
                
                var tr=getTr('Pressure:', data.main.pressure+' hPa');
                table.append(tr);
                
                if($("#showDetails").is(":checked") == true){
                    
                    
                    var tr=getTr('Sunrise:',new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
                    table.append(tr);
                        
                 
                    var tr=getTr('Sunset:',new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
                    table.append(tr);
                    
                    var tr=getTr('Wind:', data.wind.speed+' m/s');
                    table.append(tr); 
                    
                    var tr=getTr('Min temperature:', parseFloat(data.main.temp_min-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getTr('Max temperature:', parseFloat(data.main.temp_max-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getTr('Visibility:', data.visibility);
                    table.append(tr);
                };


                },
                type: 'GET'
            });
        }
    });
    function getTr(data1,data2){
    
        var tr=$('<tr/>');
        var td1=$('<td/>');
        $(td1).append(data1);
        var td2=$('<td/>');
        $(td2).append(data2);
        tr.append(td1);
        tr.append(td2); 
                    
         return tr;

    }
});