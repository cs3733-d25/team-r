import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import * as process from 'process';
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        preserveSymlinks: true,
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
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
        rollupOptions: {
            output: {
                manualChunks: {
                    leaflet: ['leaflet'],
                        vendor: ['react', 'react-dom'] // if using React
                    }
                }
        }
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
