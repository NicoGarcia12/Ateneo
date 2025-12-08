/**
 * Utilidades para manejo de archivos y conversiones
 */
export class FileUtils {
    /**
     * Convierte una cadena base64 a un Blob
     * @param base64 Cadena en formato base64
     * @param contentType Tipo MIME del contenido (por defecto: application/pdf)
     * @returns Blob generado
     */
    static base64ToBlob(base64: string, contentType: string = 'application/pdf'): Blob {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }

    /**
     * Descarga un Blob como archivo
     * @param blob Blob a descargar
     * @param filename Nombre del archivo a descargar
     */
    static downloadBlob(blob: Blob, filename: string): void {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}
