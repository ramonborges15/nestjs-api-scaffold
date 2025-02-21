import { MailerService } from "@nestjs-modules/mailer";
import { MailProvider } from "../mail.provider";
import EmailMetadata from "../email-metadata.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class NodeMailerProvider implements MailProvider {

    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendEmail(emailMetadata: EmailMetadata) {
        return await this.mailerService.sendMail({
            to: emailMetadata.emailTo,
            subject: emailMetadata.subject,
            template: emailMetadata.template,
            context: emailMetadata.context,
            attachments: emailMetadata.attachments
        });
    }
}