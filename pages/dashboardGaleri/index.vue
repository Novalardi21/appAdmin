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
            <v-row v-if="dialogForm.type === 'formEditGaleri'">
              <v-col cols="3" class="mt-3"> Gambar sebelumnya </v-col>
              <v-col cols="2,5">
                <img
                  :src="getFullPathToImage(formGaleri.gambar)"
                  alt="Gambar"
                  style="max-width: 100%; height: auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Gambar </v-col>
              <v-col cols="2,5">
                <v-file-input
                  outlined
                  style="margin: 0 auto"
                  :label="
                    formGaleri.galeri
                      ? getFileName2(formGaleri.gambar)
                      : 'Pilih File'
                  "
                  @change="onFileChange"
                ></v-file-input>
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
            @click="hapusGambar"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Dashboard Galeri</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Galeri Table</h2>
          <p class="grey--text">*Batas 6 Foto</p>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="gambar.length < 6"
            :disabled="gambar.length >= 6"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahGaleri', 'Tambah Foto')"
            >Tambah Foto <v-icon class="ml-2">mdi-image-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="gambar"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.gambar="{ item }">
          <img
            class="mt-2"
            :src="getFullPathToImage(item.gambar)"
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
          <v-icon @click="edit_Gambar(item)">mdi-pencil</v-icon>
          <v-icon @click="delete_Section(item.id)">mdi-delete</v-icon>
        </template></v-data-table
      >
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  head: {
    title: 'Dashboard Galeri',
  },

  computed: {
    ...mapGetters({
      gambar: 'galeri/getGaleri',
    }),
  },
  async created() {
    await this.$store.dispatch('galeri/loaditemsGaleri')
  },

  data() {
    return {
      formGaleri: {
        gambar: null,
      },
      selectedFile: null,
      deletingItemId: null,
      showDeleteDialog: false,
      dialogForm: {
        type: '',
        show: false,
        title: '',
        width: 700,
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
          text: 'Gambar',
          value: 'gambar',
          sortable: false,
          width: 50,
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
          width: 40,
          align: 'center',
        },
      ],
    }
  },

  methods: {
    formatDateTime(dateTimeString) {
      return moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss')
    },

    closedialog() {
      this.dialogForm.show = false
    },

    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditGaleri') {
        this.formGaleri = { ...data }
        this.formGaleri.gambar = data.gambar
      }
    },

    getFullPathToImage(gambarPath) {
      const baseUrl = 'http://127.0.0.1:8000/storage'
      // console.log(`${baseUrl}/${gambarPath}`)
      return `${baseUrl}/${gambarPath}`
    },

    onFileChange(selectedFile) {
      console.log('onFileChange')
      this.formGaleri.gambar = selectedFile
      // console.log(this.formHero.gambar)
    },

    getFileName() {
      return this.formGaleri.gambar.name
    },

    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahGaleri') {
        this.tambahGambar()
      } else if (this.dialogForm.type === 'formEditGaleri') {
        this.editGambar()
      } else {
        // Tindakan lain jika diperlukan
        console.error('Tipe dialog tidak valid')
      }
    },

    edit_Gambar(item) {
      console.log(item)
      this.openDialogForm('formEditGaleri', 'Edit Gambar', item)
    },

    delete_Section(id) {
      // console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },

    async tambahGambar() {
      try {
        // if (!this.isFormValid2()) {
        //   return
        // }

        const formData = new FormData()
        formData.append('gambar', this.formGaleri.gambar)

        const { success, message } = await this.$store.dispatch(
          'galeri/tambahGaleri',
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

    async editGambar() {
      try {
        const formData = new FormData()
        formData.append('gambar', this.formGaleri.gambar)

        const { success, message } = await this.$store.dispatch(
          'galeri/editGaleri',
          {
            id: this.formGaleri.id,
            gambar: this.formGaleri.gambar,
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

    async hapusGambar() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'galeri/hapusGaleri',
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
