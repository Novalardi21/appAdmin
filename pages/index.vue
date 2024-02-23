<template>
  <div class="background">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card
          style="height: 60vh; border-radius: 10px; margin-top: 10vh"
          :height="height"
          elevation="5"
        >
          <v-card-title class="align-center justify-center pt-5">
            <h3>Login Admin Metro Medika Care</h3>
          </v-card-title>
          <v-card-text class="mt-5">
            <v-text-field
              outlined
              style="margin: 0 auto; max-width: 500px"
              label="Username"
              v-model="formLogin.username"
            ></v-text-field>
            <v-text-field
              outlined
              style="margin: 0 auto; max-width: 500px"
              label="Password"
              type="password"
              v-model="formLogin.password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="align-center justify-center">
            <v-btn
              style="
                width: 400px;
                background-color: #004e64;
                color: white;
                border-radius: 8px;
              "
              class="text-none"
              elevation="0"
              @click="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head: {
    title: 'login',
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
    },
  },

  data: () => ({
    formLogin: {
      username: null,
      password: null,
    },
  }),

  methods: {
    isFormValid() {
      const requiredFields = ['username', 'password']

      for (const field of requiredFields) {
        if (!this.formLogin[field]) {
          // Tampilkan pesan toast jika form belum diisi semua
          this.$toast.error(`Kolom ${field} harus diisi.`)
          return false
        }
      }

      return true
    },
    async login() {
      try {
        // Validasi form sebelum mengirim permintaan login
        if (!this.isFormValid()) {
          return
        }

        // Panggil action untuk login
        const { success, message } = await this.$store.dispatch(
          'login/loginUser',
          this.formLogin
        )

        if (success) {
          // Login berhasil, redirect ke halaman /dashboard
          this.$cookies.set('AdminToken', 'Berhasil')
          this.$router.push('/dashboardSection1')
          this.$toast.success('Login Berhasil',{duration:2000})
        } else {
          // Gagal login, tampilkan pesan kesalahan
          alert(message)
          this.$toast.global.my_error() // Menggunakan custom toast
          this.$toast.error('Error while authenticating')
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
        alert('Terjadi kesalahan saat login.')
      }
    },
  },
}
</script>
<style>
.background {
  background: url('@/assets/img/bg.jpg');
  background-size: cover;
  height: 100%;
}
</style>
<style src="~/assets/fonts.css"></style>
