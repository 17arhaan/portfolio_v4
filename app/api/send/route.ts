import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Add debug logging for API key
console.log('API Key exists:', !!process.env.RESEND_API_KEY);
console.log('API Key length:', process.env.RESEND_API_KEY?.length);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      return NextResponse.json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, inquiry, website, availability, subject, message } = body;

    // Log the incoming request data (excluding sensitive information)
    console.log('Received form submission:', {
      name,
      email,
      inquiry,
      subject,
      hasPhone: !!phone,
      hasCompany: !!company,
      hasWebsite: !!website,
      hasAvailability: !!availability,
      messageLength: message?.length
    });

    // Validate required fields
    if (!name || !email || !inquiry || !subject || !message) {
      console.error('Missing required fields:', { name, email, inquiry, subject, message });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['17arhaan@gmail.com'],
      subject: `New Contact Form Submission: ${subject}`,
      reply_to: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #000;
                color: #fff;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 20px;
                border: 1px solid #eee;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: 600;
                color: #666;
              }
              .value {
                color: #333;
              }
              .message {
                background: #fff;
                padding: 15px;
                border-radius: 4px;
                border: 1px solid #eee;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 0.9em;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${phone}</span>
              </div>
              ` : ''}
              ${company ? `
              <div class="field">
                <span class="label">Company:</span>
                <span class="value">${company}</span>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Inquiry Type:</span>
                <span class="value">${inquiry}</span>
              </div>
              ${website ? `
              <div class="field">
                <span class="label">Website:</span>
                <span class="value">${website}</span>
              </div>
              ` : ''}
              ${availability ? `
              <div class="field">
                <span class="label">Availability:</span>
                <span class="value">${availability}</span>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Subject:</span>
                <span class="value">${subject}</span>
              </div>
              <div class="message">
                <h3>Message:</h3>
                <p>${message}</p>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    // Log the full error object for debugging
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email'
      }, 
      { status: 500 }
    );
  }
} 