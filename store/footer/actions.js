export default {
  async loaditemsFooter({ commit }, searchParams) {
    try {
      const response = await this.$axios.$get('api/footer')
      commit('SET_FOOTER', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahFooter({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_footer', payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Tambah Footer')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editFooter({ commit }, payload) {
    try {
      const response = await this.$axios.post(
        `api/edit_footer/${payload.id}`,
        payload
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Footer')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusDaftar({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_footer/${id}`)
      this.$toast.success('Berhasil Hapus Footer')
      return { status: true, message: 'Berhasil Menghapus data' }
    } catch (e) {
      if (e.message.toLowerCase().includes('network')) {
        return {
          status: false,
          message: 'Koneksi bermasalah, silakan cek koneksi internet.',
        }
      } else {
        const { errors, message } = e.response.data
        return {
          status: false,
          errors,
          data: [],
          message,
        }
      }
    }
  },
}
