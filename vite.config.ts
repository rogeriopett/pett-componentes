import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PettComponentes',
            fileName: (format) => `pett-componentes.${format}.js`,
        },
        rollupOptions: {
            // Garante que as libs de React não sejam empacotadas no bundle final.
            // jsx-runtime também precisa estar aqui: é pra onde o JSX compila
            // (runtime automático do @vitejs/plugin-react) — sem isso, o bundler
            // embute um shim de interop CJS que quebra em ambiente ESM puro.
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    'react/jsx-dev-runtime': 'jsxDevRuntime',
                },
            },
        },
    },
});