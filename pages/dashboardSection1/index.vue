<template>
  <div class="halaman">
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
            <!-- <v-row
              v-if="
                dialogForm.type === 'formTambahAbout' ||
                dialogForm.type === 'formEditAbout'
              "
            >
              <v-col cols="3" class="mt-3"> Judul </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formAbout.judul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              v-if="
                dialogForm.type === 'formTambahAbout' ||
                dialogForm.type === 'formEditAbout'
              "
            >
              <v-col cols="3" class="mt-3"> Sub Judul </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formAbout.sub_judul"
                ></v-text-field>
              </v-col>
            </v-row> -->
            <v-row
              v-if="
                dialogForm.type === 'formTambahAbout' ||
                dialogForm.type === 'formEditAbout'
              "
            >
              <v-col cols="3" class="mt-3"> Deskripsi </v-col>
              <v-col cols="2,5">
                <v-textarea
                  outlined
                  style="margin: 0 auto"
                  v-model="formAbout.deskripsi"
                ></v-textarea>
              </v-col>
            </v-row>

            <!-- <v-row
              v-if="
                dialogForm.type === 'formTambahServices' ||
                dialogForm.type === 'formEditServices'
              "
            >
              <v-col cols="3" class="mt-3"> Judul </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formServices.judul"
                ></v-text-field>
              </v-col>
            </v-row> -->
            <v-row
              v-if="
                dialogForm.type === 'formTambahServices' ||
                dialogForm.type === 'formEditServices'
              "
            >
              <v-col cols="3" class="mt-3"> Judul </v-col>
              <v-col cols="2,5">
                <v-text-field
                  outlined
                  style="margin: 0 auto"
                  v-model="formServices.sub_judul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row
              v-if="
                dialogForm.type === 'formTambahServices' ||
                dialogForm.type === 'formEditServices'
              "
            >
              <v-col cols="3" class="mt-3"> Deskripsi </v-col>
              <v-col cols="2,5">
                <v-textarea
                  outlined
                  style="margin: 0 auto"
                  v-model="formServices.deskripsi"
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
            @click="hapus_About"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <!-- <v-row sm="8" md="6"> -->
    <!-- <v-col cols="12" > -->
    <v-container sm="8" md="6">
      <h1>Dashboard Section 1</h1>
    </v-container>

    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>About Table</h2>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="about.length === 0"
            :disabled="about.length > 0"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahAbout', 'Tambah About')"
            >Tambah data <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-1"
        :items="about"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.deskripsi="{ item }">
          <div class="text-left">
            {{ item.deskripsi }}
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
          <!-- <v-icon @click="">mdi-account-details</v-icon> -->
          <v-icon @click="edit_About(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteAbout(item.id)">mdi-delete</v-icon>
        </template></v-data-table
      >
    </v-container>
    <v-container sm="8" md="6" style="padding-top: 5vh">
      <v-row>
        <v-col>
          <h2>Services Table</h2>
          <p class="grey--text">*Batas 4 Data</p>
        </v-col>
        <v-col class="text-right">
          <v-btn
            v-if="services.length < 4"
            :disabled="services.length >= 4"
            style="
              border-radius: 8px;
              background-color: #004e64;
              max-width: 300px;
              color: white;
            "
            class="text-none"
            @click="openDialogForm('formTambahServices', 'Tambah Services')"
            >Tambah data</v-btn
          >
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers2"
        hide-default-footer
        class="elevation-1"
        :items="services"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.deskripsi="{ item }">
          <div class="text-left">
            {{ item.deskripsi }}
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
          <!-- <v-icon @click="">mdi-account-details</v-icon> -->
          <v-icon @click="edit_Services(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteAbout(item.id)">mdi-delete</v-icon>
        </template></v-data-table
      >
    </v-container>

    <!-- </v-col> -->
    <!-- </v-row> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  middleware: 'middleware_admin',
  head: {
    title: 'Dashboard Section 1',
  },
  computed: {
    ...mapGetters({
      about: 'section/getAbout',
      services: 'section/getServices',
    }),
  },
  async created() {
    await this.$store.dispatch('section/loaditemsAbout'),
      await this.$store.dispatch('section/loaditemsServices')
  },

  data() {
    return {
      dialogForm: {
        type: '',
        show: false,
        title: '',
        width: 700,
      },
      formAbout: {
        deskripsi: null,
        tipe_section: 'about',
      },
      formServices: {
        sub_judul: null,
        deskripsi: null,
        tipe_section: 'services',
      },
      deletingItemId: null,
      showDeleteDialog: false,
      headers: [
        {
          text: 'No',
          align: 'start',
          value: 'no',
          sortable: false,
          width: 10,
        },
        {
          text: 'Deskripsi',
          value: 'deskripsi',
          sortable: false,
          width: 130,
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
          text: 'Judul',
          value: 'sub_judul',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Deskripsi',
          value: 'deskripsi',
          sortable: false,
          width: 130,
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
    deleteAbout(id) {
      console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },
    openDialogForm(type, title, data, width = 600) {
      this.dialogForm.type = type
      this.dialogForm.title = title
      this.dialogForm.width = width
      this.dialogForm.show = true

      if (type === 'formEditAbout') {
        this.formAbout = { ...data }
      }
      if (type === 'formEditServices') {
        this.formServices = { ...data }
      }
    },

    closedialog() {
      this.dialogForm.show = false
    },

    edit_About(item) {
      console.log(item)
      this.openDialogForm('formEditAbout', 'Edit About', item)
    },
    edit_Services(item) {
      console.log(item)
      this.openDialogForm('formEditServices', 'Edit Services', item)
    },

    tombolSimpan() {
      if (this.dialogForm.type === 'formTambahAbout') {
        this.tambahAbout()
      } else if (this.dialogForm.type === 'formEditAbout') {
        this.editAbout()
      } else if (this.dialogForm.type === 'formTambahServices') {
        this.tambahServices()
      } else if (this.dialogForm.type === 'formEditServices') {
        this.editServices()
      } else {
        // Tindakan lain jika diperlukan
        console.error('Tipe dialog tidak valid')
      }
    },

    async tambahAbout() {
      try {
        // Validasi form sebelum mengirim permintaan
        // if (!this.isFormValid()) {
        //   return
        // }

        // Panggil action untuk mengirim aduan
        const { success, message } = await this.$store.dispatch(
          'section/tambahAbout',
          this.formAbout
        )

        if (success) {
          this.$toast.success('Berhasil Mengirim Aduan')
        } else {
          // Gagal mengirim, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async tambahServices() {
      try {
        // Validasi form sebelum mengirim permintaan
        // if (!this.isFormValid()) {
        //   return
        // }

        // Panggil action untuk mengirim aduan
        const { success, message } = await this.$store.dispatch(
          'section/tambahServices',
          this.formServices
        )

        if (success) {
          this.$toast.success('Berhasil Mengirim Aduan')
        } else {
          // Gagal mengirim, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async editAbout() {
      try {
        // Panggil action untuk login
        const { success, message } = await this.$store.dispatch(
          'section/editAbout',
          this.formAbout
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

    async editServices() {
      try {
        // Panggil action untuk login
        const { success, message } = await this.$store.dispatch(
          'section/editServices',
          this.formServices
        )
        // console.log(this.formEditStatus)
        this.$toast.success('Berhasil Ubah ')
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

    async hapus_About() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'section/hapusAbout',
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
