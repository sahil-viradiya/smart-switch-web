import type { ReactNode } from 'react';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: (aria: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode;
}

export function Field({ id, label, error, optional, children }: FieldProps) {
  const errId = `${id}-err`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">(optional)</span>}
      </label>
      {children({ id, 'aria-invalid': !!error, 'aria-describedby': error ? errId : undefined })}
      {error && <p className="field__error" id={errId}>{error}</p>}
    </div>
  );
}
