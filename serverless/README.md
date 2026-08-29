Serverless upload endpoint (Vercel)

Overview
- `api/upload.js` is a Vercel-compatible serverless function that accepts a JSON POST with:
  - `filename` (optional)
  - `content` (required) — base64-encoded file content
- The function commits the uploaded file into `voices/<filename>` in the `sadatsarallah/doost` repository using the `GITHUB_TOKEN` environment variable.

Deploying to Vercel
1. Install Vercel CLI (optional): `npm i -g vercel`
2. From the `doost_site` folder, run:
   ```bash
   vercel login
   vercel --prod
   ```
3. In Vercel dashboard: Project Settings → Environment Variables, add:
   - `GITHUB_TOKEN` = a personal access token with `repo` scope (or minimal to create contents)
4. Redeploy (or trigger `vercel --prod`) so the environment variable is available.

Client usage (browser)
- Send a JSON POST with base64 content:
```javascript
async function uploadBase64(base64, filename){
  const res = await fetch('https://<your-vercel-app>.vercel.app/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content: base64.split(',')[1] })
  });
  return res.json();
}
```

Security notes
- Do NOT put your GitHub PAT in client-side code. Store it as an environment variable in Vercel/Netlify.
- Revoke tokens if accidentally leaked.

Alternative hosts
- Netlify Functions and Cloudflare Workers can be used with very similar code. Netlify may require using `@netlify/functions` handler format.
