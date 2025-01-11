import React, { useState } from 'react';
import { validateFormField, FIELD_LABELS } from '@/utils/formValidation';

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

    const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleBlur = (field: string) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
        validateField(field, formData[field as keyof typeof formData]);
    };

    const validateField = (field: string, value: string) => {
        const error = validateFormField(field, value);
        setValidationErrors((prev) => ({ ...prev, [field]: error }));
        onValidate(index, !Object.values({ ...validationErrors, [field]: error }).some((e) => e));
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
        onChange(seatNumber, { ...formData, [field]: value });
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
                                {FIELD_LABELS[field]}
                            </label>
                            <input
                                id={field}
                                type={field === 'birthDate' ? 'date' : field === 'email' ? 'email' : 'text'}
                                placeholder={FIELD_LABELS[field]}
                                value={formData[field as keyof typeof formData]}
                                onChange={(e) => handleChange(field, e.target.value)}
                                onBlur={() => handleBlur(field)}
                                className={`w-full border p-2 rounded ${
                                    touchedFields[field] && validationErrors[field] ? 'border-red-500' : ''
                                }`}
                            />
                            {touchedFields[field] && validationErrors[field] && (
                                <p className="text-red-500 text-sm">{validationErrors[field]}</p>
                            )}
                        </div>
                    ))}

                    {/* Gender Select */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            {FIELD_LABELS['gender']}
                        </label>
                        <select
                            id="gender"
                            value={formData.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                            onBlur={() => handleBlur('gender')}
                            className={`w-full border p-2 rounded ${
                                touchedFields.gender && validationErrors.gender ? 'border-red-500' : ''
                            }`}
                        >
                            <option value="">Seçiniz</option>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                            <option value="other">Diğer</option>
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
