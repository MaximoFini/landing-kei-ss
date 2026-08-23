import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 })
    }

    // Initialize Resend only when needed to avoid build errors
    const resend = new Resend(process.env.RESEND_API_KEY || "")

    const { error } = await resend.emails.send({
      from: "Keii Solutions <onboarding@resend.dev>",
      to: "maximofinicba@gmail.com",
      replyTo: email,
      subject: `Nuevo contacto desde la web: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0f17; color: #f5f5f5; padding: 32px; border-radius: 8px; border: 1px solid #1e2235;">
          <div style="margin-bottom: 24px;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_principal-removebg-preview%20%281%29-65uflcVgzVsTIrqnApVUwM1VXjJKeV.png" alt="Keii Solutions" width="40" />
          </div>
          <h2 style="color: #4f6dff; font-size: 20px; margin: 0 0 24px;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e2235; color: #8a93b0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e2235; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e2235; color: #8a93b0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #1e2235; font-size: 14px;">
                <a href="mailto:${email}" style="color: #4f6dff; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #8a93b0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Mensaje</p>
            <p style="font-size: 14px; line-height: 1.7; background: #161825; padding: 16px; border-radius: 6px; border-left: 3px solid #4f6dff; margin: 0;">
              ${message.replace(/\n/g, "<br/>")}
            </p>
          </div>
          <p style="margin-top: 32px; font-size: 11px; color: #555f7a;">Enviado desde keisoftware.dev — Respondé directamente a este email para contactar al cliente.</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 })
  }
}
