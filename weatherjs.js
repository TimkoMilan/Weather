$("#document").ready(function(){
        $("#submit").click(function(){
        	var city = $("#city").val();
        	var country = $("#country").val();
        		if (city.length>1) {
        			var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
        			urllink = urllink + city ; 
        			if (country.length == 2) {
        				urllink = urllink + ',' + country;
        				urllink = urllink + '&appid=a61d75f85751f6111397e5a96d6484d7';
        				console.log(urllink);
        			}
        		}

                $.ajax({
                    url : urllink,
                    data : { format: 'json'},
                    error : function(){
                        console.log('error');

                 },
                    datatype : 'json',
                    success : function(data){
                        console.log("temp"+data.main.temp);
                    
                    },
                        type : 'GET'
                    });

        
    });

});