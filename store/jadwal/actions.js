export default {
  async loaditemsJadwal({ commit }, searchParams) {
    try {
      const response = await this.$axios.$get('api/dokter')
      commit('SET_JADWAL', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahJadwal({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_dokter', payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Tambah Jadwal')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editJadwal({ commit }, payload) {
    try {
      const response = await this.$axios.post(
        `api/edit_dokter/${payload.id}`,
        payload
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Jadwal')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusJadwal({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_dokter/${id}`)
      this.$toast.success('Berhasil Hapus Jadwal')
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
