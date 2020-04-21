<template>
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Data Siswa</b></p>
                  <p class="card-description float-right">
                     <b-button variant="success" v-b-modal.modalSiswa v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
                    <!-- <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalSiswa">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Tambah
                    </a> -->
                  </p>
                  <div class="table-responsive">
                    <b-table striped hover :items="siswa" :fields="fields">
                      <template v-slot:cell(role)="data">
                         <b-badge variant="warning">{{ data.item.role }}</b-badge>
                      </template>
                      <template v-slot:cell(Aksi)="data">
                         <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalSiswa><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
                         <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)"><i class="mdi mdi-delete btn-icon-prepend"></i> Hapus</b-button>
                      </template>
                    </b-table>

                    <b-pagination
                      v-model="currentPage"
                      :per-page="perPage"
                      :total-rows="rows"
                      align="center"
                      v-on:input="pagination">
                    </b-pagination>

                    <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                      <b-spinner label="Spinning" variant="success"></b-spinner>
                      <strong class="text-success">Loading...</strong>
                    </b-toast>

                    <!-- toast untuk tampilan message box -->
                    <b-toast id="message" title="Message">
                      <strong class="text-success">{{ message }}</strong>
                    </b-toast>

                    <!-- <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>NIS</th>
                          <th>Nama Siswa</th>
                          <th>Kelas</th>
                          <th>Sekolah</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1234/12/23/20.09</td>
                          <td>Herman Beck Supriadi</td>
                          <td>X RPL 2</td>
                          <td>SMK Telkom Malang</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalSiswa">
                              <i class="mdi mdi-pencil btn-icon-prepend"></i>
                              Ubah
                            </a>
                            <a href="#" class="btn btn-sm btn-danger btn-icon-text">
                              <i class="mdi mdi-delete btn-icon-prepend"></i>
                              Hapus
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>1234/12/23/20.09</td>
                          <td>John Abraham Sutanto</td>
                          <td>XII TKJ 4</td>
                          <td>SMK Telkom Malang</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalSiswa">
                              <i class="mdi mdi-pencil btn-icon-prepend"></i>
                              Ubah
                            </a>
                            <a href="#" class="btn btn-sm btn-danger btn-icon-text">
                              <i class="mdi mdi-delete btn-icon-prepend"></i>
                              Hapus
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <b-modal 
          id="modalSiswa"
          @ok="Save"
        >

          <template v-slot:modal-title>
            Form Siswa
          </template>
        
          <form ref="form">
              <div class="form-group">
                <label for="nama" class="col-form-label">NIS</label>
                <input type="text" name="nis" class="form-control" id="nis" placeholder="NIS" v-model="nis">
              </div>
              <div class="form-group">
                <label for="nama" class="col-form-label">Nama Siswa</label>
                <input type="text" name="nama_siswa" class="form-control" id="nama_siswa" placeholder="Nama Siswa" v-model="nama_siswa">
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" placeholder="Email" v-model="email">
              </div>
              <div class="form-group">
                <label for="nama" class="col-form-label">Kelas</label>
                <input type="text" name="kelas" class="form-control" id="kelas" placeholder="Kelas" v-model="kelas">
              </div>
              <div class="form-group">
                <label for="sekolah" class="col-form-label">Sekolah</label>
                <input type="text" name="sekolah" class="form-control" id="sekolah" placeholder="Sekolah" v-model="sekolah">
              </div>
              <div class="form-group">
                <label for="kategori" class="col-form-label">Kategori</label>
                <input type="text" name="kategori" class="form-control" id="kategori" placeholder="Kategori" v-model="kategori">
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="Password" v-model="password">
              </div>
          </form>
        </b-modal>



        <!-- <div class="modal fade" id="modalSiswa" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Form Siswa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="nis" class="col-form-label">NIS</label>
                    <input type="text" name="nis" class="form-control" id="nis" placeholder="Nomor Induk Siswa">
                  </div>
                  <div class="form-group">
                    <label for="nama" class="col-form-label">Nama Siswa</label>
                    <input type="text" name="nama" class="form-control" id="nama" placeholder="Nama Lengkap">
                  </div>
                  <div class="form-group">
                    <label for="kelas" class="col-form-label">Kelas</label>
                    <select class="form-control" name="kelas" id="kelas">
                      <option value="1" checked>X RPL 1</option>
                      <option value="2">X RPL 2</option>
                      <option value="3">X RPL 3</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="nama" class="col-form-label">Sekolah</label>
                    <input type="text" name="sekolah" class="form-control" id="sekolah" placeholder="Sekolah">
                  </div>
                  <div class="form-group">
                    <button type="button" class="btn btn-md btn-success">Simpan</button>
                    <button type="button" class="btn btn-md btn-light" data-dismiss="modal">Batal</button>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div> -->

        <!-- content-wrapper ends -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      nis: "",
      nama_siswa: "",
      email: "",
      kelas: "",
      sekolah: "",
      kategori:"",
      password:"",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      siswa: [],
      fields: ["id", "nis", "nama_siswa", "email", "kelas","sekolah","kategori", "Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/siswa/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.siswa = response.data.siswa;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data siswa."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(){
      this.action     = "insert";
      this.nis        = "";
      this.nama_siswa = "";
      this.email      = "";
      this.kelas      = ""; 
      this.sekolah    = ""; 
      this.kategori   = "";
      this.password   = "";
    },

    Edit : function(item){
      this.action     = "update";
      this.id         = item.id;
      this.nis        = item.nis;
      this.nama_siswa = item.nama_siswa;
      this.email      = item.email;
      this.kelas      = item.kelas;
      this.sekolah    = item.sekolah;
      this.kategori   = item.kategori;
      this.password   = item.password;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("nis", this.nis);
        form.append("nama_siswa", this.nama_siswa);
        form.append("email", this.email);
        form.append("kelas", this.kelas);
        form.append("sekolah", this.sekolah);
        form.append("kategori", this.kategori);
        form.append("password", this.password);
        form.append("role", this.role);

        this.axios.post("/siswa", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
          nis       : this.nis,
          nama_siswa: this.nama_siswa,
          email     : this.email,
          kelas     : this.kelas,
          sekolah   : this.sekolah,
          kategori  : this.kategori,
          password  : this.password,
          
        }
        this.axios.put("/siswa/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

    Drop : function(id){
      let conf = { headers: { "Authorization" : "Bearer " + this.key} };
      if(confirm('Apakah anda yakin ingin menghapus data ini?')){
        this.$bvToast.show("loadingToast");
        this.axios.delete("/siswa/" + id, conf)
        .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },

  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>
