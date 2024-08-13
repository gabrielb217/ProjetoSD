const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "botbarroso@gmail.com", //email
    pass: "", //senha caso gmail senha de app
  },
});

async function sendEmail(user, dadosDoTime) {
  const info = await transporter.sendMail({
    from: "botbarroso@gmail.com",
    to: user.emailCliente,
    subject: `Seu timão: ${user.time}`,
    // Formato HTML melhorado
    html: `
      <h2>Detalhes do Time</h2>
      <p><strong>Time:</strong> ${dadosDoTime.Time}</p>
      <p><strong>Pontos Ganhos (PG):</strong> ${dadosDoTime.PG}</p>
      <p><strong>Jogos (J):</strong> ${dadosDoTime.J}</p>
      <p><strong>Vitórias (V):</strong> ${dadosDoTime.V}</p>
      <p><strong>Empates (E):</strong> ${dadosDoTime.E}</p>
      <p><strong>Derrotas (D):</strong> ${dadosDoTime.D}</p>
      <p><strong>Gols Contra (GC):</strong> ${dadosDoTime.GC}</p>
      <p><strong>Gols a Favor (GP):</strong> ${dadosDoTime.GP}</p>
      <p><strong>Saldo de Gols (SG):</strong> ${dadosDoTime.SG}</p>
      <p><strong>Percentual de Aproveitamento (%):</strong> ${dadosDoTime['%']}</p>
    `
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendEmail
};