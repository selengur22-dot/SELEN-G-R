export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createWhatsAppOrderLink(message: string, phone: string = '905320000000'): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  // If user entered 0532..., convert to 90532... for wa.me
  const internationalPhone = cleanPhone.startsWith('0') 
    ? `9${cleanPhone}` 
    : cleanPhone.startsWith('90') 
      ? cleanPhone 
      : `90${cleanPhone}`;
  return `https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('90')) {
    return `+90 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `+90 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }
  if (digits.length === 10) {
    return `+90 (${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  }
  return phone;
}

