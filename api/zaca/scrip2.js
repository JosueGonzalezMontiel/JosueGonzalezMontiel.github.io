function iniciarMap(){
    var coord = {lat:19.8735055 ,lng: -97.5887976};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 15,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}