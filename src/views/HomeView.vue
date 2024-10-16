<template>
  <div class="home" style="text-align: center;">
     <LoginCard />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginCard from '@/components/login/LoginCard.vue';

@Options({
  components: {
    LoginCard
  },
})
export default class HomeView extends Vue {}
</script>
