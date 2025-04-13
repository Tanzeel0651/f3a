import React, { useState } from 'react';
import styles from '@/pages/Rulesform/Rulesform.module.scss';

export const Rulesform = () => {
  const [rule, setRule] = useState<string>(''); // Specify the type as 'string'
  const [rulesList, setRulesList] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rule }),
      });

      if (response.ok) {
        setRulesList([...rulesList, rule]);
        setRule('');
      } else {
        console.error('Failed to add rule');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.Rulesform}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={rule} onChange={e => setRule(e.target.value)} placeholder="Add a rule" />
        <button type="submit">Add Rule</button>
      </form>

      <ul>
        {rulesList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
