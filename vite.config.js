import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    server: {
        host:'0.0.0.0',
        proxy: {
            "/api": {
                target: "http://192.168.0.61:8001",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            },
        },
    },
});
