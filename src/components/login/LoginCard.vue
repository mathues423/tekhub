<template>
<div class="row">
      <div class="Card col-md-6 col-sm-12 border rounded">
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
                              <button id="toggle-password" type="button" class="d-none">s</button> 
                        </div>
                        <button style="margin-top: 16px; margin-bottom: 16px;" type="submit" class="btn btn-primary col-12">Entrar</button>
                  </form>
            </div>
      </div>
</div>
</template>

<script lang="ts">

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