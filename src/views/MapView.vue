<template>
  <div class="map">
    <l-map :center="center" :zoom="mapZoom">
      <l-tile-layer :url="mapData.url" :attribution="mapData.attribution" />
      <l-moving-rotated-marker
        ref="driveMarker"
        :lat-lng="driveLatLng"
        :duration="4000"
        :icon="icon"
      />
      <l-moving-rotated-marker
        ref="driveMarker2"
        :lat-lng="driveLatLng2"
        :duration="4000"
        :icon="icon2"
      />
      <l-moving-rotated-marker
        ref="driveMarker3"
        :lat-lng="driveLatLng3"
        :duration="4000"
        :icon="icon3"
      />
    </l-map>
    <sidebar></sidebar>
  </div>
</template>

<script>
import * as L from "leaflet";
import { LMap, LTileLayer, LIconDefault, LPopup } from "vue2-leaflet";
import LMovingRotatedMarker from "vue2-leaflet-moving-rotated-marker";
import Sidebar from "./Sidebar.vue";

const iconUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAExSURBVHgBpZQ/TsNQDMY/u6VUnXKEcAKykY0w0bJxAjIAYqOcIM0NMiKIRDgBY5AYCFPD1t4gR8hUVVR95oU/UVsENM1veXqW/enZzzZhBefBNaad5iWEHGJY+jRAkovCCIJ7YJakvShbjKHFy97jaZ+ZvI/A38lEiZ/2bqMfIvbTuUcKA6yJQA3Sw9AvRez4zCWmO1REzdXV61EYkB27JnHrWdtMVEby7clsh4EtZzOBAjKm7Waf0eAT1ICI9pmgLNSBYPE/37mOisFFI6EWkuvC8gh1UBiziLygBgJE3G69BTVSyoBGwslBlEORjw34nKHrjIvLsHsT6P6vJERKlUO4NMVfM+Thrw4uUtcvGHbDoDSt+tjxhQnM9S4hVwfsfu8TfY61c9KadILkOFiq4Tutkm8wGWVJtwAAAABJRU5ErkJggg==";
const drivePath = [
  { latLng: [37.49657573193841, 126.76146626472475] },
  { latLng: [37.497180092018766, 126.76161646842955] },
  { latLng: [37.49929105786361, 126.76206707954405] },
  { latLng: [37.499103797176566, 126.76371932029723] },
  { latLng: [37.4975461105344, 126.76334381103516] },
  { latLng: [37.49749078226924, 126.76334112882614] },
  { latLng: [37.49743970998806, 126.76381856203079] },
  { latLng: [37.496269293972624, 126.7635530233383] },
  { latLng: [37.49606500129685, 126.76511406898499] },
  { latLng: [37.497286492935, 126.76536083221434] },
  { latLng: [37.49723967655053, 126.76597237586974] },
  { latLng: [37.49714604369354, 126.76603674888611] },
  { latLng: [37.495975623075466, 126.76576316356658] },
  { latLng: [37.49575856123534, 126.7674958705902] },
  { latLng: [37.496822583829704, 126.76771044731142] },
  { latLng: [37.49851009257543, 126.76807790994644] },
  { latLng: [37.498797369584764, 126.76594018936157] },
  { latLng: [37.49760569477414, 126.76566123962402] },
  { latLng: [37.497636550879605, 126.76536485552788] },
  { latLng: [37.49768762302613, 126.76536753773689] },
  { latLng: [37.49776529518204, 126.76478281617163] },
];

const iconUrl2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPCAYAAADphp8SAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgBpZK9DcIwEIXvHP5EFQoKOjMCG4SSzjABbMAGsAEjMAKpCBIFbMAI0FGQiFRIFFyI8yMRkdgJfI1PvtPTs98BaHCdyfTmCEs3V9MNMAYLAJRlXzmnat52Yh4ePBTinjNZqmaxqHF1BG8ydoiFInx8UL8ztn2o4qgOuPwQkZjUls+s4Chxc87rvYiG3ZF9hDKOmgauoQADMdfVl5CMGwK0oAhEy90KoRWK41bDDFzdN8IsFPL2Qopw0IKcWmyeuUmL6IMNdoIATCiH/yQa9Eb2JeMoiru8iMRsIFtkHKni1pGuQ+Qo2eCfSNcBZdxhUmv4AyKavQHKIkb4YmYANQAAAABJRU5ErkJggg==";
const drivePath2 = [
  { latLng: [37.49743970998806, 126.76381856203079] },
  { latLng: [37.496269293972624, 126.7635530233383] },
  { latLng: [37.49606500129685, 126.76511406898499] },
  { latLng: [37.497286492935, 126.76536083221434] },
  { latLng: [37.49723967655053, 126.76597237586974] },
  { latLng: [37.49714604369354, 126.76603674888611] },
  { latLng: [37.495975623075466, 126.76576316356658] },
  { latLng: [37.49575856123534, 126.7674958705902] },
  { latLng: [37.496822583829704, 126.76771044731142] },
  { latLng: [37.49851009257543, 126.76807790994644] },
  { latLng: [37.498797369584764, 126.76594018936157] },
  { latLng: [37.49760569477414, 126.76566123962402] },
  { latLng: [37.497636550879605, 126.76536485552788] },
  { latLng: [37.49768762302613, 126.76536753773689] },
  { latLng: [37.49776529518204, 126.76478281617163] },
];

const iconUrl3 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAlSURBVHgB7cxBAQAABATBI6IM8quADjx3AoxVRuvI9YCEhIRkDWFlAsXEIMSrAAAAAElFTkSuQmCC";
const drivePath3 = [
  { latLng: [37.496822583829704, 126.76771044731142] },
  { latLng: [37.49851009257543, 126.76807790994644] },
  { latLng: [37.498797369584764, 126.76594018936157] },
  { latLng: [37.49760569477414, 126.76566123962402] },
  { latLng: [37.497636550879605, 126.76536485552788] },
  { latLng: [37.49768762302613, 126.76536753773689] },
  { latLng: [37.49776529518204, 126.76478281617163] },
];

export default {
  components: {
    LMap,
    LTileLayer,
    LIconDefault,
    LPopup,
    Sidebar,

    LMovingRotatedMarker,
  },
  data() {
    return {
      icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 25],
        // iconAnchor: [20, 20],
        // popupAnchor: [0, -25],
      }),
      icon2: L.icon({
        iconUrl: iconUrl2,
        iconSize: [25, 25],
        // iconAnchor: [20, 20],
        // popupAnchor: [0, -25],
      }),
      icon3: L.icon({
        iconUrl: iconUrl3,
        iconSize: [25, 25],
        // iconAnchor: [20, 20],
        // popupAnchor: [0, -25],
      }),
      center: L.latLng(37.501406, 126.762122),
      mapZoom: 16,
      mapData: {
        attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>`,
        url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      },
      driveLatLng: L.latLng(drivePath[0].latLng),
      driveLatLng2: L.latLng(drivePath2[0].latLng),
      driveLatLng3: L.latLng(drivePath3[0].latLng),
      // driveRotationAngle: drivePath[0].bearing,
      drivePath: drivePath.slice(),
      drivePath2: drivePath2.slice(),
      drivePath3: drivePath3.slice(),
      driveMarker: null,
      driveMarker2: null,
      driveMarker3: null,
    };
  },
  methods: {
    simulate() {
      if (!this.drivePath.length) {
        this.$refs.driveMarker.mapObject.setLatLng(
          L.latLng(drivePath[0].latLng)
        );
        this.drivePath = drivePath.slice();
        return;
      }
      let point = this.drivePath.shift();
      this.driveLatLng = L.latLng(point.latLng);
      // this.driveRotationAngle = point.bearing;
    },
    simulate2() {
      if (!this.drivePath2.length) {
        this.$refs.driveMarker2.mapObject.setLatLng(
          L.latLng(drivePath2[0].latLng)
        );
        this.drivePath2 = drivePath2.slice();
        return;
      }
      let point2 = this.drivePath2.shift();
      this.driveLatLng2 = L.latLng(point2.latLng);
    },
    simulate3() {
      if (!this.drivePath3.length) {
        this.$refs.driveMarker3.mapObject.setLatLng(
          L.latLng(drivePath3[0].latLng)
        );
        this.drivePath3 = drivePath3.slice();
        return;
      }
      let point3 = this.drivePath3.shift();
      this.driveLatLng3 = L.latLng(point3.latLng);
    },
  },
  mounted() {
    setInterval(() => {
      this.simulate();
      this.simulate2();
      this.simulate3();
    }, 4000);
    // }, 4000);

  },
};
</script>

<style>
  .map {
    height: 94.1vh;
    width: 100%;
  }
</style>
