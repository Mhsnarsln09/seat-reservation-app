export const FIELD_LABELS: Record<string, string> = {
    name: 'İsim',
    surname: 'Soyisim',
    phone: 'Telefon',
    email: 'E-posta',
    birthDate: 'Doğum Tarihi',
    gender: 'Cinsiyet',
};

export const validateFormField = (field: string, value: string): string => {
    if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'E-posta adresi gereklidir.';
        if (!emailRegex.test(value)) return 'Geçerli bir e-posta adresi girin.';
        return '';
    }

    if (field === 'phone') {
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!value.trim()) return 'Telefon numarası gereklidir.';
        if (!phoneRegex.test(value)) return 'Geçerli bir telefon numarası girin.';
        return '';
    }

    if (field === 'gender') {
        if (!value) return 'Cinsiyet seçilmesi gereklidir.';
        return '';
    }

    if (!value.trim()) {
        return `${FIELD_LABELS[field]} gereklidir.`;
    }

    return '';
};