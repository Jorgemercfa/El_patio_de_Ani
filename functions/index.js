const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const { Resend } = require('resend');

const resendApiKey = defineSecret('RESEND_API_KEY');

// ─── EMAIL DE BIENVENIDA AL CREAR CUENTA ──────────────────
exports.onUserCreated = onDocumentCreated(
  { document: 'user/{userId}', secrets: [resendApiKey] },
  async (event) => {
    const user = event.data.data();
    if (!user?.email) return;

    const resend = new Resend(resendApiKey.value());

    await resend.emails.send({
      from: 'El Patio de Ani <elpatiodeani@gmail.com>',
      to: user.email,
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
          <a href="https://jorgemercfa.github.io/El_patio_de_Ani/" 
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

    const resend = new Resend(resendApiKey.value());

    await resend.emails.send({
      from: 'El Patio de Ani <hola@tudominio.com>',
      to: after.email,
      subject: '¡Hijos registrados en El Patio de Ani! 🎂',
      html: `
        <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #E91E81;">¡Gracias por confiar en nosotros! 🎉</h1>
          <p>Hola <strong>${after.name || ''}</strong>,</p>
          <p>Has registrado a <strong>${nombres || 'tus hijos'}</strong> en El Patio de Ani.</p>
          <p>Ahora recibirás un aviso especial antes de cada cumpleaños para que puedas reservar con tiempo y celebrar como se merece.</p>
          <a href="https://jorgemercfa.github.io/El_patio_de_Ani/"
             style="background:#FFD200;color:#2D3E94;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">
            Explorar servicios
          </a>
          <p style="margin-top:32px;color:#888;font-size:0.85rem;">El Patio de Ani — Lima, Perú</p>
        </div>
      `,
    });
  }
);