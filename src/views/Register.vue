<template>
    <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="main-panel">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <!-- <div class="navbar-brand brand-logo">
                  <img src="assets/img/logo.svg">
                </div> -->
                <h4>Selamat datang!</h4>
                <h6 class="font-weight-light">Register Konsline</h6>
                 <form v-on:submit.prevent="Register" class="pt-3" method="post">
                 <div class="form-group">    
                  <div class="input-group">
                    <!-- <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div> -->
                    <input  v-model="name" type="text" class="form-control form-control-lg" id="name" name="name" placeholder="Name" required>
                  </div>
                </div>
                <div class="form-group">    
                  <div class="input-group">
                    <!-- <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-account-outline text-primary"></i> 
                      </span>
                    </div> -->
                    <input  v-model="phone" type="text" class="form-control form-control-lg " id="phone" name="phone" placeholder="Phone Number" required>
                  </div>
                </div>
                <div class="form-group">    
                  <div class="input-group">
                    <!-- <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                       <i class="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div> -->
                    <input  v-model="email" type="email" class="form-control form-control-lg" id="email" name="email" placeholder="Email" required>
                  </div>
                </div>
                <div class="form-group">    
                  <div class="input-group">
                    <!-- <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-account-outline text-primary"></i>
                      </span>
                    </div> -->
                    <input  v-model="profile_picture" type="text" class="form-control form-control-lg" id="profile_picture" name="profile_picture" placeholder="Profile Picture" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <!-- <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="mdi mdi-lock-outline text-primary"></i> 
                      </span>
                    </div> -->
                    <input  v-model="password" type="password" class="form-control form-control-lg" name="password" id="password" placeholder="Password" required>                        
                  </div>
                </div>
                <div class="my-3">
                  <input type="submit" name="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" value="REGISTER">
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
export default {
    data() {
      return {
        name: '',
        phone: '',
        email: '',
        profile_picture: '',
        password: '',
      }
    },
    methods: {
        Register: function(){
            let name = this.name //let itu variabel baru
            let phone = this.phone
            let email = this.email //let itu variabel baru
            let profile_picture = this.profile_picture
            let password = this.password
            this.$store.dispatch('register', { name, phone, email, profile_picture, password })
            .then(() => this.$router.push('/login'))
            .catch(err => console.log(err))
        }
    }
}
</script>