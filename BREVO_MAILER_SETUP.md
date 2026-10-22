# Making the Enquiry Form Send Email via Brevo

## What the form needs (data you must provide)
1. **Brevo API key** — Brevo dashboard → SMTP & API → API Keys → Create a key.
2. **Verified sender email + name** — the "From" address Brevo sends from. Must be validated in Brevo first (Senders → Add & verify). Example: `noreply@yourdomain.com`.
3. **Recipient (team) email + name** — the inbox that receives enquiries. Example: `team@yourdomain.com`.
4. (Recommended) **Verified sending domain** — authenticate your domain (SPF/DKIM records Brevo provides) for better deliverability.

## Step 1 — Configure env vars in Vercel
Project → Settings → Environment Variables. Add for Production (and Preview if desired):

| Name | Example value |
|------|---------------|
| `BREVO_API_KEY` | `xkeysib-...` |
| `BREVO_SENDER_EMAIL` | `noreply@yourdomain.com` |
| `BREVO_SENDER_NAME` | `Prime Support Solutions Website` |
| `BREVO_RECIPIENT_EMAIL` | `team@yourdomain.com` |
| `BREVO_RECIPIENT_NAME` | `Prime Support Solutions Team` |

After adding/changing, redeploy (Deployments → "..." → Redeploy) so they take effect.

## Step 2 — How it works
- The form POSTs JSON to `/api/send-enquiry` (same origin).
- `api/send-enquiry.ts` (Vercel serverless function) validates fields, then calls Brevo's SMTP API:
  `POST https://api.brevo.com/v3/smtp/email` with header `api-key: <BREVO_API_KEY>`.
- Sender = `BREVO_SENDER_EMAIL`, recipient = `BREVO_RECIPIENT_EMAIL`, `replyTo` = the client's email so you can reply directly.
- The API key never ships to the browser.

## Step 3 — Verify
1. Open the live site → scroll to "Start a conversation" → fill the form → submit.
2. You should see "Thank you for your enquiry." and receive an email at `BREVO_RECIPIENT_EMAIL`.
3. If you see "Brevo is not configured", the env vars are missing or not redeployed.

## Local testing
Vite's dev server does not serve `/api/*`. Use `vercel dev` instead of `npm run dev` to test the form locally.

## Troubleshooting
- 405 Method Not Allowed: request didn't hit the function — check Root Directory / build output.
- 400 Missing required fields: name/company/email/message are required.
- 502 Brevo error: check the API key, sender verification, and recipient email.