/**
     * Ofusca o e-mail do usuário para que ele não seja exposto em logs.
     * @param email que será ofuscado.
     * @returns email ofuscado.
*/
export function obfuscateEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    const obfuscatedLocal = localPart.slice(0, 2) + '****' + localPart.slice(-2);
    return `${obfuscatedLocal}@${domain}`;
}