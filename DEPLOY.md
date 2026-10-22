# Deploying `prime-solution-vite` to Vercel

## Prerequisites
- A Vercel account (https://vercel.com) — free tier is enough.
- The project pushed to a Git repo (GitHub/GitLab/Bitbucket) OR the Vercel CLI installed (`npm i -g vercel`).
- Brevo account with a validated sender + an API key (see "Brevo setup").

## 1. Push the code
The deployable app lives in `prime-solution-vite/`. Make that folder the project root on Vercel (or set Root Directory to `prime-solution-vite`).

```bash
git add . && git commit -m "initial"
# push to your GitHub/GitLab/Bitbucket repo
```

## 2. Import into Vercel
1. Vercel Dashboard → "Add New..." → "Project".
2. Import your Git repo.
3. Framework Preset: **Next.js** (auto-detected). Build command: `npm run build`. Output dir: `.next`.
4. Root Directory: `prime-solution-vite`.
5. Click "Deploy".

CLI alternative:
```bash
vercel            # first deploy (preview)
vercel --prod     # production deploy
```

## 3. Environment variables (Brevo)
Project → Settings → Environment Variables. Add for Production (and Preview if you want):

| Name | Value |
|------|-------|
| `BREVO_API_KEY` | Your Brevo API key (SMTP & API → API Keys) |
| `BREVO_SENDER_EMAIL` | A validated sender address in Brevo, e.g. `noreply@yourdomain.com` |
| `BREVO_SENDER_NAME` | `Prime Support Solutions Website` |
| `BREVO_RECIPIENT_EMAIL` | Team inbox that receives enquiries, e.g. `team@yourdomain.com` |
| `BREVO_RECIPIENT_NAME` | `Prime Support Solutions Team` |

After adding/changing env vars, redeploy (Deployments → "..." → Redeploy) so they take effect.

## 4. Custom domain (bought from any registrar)
1. Project → Settings → Domains → "Add" → enter your domain (e.g. `primesupportsolutions.com`).
2. Vercel shows the DNS records to add. Go to your domain registrar's DNS panel and add them:
   - Apex domain (`yourdomain.com`): an **A** record pointing to `76.76.21.21`.
   - `www` subdomain: a **CNAME** record pointing to `cname.vercel-dns.com`.
3. Wait for DNS propagation (minutes to a few hours). Vercel auto-provisions SSL.
4. Your old GoDaddy-hosted site is untouched — only DNS for this domain changes.

## 5. Brevo setup (one-time)
1. Create a Brevo account (https://www.brevo.com).
2. Senders → add & verify your sender email (or whole domain) — this becomes `BREVO_SENDER_EMAIL`.
3. SMTP & API → API Keys → create a key → this becomes `BREVO_API_KEY`.
4. (Recommended) Authenticate your sending domain (SPF/DKIM records Brevo provides) for deliverability.

## 6. Future deploys
- **Git push** to the connected branch auto-deploys to production.
- **Manual:** `vercel --prod` from `prime-solution-vite/`.
- **Preview:** every PR/branch gets a preview URL automatically.

## Local dev
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev                  # http://localhost:3000
npm run build                # production build -> .next/
```

The `/api/send-enquiry` route is served by Next.js in dev, so the form works with `npm run dev`.

## Troubleshooting
- Form returns "Brevo is not configured": env vars missing or not redeployed.
- 405 on submit: the request didn't reach the serverless function — check Root Directory / build output.
- CORS errors: should not happen; the function is same-origin on Vercel.
