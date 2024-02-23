export default {
  async loaditemsDaftar({ commit }, searchParams) {
    try {
      const response = await this.$axios.$get('api/daftar', {
        params: searchParams,
      })
      commit('SET_DAFTAR', response.data)
      // console.log(response)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async editStatus({ commit }, payload) {
    try {
      const response = await this.$axios.post(
        `api/edit_status/${payload.id}`,
        payload
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Status')
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
      const { data } = await this.$axios.delete(`api/hapusDaftar_pasien/${id}`)
      this.$toast.success('Berhasil Hapus Daftar')
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
