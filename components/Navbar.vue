<template>
  <div>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      style="background-color: #004e64; color: white"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color: white" />

      <v-avatar size="50" class="mr-5">
        <img src="~/assets/img/logo.png" alt="" />
      </v-avatar>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <!-- <img
        src="~/assets/img/logo.png"
        alt=""
        class="img-fluid"
        style="max-width: 200px; height: auto"
      /> -->
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" style="font-weight: bold" icon>
            <v-icon style="color: white">mdi-logout</v-icon>
          </v-btn>
        </template>
        <v-list style="width: 18vh">
          <v-list-item @click="logout">Logout</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      style="background-color: #00a5cf"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          style="color: white"
        >
          <v-list-item-action>
            <v-icon style="color: white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard-edit-outline',
          title: 'Dashboard Section',
          to: '/dashboardSection1',
        },
        {
          icon: 'mdi-view-dashboard-edit-outline',
          title: 'Dashboard Section 2',
          to: '/dashboardSection2',
        },
        {
          icon: 'mdi-view-dashboard-edit-outline',
          title: 'Dashboard Galeri',
          to: '/dashboardGaleri',
        },
        {
          icon: 'mdi-view-dashboard-edit-outline',
          title: 'Dashboard Staff',
          to: '/dashboardStaff',
        },
        {
          icon: 'mdi-view-dashboard-edit-outline',
          title: 'Dashboard Pengumuman',
          to: '/dashboardPengumuman',
        },
        {
          icon: 'mdi-view-dashboard-edit-outline',
          title: 'Dashboard Footer',
          to: '/dashboardFooter',
        },
        {
          icon: 'mdi-clock-time-eight-outline',
          title: 'Jadwal Dokter',
          to: '/jadwalDokter',
        },
        {
          icon: 'mdi-account-group',
          title: 'Daftar Pasien',
          to: '/dashboardDaftar',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Metro Medika Care Admin',
    }
  },

  methods: {
    logout() {
      this.$cookies.remove('AdminToken')
      window.location.replace('/')
      this.$toast.success('Berhasil Logout')
    },
  },
}
</script>
