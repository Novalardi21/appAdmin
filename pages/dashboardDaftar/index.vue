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
            <v-row v-if="dialogForm.type === 'formEditStatus'">
              <v-col cols="3" class="mt-3"> Status </v-col>
              <v-col cols="2,5">
                <v-select
                  :items="items"
                  outlined
                  v-model="formStatus.status"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'detailDaftar'">
              <v-col cols="3">
                <img
                  src="~/assets/logo/logo.png"
                  alt=""
                  class="img-fluid"
                  style="max-width: 200px; height: auto"
                />
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'detailDaftar'">
              <v-col cols="4"> Nama </v-col>
              <v-col cols="4">
                <p>: {{ selectedRow ? selectedRow.nama_pasien : '' }}</p>
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'detailDaftar'">
              <v-col cols="4"> Tempat Tanggal Lahir </v-col>
              <v-col cols="4">
                <p>: {{ selectedRow ? selectedRow.ttl : '' }}</p>
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'detailDaftar'">
              <v-col cols="4"> Jenis Kelamin </v-col>
              <v-col cols="4">
                <p>: {{ selectedRow ? selectedRow.jenis_kelamin : '' }}</p>
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'detailDaftar'">
              <v-col cols="4"> Nomer Telepon </v-col>
              <v-col cols="4">
                <p>: {{ selectedRow ? selectedRow.telepon : '' }}</p>
              </v-col>
            </v-row>
            <v-row v-if="dialogForm.type === 'detailDaftar'">
              <v-col cols="4"> Alamat </v-col>
              <v-col cols="4">
                <p>: {{ selectedRow ? selectedRow.alamat : '' }}</p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              elevation="2"
              class="text-capitalize font-weight-regular rounded-lg white--text"
              width="150"
              depressed
              color="#00a5cf"
              @click="closedialog"
            >
              Tutup
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
            @click="hapusDaftar"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Navbar />
    <v-container sm="8" md="6">
      <h1>Dashboard Daftar Online Pasien</h1>
    </v-container>
    <v-container sm="8" md="6">
      <v-row>
        <v-col>
          <h2>Tabel daftar Pasien Online</h2>
        </v-col>
        <v-col class="align-right">
          <v-text-field
            style="max-width: 570px"
            placeholder="Cari Nama pasien"
            outlined
            v-model="inputFilter"
            @input="searchNamaPasien"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        hide-default-footer
        class="elevation-5"
        :items="daftar"
      >
        <template v-slot:item.no="{ item, index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.status="{ item }">
          <div class="text-center">
            <v-btn
              :color="getStatusColor(item.status)"
              class="text-none"
              style="border-radius: 20px; color: #ffffff; height: 30px"
            >
              {{ item.status }}
            </v-btn>
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
          <v-icon @click="detail_daftar(item)"
            >mdi-card-account-details-outline</v-icon
          >
          <v-icon @click="edit_Status(item)">mdi-pencil</v-icon>
          <v-icon @click="delete_Daftar(item.id)">mdi-delete</v-icon>
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
    title: 'Daftar antrian Online Pasien',
  },

  computed: {
    ...mapGetters({
      daftar: 'daftar/getDaftar',
    }),
  },

  async created() {
    await this.loaditemsDaftar()
  },

  data() {
    return {
      formStatus: {
        status: null,
      },
      selectedRow: null,
      deletingItemId: null,
      showDeleteDialog: false,
      inputFilter: null,
      dialogForm: {
        type: '',
        show: false,
        title: '',
        width: 700,
      },

      items: ['Belum Ditangani', 'Sudah Ditangani'],
      headers: [
        {
          text: 'No',
          align: 'start',
          value: 'no',
          sortable: false,
          width: 10,
        },
        {
          text: 'Nama Pasien',
          value: 'nama_pasien',
          sortable: false,
          width: 20,
          align: 'center',
        },
        {
          text: 'Jenis Kelamin',
          value: 'jenis_kelamin',
          sortable: false,
          width: 30,
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
          text: 'Status',
          value: 'status',
          sortable: false,
          width: 30,
          align: 'center',
        },
        {
          text: 'Created at',
          value: 'created_at',
          sortable: false,
          width: 10,
          align: 'center',
        },
        {
          text: 'Updated at',
          value: 'updated_at',
          sortable: false,
          width: 10,
          align: 'center',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          width: 90,
          align: 'center',
        },
      ],
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

      if (type === 'formEditStatus') {
        this.formStatus = { ...data }
      }
    },

    closedialog() {
      this.dialogForm.show = false
      this.formStatus = {
        status: null,
      }
    },

    edit_Status(item) {
      console.log(item)
      this.openDialogForm('formEditStatus', 'Edit Status', item)
    },

    detail_daftar(item) {
      console.log(item)
      this.selectedRow = item
      this.openDialogForm('detailDaftar', 'Bukti Pendaftaran Online', item)
    },

    delete_Daftar(id) {
      // console.log(id)
      this.deletingItemId = id
      this.showDeleteDialog = true
    },

    getStatusColor(status) {
      if (status === 'Belum Ditangani') {
        return 'red'
      } else if (status === 'Sudah Ditangani') {
        return 'green'
      }
    },

    async searchNamaPasien() {
      if (this.inputFilter === undefined) {
        return
      }

      await this.$store.dispatch('daftar/loaditemsDaftar', {
        nama_pasien: this.inputFilter,
      })
    },

    async loaditemsDaftar() {
      await this.$store.dispatch('daftar/loaditemsDaftar')
    },

    async ubahStatus() {
      try {
        // Validasi form sebelum mengirim permintaan
        // if (!this.isFormValid()) {
        //   return
        // }

        // Panggil action untuk mengirim aduan
        const { success, message } = await this.$store.dispatch(
          'daftar/editStatus',
          this.formStatus
        )

        if (success) {
          // Tampilkan dialog setelah berhasil mengirim
          //   this.dialogForm2.show = true
        } else {
          // Gagal mengirim, tampilkan pesan kesalahan
          alert(message)
        }
      } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error(error)
      }
    },

    async hapusDaftar() {
      const id = this.deletingItemId
      if (!id) {
        return
      }

      const { status, message } = await this.$store.dispatch(
        'daftar/hapusDaftar',
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
