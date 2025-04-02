import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        preserveSymlinks: true,
    },
    server: {
        watch: {
            usePolling: true,
        },
        //to connect port 3000 and 3001
        proxy: {
            '/api': 'http://localhost:3001', // Proxy all requests starting with /api to the backend
        },
    },
    test: {
        api: {
            port: parseInt(<string>process.env['FRONTEND_PORT']),
            host: 'localhost',
        },
    },
});
