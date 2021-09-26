<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">

	<title>Wisata Dampit</title>
	<link rel="shortcut icon" href="favicon.png"/>

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
	   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
	   crossorigin=""/>
	<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
	   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
	   crossorigin=""></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<style type="text/css">
		html, body, #mapid {
			height: 100%;
			margin: 0;
		}
	</style>

	<link rel="stylesheet" type="text/css" href="plugin/ExtendCenter/leaflet.defaultextent.css">
	<script src="plugin/ExtendCenter/leaflet.defaultextent.js"></script>

	<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
	<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.css" />
	<script src="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.js" charset="utf-8"></script>

	<link rel="stylesheet" href="dist/L.Icon.Pulse.css" />
	<script src="dist/L.Icon.Pulse.js"></script>		


</head>
<body>

<div id="mapid"></div>
<script src="data/LokasiWisata_1.js"></script>

<script type="text/javascript">
	
var map = L.map('mapid').setView([-8.2490867,112.782674], 12);

function onEachFeature(feature, layer) {
	var popupContent = 
	'<table>\
                    <tr>\
                        <th scope="row">Nama Wisata : </th>\
                        <td>' + (feature.properties['name']) + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Alamat : </th>\
                        <td>' + (feature.properties['address']) + '</td>\
                    </tr>\
    </table>';
	layer.bindPopup(popupContent);
}

var wisata = L.geoJson(LokasiWisata,{
	onEachFeature: onEachFeature
}).addTo(map);

var pulsingIcon = L.icon.pulse({iconSize:[5,5],color:'green'});
var marker = L.marker([-8.177985,112.766692],{icon: pulsingIcon}).addTo(map);

var umbulan = L.icon({
					iconUrl:'legend/red-pin.png',
					iconSize:[24, 40],
					iconAnchor:   [12, 40]
});
var marker1 = L.marker([-8.177985,112.766692],{icon: umbulan}).addTo(map);
marker1.bindPopup(
	"<center><b>Wisata Pemandian Umbulan<br>Ds. Umbulrejo Ubalan, Pamotan, Dampit, Kabupaten Malang.</b></center><br>Data Pengunjung Tanggal 25 September 2021<br>- Kapasitas Pengunjung <b>1000</b><br>- Jumlah Pengunjung <b>748/1000</b>"
);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);


L.control.defaultExtent().addTo(map);

L.Control.geocoder({
	position: 'topleft'
}).addTo(map);

L.control.locate().addTo(map);

var imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
imagery.addTo(map);

var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
OSM.addTo(map);

var basemap = {
	'Imagery' : imagery,
	'Open Street Map' : OSM
}

L.control.layers(basemap, {' <img src="legend/red.png" />  Pemandian Umbulan':marker1, '<img src="legend/LokasiWisata_1.png" /> Lokasi Wisata Lainnya': wisata}).addTo(map);
</script>

</body>
</html>