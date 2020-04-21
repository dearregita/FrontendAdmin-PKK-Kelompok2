<template>
       <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Data Guru</b></p>
                  <p class="card-description float-right">
                     <b-button variant="success" v-b-modal.modalGuru v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
                    <!-- <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalGuru">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Tambah
                    </a> -->
                  </p>
                  <div class="table-responsive">
                    <b-table striped hover :items="guru" :fields="fields">
                      <template v-slot:cell(role)="data">
                         <b-badge variant="warning">{{ data.item.role }}</b-badge>
                      </template>
                      <template v-slot:cell(Aksi)="data">
                         <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalGuru><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
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
                          <th>Email</th>
                          <th>Nama Guru</th>
                          <th>Sekolah</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>admin@smktelkom-mlg.sch.id</td>
                          <td>Abdullah Sutejo Rahman</td>
                          <td>SMK Telkom Malang</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalGuru">
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
                          <td>sisworoso@smktelkom-mlg.sch.id</td>
                          <td>Sisworoso</td>
                          <td>SMK Telkom Malang</td>
                          <td><div class="badge badge-warning">petugas</div></td> -->
                          <!-- <td>
                            <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalGuru">
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
          id="modalGuru"
          @ok="Save"
        >

          <template v-slot:modal-title>
            Form Guru
          </template>

              <form ref="form">
              <div class="form-group">
                <label for="nama" class="col-form-label">Nama Guru</label>
                <input type="text" name="nama_guru" class="form-control" id="nama_guru" placeholder="Nama Guru" v-model="nama_guru">
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" placeholder="Email" v-model="email">
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

        <!-- <div class="modal fade" id="modalGuru" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Form Guru</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="nis" class="col-form-label">E-Mail</label>
                    <input type="text" name="nis" class="form-control" id="nis" placeholder="E-Mail">
                  </div>
                  <div class="form-group">
                    <label for="nama" class="col-form-label">Nama Guru</label>
                    <input type="text" name="nama" class="form-control" id="nama" placeholder="Nama Guru">
                  </div>
                  <div class="form-group">
                    <label for="sekolah" class="col-form-label">Sekolah</label>
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
        <!-- partial:partials/_footer.html -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
</template>

<script>
module.exports =  {
    data : function(){
    return {
      search: "",
      id: "",
      nama_guru: "",
      email: "",
      sekolah: "",
      kategori: "",
      password: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      guru: [],
      fields: ["id","nama_guru", "email","sekolah", "kategori","Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/guru/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.guru = response.data.guru;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data guru."
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
      this.email      = "";
      this.nama_guru  = "";
      this.sekolah    = ""; 
      this.kategori   = "";
      this.password   = "";
    },

     Edit : function(item){
      this.action     = "update";
      this.id         = item.id;
      this.email      = item.email;
      this.nama_guru  = item.nama_guru;
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
        form.append("email", this.email);
        form.append("nama_guru", this.nama_guru);
        form.append("sekolah", this.sekolah);
        form.append("kategori", this.kategori);
        form.append("password", this.password);
        form.append("role", this.role);

        this.axios.post("/guru", form, conf)
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
          email     : this.email,
          nama_guru : this.nama_guru,
          sekolah   : this.sekolah,
          kategori  : this.kategori,
          password  : this.password,
          
        }
        this.axios.put("/guru/" + this.id, form, conf)
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
        this.axios.delete("/guru/" + id, conf)
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