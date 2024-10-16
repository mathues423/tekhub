<template>
<div class="row">
      <div class="Card col-md-5 col-sm-12 border rounded">
            <div class="Card-Header border-bottom">TekHub Integrações</div>
            <div>
                  <img src="../../assets/imagens/logo-tek-hub.png" alt="logo" width="300">
            </div>
            <div class="Card-Body">
                  <form>
                        <div class="input-group">
                              <span class="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                              </span>
                              <input type="email" class="form-control" id="email" placeholder="seuemail@hotmail.com">
                        </div>
                        <div class="input-group" style="margin-top: 16px;">
                              <span class="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                                    </svg>
                              </span>
                              <input type="password" class="form-control"  id="password" placeholder="senha">
                              <!-- Button dont hork -->
                               <span class="input-group-text">
                                    <button type="button" class="btn" id="showpassword" @click="showPassword()">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill visible" viewBox="0 0 16 16" display="inline" id="eyeclose">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                          </svg>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" display="none" id="eyeopen">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                          </svg>
                                    </button> 
                               </span>
                        </div>
                        <button style="margin-top: 16px; margin-bottom: 16px;" type="submit" class="btn btn-primary col-12">Entrar</button>
                  </form>
            </div>
      </div>
</div>
</template>

<script lang="ts">
      export default{
            methods:{
                  showPassword(){
                        const a = document.querySelector('#password');
                        if(a.getAttribute('type') == 'password'){
                              document.querySelector('#password')?.setAttribute('type', 'text');
                              document.querySelector('#eyeclose')?.setAttribute('display','none');
                              document.querySelector('#eyeopen')?.setAttribute('display','inline');
                        }else{
                              document.querySelector('#password')?.setAttribute('type', 'password');
                              document.querySelector('#eyeclose')?.setAttribute('display','inline'); 
                              document.querySelector('#eyeopen')?.setAttribute('display','none');
                        }
                  }
            }
      }
</script>

<style lang="css" scoped>
.Card{
      background-color: var(--bs-white);
      color: var(--bs-black);
      margin-left: auto;
      margin-right: auto;
}
.Card-Header{
      text-align: left;
      padding: 16px 0;
      font-size:16px;
      font-weight: 500;
      border-bottom: 1px;
      border-color: var(--bs-grey);
}

.Card-Body{
      padding: 0px;
}
</style>