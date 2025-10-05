import { environment } from '../../environments/environment';

export function buildApiUrl(...segments: string[]): string {
    const base = (environment.apiBaseUrl || '').replace(/\/+$|\s+/g, '');
    const path = segments
        .filter(Boolean)
        .map((s) => s.replace(/^\/+|\/+$/g, ''))
        .join('/');
    return path ? `${base}/${path}` : base;
}
