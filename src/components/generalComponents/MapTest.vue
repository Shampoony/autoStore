<template>
  <div>
    <div ref="mapContainer" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markers: [{ title: 'Красная площадь', lat: 55.753215, lng: 37.622504 }]
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const center = { lat: 55.753215, lng: 37.622504 }
      this.map = new google.maps.Map(this.$refs.mapContainer, {
        zoom: 12,
        center
      })

      this.markers.forEach((markerData) => {
        new google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: this.map,
          title: markerData.title
        })
      })
    }
  }
}
</script>
