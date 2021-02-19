var lat, long

function consultaTempo() { 
    cidade = document.getElementById('cidade');
    $("#tituloTabela").html(cidade.value)       
    $.ajax({
        type: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?q="+ cidade.value + "&appid=key",
        success: function(resposta) {  
            $("#grauAtual").html(resposta.main.temp - 273.15),  
            $("#grauMax").html(resposta.main.temp_max - 273.15),
            $("#grauMin").html(resposta.main.temp_min - 273.15),
            date1 = new Date(resposta.sys.sunrise * 1000)
            $("#nSol").html(date1.getHours() + ":" + date1.getMinutes()),
            date2 = new Date(resposta.sys.sunset * 1000)
            $("#pSol").html(date2.getHours() + ":" + date2.getMinutes()),
            $("#long").html(resposta.coord.lon),
            long = resposta.coord.lon
            $("#lat").html(resposta.coord.lat),
            lat = resposta.coord.lat
            
            var iconcode = resposta.weather[0].icon;
			var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
			$('#cond').attr("src", iconurl);
			
            initMap();    
        }
    });

}  

//let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: Number(lat), lng: Number(long) },
        zoom: 8,
    });
}