import path from 'path';

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})

export default ({ mode }) => {


    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const proxy_url =
        process.env.VITE_DEV_REMOTE === 'remote'
            ? process.env.VITE_BACKEND_SERVER
            : 'http://localhost:8888/';

    const basedirectory = process.env.VITE_PROD === "true" ? ('/' + process.env.VITE_SUBDIR_NAME + '/') : '';
    console.log('vite');
    console.log(process.env.VITE_PROD === "true" ? 'production' : 'dev');


    const config = {
        base: basedirectory, // in iis enable if deployed in sub directory
        plugins: [react()],
        build: {

            rollupOptions: {
                external: [/^node:\w+/], // <-- ignores all 'node:*'
            },
        },
        resolve: {
            base: '/',
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: proxy_url,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
    return defineConfig(config);
};
