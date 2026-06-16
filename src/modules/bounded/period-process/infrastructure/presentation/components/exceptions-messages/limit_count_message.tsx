interface LimitCountMessageProps {
    isSumExceeding: boolean;
    currentEditableTotal: number;
}

export const LimitCountMessage = ({ isSumExceeding, currentEditableTotal }: LimitCountMessageProps) => {
    const formattedTotal = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(currentEditableTotal);
    return (
        <div style={{ color: isSumExceeding ? 'red' : 'inherit', fontSize: '14px', marginBottom: '10px' }}>
            Suma modificada: {formattedTotal} 
            {isSumExceeding && ' (Los periodos superan el monto objetivo)'}
        </div>
    )
}
