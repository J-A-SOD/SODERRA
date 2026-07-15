import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/SODERRA/',

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                license: resolve(__dirname, 'license.html'),
                resume: resolve(__dirname, 'resume.html'),
                musc: resolve(__dirname, 'proj-music.html'),
                photo: resolve(__dirname, 'proj-photo.html'),
                inter: resolve(__dirname, 'proj-interactive.html'),
                arch: resolve(__dirname, 'proj-arch.html')
            }
        }
    }
});