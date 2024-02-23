export default {
  async loaditemsPengumuman({ commit }, searchParams) {
    try {
      const response = await this.$axios.$get('api/pengumuman')

      commit('SET_PENGUMUMAN', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahPengumuman({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_pengumuman', payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Tambah Pengumuman')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editPengumuman({ commit }, payload) {
    try {
      const formData = new FormData()
      formData.append('foto', payload.foto)
      formData.append('judul', payload.judul)
      formData.append('isi', payload.isi)

      // Atur header Content-Type menjadi multipart/form-data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const response = await this.$axios.post(
        `api/edit_pengumuman/${payload.id}`,
        formData,
        config
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Pengumuman')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusPengumuman({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_pengumuman/${id}`)
      this.$toast.success('Berhasil Hapus Pengumuman')
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
