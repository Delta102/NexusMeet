import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  zoom = 10;

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap( lng: number, lat:number  ): void {


    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [lng, lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.addMarker(lng, lat, lng.toString());
  }

  addMarker(longitude: number, latitude: number, title: string) {
    console.log("Desde el marker");
    console.log(longitude, latitude);
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup().setHTML(title))
      .addTo(this.map);
  }
}
