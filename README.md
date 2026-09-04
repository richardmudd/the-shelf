# The Shelf — PWA

This repository contains the GitHub Pages-ready version of The Shelf.

## GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `manifest.webmanifest`, `sw.js`, and the `icons` folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch containing these files (normally `main`) and the `/ (root)` folder, then save.
6. Open the generated HTTPS GitHub Pages URL on your phone.
7. Enter the password. After unlocking, the service worker registers and the site can be installed as an app.

## Updating the app

When you change `index.html`, increase the version in `sw.js`, for example:

`the-shelf-pwa-v1` → `the-shelf-pwa-v2`

This makes browsers replace the cached app shell with the new version.

## Important

The password gate is client-side protection, not server-side authentication. The password is present in the HTML and can technically be discovered by someone who inspects the source.
