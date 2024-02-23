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
              <v-col cols="3" class="mt-3"> Judul Footer </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formFooter.judul_footer"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> email </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formFooter.email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Telepon </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formFooter.telepon"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="mt-3"> Alamat </v-col>
              <v-col cols="2,5">
                <v-textarea
                  outlined
                  style="margin: 0 auto"
                  v-model="formFooter.alamat"
                ></v-textarea>
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
            @click="hapusFooter"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Dashboard Footer</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Tabel Footer</h2>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="footer.length === 0"
            :disabled="footer.length > 0"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahFooter', 'Tambah Footer')"
            >Tambah data <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="footer"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.alamat="{ item }">
          <div class="text-left">
            {{ item.alamat }}
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
          <v-icon @click="edit_Footer(item)">mdi-pencil</v-icon>
          <v-icon @click="delete_Footer(item.id)">mdi-delete</v-icon>
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
    title: 'Dashboard Footer',
  },

  computed: {
    ...mapGetters({
      footer: 'footer/getFooter',
    }),
  },

  async created() {
    await this.$store.dispatch('footer/loaditemsFooter')
  },

  data() {
    return {
      formFooter: {
        judul_footer: null,
        alamat: null,
        email: null,
        telepon: null,
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
          text: 'Judul Footer',
          value: 'judul_footer',
          sortable: false,
          width: 20,
          align: 'center',
        },
        {
          text: 'Email',
          value: 'email',
          sortable: false,
          width: 20,
          align: 'center',
        },
        {
          text: 'Alamat',
          value: 'alamat',
          sortable: false,
          width: 80,
          align: 'center',
        },
        {
          text: 'Telepon',
          value: 'telepon',
          sortable: false,
          width: 30,
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

    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditFooter') {
        this.formFooter = { ...data }
      }
    },

    closedialog() {
      this.dialogForm.show = false
      this.formFooter = {
        judul_footer: null,
        alamat: null,
        email: null,
        telepon: null,
      }
    },

    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahFooter') {
        this.tambahFooter()
      } else if (this.dialogForm.type === 'formEditFooter') {
        this.EditFooter()
      } else {
        console.error('Tipe dialog tidak valid')
      }
    },

    edit_Footer(item) {
      this.openDialogForm('formEditFooter', 'Edit Footer', item)
    },

    delete_Footer(id) {
      this.deletingItemId = id
      this.showDeleteDialog = true
    },

    isFormValid() {
      const requiredFields = ['judul_footer', 'email', 'telepon', 'alamat']

      for (const field of requiredFields) {
        if (!this.formFooter[field]) {
          // Tampilkan pesan toast jika form belum diisi semua
          this.$toast.error(`Kolom ${field} harus diisi.`, { duration: 1000 })
          return false
        }
      }

      return true
    },
    async tambahFooter() {
      try {
        // Validasi form sebelum mengirim permintaan
        if (!this.isFormValid()) {
          return
        }

        // Panggil action untuk mengirim aduan
        const { success, message } = await this.$store.dispatch(
          'footer/tambahFooter',
          this.formFooter
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

    async EditFooter() {
      try {
        // Panggil action untuk login
        const { success, message } = await this.$store.dispatch(
          'footer/editFooter',
          this.formFooter
        )
        // console.log(this.formEditStatus)
        this.$toast.success('Berhasil Ubah Footer')
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

    async hapusFooter() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'footer/hapusDaftar',
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
