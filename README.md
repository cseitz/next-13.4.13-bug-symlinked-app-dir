## Symlinked App Directory

I am using a symlinked directory within my `app` folder. This symlink 404's in development, but **works perfectly** in production.

- I have a directory, [`src/features/test1/app`](./src//features/test1/app), that is symlinked into [`src/app/(features)/(test1)`](./src/app/(features)/(test1))
- I symlinked this folder `ln -sr "./src/features/test1/app" "./src/app/(features)/(test1)"`
- I have done no additional configuration to next.js

### Reproducing

Running `next dev` and visiting [`localhost:3000/test1`](http://localhost:3000/test1) will `404 NOT FOUND`.

However, running `next build` and `next start` and visiting [`localhost:3000/test1`](http://localhost:3000/test1) **will load just fine**.

Clearly, due to `src/features/test1/app/test1/page.tsx` being accessible in production builds, it should also be accessible via `next dev`.

### Areas to Investigate

Why is this symlinked folder incorrectly resolving in `next dev`, but resolving just fine in `next build`?

