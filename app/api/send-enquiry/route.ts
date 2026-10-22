import { NextRequest, NextResponse } from 'next/server'

type EnquiryPayload = {
  name: string
  company: string
  email: string
  telephone?: string
  supportType?: string
  teamSize?: string
  message: string
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<EnquiryPayload>
  const { name, company, email, telephone, supportType, teamSize, message } = body

  if (!name || !company || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const senderName = process.env.BREVO_SENDER_NAME ?? 'Prime Support Solutions Website'
  const recipientEmail = process.env.BREVO_RECIPIENT_EMAIL
  const recipientName = process.env.BREVO_RECIPIENT_NAME ?? 'PSS Team'

  if (!apiKey || !senderEmail || !recipientEmail) {
    return NextResponse.json({ error: 'Brevo is not configured' }, { status: 500 })
  }

  const html = `
    <h2>New business enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telephone:</strong> ${escapeHtml(telephone ?? '-')}</p>
    <p><strong>Type of support:</strong> ${escapeHtml(supportType ?? '-')}</p>
    <p><strong>Approximate team size:</strong> ${escapeHtml(teamSize ?? '-')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `

  const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: recipientEmail, name: recipientName }],
      replyTo: { email, name },
      subject: `New enquiry from ${name} - ${company}`,
      htmlContent: html,
    }),
  })

  if (!brevoRes.ok) {
    const err = await brevoRes.text()
    return NextResponse.json({ error: `Brevo error: ${err}` }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
