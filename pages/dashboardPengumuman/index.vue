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
            <v-row v-if="dialogForm.type === 'formEditPegumuman'">
              <v-col cols="3" class="mt-3"> Gambar sebelumnya </v-col>
              <v-col cols="2,5">
                <img
                  :src="getFullPathToImage(formPengumuman.foto)"
                  alt="Gambar"
                  style="max-width: 100%; height: auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Masukkan Gambar Baru </v-col>
              <v-col cols="2,5">
                <v-file-input
                  outlined
                  style="margin: 0 auto"
                  :label="
                    formPengumuman.foto
                      ? getFileName(formPengumuman.foto)
                      : 'Pilih File'
                  "
                  @change="onFileChange"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Judul </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formPengumuman.judul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Isi </v-col>
              <v-col cols="2,5">
                <v-textarea
                  outlined
                  style="margin: 0 auto"
                  v-model="formPengumuman.isi"
                  rows="5"
                ></v-textarea>
                <!-- <quill-editor
                  ref="myQuillEditor"
                  style="margin 0 auto"
                ></quill-editor> -->
                <!-- <quill-editor></quill-editor> -->
                <!-- <RichEditor v-model="editorValue" /> -->
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
            @click="hapusPengumuman"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Dashboard Pengumuman</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Pengumuman Table</h2>
          <p class="grey--text">*Batas 4 Pengumuman</p>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="pengumuman.length < 4"
            :disabled="pengumuman.length >= 4"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahPengumuman', 'Tambah Pengumuman')"
            >Tambah Pengumuman <v-icon class="ml-2">mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="pengumuman"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.isi="{ item }">
          <div class="text-left">
            {{ item.isi }}
          </div>
        </template>

        <template v-slot:item.foto="{ item }">
          <img
            class="mt-2"
            :src="getFullPathToImage(item.foto)"
            alt="Gambar"
            style="max-width: 100px; max-height: 100px"
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
          <v-icon @click="edit_Pengumuman(item)">mdi-pencil</v-icon>
          <v-icon @click="delete_Pengumuman(item.id)">mdi-delete</v-icon>
        </template></v-data-table
      >
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
// import QuillEditor from 'vue-quill-editor'
export default {
  middleware: 'middleware_admin',
  head: {
    title: 'Dashboard Pengumuman',
  },
  computed: {
    ...mapGetters({
      pengumuman: 'pengumuman/getPengumuman',
    }),
  },
  async created() {
    await this.$store.dispatch('pengumuman/loaditemsPengumuman')
  },

  // components: {
  //   QuillEditor,
  // },

  data() {
    return {
      editorValue: '',
      formPengumuman: {
        judul: null,
        isi: null,
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
          text: 'Judul',
          value: 'judul',
          sortable: false,
          width: 30,
          align: 'center',
        },
        // {
        //   text: 'Isi',
        //   value: 'isi',
        //   sortable: false,
        //   width: 80,
        //   align: 'center',
        // },
        {
          text: 'Foto',
          value: 'foto',
          sortable: false,
          width: 20,
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

    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditPegumuman') {
        this.formPengumuman = { ...data }
        this.formPengumuman.foto = data.foto
      }
    },

    closedialog() {
      this.dialogForm.show = false
      this.formPengumuman = {
        judul: null,
        isi: null,
        foto: null,
      }
    },

    onFileChange(selectedFile) {
      this.formPengumuman.foto = selectedFile
    },

    getFileName() {
      return this.formPengumuman.foto.name
    },

    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahPengumuman') {
        this.tambahPengumuman()
      } else if (this.dialogForm.type === 'formEditPegumuman') {
        this.EditPengumuman()
      } else {
        console.error('Tipe dialog tidak valid')
      }
    },

    edit_Pengumuman(item) {
      // console.log(item)
      this.openDialogForm('formEditPegumuman', 'Edit Pengumuman', item)
    },

    delete_Pengumuman(id) {
      // console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },

    isFormValid() {
      const requiredFields = ['judul', '  isi', ' foto']

      for (const field of requiredFields) {
        if (!this.formPengumuman[field]) {
          // Tampilkan pesan toast jika form belum diisi semua
          this.$toast.error(`Kolom ${field} harus diisi.`, { duration: 1000 })
          return false
        }
      }

      return true
    },

    async tambahPengumuman() {
      try {
        if (!this.isFormValid()) {
          return
        }

        const formData = new FormData()
        formData.append('judul', this.formPengumuman.judul)
        formData.append('isi', this.formPengumuman.isi)
        formData.append('foto', this.formPengumuman.foto)

        const { success, message } = await this.$store.dispatch(
          'pengumuman/tambahPengumuman',
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

    async EditPengumuman() {
      // console.log(this.editorValue)
      try {
        const formData = new FormData()
        formData.append('judul', this.formPengumuman.judul)
        formData.append('isi', this.formPengumuman.isi)
        formData.append('foto', this.formPengumuman.foto)

        const { success, message } = await this.$store.dispatch(
          'pengumuman/editPengumuman',
          {
            id: this.formPengumuman.id,
            foto: this.formPengumuman.foto,
            judul: this.formPengumuman.judul,
            isi: this.formPengumuman.isi,
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

    async hapusPengumuman() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'pengumuman/hapusPengumuman',
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
