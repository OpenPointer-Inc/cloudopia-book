import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  clearStoredToken,
  signIn,
  signOut,
  signUp,
  storeSessionToken,
  useSession,
} from '../lib/auth-client';
import styles from './AuthButton.module.css';

type Mode = 'signin' | 'signup';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function AuthMenu({ email, name }: { email: string; name: string }) {
  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      clearStoredToken();
    }
  };

  return (
    <details className={styles.userMenu}>
      <summary className={styles.userChip} title={email}>
        <span className={styles.avatar}>{initials(name || email)}</span>
        <span className={styles.userName}>{name || email}</span>
        <span className={styles.caret} aria-hidden="true" />
      </summary>
      <div className={styles.dropdown}>
        <p className={styles.dropdownEmail}>{email}</p>
        <button type="button" className={styles.signOutBtn} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </details>
  );
}

export default function AuthModal() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        const { data: signUpData, error: signUpError } = await signUp.email({
          email,
          password,
          name: name || email.split('@')[0],
        });
        if (signUpError) {
          setError(signUpError.message ?? 'Could not create your account.');
          return;
        }
        storeSessionToken(signUpData);
      } else {
        const { data: signInData, error: signInError } = await signIn.email({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message ?? 'Could not sign you in.');
          return;
        }
        storeSessionToken(signInData);
      }
      close();
    } catch {
      setError(
        'Could not reach the Cloudopia auth server. Please try again in a moment.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return <span className={styles.skeleton} aria-hidden="true" />;
  }

  const user = session?.user;

  if (user) {
    return <AuthMenu email={user.email} name={user.name ?? ''} />;
  }

  return (
    <>
      <button type="button" className={styles.signInBtn} onClick={() => setOpen(true)}>
        Sign in
      </button>
      {open && createPortal(
        <div className={styles.overlay} onClick={close}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={mode === 'signin' ? 'Sign in to Cloudopia' : 'Create a Cloudopia account'}
            onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.closeBtn} aria-label="Close" onClick={close}>
              &times;
            </button>
            <p className={styles.brand}>CLOUDOPIA</p>
            <h2 className={styles.title}>
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className={styles.subtitle}>
              One account for the Cloudopia portal and this book — track XP,
              badges, and your place on the leaderboard.
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <label className={styles.label}>
                  Name
                  <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                  />
                </label>
              )}
              <label className={styles.label}>
                Email
                <input
                  className={styles.input}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className={styles.label}>
                Password
                <input
                  className={styles.input}
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                />
              </label>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting
                  ? 'Please wait…'
                  : mode === 'signin'
                    ? 'Sign in'
                    : 'Create account'}
              </button>
            </form>
            <p className={styles.switchText}>
              {mode === 'signin' ? (
                <>
                  New to Cloudopia?{' '}
                  <button type="button" className={styles.switchBtn} onClick={() => switchMode('signup')}>
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" className={styles.switchBtn} onClick={() => switchMode('signin')}>
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
