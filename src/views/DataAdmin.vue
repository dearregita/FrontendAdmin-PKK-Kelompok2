<template>
     <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Data User</b></p>
                  <!-- <p class="card-description float-right">
                    <b-button variant="success" v-b-modal.modalUser v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button> -->
                    <!-- <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalAdmin">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Tambah
                    </a> -->
                  <!-- </p> -->
                  <div class="table-responsive">
                    <b-table striped hover :items="user" :fields="fields">
                      <template v-slot:cell(role)="data">
                         <b-badge variant="warning">{{ data.item.role }}</b-badge>
                      </template>
                      <template v-slot:cell(Aksi)="data">
                         <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalUser><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
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
                          <th>Nama Admin</th>
                          <th>Role</th> 
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>admin@smktelkom-mlg.sch.id</td>
                          <td>Abdullah Sutejo Rahman</td>
                          <td><div class="badge badge-warning">admin</div></td> 
                          <td>
                            <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalAdmin">
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
                           <td><div class="badge badge-warning">petugas</div></td> 
                          <td>
                            <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalAdmin">
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
          id="modalUser"
          @ok="Save"
        >

          <template v-slot:modal-title>
            Form User
          </template>

                
          <form ref="form">
              <div class="form-group">
                <label for="name" class="col-form-label">Nama</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Nama" v-model="name">
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">Phone Number</label>
                <input type="text" name="phone" class="form-control" id="phone" placeholder="phone_number" v-model="phone">
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" placeholder="Email" v-model="email">
              </div>
              <div class="form-group">
                <label for="profile_picture" class="col-form-label">Profile Picture</label>
                <input type="text" name="profile_picture" class="form-control" id="profile_picture" placeholder="profile_picture" v-model="profile_picture">
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="Password" v-model="password">
              </div>
          </form>
        </b-modal>

        <!-- <div class="modal fade" id="modalAdmin" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Form Admin</h5>
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
                    <label for="nama" class="col-form-label">Nama Admin</label>
                    <input type="text" name="nama" class="form-control" id="nama" placeholder="Nama Admin">
                  </div>
                   <div class="form-group">
                    <label for="kelas" class="col-form-label">Role</label>
                    <select class="form-control" name="role" id="role">
                      <option value="admin" checked>Admin</option>
                      <option value="petugas">Petugas</option>
                    </select>
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
      name: "",
      email: "",
      phone: "",
      profile_picture:"",
      password: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      user: [],
      fields: ["id", "name", "phone", "email", "profile_picture", "Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/admin/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.user = response.data.user;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data user."
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
      this.action   = "insert";
      this.name     = "";
      this.phone    = "";
      this.email    = "";
      this.profile_picture = "";
      this.password = ""; 
    },

    Edit : function(item){
      this.action     = "update";
      this.id         = item.id;
      this.name       = item.name;
      this.phone      = item.phone;
      this.email      = item.email;
      this.profile_picture = item.profile_picture;
      this.password      = item.password;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("name", this.name);
        form.append("phone", this.phone);
        form.append("email", this.email);
        form.append("profile_picture", this.profile_picture);
        form.append("password", this.password);
        form.append("role", this.role);
        this.axios.post("/admin", form, conf)
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
          name       : this.name,
          phone      : this.phone,
          email      : this.email,
          profile_picture : this.profile_picture,
          password   : this.password,
          
        }
        this.axios.put("/admin/" + this.id, form, conf)
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
        this.axios.delete("/admin/" + id, conf)
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
