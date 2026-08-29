Serverless upload (optional)
- To make uploaded voices centrally available, deploy the provided Vercel function:
	- See `serverless/README.md` for `api/upload.js` and deployment steps.
	- Set `GITHUB_TOKEN` in Vercel environment variables (token must have repo write permissions).
	- Update your client `دوست.html` to POST base64 recordings to `https://<your-vercel-app>.vercel.app/api/upload`.
Notes & tips
- If you want the site to be at the repository root URL (e.g., `https://your-username.github.io/your-repo/دوست.html`), place `index.html` in the repo root or link directly to `دوست.html`.
- For audio files: the repo will contain uploaded audio files only if you use the optional GitHub upload panel (it uses your PAT to PUT files into the repo). Be careful with token security.
Hosting this project on GitHub Pages
=================================

Steps to publish your static site (the files on your Desktop) to GitHub Pages:

1. Create a new repository on GitHub (e.g., `your-username/your-repo`).

2. In your local project folder (`c:\Users\Administrator\Desktop`), initialize git and push:

```bash
cd "C:\Users\Administrator\Desktop"
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. The included GitHub Actions workflow `.github/workflows/pages.yml` will automatically deploy the repository root to GitHub Pages whenever you push to `main` (or `master`).

4. Wait a couple minutes after the push; then go to your repository Settings → Pages and confirm the site URL (it will be published by the Pages workflow). The site will serve the repo root (index files like `دوست.html` can be linked directly).

Notes & tips
- If you want the site to be at the repository root URL (e.g., `https://your-username.github.io/your-repo/دوست.html`), place `index.html` in the repo root or link directly to `دوست.html`.
- For audio files: the repo will contain uploaded audio files only if you use the optional GitHub upload panel (it uses your PAT to PUT files into the repo). Be careful with token security.
- If you prefer, you can manually enable Pages to serve from the `main` branch under Settings → Pages.

Need help pushing or want me to prepare the initial commit and push? Provide the repo URL and I can show exact commands or help prepare a script.
