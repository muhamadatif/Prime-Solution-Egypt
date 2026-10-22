# Adding a Custom Domain to the Vercel Project

Use this to give the deployed site its own name (e.g. `primesupportsolutions.com`).

## Step 1 — Add the domain in Vercel
1. Open the project in the Vercel dashboard.
2. Go to **Settings → Domains**.
3. Click **Add** and type the domain (e.g. `primesupportsolutions.com`).
4. Vercel will show the DNS records you must create.

## Step 2 — Configure DNS at your registrar
Log in to wherever you bought the domain (GoDaddy, Namecheap, Cloudflare, etc.) and open the DNS settings.

### Apex domain (`yourdomain.com`)
- Type: **A**
- Name: `@`
- Value: `76.76.21.21`

### `www` subdomain
- Type: **CNAME**
- Name: `www`
- Value: `cname.vercel-dns.com`

(If you want only `www` or only the apex, add just that one.)

## Step 3 — Wait for propagation
DNS changes take a few minutes to a few hours. Vercel checks automatically and shows a green checkmark when verified. SSL is provisioned automatically — no manual certificate step.

## Step 4 — Set the primary domain
In **Settings → Domains**, click the "..." next to your domain → **Set as Primary**. Other variants (www ↔ apex) will redirect to it.

## Notes
- Your old GoDaddy-hosted site is untouched; only DNS for this domain changes.
- You can add multiple domains/aliases (e.g. a staging subdomain) the same way.
- If the domain was previously used on another Vercel project, remove it there first.