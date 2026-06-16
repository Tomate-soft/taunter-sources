import { useState, ChangeEvent, FocusEvent, CSSProperties } from 'react';

interface CurrencyInputProps {
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    style?: CSSProperties;
    className?: string;
}

export default function CurrencyInput({ value, onChange, placeholder, style, className }: CurrencyInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    // Para no interferir al escribir el punto decimal en vivo, guardamos el raw value temporalmente mientras está enfocado
    const [tempValue, setTempValue] = useState('');

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setTempValue(value ? value.toString() : '');
        // Opcional: Seleccionar el texto al darle click
        setTimeout(() => e.target.select(), 0);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setTempValue('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawString = e.target.value;
        setTempValue(rawString);

        if (rawString === '') {
            onChange(0);
            return;
        }

        const parsed = parseFloat(rawString);
        if (!isNaN(parsed)) {
            onChange(parsed);
        }
    };

    const formatCurrency = (val: number) => 
        new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

    const displayValue = isFocused ? tempValue : formatCurrency(value || 0);

    return (
        <input
            type={isFocused ? "number" : "text"}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            style={style}
            className={className || "input-elevated"}
        />
    );
}