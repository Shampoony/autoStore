<template>
  <div id="map" style="width: 100%; height: 500px">
    <LMap :zoom="zoom" :center="center">
      <LTileLayer :url="tileLayerUrl" />
      <LMarker :lat-lng="markerPosition">
        <template #popup>
          <span>Местоположение</span>
        </template>
      </LMarker>
    </LMap>
  </div>
</template>

<!-- 
title, model, year_of_release, body_type, color, (engine_volume, engine_type), mileage,
Transmission, drive, owners_count, condition, market_version
 -->
<!-- 
body_type, color, engine_type,
Transmission, drive,  condition, market_version
 -->

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    // Принимаем координаты как объект с полями lat и lng
    coordinates: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const zoom = ref(13) // Уровень приближения
    const center = ref([props.coordinates.lat, props.coordinates.lng]) // Начальные координаты
    const markerPosition = ref([props.coordinates.lat, props.coordinates.lng]) // Координаты метки

    // Если нужно, можно обновить координаты при изменении props
    watch(
      () => props.coordinates,
      (newCoordinates) => {
        markerPosition.value = [newCoordinates.lat, newCoordinates.lng]
        center.value = [newCoordinates.lat, newCoordinates.lng]
      }
    )

    return {
      zoom,
      center,
      markerPosition,
      tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  }
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
