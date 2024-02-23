import Vue from 'vue'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor' // atau cara lain untuk mengintegrasikan Quill dengan Vue.js

Vue.component('quill-editor', quillEditor)

// Jika Anda memiliki pengaturan Quill khusus, inisialisasi di sini
// Quill.register(/* plugin atau opsi tambahan */);

// Jika Anda perlu menggunakan Quill hanya di sisi klien, tambahkan kode berikut
if (process.client) {
  // Inisialisasi Quill di sini
}
