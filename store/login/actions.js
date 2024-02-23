export default {
  // store/actions.js

  async loginUser({ commit }, payload) {
    try {
      // Panggil endpoint login di backend
      console.log(payload)
      const response = await this.$axios.post('api/login', payload)

      // Handle respons dari backend
      if (response.data.success) {
        // Lakukan tindakan yang diperlukan tanpa menyimpan data di dalam state
        console.log('Login berhasil')
        return { success: true, message: 'Login berhasil' }
      } else {
        console.log('Login gagal')
        return { success: false, message: 'Login gagal' }
      }
    } catch (error) {
      // Tangkap kesalahan jika ada
      console.error('Error during login:', error)
      return { success: false, message: 'Terjadi kesalahan saat login' }
    }
  },

  // Tambahkan actions lainnya sesuai kebutuhan
}
