import { Check } from '@/components/art/Icons';

interface Props {
  title: string;
  mailto: string;
  email: string;
  onReset: () => void;
}

export function FormSuccess({ title, mailto, email, onReset }: Props) {
  return (
    <div className="form-success" role="status">
      <div className="form-success__icon"><Check size={28} /></div>
      <h2 className="h-sub">{title}</h2>
      <p>
        Your email app should now be open with your message ready to send to {email}. Nothing has been sent or stored by this website
        until you press send.
      </p>
      <p>
        Nothing opened? <a href={mailto} style={{ textDecoration: 'underline' }}>Open the email again</a> or write to us directly at {email}.
      </p>
      <button type="button" className="btn btn--outline-dark btn--sm" onClick={onReset}>Start over</button>
    </div>
  );
}
