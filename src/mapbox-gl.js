(async function() {
  let points = await fetch("../data/tr_il_merkezleri.json").then(response =>
    response.json()
  );

  let polygons = await fetch("../data/tr_voronoi.json").then(response => response.json());
  
  // let area, areas = [];
  // for(let i=0;i<81;i++) {
  //   area = turf.area(polygons.features[i]);
  //   area = turf.convertArea(area, "meters", "kilometers");
  //   areas.push({"id": i+1, "name": points.features[i].properties.name, "area":Number(area.toFixed(2))});
  // }
  // areas.sort((a, b) => (a.area <  b.area) ? 1 : -1)
  // // areas.forEach((id) => {
  //   // console.log(id);
  // // });
  // console.log(JSON.stringify(areas));

  mapboxgl.accessToken =
    "accessToken";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: [35, 39],
    zoom: 5.7
  });

  map.addControl(new mapboxgl.NavigationControl());

  map.on("load", function() {
    map.addSource("pts", {
      type: "geojson",
      data: points
    });
    map.addLayer({
      id: "pts",
      type: "circle",
      source: "pts",
      layout: {}
    });

    map.addSource("plys", {
      type: "geojson",
      data: polygons
    });
    map.addLayer({
      id: "plys",
      type: "line",
      source: "plys",
      layout: {},
      // paint: {"line-width": 2}
    });
  
  });
})();