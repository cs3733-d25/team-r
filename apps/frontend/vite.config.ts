import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import * as process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        preserveSymlinks: true,
    },
    server: {
        host: 'localhost',
        port: parseInt(process.env.FRONTEND_PORT),
        proxy: {
            '/api': process.env.BACKEND_URL,
        },
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: 'build',
    },
    cacheDir: '.vite',
    plugins: [
        tailwindcss(),
        react(),
        eslint({
            exclude: ['**/node_modules/**', '**/.*/**', '**/.vite/**'],
            failOnWarning: false,
            failOnError: false,
        }),
    ],
});
