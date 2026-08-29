// Vercel serverless function: api/upload.js
// Accepts JSON: { filename: string, content: base64-string }
// Requires environment variable GITHUB_TOKEN with repo access.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(data ? JSON.parse(data) : {}));
      req.on('error', reject);
    });

    const filename = body.filename || `voice-${Date.now()}.webm`;
    const content = body.content; // base64
    if (!content) return res.status(400).json({ error: 'missing content' });

    const owner = 'sadatsarallah';
    const repo = 'doost';
    const path = `voices/${filename}`;

    const payload = {
      message: `Add voice ${filename}`,
      content: content,
      committer: { name: 'site-uploader', email: 'actions@users.noreply.github.com' }
    };

    const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'doost-uploader',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json = await r.json();
    if (!r.ok) return res.status(r.status).json(json);
    return res.status(200).json({ ok: true, url: json.content.html_url, download: json.content.download_url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
