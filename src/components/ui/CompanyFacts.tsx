import { companyFacts } from '@/config';

/** The business's identity details (who sells it, registration, GSTIN, address). Only filled-in facts are shown. */
export function CompanyFacts({ inline = false, className = '' }: { inline?: boolean; className?: string }) {
  const facts = companyFacts();
  if (inline) {
    // The name is already stated in the sentence beside it, so only the extra details (registration, GSTIN, address) go here.
    const extra = facts.filter((f) => f.label !== 'Sold by');
    return extra.length ? <p className={`company-facts company-facts--inline ${className}`.trim()}>{extra.map((f) => `${f.label}: ${f.value}`).join('  |  ')}</p> : null;
  }
  return (
    <dl className={`company-facts ${className}`.trim()}>
      {facts.map((f) => (<div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>))}
    </dl>
  );
}
