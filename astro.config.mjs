import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), db()],
  security: { checkOrigin: true },
  vite: {
		optimizeDeps: {
			exclude: ["astro:db"]
		}
	},
  output: 'server',
});
