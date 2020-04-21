<template>
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Input Gambar</b></p>
                  <p class="card-description float-right">
                     <b-button variant="success" v-b-modal.modalPicture v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
                    <!-- <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalGambar">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Tambah
                    </a> -->
                  </p>
                  <div class="table-responsive">
                      <b-table striped hover :items="picture" :fields="fields">
                      <template v-slot:cell(role)="data">
                         <b-badge variant="warning">{{ data.item.role }}</b-badge>
                      </template>
                      <template v-slot:cell(Aksi)="data">
                         <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalPicture><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
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
                            <th>Judul</th>
                            <th>Gambar</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>Sosialisasi</td>
                            <td>
                            <img src="images/admin.jpg" alt="">
                            </td>
                            <td>Bimbingan di pagi hari</td>
                            <td>
                              <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalGambar">
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
          id="modalPicture"
          @ok="Save"
        >

          <template v-slot:modal-title>
            Form Picture
          </template>

          <form ref="form">
              <div class="form-group">
                <label for="judul" class="col-form-label">Judul</label>
                <input type="text" name="judul" class="form-control" id="judul" v-model="judul">
              </div>
              <div class="form-group">
                <label for="picture" class="col-form-label">Picture</label>
                <input type="text" name="picture" class="form-control" id="picture" v-model="picture">
              </div>
              <div class="form-group">
                <label for="deskripsi" class="col-form-label">Deskripsi</label>
                <textarea name="text" id="deskripsi" class="form-control" rows="7" cols="10" v-model="deskripsi"></textarea>
              </div>
          </form>
        </b-modal>

        <!-- <div class="modal fade" id="modalGambar" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="ModalLabel">Input Gambar</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="judul" class="col-form-label">Judul</label>
                      <input type="text" name="nis" class="form-control" id="judul" placeholder="Judul">
                    </div>
                    <div class="form-group">
                      <label for="gambar" class="col-form-label">Gambar</label>
                      <input type="file" id="file-input" name="file-input" class="form-control-file">
                    </div>
                    <div class="form-group">
                        <label for="deskripsi" class="col-form-label">Deskripsi</label>
                        <input type="text" name="nis" class="form-control" id="deskripsi" placeholder="Deskripsi">
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
module.exports =  {
  data : function(){
    return {
      search: "",
      id: "",
      judul: "",
      picture: "",
      deskripsi: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      picture: [],
      fields: ["id", "judul", "picture", "deskripsi","Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/picture/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.picture = response.data.picture;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data picture."
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
      this.judul      = "";
      this.picture    = "";
      this.deskripsi  = ""; 
    },

    Edit : function(item){
      this.action     = "update";
      this.id         = item.id;
      this.judul      = item.judul;
      this.picture    = item.picture;
      this.deskripsi  = item.deskripsi;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("judul", this.judul);
        form.append("picture", this.picture);
        form.append("deskripsi", this.deskripsi);
        form.append("role", this.role);

        this.axios.post("/picture", form, conf)
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
          judul       : this.judul,
          picture     : this.picture,
          deskripsi   : this.deskripsi,
          
        }
        this.axios.put("/picture/" + this.id, form, conf)
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
        this.axios.delete("/picture/" + id, conf)
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