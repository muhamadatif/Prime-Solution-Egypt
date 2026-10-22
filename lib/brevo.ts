export type EnquiryPayload = {
  name: string
  company: string
  email: string
  telephone?: string
  supportType?: string
  teamSize?: string
  message: string
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<void> {
  const response = await fetch('/api/send-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error((data as { error?: string }).error ?? 'Failed to send enquiry')
  }
}
