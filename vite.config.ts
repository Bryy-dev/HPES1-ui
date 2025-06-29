import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: ['pdfjs-dist/build/pdf.worker.js'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'pdf-worker': ['pdfjs-dist/build/pdf.worker.js'],
                },
            },
        },
    },
});
