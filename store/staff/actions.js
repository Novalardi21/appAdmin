export default {
  async loaditemsStaff({ commit }) {
    try {
      const response = await this.$axios.$get('api/staff')

      commit('SET_STAFF', response.data)
      return {
        status: true,
        message: 'Berhasil mendapatkan data',
      }
    } catch (e) {
      console.error('Terjadi kesalahan:', e.message)
    }
  },

  async tambahStaff({ commit }, payload) {
    try {
      console.log(payload)
      const response = await this.$axios.post('api/tambah_staff', payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Tambah Staff')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async editStaff({ commit }, payload) {
    try {
      // console.log('payload')
      // console.log(payload)
      const formData = new FormData()
      formData.append('foto', payload.foto)
      formData.append('nama', payload.nama)
      formData.append('jabatan', payload.jabatan)

      // Atur header Content-Type menjadi multipart/form-data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const response = await this.$axios.post(
        `api/edit_staff/${payload.id}`,
        formData,
        config
      )
      console.log(payload)

      if (response.status === 200) {
        this.$toast.success('Berhasil Ubah Staff')
        window.location.reload()
      } else {
        console.error('Gagal mengedit data')
      }
    } catch (e) {
      console.error('Terjadi kesalahan saat mengedit data:', e.message)
    }
  },

  async hapusStaff({ commit }, id) {
    try {
      // console.log(payload);
      const { data } = await this.$axios.delete(`api/hapus_staff/${id}`)
      this.$toast.success('Berhasil Hapus Staff')
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
