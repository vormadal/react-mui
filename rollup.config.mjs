import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json' assert {type: "json"}

export default {
    input: 'index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false
        }
    ],
    plugins: [typescript()],
    external: ['react', 'react-dom', 'react/jsx-runtime', '@mui/icons-material', '@mui/material', 'react-router-dom']
}