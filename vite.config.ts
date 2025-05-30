import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: For GitHub Pages deployment, uncomment and set this to your repository name.
  // For example, if your repo URL is https://YourUsername.github.io/YourRepoName/,
  // then base should be '/YourRepoName/'.
  base: '/Olimpia/', 
})
