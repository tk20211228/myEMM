<template>
  <div>
    <v-col>
      <v-switch
        v-model="geolocation"
        class="ma-2"
        color="green lighten-2"
        hide-details
        label="位置情報取得を有効にする"
        @change="handleGeolocationToggle"
      ></v-switch>
      <v-switch
        v-model="notification"
        class="ma-2"
        color="green lighten-2"
        hide-details
        label="通知を有効にする"
        @change="handleNotificationToggle"
      ></v-switch>

      <v-dialog v-model="showDialog" persistent max-width="300">
        <v-card>
          <v-card-title>位置情報許可要求</v-card-title>
          <v-card-text>位置情報の利用を許可してください。</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showNotificationDialog" persistent max-width="300">
        <v-card>
          <v-card-title>通知許可要求</v-card-title>
          <v-card-text>通知の利用を許可してください。</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showNotificationDialog = false"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      geolocation: false,
      notification: false,
      showDialog: false,
      showNotificationDialog: false,
    }
  },
  created() {
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          this.geolocation = permissionStatus.state === 'granted'
          this.showDialog = permissionStatus.state === 'denied'
        })

      navigator.permissions
        .query({ name: 'notifications' })
        .then((permissionStatus) => {
          this.notification = permissionStatus.state === 'granted'
          this.showNotificationDialog = permissionStatus.state === 'denied'
        })
    }
  },
  methods: {
    handleGeolocationToggle() {
      if (this.geolocation && 'geolocation' in navigator) {
        // navigator.geolocation.getCurrentPosition(
        navigator.geolocation.watchPosition(
          (position) => {
            console.log(
              `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
            )
          },
          (error) => {
            console.error('Error Code = ' + error.code + ' - ' + error.message)
            this.showDialog = true
            this.geolocation = false
          }
        )
      } else {
        console.log('Geolocation is either not supported or not enabled.')
      }
    },
    handleNotificationToggle() {
      if (this.notification) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') {
            console.log('Notification permission not granted.')
            this.showNotificationDialog = true
            this.notification = false
          }
        })
      } else {
        console.log('Notifications are either not supported or not enabled.')
      }
    },
  },
}
</script>
