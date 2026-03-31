import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Use '/' if you have a custom domain on GoDaddy!
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        attractions: 'attractions.html',
        gallery: 'gallery.html',
        quiz: 'quiz.html',
        contact: 'contact.html',
        disclaimer: 'disclaimer.html',
      },
    },
  },
})
