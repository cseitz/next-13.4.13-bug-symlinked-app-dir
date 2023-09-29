Note: This includes PNPM patches to resolve the problem.

## Symlinked App Directory

I am using a symlinked directory within my `app` folder. In unpatched next.js this symlink 404's in development, but **works perfectly** in production.

- I have a directory, [`src/features/test1/app`](./src//features/test1/app), that is symlinked into [`src/app/(features)/(test1)`](./src/app/(features)/(test1))
- I symlinked this folder via `ln -sr "./src/features/test1/app" "./src/app/(features)/(test1)"`
- I have done no additional configuration to next.js

### Reproducing

Running `next dev` and visiting [`localhost:3000/test1`](http://localhost:3000/test1) will `404 NOT FOUND`.

However, running `next build` and `next start` and visiting [`localhost:3000/test1`](http://localhost:3000/test1) **will load just fine**.

Clearly, due to `src/features/test1/app/test1/page.tsx` being accessible in production builds, it should also be accessible via `next dev`.

### Patching Next.js and Watchpack with PNPM

I have attached the following patches [here](./.pnpm/patches) (these are package diffs) and have applied them via the [PNPM Patch](https://pnpm.io/cli/patch) system.

You can git clone this repo and switch to the `pnpm-patch` branch and you will notice that editing [features/test1/app/test1/page.tsx](./src/features/test1/app/test1/page.tsx) will now have hot reloading at `localhost:3000/test1` while running `pnpm dev`

### Important Notes regarding the patch

This patch is **tied to the specific version** of Next.js that is installed when you create the patch.

The upgrade process is sadly more complex than copy-pasting.

If you want to upgrade Next.js you must install your new next.js version, then run `pnpm patch next@{version you installed}` (and same for watchpack) and **manually** implement the same changes that were implemented in the previous patch.

Read through the patches to see what those changes are so you may reproduce when upgrading.

Be sure to read more on PNPM patches and watch the helpful video on their documentation: https://pnpm.io/cli/patch




