import siteConfig from '@generated/docusaurus.config';
import { createAuthClient } from 'better-auth/react';

/**
 * The book is a static Docusaurus site, so authentication is delegated to the
 * Cloudopia app's Better Auth server. The URL is emitted into the static build
 * through Docusaurus customFields, so both local and deployed builds use the
 * same canonical auth API instead of accidentally calling the book itself.
 *
 * Because the book and the auth server live on different origins, the book
 * uses Better Auth's bearer flow. The token is persisted locally and sent as an
 * `Authorization: Bearer` header on every auth request.
 */

const configuredAuthUrl = siteConfig.customFields?.cloudopiaAuthUrl;
const AUTH_URL =
  typeof configuredAuthUrl === 'string' && configuredAuthUrl.trim()
    ? configuredAuthUrl
    : 'https://cloudopia.vercel.app';

export const BEARER_TOKEN_KEY = 'cloudopia_bearer_token';

export function getStoredToken(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.localStorage.getItem(BEARER_TOKEN_KEY) ?? '';
}

export function storeToken(token: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(BEARER_TOKEN_KEY, token);
}

export function clearStoredToken() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(BEARER_TOKEN_KEY);
}

export function storeSessionToken(data: unknown) {
  if (!data || typeof data !== 'object') {
    return;
  }

  const token = (data as { token?: unknown }).token;
  if (typeof token === 'string' && token) {
    storeToken(token);
  }
}

export const authClient = createAuthClient({
  baseURL: AUTH_URL,
  fetchOptions: {
    auth: {
      type: 'Bearer',
      token: getStoredToken,
    },
    onSuccess: (context) => {
      const token = context.response.headers.get('set-auth-token');
      if (token) {
        storeToken(token);
      } else {
        storeSessionToken(context.data);
      }
    },
    onError: (context) => {
      if (context.error.status === 401) {
        clearStoredToken();
      }
    },
  },
});

export const { useSession, signIn, signUp, signOut } = authClient;

export type Session = typeof authClient.$Infer.Session;
