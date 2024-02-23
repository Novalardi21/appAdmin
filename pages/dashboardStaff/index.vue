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
            <v-row v-if="dialogForm.type === 'formEditStaff'">
              <v-col cols="3" class="mt-3"> Gambar sebelumnya </v-col>
              <v-col cols="2,5">
                <img
                  :src="getFullPathToImage(formStaff.foto)"
                  alt="Gambar"
                  style="max-width: 100%; height: auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="">Masukkan Gambar yang Baru </v-col>
              <v-col cols="2,5">
                <v-file-input
                  outlined
                  style="margin: 0 auto"
                  :label="
                    formStaff.foto ? getFileName(formStaff.foto) : 'Pilih File'
                  "
                  @change="onFileChange"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Nama </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formStaff.nama"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Jabatan </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formStaff.jabatan"
                ></v-text-field>
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
            @click="hapusStaff"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Dashboard Staff</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Staff Table</h2>
        </v-col>
        <v-col class="text-right">
          <v-btn
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahStaff', 'Tambah Staff')"
            >Tambah Staff
            <v-icon class="ml-2">mdi-account-multiple-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="staff"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.foto="{ item }">
          <img
            class="mt-2"
            :src="getFullPathToImage(item.foto)"
            alt="Gambar"
            style="max-width: 250px; max-height: 250px"
          />
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
          <!-- <v-icon @click="">mdi-account-details</v-icon> -->
          <v-icon @click="edit_Staff(item)">mdi-pencil</v-icon>
          <v-icon @click="delete_Staff(item.id)">mdi-delete</v-icon>
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
    title: 'Dashboard Staff',
  },

  computed: {
    ...mapGetters({
      staff: 'staff/getStaff',
    }),
  },
  async created() {
    await this.$store.dispatch('staff/loaditemsStaff')
  },

  data() {
    return {
      formStaff: {
        nama: null,
        jabatan: null,
        foto: null,
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
          text: 'Nama',
          value: 'nama',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Jabatan',
          value: 'jabatan',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Foto',
          value: 'foto',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Created at',
          value: 'created_at',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Updated at',
          value: 'updated_at',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          width: 30,
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
    }
  },

  methods: {
    formatDateTime(dateTimeString) {
      return moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss')
    },

    getFullPathToImage(gambarPath) {
      const baseUrl = 'http://127.0.0.1:8000/storage'
      // console.log(`${baseUrl}/${gambarPath}`)
      return `${baseUrl}/${gambarPath}`
    },

    closedialog() {
      this.dialogForm.show = false
      this.formStaff = {
        nama: null,
        jabatan: null,
        foto: null,
      }
    },

    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditStaff') {
        this.formStaff = { ...data }
        this.formStaff.foto = data.foto
      }
    },

    onFileChange(selectedFile) {
      //   console.log('onFileChange')
      this.formStaff.foto = selectedFile
      // console.log(this.formHero.gambar)
    },

    getFileName() {
      return this.formStaff.foto.name
    },

    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahStaff') {
        this.tambahStaff()
      } else if (this.dialogForm.type === 'formEditStaff') {
        this.editStaff()
      } else {
        // Tindakan lain jika diperlukan
        console.error('Tipe dialog tidak valid')
      }
    },

    edit_Staff(item) {
      console.log(item)
      this.openDialogForm('formEditStaff', 'Edit Staff', item)
    },

    delete_Staff(id) {
      // console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },

    async tambahStaff() {
      try {
        // if (!this.isFormValid2()) {
        //   return
        // }

        const formData = new FormData()
        formData.append('nama', this.formStaff.nama)
        formData.append('jabatan', this.formStaff.jabatan)
        formData.append('foto', this.formStaff.foto)

        const { success, message } = await this.$store.dispatch(
          'staff/tambahStaff',
          formData
        )

        if (success) {
          // Berhasil, tambahkan tindakan yang sesuai
        } else {
          // Gagal, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async editStaff() {
      try {
        const formData = new FormData()
        formData.append('nama', this.formStaff.nama)
        formData.append('jabatan', this.formStaff.jabatan)
        formData.append('foto', this.formStaff.foto)

        const { success, message } = await this.$store.dispatch(
          'staff/editStaff',
          {
            id: this.formStaff.id,
            foto: this.formStaff.foto,
            nama: this.formStaff.nama,
            jabatan: this.formStaff.jabatan,
          }
        )

        if (success) {
          // Berhasil, tambahkan tindakan yang sesuai
        } else {
          // Gagal, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async hapusStaff() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'staff/hapusStaff',
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
