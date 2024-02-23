export default {
  async loaditemsAbout({ commit }) {
    try {
      const response = await this.$axios.$get('api/about')

      commit('SET_ABOUT', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async loaditemsServices({ commit }) {
    try {
      const response = await this.$axios.$get('api/pelayanan')

      commit('SET_SERVICES', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahAbout({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_about', payload)

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

  async tambahServices({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_services', payload)

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

  async editAbout({ commit }, payload) {
    try {
      const response = await this.$axios.put(
        `api/edit_about/${payload.id}`,
        payload
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah About')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editServices({ commit }, payload) {
    try {
      const response = await this.$axios.put(
        `api/edit_services/${payload.id}`,
        payload
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Services')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusAbout({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_section/${id}`)
      this.$toast.success('Berhasil Hapus About')
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
