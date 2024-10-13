<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Media from './components/media.vue'
</script>

<template>
    <header class="flex md:flex-col md:w-full gap-2 justify-center items-center">
      <picture>
        <img class="w-[100px] rounded-full" src="/pfp.webp" alt="NaraPlayVT">
      </picture>
      <h1 class="text-4xl sm:text-4xl text-white font-extrabold font-caveat">NaraPlayVT</h1>
    </header>
    <main class="flex flex-col gap-2">
      <Media />
    </main>
    <footer class="text-center">
      <p>© 2024 <a href="mailto:contact.fedeval@gmail.com?subject=Work%20contact">OPYTHA</a>. All rights reserved.</p>
    </footer>
</template>

<style scoped>

</style>
