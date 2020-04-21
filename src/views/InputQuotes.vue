<template>
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Input Quotes</b></p>
                  <p class="card-description float-right">
                     <b-button variant="success" v-b-modal.modalQuote v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
                    <!-- <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalQuotes">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Tambah
                    </a> -->
                  </p>
                  <div class="table-responsive">
                     <b-table striped hover :items="quote" :fields="fields">
                      <template v-slot:cell(role)="data">
                         <b-badge variant="warning">{{ data.item.role }}</b-badge>
                      </template>
                      <template v-slot:cell(Aksi)="data">
                         <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalQuote><i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah</b-button>&nbsp;
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
                            <th>Quotes</th>
                            <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>u can do it</td>
                            <td>
                              <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalQuotes">
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
          id="modalQuote"
          @ok="Save"
        >

          <template v-slot:modal-title>
            Form Quote
          </template>

            <form ref="form">
              <div class="form-group">
                <!-- <label for="quote" class="col-form-label">Quote</label>
                <input type="text" name="quote" class="form-control" id="quote" placeholder="Quote" v-model="quote"> -->

              <label for="quote" class="col-form-label">Quote</label>
              <textarea name="text" id="quote" class="form-control" rows="7" cols="10" v-model="quote"></textarea>
              </div>
          </form>
        </b-modal>

        <!-- <div class="modal fade" id="modalQuotes" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Input Quotes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="quotes" class="col-form-label">Quotes</label>
                        <input type="text" name="nis" class="form-control" id="quotes" placeholder="Quotes">
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
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      quote: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      quote: [],
      fields: ["id", "quote","Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/quote/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.quote = response.data.quote;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data quote."
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
      this.quote        = "";
    },

    Edit : function(item){
      this.action     = "update";
      this.id         = item.id;
      this.quote       = item.quote;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("quote", this.quote);
        form.append("role", this.role);

        this.axios.post("/quote", form, conf)
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
          quote       : this.quote,          
        }
        this.axios.put("/quote/" + this.id, form, conf)
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
        this.axios.delete("/quote/" + id, conf)
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