import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react()],
        server: {
            port: 8080,
            strictPort: true,
            host: true,
            origin: env.VITE_REACT_APP_URL,
        },
    }
})
