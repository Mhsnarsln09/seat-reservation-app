import React, { useState, useEffect } from 'react';

interface PassengerFormProps {
  passengerNumber: number;
  index: number;
  seatNumber: number;
  isActive: boolean;
  initialData: any;
  onValidate: (index: number, isValid: boolean) => void;
  onToggle: (index: number) => void;
  onChange: (index: number, data: any) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  passengerNumber,
  index,
  seatNumber,
  isActive,
  onValidate,
  onToggle,
  onChange,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
    ...initialData,
  });

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    surname: false,
    phone: false,
    email: false,
    birthDate: false,
    gender: false,
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const FieldLabels = (field: string) => {
    switch (field) {
      case 'name':
        return 'İsim';
      case 'surname':
        return 'Soyisim';
      case 'phone':
        return 'Telefon';
      case 'email':
        return 'E-posta';
      case 'birthDate':
        return 'Doğum Tarihi';
      case 'gender':
        return 'Cinsiyet';
      default:
        return '';
    }
  };

  const validateField = (field: string, value: string) => {
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
      return `${FieldLabels(field)} gereklidir.`;
    }
    return '';
  };

  const validateForm = (data: typeof formData) => {
    const errors = {
      name: validateField('name', data.name),
      surname: validateField('surname', data.surname),
      phone: validateField('phone', data.phone),
      email: validateField('email', data.email),
      birthDate: validateField('birthDate', data.birthDate),
      gender: validateField('gender', data.gender),
    };

    setValidationErrors(errors);

    const isValid = Object.values(errors).every((error) => !error);
    onValidate(index, isValid);
    return isValid;
  };

  const handleChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    validateForm(updatedData);
    onChange(seatNumber, updatedData);
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    handleChange(field, formData[field as keyof typeof formData]);
  };

  return (
    <div className="border border-gray-300 rounded bg-white mb-4">
      <div
        className="bg-bgColor px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => onToggle(index)}
      >
        <h3 className="text-lg font-semibold">Yolcu {passengerNumber}</h3>
        <span>{isActive ? '-' : '+'}</span>
      </div>
      {isActive && (
        <div className="p-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
          {['name', 'surname', 'phone', 'email', 'birthDate'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {FieldLabels(field)}
              </label>
              <input
                id={field}
                type={field === 'birthDate' ? 'date' : field === 'email' ? 'email' : 'text'}
                placeholder={FieldLabels(field)}
                value={formData[field as keyof typeof formData]}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
                max={field === 'birthDate' ? today : undefined}
                className={`w-full border p-2 rounded ${touchedFields[field as keyof typeof touchedFields] &&
                    validationErrors[field as keyof typeof validationErrors]
                    ? 'border-red-500'
                    : ''
                  }`}
              />
              {touchedFields[field as keyof typeof touchedFields] &&
                validationErrors[field as keyof typeof validationErrors] && (
                  <p className="text-red-500 text-sm">
                    {validationErrors[field as keyof typeof validationErrors]}
                  </p>
                )}
            </div>
          ))}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              {FieldLabels('gender')}
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              onBlur={() => handleBlur('gender')}
              className={`w-full border p-2 rounded ${touchedFields.gender && validationErrors.gender ? 'border-red-500' : ''
                }`}
            >
              <option value="">Seçiniz</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
            {touchedFields.gender && validationErrors.gender && (
              <p className="text-red-500 text-sm">{validationErrors.gender}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerForm;
