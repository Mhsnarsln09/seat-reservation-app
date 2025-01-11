import React, { useEffect, useState } from 'react';
import Seats from '@/components/Seats';
import PriceSummary from '@/components/PriceSummary';
import PassengerForm from '@/components/PassengerForm';
import Timer from '@/components/Timer'; // Timer bileşeni içe aktarımı

const Reservation = () => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [formValidations, setFormValidations] = useState([false, false, false]);
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [formsData, setFormsData] = useState<{ [key: number]: any }>({});
    const [timerActive, setTimerActive] = useState(false); // Timer kontrolü için state

    useEffect(() => {
        const storedSeats = sessionStorage.getItem('selectedSeats');
        const storedForms = sessionStorage.getItem('formsData');

        if (storedSeats) {
            setSelectedSeats(JSON.parse(storedSeats));
        }
        if (storedForms) {
            setFormsData(JSON.parse(storedForms));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        const isDeletedSeat = Object.keys(formsData).some((seat) => !selectedSeats.includes(+seat));
        if (isDeletedSeat) {
            const updatedForms = { ...formsData };
            Object.keys(updatedForms).forEach((seat) => {
                if (!selectedSeats.includes(+seat)) {
                    delete updatedForms[+seat];
                }
            });
            setFormsData(updatedForms);
        }

        if (selectedSeats.length > 0) {
            setTimerActive(true);
        } else {
            setTimerActive(false);
        }
    }, [selectedSeats]);

    useEffect(() => {
        sessionStorage.setItem('formsData', JSON.stringify(formsData));
    }, [formsData]);

    const handleFormDataChange = (index: number, data: any) => {
        setFormsData((prev) => ({ ...prev, [index]: data }));
    };

    const handleValidationUpdate = (index: number, isValid: boolean) => {
        const updatedValidations = [...formValidations];
        updatedValidations[index] = isValid;
        setFormValidations(updatedValidations);
    };

    const handleToggleForm = (index: number) => {
        if (activeFormIndex === index) {
            setActiveFormIndex(-1);
            return;
        }
        setActiveFormIndex(index);
    };

    const handleSeatReset = () => {
        setSelectedSeats([]);
        setTimerActive(false);
    };

    const allFormsValid = selectedSeats.every((_, index) => formValidations[index]);

    const handleSubmit = () => {
        alert('Rezervasyon tamamlandı!');
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <div className="flex flex-col md:flex-row space-y-6  p-6">
            <div className="w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Koltuk Seçimi</h1>
                <Seats selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
            </div>

            <div className="w-full md:w-1/2 space-y-6">
                {timerActive && <Timer resetSeats={handleSeatReset} />}
                <div className="space-y-4 w-[333px] xl:w-[500px]">
                    {selectedSeats.length ? selectedSeats.map((seat, index) => (
                        <PassengerForm
                            key={seat}
                            seatNumber={seat}
                            passengerNumber={index + 1}
                            index={index}
                            isActive={activeFormIndex === index}
                            onToggle={handleToggleForm}
                            onValidate={handleValidationUpdate}
                            initialData={formsData[seat] || {}}
                            onChange={handleFormDataChange}
                        />
                    )) : (
                        <div
                        className="bg-bgColor px-4 py-2 cursor-pointer flex justify-between items-center"
                    >
                        <h3 className="text-lg font-semibold">Yolcu 1</h3>
                        <span>+</span>
                    </div>
                    )}
                </div>
                <button
                    className={`bg-blue-500 text-white py-2 px-4 rounded w-[333px] xl:w-[500px] ${!allFormsValid || selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    onClick={handleSubmit}
                    disabled={!allFormsValid || selectedSeats.length === 0}
                >
                    İşlemleri Tamamla
                </button>
                <div className="w-[333px] xl:w-[500px]">
                    <PriceSummary selectedSeats={selectedSeats} />
                </div>
            </div>
        </div>
    );
};

export default Reservation;
