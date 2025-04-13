import React, { useEffect, useState } from 'react';
import styles from '@/pages/Rules/Rules.module.scss';

export const Rules = () => {
  const [rules, setData] = useState([]);
  function getRules() {
    fetch('http://localhost:3005/rules')
      .then(res => {
        return res.json();
      })
      .then(val => {
        setData(val);
      });
  }

  function showRules() {
    getRules();
    return (
      <ol>
        {rules.map((rules, index) => (
          <li key={index}>{rules}</li>
        ))}
      </ol>
    );
  }

  return (
    <body>
      <div className={styles.Rules}>
        <h1>Flagrant Fowl Futbol Association Rules and Regulation</h1>
        <p>{showRules()}</p>
      </div>
    </body>
  );
};
