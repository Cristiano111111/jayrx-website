import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, service, message } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

  try {
    await resend.emails.send({
      from: 'Rabbit Pressure Washing <outreach@jayrx.net>',
      to:   'jayrx16@gmail.com',
      replyTo: email,
      subject: `Quote Request from ${name}${service ? ` — ${service}` : ''}`,
      html: `<div style="font-family:sans-serif;max-width:560px;color:#111;padding:20px"><h2 style="margin:0 0 1.5rem;font-size:1.35rem;border-bottom:2px solid #1B62E8;padding-bottom:0.75rem">New Quote Request</h2><table style="border-collapse:collapse;width:100%;font-size:0.95rem"><tr><td style="padding:0.5rem 0;color:#666;width:90px">Name</td><td style="font-weight:600">${name}</td></tr><tr><td style="padding:0.5rem 0;color:#666">Email</td><td><a href="mailto:${email}" style="color:#1B62E8">${email}</a></td></tr>${phone ? `<tr><td style="padding:0.5rem 0;color:#666">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>` : ''}${service ? `<tr><td style="padding:0.5rem 0;color:#666">Service</td><td>${service}</td></tr>` : ''}</table>${message ? `<div style="margin-top:1.5rem;padding:1rem;background:#f7f7f5;border-left:3px solid #1B62E8;font-size:0.9rem;white-space:pre-wrap">${message}</div>` : ''}<p style="margin-top:2rem;font-size:0.75rem;color:#999">Sent from jayrx.net</p></div>`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err.message);
    return res.status(500).json({ error: 'Failed to send.' });
  }
}
