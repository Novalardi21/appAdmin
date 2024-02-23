<template>
  <div>
    <v-dialog
      v-model="dialogForm.show"
      persistent
      scrollable
      :width="dialogForm.width"
    >
      <v-form>
        <v-card>
          <v-card-title style="color: #4b5f70" class="font-weight-regular">
            {{ dialogForm.title }}
          </v-card-title>
          <v-card-text class="mt-4">
            <v-row>
              <v-col cols="3" class="mt-3"> Nama Dokter </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formJadwal.nama_dokter"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Nama Dokter 2 </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formJadwal.nama_dokter2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Jam Praktek </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formJadwal.jam_praktek"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Jam Praktek 2 </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formJadwal.jam_praktek2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Hari </v-col>
              <v-col cols="2,5">
                <v-select
                  :items="items"
                  outlined
                  v-model="formJadwal.hari"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="text-capitalize font-weight-regular rounded-lg mr-2"
              width="150"
              text
              @click="closedialog"
            >
              Batal
            </v-btn>
            <v-btn
              elevation="2"
              class="text-capitalize font-weight-regular rounded-lg white--text"
              width="150"
              depressed
              color="#00a5cf"
              @click="tombolSimpan"
            >
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="">Konfirmasi Hapus</v-card-title>
        <v-card-text> Apakah Anda yakin ingin menghapus data ini? </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            class="text-capitalize font-weight-regular rounded-lg mr-2"
            width="150"
            text
            @click="showDeleteDialog = false"
          >
            Batal
          </v-btn>
          <v-btn
            elevation="2"
            class="text-capitalize font-weight-regular rounded-lg white--text"
            width="150"
            depressed
            color="#00a5cf"
            @click="hapusJadwal"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Jadwal Dokter</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Tabel Jadwal Dokter</h2>
          <p class="grey--text">*Batas 5 Data</p>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="jadwal.length < 5"
            :disabled="jadwal.length >= 5"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahJadwal', 'Tambah Jadwal Dokter')"
            >Tambah data <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="jadwal"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.nama_dokter="{ item }">
          <div class="text-left">
            {{ item.nama_dokter }}
          </div>
          <div class="text-left">
            {{ item.nama_dokter2 }}
          </div>
        </template>
        <template v-slot:item.jam_praktek="{ item }">
          <div class="text-left">
            {{ item.jam_praktek }}
          </div>
          <div class="text-left">
            {{ item.jam_praktek2 }}
          </div>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div class="text-left">
            {{ formatDateTime(item.created_at) }}
          </div>
        </template>

        <template v-slot:item.updated_at="{ item }">
          <div class="text-left">
            {{ formatDateTime(item.updated_at) }}
          </div>
        </template>
        <template v-slot:item.actions="{ item }" id="actions-column">
          <v-icon @click="edit_Jadwal(item)">mdi-pencil</v-icon>
          <v-icon @click="delete_Jadwal(item.id)">mdi-delete</v-icon>
        </template></v-data-table
      >
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  middleware: 'middleware_admin',
  head: {
    title: 'Jadwal Dokter',
  },

  computed: {
    ...mapGetters({
      jadwal: 'jadwal/getJadwal',
    }),
  },

  async created() {
    await this.$store.dispatch('jadwal/loaditemsJadwal')
  },

  data() {
    return {
      formJadwal: {
        nama_dokter: null,
        nama_dokter2: null,
        jam_praktek: null,
        jam_praktek2: null,
        hari: null,
      },
      headers: [
        {
          text: 'No',
          align: 'start',
          value: 'no',
          sortable: false,
          width: 10,
        },
        {
          text: 'Hari',
          value: 'hari',
          sortable: false,
          width: 20,
          align: 'center',
        },
        {
          text: 'Nama Dokter',
          value: 'nama_dokter',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Jam Praktek',
          value: 'jam_praktek',
          sortable: false,
          width: 80,
          align: 'center',
        },
        {
          text: 'Created at',
          value: 'created_at',
          sortable: false,
          width: 20,
          align: 'center',
        },
        {
          text: 'Updated at',
          value: 'updated_at',
          sortable: false,
          width: 20,
          align: 'center',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          width: 20,
          align: 'center',
        },
      ],
      selectedFile: null,
      deletingItemId: null,
      showDeleteDialog: false,
      dialogForm: {
        type: '',
        show: false,
        title: '',
        width: 700,
      },
      items: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
    }
  },

  methods: {
    formatDateTime(dateTimeString) {
      return moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss')
    },

    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditJadwal') {
        this.formJadwal = { ...data }
      }
    },

    closedialog() {
      this.dialogForm.show = false
      this.formJadwal = {
        nama_dokter: null,
        nama_dokter2: null,
        jam_praktek: null,
        jam_praktek2: null,
        hari: null,
      }
    },

    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahJadwal') {
        this.tambahJadwal()
      } else if (this.dialogForm.type === 'formEditJadwal') {
        this.EditJadwal()
      } else {
        console.error('Tipe dialog tidak valid')
      }
    },

    edit_Jadwal(item) {
      // console.log(item)
      this.openDialogForm('formEditJadwal', 'Edit Jadwal', item)
    },

    delete_Jadwal(id) {
      // console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },

    isFormValid() {
      const requiredFields = [
        'nama_dokter',
        'nama_dokter2',
        'jam_praktek',
        'jam_praktek2',
        'hari',
      ]

      for (const field of requiredFields) {
        if (!this.formJadwal[field]) {
          // Tampilkan pesan toast jika form belum diisi semua
          this.$toast.error(`Kolom ${field} harus diisi.`, { duration: 1000 })
          return false
        }
      }

      return true
    },
    async tambahJadwal() {
      try {
        // Validasi form sebelum mengirim permintaan
        if (!this.isFormValid()) {
          return
        }

        // Panggil action untuk mengirim aduan
        const { success, message } = await this.$store.dispatch(
          'jadwal/tambahJadwal',
          this.formJadwal
        )

        if (success) {
          // this.$toast.success('Berhasil Mengirim Aduan')
        } else {
          // Gagal mengirim, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async EditJadwal() {
      try {
        // Panggil action untuk login
        const { success, message } = await this.$store.dispatch(
          'jadwal/editJadwal',
          this.formJadwal
        )
        // console.log(this.formEditStatus)
        this.$toast.success('Berhasil Ubah About')
        if (success) {
          // window.location.reload()
        } else {
          // Gagal login, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async hapusJadwal() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'jadwal/hapusJadwal',
        id
      )

      if (status) {
        this.showDeleteDialog = false
        this.deletingItemId = null
        window.location.reload()
      } else {
        alert(message)
      }
    },
  },
}
</script>
