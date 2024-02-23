export default {
  async loaditemsHero({ commit }) {
    try {
      const response = await this.$axios.$get('api/hero')

      commit('SET_HERO', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async loaditemsVisi({ commit }) {
    try {
      const response = await this.$axios.$get('api/visi')

      commit('SET_VISI', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahSection({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_section2', payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Tambah Section')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editSection2({ commit }, payload) {
    try {
      // console.log('payload')
      // console.log(payload)
      const formData = new FormData()
      formData.append('gambar', payload.gambar)
      formData.append('tipe_section', payload.tipe_section)

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
        `api/edit_section/${payload.id}`,
        formData,
        config
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Section')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },
  async editSectionVisi({ commit }, payload) {
    try {
      // console.log('payload')
      // console.log(payload)
      const formData = new FormData()
      formData.append('gambar', payload.gambar)
      formData.append('tipe_section', payload.tipe_section)
      formData.append('judul', payload.judul)
      formData.append('deskripsi', payload.deskripsi)

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
        `api/edit_section/${payload.id}`,
        formData,
        config
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Section')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusSection({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_section2/${id}`)
      this.$toast.success('Berhasil Hapus Section')
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
