import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});


// Dummy tagger – keeps the build happy but does nothing
const componentTagger = () => ({ name: 'component-tagger' });

