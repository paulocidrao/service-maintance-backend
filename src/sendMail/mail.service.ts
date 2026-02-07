import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendMail(workerEmail: string, clientEmail: string, message: string) {
    const redirect = process.env.REDIRECT_TO_YOUR_SERVICE;
    await this.mailService.sendMail({
      to: clientEmail,
      from: workerEmail,
      subject: 'Codigo do serviço!',
      html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Código de verificação</title>
</head>
<body style="background:#fff;padding:20px;font-family:Arial">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#fff;border-radius:8px;padding:30px">
          <tr>
            <td align="center" style="font-size:22px;font-weight:bold">
              Oba seu serviço foi criado!
            </td>
          </tr>
          <tr>
            <td style="padding:20px 0;font-size:16px">
              Use esse codigo para analisar como anda  o seu serviço:
            </td>
          </tr>
          <tr>
            <td align="center"
                style="font-size:32px;letter-spacing:6px;
                color:#fff;
                font-weight:bold;background:#000;
                padding:15px;border-radius:6px">
              ${message}
            </td>
          </tr>
          <tr>
            <td style="padding-top:20px;font-size:14px;color:#555">
              <a href="${redirect}">clique aqui para ver o seu serviço</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    });
  }
}
