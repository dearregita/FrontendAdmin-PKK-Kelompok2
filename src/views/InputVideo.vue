<template>
   <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><b>Input Video</b></p>
                  <p class="card-description float-right">
                    <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalVideo">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Tambah
                    </a>
                  </p>
                  <div class="table-responsive">

                    <table class="table table-striped">
                      <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Video</th>
                            <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>Sosialisasi</td>
                            <td>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/8HuVNxmHdvE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </td>
                            <td>
                              <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalVideo">
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
                            <td>coba dua</td>
                            <td>
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/gwgkXGV_SXY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </td>
                            <td>
                              <a href="#" class="btn btn-sm btn-info btn-icon-text" data-toggle="modal" data-target="#modalVideo">
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
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="modalVideo" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="ModalLabel">Input Video</h5>
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
                          <label for="video" class="col-form-label">Video</label>
                          <input type="iframe" id="iframe" name="iframe" class="iframe">
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
          </div>

        <!-- content-wrapper ends -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
</template>
