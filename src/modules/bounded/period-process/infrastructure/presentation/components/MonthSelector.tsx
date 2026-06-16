import { useMemo } from 'react';
import styles from './MonthSelector.module.css';

interface MonthSelectorProps {
  value: string;
  onChange: (month: string) => void;
}

export const MonthSelector = ({ value, onChange }: MonthSelectorProps) => {
  const months = useMemo(() => {
    const now = new Date();
    const monthsList = [];

    for (let i = 0; i < 36; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      if (date.getFullYear() < 2024 || (date.getFullYear() === 2024 && date.getMonth() < 3)) {
        break;
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const monthLabel = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

      monthsList.push({
        value: `${year}-${month}`,
        label: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
      });
    }
    return monthsList;
  }, []);

  return (
    <div className={styles.selectorContainer}>
      <label htmlFor="month">Mes de operación:</label>
      <select 
        id="month" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Seleccion" disabled>Selecciona un mes</option>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};
