<template>
  <div>
    <div class="mapContainer" ref="mapContainer" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
import { toRaw } from 'vue'

export default {
  name: 'mapTest',
  props: {
    coordinates: { type: Object, default: null },
    selector: { type: Boolean, default: false }, // для выбора точки
    areaSelector: { type: Boolean, default: false } // для выделения области
  },
  data() {
    return {
      map: null,
      markers: [], // Массив для хранения маркеров
      polygon: null, // Для хранения выделенной области полигоном
      polygonPoints: [], // Точки полигона
      isDrawingPolygon: false, // Флаг для отслеживания режима рисования
      polygonPath: null, // Путь полигона
      tempMarkers: [], // Временные маркеры при рисовании полигона
      geocoder: new google.maps.Geocoder(), // Инициализируем геокодер
      lastPointMarker: null // Для хранения маркера последней точки
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const center = this.coordinates || { lat: 40.4093, lng: 49.8671 } // default to Baku
      this.map = new google.maps.Map(this.$refs.mapContainer, {
        zoom: 12,
        center
      })

      // Если координаты переданы, создаём маркер на них
      if (this.coordinates) {
        this.addMarker(this.coordinates)
      }

      if (this.selector) {
        this.map.addListener('click', (event) => {
          const selectedCoords = { lat: event.latLng.lat(), lng: event.latLng.lng() }

          // Получаем адрес по координатам
          this.getAddressFromCoordinates(selectedCoords, (address) => {
            // Отправляем новые координаты и адрес
            this.$emit('update:coordinates', { coordinates: selectedCoords, address })
          })

          // Обновляем маркер
          this.addMarker(selectedCoords)
        })
      }

      // Условие для выделения области
      if (this.areaSelector) {
        this.enablePolygonSelection()
      }
    },
    addMarker(position) {
      // Удаляем все существующие маркеры
      this.clearMarkers()

      // Создаём новый маркер на переданных координатах
      const newMarker = new google.maps.Marker({
        position,
        map: this.map
      })

      // Добавляем новый маркер в массив
      this.markers.push(newMarker)
    },
    clearMarkers() {
      // Удаляем все маркеры из массива
      this.markers.map((marker) => toRaw(marker).setMap(null))
      this.markers = []
    },
    enablePolygonSelection() {
      // Создаем кнопку для начала рисования полигона
      const drawingButton = document.createElement('div')
      drawingButton.className = 'custom-map-control'
      drawingButton.style.backgroundColor = '#fff'
      drawingButton.style.border = '2px solid #fff'
      drawingButton.style.borderRadius = '3px'
      drawingButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
      drawingButton.style.cursor = 'pointer'
      drawingButton.style.marginBottom = '22px'
      drawingButton.style.textAlign = 'center'
      drawingButton.style.padding = '6px 10px'
      drawingButton.innerHTML = 'Начать рисовать область'

      // Добавляем кнопку на карту
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(drawingButton)

      // Добавляем обработчик клика на кнопку
      drawingButton.addEventListener('click', () => {
        if (!this.isDrawingPolygon) {
          // Начинаем рисовать полигон
          this.startDrawingPolygon(drawingButton)
        } else {
          // Завершаем рисование полигона
          this.finishDrawingPolygon(drawingButton)
        }
      })
    },
    startDrawingPolygon(button) {
      // Очищаем все временные маркеры и предыдущие полигоны
      this.clearTempMarkers()
      this.clearPolygonPoints()

      // Удаляем старый полигон, если он существует
      if (this.polygon) {
        this.polygon.setMap(null)

        this.polygon = null
      }

      // Создаём новый путь для рисования полигона
      this.polygonPath = new google.maps.Polyline({
        path: this.polygonPoints,
        geodesic: true,
        strokeColor: '#2196F3',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.map
      })

      // Устанавливаем флаг рисования
      this.isDrawingPolygon = true
      button.innerHTML = 'Завершить рисование'

      // Добавляем обработчик клика на карту
      this.clickListener = this.map.addListener('click', (event) => {
        const point = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        this.polygonPoints.push(point)

        // Обновляем путь полигона
        this.polygonPath.setPath(this.polygonPoints)

        // Добавляем временный маркер
        const marker = new google.maps.Marker({
          position: point,
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: '#2196F3',
            fillOpacity: 0.8,
            strokeColor: '#fff',
            strokeWeight: 1
          }
        })
        this.tempMarkers.push(marker)

        // Обновляем красный маркер последней точки
        if (this.lastPointMarker) {
          this.lastPointMarker.setMap(null)
        }
        this.lastPointMarker = new google.maps.Marker({
          position: point,
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: '#FF0000',
            fillOpacity: 0.8,
            strokeColor: '#fff',
            strokeWeight: 1
          }
        })
      })
    },

    finishDrawingPolygon(button) {
      // Удаляем обработчик клика
      google.maps.event.removeListener(this.clickListener)

      // Удаляем путь рисования полигона
      if (this.polygonPath) {
        this.polygonPath.setMap(null)
      }

      // Проверяем, что у нас есть минимум 3 точки для полигона
      if (this.polygonPoints.length >= 3) {
        // Создаём новый полигон
        this.polygon = new google.maps.Polygon({
          paths: this.polygonPoints,
          strokeColor: '#2196F3',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#2196F3',
          fillOpacity: 0.35,
          editable: true,
          map: this.map
        })

        // Добавляем обработчик события изменения полигона
        google.maps.event.addListener(this.polygon, 'mouseup', () => {
          this.emitPolygonChange()
        })

        // Отправляем начальные координаты полигона
        this.emitPolygonChange()
      }

      // Сбрасываем флаг рисования
      this.isDrawingPolygon = false
      button.innerHTML = 'Начать рисовать область'

      // Удаляем временные маркеры
      this.clearTempMarkers()
    },

    clearTempMarkers() {
      this.tempMarkers.forEach((marker) => marker.setMap(null))
      this.tempMarkers = []
    },
    clearPolygonPoints() {
      this.polygonPoints = []
    },
    emitPolygonChange() {
      if (this.polygon) {
        const path = this.polygon.getPath()
        const coordinates = []

        // Собираем все точки полигона
        for (let i = 0; i < path.getLength(); i++) {
          const point = path.getAt(i)
          coordinates.push({
            lat: point.lat(),
            lng: point.lng()
          })
        }

        // Отправляем координаты через событие
        this.$emit('update:area', coordinates)
      }
    },
    getAddressFromCoordinates(coords, callback) {
      // Используем геокодер для получения адреса по координатам
      this.geocoder.geocode({ location: coords }, (results, status) => {
        if (status === 'OK' && results[0]) {
          let street = ''
          let streetNumber = ''
          let city = ''
          let country = ''

          // Проходим по компонентам и извлекаем нужные данные
          for (let i = 0; i < results[0].address_components.length; i++) {
            const component = results[0].address_components[i]

            if (component.types.includes('route')) {
              street = component.long_name // Получаем название улицы
            }
            if (component.types.includes('street_number')) {
              streetNumber = component.long_name // Получаем номер дома
            }
            if (
              component.types.includes('locality') ||
              component.types.includes('administrative_area_level_1')
            ) {
              city = component.long_name // Получаем город
            }
            if (component.types.includes('country')) {
              country = component.long_name // Получаем страну
            }
          }

          // Если удалось найти улицу и номер дома, формируем полный адрес
          if (street && streetNumber) {
            let formattedAddress = `${street} ${streetNumber}, ${city}, ${country}`
            callback(formattedAddress) // Отправляем полный адрес
          } else {
            // Если не нашли улицу и номер дома, отправляем только город и страну
            let cityAndCountry = `${city}, ${country}`
            callback(cityAndCountry) // Отправляем только город и страну
          }
        } else {
          console.error('Geocoder failed due to: ' + status)
          callback('Адрес не найден')
        }
      })
    }
  }
}
</script>
