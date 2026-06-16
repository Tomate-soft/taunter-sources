export const getDayNumber = (dateStr: string) => {
    if (!dateStr) return null;
    
    // Split by common delimiters: -, /, space, or T (ISO)
    const parts = dateStr.split(/[-/ T]/);
    
    // Pattern 1: YYYY-MM-DD...
    if (parts[0] && parts[0].length === 4) {
      return parts[2] ? parts[2].padStart(2, '0') : null;
    }
    
    // Pattern 2: DD/MM/YYYY...
    if (parts[2] && parts[2].length === 4) {
      return parts[0] ? parts[0].padStart(2, '0') : null;
    }

    // Fallback: Use JS Date if it's a valid format
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.getDate().toString().padStart(2, '0');
    }
    
    return null;
  };


  