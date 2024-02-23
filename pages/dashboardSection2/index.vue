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
            <v-row v-if="dialogForm.type === 'formEditHero'">
              <v-col cols="3" class="mt-3"> Gambar sebelumnya </v-col>
              <v-col cols="2,5">
                <img
                  :src="getFullPathToImage(formHero.gambar)"
                  alt="Gambar"
                  style="max-width: 100%; height: auto"
                />
              </v-col>
            </v-row>
            <v-row
              v-if="
                dialogForm.type === 'formTambahHero' ||
                dialogForm.type === 'formEditHero'
              "
            >
              <v-col cols="3" class="mt-3"> Masukkan Gambar Baru </v-col>
              <v-col cols="2,5">
                <v-file-input
                  outlined
                  style="margin: 0 auto"
                  :label="
                    formHero.gambar
                      ? getFileName(formHero.gambar)
                      : 'Pilih File'
                  "
                  @change="onFileChange"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row
              v-if="
                dialogForm.type === 'formTambahVisi' ||
                dialogForm.type === 'formEditVisi'
              "
            >
              <v-col cols="3" class="mt-3"> Judul </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formVisi.judul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              v-if="
                dialogForm.type === 'formTambahVisi' ||
                dialogForm.type === 'formEditVisi'
              "
            >
              <v-col cols="3" class="mt-3"> Deskripsi </v-col>
              <v-col cols="2,5">
                <v-textarea
                  outlined
                  style="margin: 0 auto"
                  v-model="formVisi.deskripsi"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'formEditVisi'">
              <v-col cols="3" class="mt-3"> Gambar sebelumnya </v-col>
              <v-col cols="2,5">
                <img
                  :src="getFullPathToImage(formVisi.gambar)"
                  alt="Gambar"
                  style="max-width: 100%; height: auto"
                />
              </v-col>
            </v-row>
            <v-row
              v-if="
                dialogForm.type === 'formTambahVisi' ||
                dialogForm.type === 'formEditVisi'
              "
            >
              <v-col cols="3" class="mt-3"> Gambar </v-col>
              <v-col cols="2,5">
                <v-file-input
                  outlined
                  style="margin: 0 auto"
                  :label="
                    formVisi.gambar
                      ? getFileName2(formVisi.gambar)
                      : 'Pilih File'
                  "
                  @change="onFileChange2"
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
            @click="hapus_Section"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Dashboard Section 2</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Hero Table</h2>
        </v-col>

        <v-col class="text-right">
          <v-btn
            v-if="hero.length === 0"
            :disabled="hero.length > 0"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            @click="openDialogForm('formTambahHero', 'Tambah Hero')"
            class="text-none"
            >Tambah data <v-icon class="ml-2">mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="hero"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.gambar="{ item }">
          <img
            class="mt-2"
            :src="getFullPathToImage(item.gambar)"
            alt="Gambar"
            style="max-width: 200px; max-height: 200px"
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
          <v-icon @click="edit_Hero(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteSection(item.id)">mdi-delete</v-icon>
        </template></v-data-table
      >
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Visi Misi Table</h2>
        </v-col>

        <v-col class="text-right">
          <v-btn
            v-if="visi.length === 0"
            :disabled="visi.length > 0"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            @click="openDialogForm('formTambahVisi', 'Tambah Visi Misi')"
            class="text-none"
            >Tambah data <v-icon class="ml-2">mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers2"
        hide-default-footer
        class="elevation-5"
        :items="visi"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.deskripsi="{ item }">
          <div class="text-left">
            {{ item.deskripsi }}
          </div>
        </template>

        <template v-slot:item.gambar="{ item }">
          <img
            class="mt-2"
            :src="getFullPathToImage(item.gambar)"
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
          <!-- <v-icon @click="">mdi-account-details</v-icon> -->
          <v-icon @click="edit_Visi(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteSection(item.id)">mdi-delete</v-icon>
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
    title: 'Dashboard Section 2',
  },

  computed: {
    ...mapGetters({
      hero: 'section2/getHero',
      visi: 'section2/getVisi',
    }),
  },
  async created() {
    await this.$store.dispatch('section2/loaditemsHero')
    await this.$store.dispatch('section2/loaditemsVisi')
  },

  data() {
    return {
      formHero: {
        gambar: null,
        tipe_section: 'hero',
      },
      formVisi: {
        judul: null,
        deskripsi: null,
        gambar: null,
        tipe_section: 'visi',
      },
      selectedFile: null,
      selectedFile2: null,
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
      headers2: [
        {
          text: 'No',
          align: 'start',
          value: 'no',
          sortable: false,
          width: 10,
        },

        {
          text: 'BackGround',
          value: 'gambar',
          sortable: false,
          width: 50,
          align: 'center',
        },
        {
          text: 'Judul',
          value: 'judul',
          sortable: false,
          width: 50,
          align: 'center',
        },
        {
          text: 'deskripsi',
          value: 'deskripsi',
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
    getFullPathToImage(gambarPath) {
      const baseUrl = 'http://127.0.0.1:8000/storage'
      // console.log(`${baseUrl}/${gambarPath}`)
      return `${baseUrl}/${gambarPath}`
    },
    onFileChange(selectedFile) {
      console.log('onFileChange')
      this.formHero.gambar = selectedFile
      // console.log(this.formHero.gambar)
    },
    onFileChange2(selectedFile2) {
      console.log('onFileChange')
      // console.log(selectedFile)
      // this.selectedFile = event.target.files[0] // Menyimpan file yang dipilih

      this.formVisi.gambar = selectedFile2
      console.log(this.formVisi.gambar)
    },
    getFileName() {
      return this.formHero.gambar.name

      // if (!path) return '' // Jika path kosong, kembalikan string kosong
      // return path.split('/').pop() // Ambil bagian terakhir dari path (nama file)
    },
    getFileName2() {
      return this.formVisi.gambar.name

      // if (!path) return '' // Jika path kosong, kembalikan string kosong
      // return path.split('/').pop() // Ambil bagian terakhir dari path (nama file)
    },
    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditHero') {
        this.formHero = { ...data }
        this.formHero.gambar = data.gambar
      }
      if (type === 'formEditVisi') {
        this.formVisi = { ...data }
        this.formVisi.gambar = data.gambar
      }
    },
    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahHero') {
        this.tambahHero()
      } else if (this.dialogForm.type === 'formEditHero') {
        this.editHero()
      } else if (this.dialogForm.type === 'formTambahVisi') {
        this.tambahVisi()
      } else if (this.dialogForm.type === 'formEditVisi') {
        this.editVisi()
      } else {
        // Tindakan lain jika diperlukan
        console.error('Tipe dialog tidak valid')
      }
    },
    closedialog() {
      this.dialogForm.show = false
    },
    deleteSection(id) {
      console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },
    edit_Hero(item) {
      console.log(item)
      this.openDialogForm('formEditHero', 'Edit Hero', item)
    },
    edit_Visi(item) {
      console.log(item)
      this.openDialogForm('formEditVisi', 'Edit Visi', item)
    },
    async tambahHero() {
      try {
        // if (!this.isFormValid2()) {
        //   return
        // }

        const formData = new FormData()
        formData.append('gambar', this.formHero.gambar)
        formData.append('tipe_section', this.formHero.tipe_section)
        // Tambahkan properti lain ke formData sesuai kebutuhan

        const { success, message } = await this.$store.dispatch(
          'section2/tambahSection',
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

    async tambahVisi() {
      try {
        // if (!this.isFormValid2()) {
        //   return
        // }

        const formData = new FormData()
        formData.append('gambar', this.formVisi.gambar)
        formData.append('tipe_section', this.formVisi.tipe_section)
        formData.append('judul', this.formVisi.judul)
        formData.append('deskripsi', this.formVisi.deskripsi)
        // Tambahkan properti lain ke formData sesuai kebutuhan

        const { success, message } = await this.$store.dispatch(
          'section2/tambahSection',
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
    async editHero() {
      try {
        const formData = new FormData()
        formData.append('gambar', this.formHero.gambar)
        formData.append('tipe_section', this.formHero.tipe_section)
        // Tambahkan properti lain ke formData sesuai kebutuhan
        // console.log(this.formHero.gambar)
        // console.log('edit')
        // console.log(formData)
        const { success, message } = await this.$store.dispatch(
          'section2/editSection2',
          {
            id: this.formHero.id,
            gambar: this.formHero.gambar,
            tipe_section: this.formHero.tipe_section,
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
    async editVisi() {
      try {
        const formData = new FormData()
        formData.append('gambar', this.formVisi.gambar)
        formData.append('tipe_section', this.formVisi.tipe_section)
        formData.append('judul', this.formVisi.judul)
        formData.append('deskripsi', this.formHero.deskripsi)
        // Tambahkan properti lain ke formData sesuai kebutuhan
        // console.log(this.formHero.gambar)
        // console.log('edit')
        // console.log(formData)
        const { success, message } = await this.$store.dispatch(
          'section2/editSectionVisi',
          {
            id: this.formVisi.id,
            gambar: this.formVisi.gambar,
            tipe_section: this.formVisi.tipe_section,
            judul: this.formVisi.judul,
            deskripsi: this.formVisi.deskripsi,
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

    async hapus_Section() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'section2/hapusSection',
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
