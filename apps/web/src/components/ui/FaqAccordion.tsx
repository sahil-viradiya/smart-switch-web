'use client';

import { useState } from 'react';

export interface FaqItem {
  id: string;
  category: 'WIRING' | 'INSTALLATION' | 'CONNECTIVITY' | 'WARRANTY';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'WIRING',
    question: 'Does the Smart Switch require a neutral wire in the wall box?',
    answer:
      'Yes. Standard Smart Switch models require a dedicated neutral wire (N) to maintain constant micro-controller power and active micro-relay actuation. If your home was wired before neutral wires were mandated in wall switches, a qualified electrician should inspect your conduit or gang boxes prior to installation.',
  },
  {
    id: 'faq-2',
    category: 'INSTALLATION',
    question: 'Can I install Smart Switch myself or do I need an electrician?',
    answer:
      'For your safety and to comply with local and national electrical codes, Smart Switch must always be installed by a certified, licensed electrical contractor. High-voltage alternating current (110V–240V AC) poses significant fire and electrocution hazards if mishandled.',
  },
  {
    id: 'faq-3',
    category: 'CONNECTIVITY',
    question: 'Does the switch continue to work physically if my Wi-Fi or Internet disconnects?',
    answer:
      'Yes, 100%. Smart Switch is engineered with an isolated local hardware relay circuit. Physical actuation of the mechanical rocker triggers an immediate, silent relay switch independently of any internet connection, cloud broker, or router availability.',
  },
  {
    id: 'faq-4',
    category: 'WIRING',
    question: 'What is the maximum electrical load supported per gang?',
    answer:
      'The Smart Switch is rated for up to 10A resistive load (such as incandescent or halogen lighting) and 5A inductive/capacitive load (such as high-efficiency LED drivers, ceiling fans, or ballast circuits) per gang at 110V–240V AC, 50/60Hz.',
  },
  {
    id: 'faq-5',
    category: 'CONNECTIVITY',
    question: 'What smart-home platforms and protocols are supported?',
    answer:
      'Smart Switch hardware incorporates an open architecture designed for cross-platform smart home compatibility. Firmware is engineered to support standard open connectivity standards (such as Matter over Wi-Fi and Bluetooth LE for zero-configuration commissioning). Regional SKU specifications outline confirmed native certifications.',
  },
  {
    id: 'faq-6',
    category: 'WARRANTY',
    question: 'What warranty is provided with the Smart Switch?',
    answer:
      'Every Smart Switch unit includes a standard 24-month manufacturer warranty covering component integrity, mechanical switch endurance, and electrical protection circuits when installed by a certified electrician.',
  },
  {
    id: 'faq-7',
    category: 'INSTALLATION',
    question: 'What wall box depths are required for flush mounting?',
    answer:
      'The back-casing requires a minimum wall-box depth of 35mm (standard in most modern construction). For multi-gang boxes with extensive terminal splice caps, a 47mm deep back-box is recommended for optimal thermal dissipation and wire bending radius.',
  },
];

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // First question open by default
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Category Tabs & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'All Questions' },
            { id: 'WIRING', label: 'Electrical & Wiring' },
            { id: 'INSTALLATION', label: 'Installation Safety' },
            { id: 'CONNECTIVITY', label: 'Network & Connectivity' },
            { id: 'WARRANTY', label: 'Warranty & Support' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                background: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: activeCategory === cat.id ? '#042116' : 'var(--text-secondary)',
                borderColor: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--border-subtle)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ minWidth: '240px' }}>
          <input
            type="search"
            className="form-input"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '8px 14px', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <p className="text-body">No matching questions found. Please adjust your search or contact our technical team directly.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid',
                  borderColor: isOpen ? 'var(--border-glow)' : 'var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${item.id}`}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.question}</span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-elevated)',
                      color: isOpen ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-normal)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`answer-${item.id}`}
                    style={{
                      padding: '0 24px 20px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '16px',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
