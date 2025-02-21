import { Address } from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface";

export default class EmailMetadata {
    public emailTo: string | Address | (string | Address)[] = '';
    public readonly subject: string = '';
    public readonly template?: string;
    public readonly context: any; // Esses são os campos utilizados dentro do template handlebars (.hbs)
    public readonly attachments: any;
}