import EmailMetadata from "./email-metadata.entity";

export abstract class MailProvider {
    abstract sendEmail(emailMetadata: EmailMetadata);
}