const Map = ol.Map;
const View = ol.View;
const ImageLayer = ol.layer.Image;
const TileLayer = ol.layer.Tile;
const ImageWMS = ol.source.ImageWMS;
const OSM = ol.source.OSM;

var layers = [
  new TileLayer({
    source: new OSM()
  }),
  new ImageLayer({
    extent: [17.855810942987086, 48.74340686277337, 17.949233586756084,48.791395668797165],
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/ows?',
      params: {LAYERS: ['uloha_2:budova', 'uloha_2:chodnik', 'uloha_2:stlp', 'uloha_2:studna', 'uloha_2:cesta', 'uloha_2:ihrisko']},
      ratio: 1,
      serverType: 'geoserver'
    }),
  })
];
var map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [17.89, 48.75],
    zoom: 15
  
  })
}); 
function funxml() {
    fetch('http://localhost:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities',
    {mode:'cors'}).then(function(response) {
      return response.text();
    }).then(function(data) {
      let parser = new DOMParser();
      XMLDocument=parser.parseFromString(data,'text/xml');
      console.log(XMLDocument.getElementsByTagName('sco'));
      document.getElementById('Capabilities').textContent=data;
    });
    }
    