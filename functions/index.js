const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const { Resend } = require('resend');

const resendApiKey = defineSecret('RESEND_API_KEY');
// Fallback seguro de Resend para pruebas/manual QA. En producción debe configurarse
// RESEND_FROM_EMAIL con un remitente propio verificado para evitar problemas de entrega.
const DEFAULT_FROM_EMAIL = 'El Patio de Ani <Reservas@elpatiodeani.com>';
const HOME_URL = 'https://jorgemercfa.github.io/El_patio_de_Ani/';
let hasWarnedAboutFromEmail = false;

function getFromEmail() {
  const configuredFromEmail = String(process.env.RESEND_FROM_EMAIL || '').trim();
  if (configuredFromEmail) {
    return configuredFromEmail.includes('<')
      ? configuredFromEmail
      : `El Patio de Ani <${configuredFromEmail}>`;
  }

  if (!hasWarnedAboutFromEmail) {
    hasWarnedAboutFromEmail = true;
    console.warn(
      '[Emails] RESEND_FROM_EMAIL no está configurado. ' +
        'Se usará El Patio de Ani <Reservas@elpatiodeani.com> como fallback.',
    );
  }
  return DEFAULT_FROM_EMAIL;
}

async function sendEmail({ to, subject, html, context }) {
  const apiKey = resendApiKey.value();

  if (!apiKey) {
    console.warn(`[Emails] RESEND_API_KEY no está configurado. No se enviará el correo de ${context}.`);
    return null;
  }

  try {
    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from: getFromEmail(),
      to,
      subject,
      html,
    });

    console.info(`[Emails] Correo de ${context} enviado a ${to}.`, response);
    return response;
  } catch (error) {
    console.error(`[Emails] Error enviando correo de ${context} a ${to}:`, error);
    return null;
  }
}

// ─── EMAIL DE BIENVENIDA AL CREAR CUENTA ──────────────────
exports.onUserCreated = onDocumentCreated(
  { document: 'user/{userId}', secrets: [resendApiKey] },
  async (event) => {
    const user = event.data.data();
    if (!user?.email) return;

    await sendEmail({
      to: user.email,
      context: 'bienvenida',
      subject: '¡Bienvenido a El Patio de Ani! 🎉',
      html: `
        <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #E91E81;">¡Hola ${user.name || 'amigo/a'}! 👋</h1>
          <p>Gracias por unirte a <strong>El Patio de Ani</strong>, tu productora de eventos infantiles de confianza en Lima.</p>
          <h2 style="color: #2D3E94;">Tu programa de beneficios</h2>
          <p>Con tu cuenta acumulas reservas y subes de nivel automáticamente:</p>
          <ul>
            <li>🥉 <strong>Bronce</strong> — Nivel inicial</li>
            <li>🥈 <strong>Plata</strong> — 15% de descuento en cada reserva</li>
            <li>🥇 <strong>Oro</strong> — 25% de descuento en cada reserva</li>
            <li>💎 <strong>VIP</strong> — 50% de descuento exclusivo</li>
          </ul>
          <p>Además recibirás recordatorios especiales antes del cumpleaños de tus hijos para que nunca se te olvide celebrar.</p>
          <a href="${HOME_URL}"
             style="background:#FFD200;color:#2D3E94;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">
            Ver nuestros servicios
          </a>
          <p style="margin-top:32px;color:#888;font-size:0.85rem;">El Patio de Ani — Lima, Perú</p>
        </div>
      `,
    });
  }
);

// ─── EMAIL AL REGISTRAR HIJOS ──────────────────────────────
exports.onChildrenAdded = onDocumentUpdated(
  { document: 'user/{userId}', secrets: [resendApiKey] },
  async (event) => {
    const before = event.data.before.data();
    const after  = event.data.after.data();

    // Solo disparar si se agregaron hijos nuevos
    const childrenBefore = before?.children?.length || 0;
    const childrenAfter  = after?.children?.length  || 0;
    if (childrenAfter <= childrenBefore) return;
    if (!after?.email) return;

    const newChildren = after.children.slice(childrenBefore);
    const nombres = newChildren.map((c) => c.name).filter(Boolean).join(', ');

    await sendEmail({
      to: after.email,
      context: 'registro de hijos',
      subject: '¡Hijos registrados en El Patio de Ani! 🎂',
      html: `
        <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #E91E81;">¡Gracias por confiar en nosotros! 🎉</h1>
          <p>Hola <strong>${after.name || ''}</strong>,</p>
          <p>Has registrado a <strong>${nombres || 'tus hijos'}</strong> en El Patio de Ani.</p>
          <p>Ahora recibirás un aviso especial antes de cada cumpleaños para que puedas reservar con tiempo y celebrar como se merece.</p>
          <a href="${HOME_URL}"
             style="background:#FFD200;color:#2D3E94;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">
            Explorar servicios
          </a>
          <p style="margin-top:32px;color:#888;font-size:0.85rem;">El Patio de Ani — Lima, Perú</p>
        </div>
      `,
    });
  }
);