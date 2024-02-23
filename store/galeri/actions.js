export default {
  async loaditemsGaleri({ commit }, searchParams) {
    try {
      const response = await this.$axios.$get('api/galeri')

      commit('SET_GALERI', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahGaleri({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_galeri', payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Tambah Galeri')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editGaleri({ commit }, payload) {
    try {
      // console.log('payload')
      // console.log(payload)
      const formData = new FormData()
      formData.append('gambar', payload.gambar)

      // Atur header Content-Type menjadi multipart/form-data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      // const response = await this.$axios.post(
      //   `api/edit_section/${payload.id}`,
      //   payload
      // )
      const response = await this.$axios.post(
        `api/edit_galeri/${payload.id}`,
        formData,
        config
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Galeri')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusGaleri({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_galeri/${id}`)
      this.$toast.success('Berhasil Hapus Galeri')
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
