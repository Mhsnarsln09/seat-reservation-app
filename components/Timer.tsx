import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal';

interface TimerProps {
  resetSeats: () => void;
}

const Timer: React.FC<TimerProps> = ({ resetSeats }) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTimer, setModalTimer] = useState(3);


  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseMoving(true);
      if (!isModalOpen) setTimeLeft(3);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isModalOpen]);


  useEffect(() => {
    if (timeLeft <= 0 && !isModalOpen) {
      setIsModalOpen(true); // Modalı aç
      return;
    }

    if (!isMouseMoving && !isModalOpen) {
      const timeout = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft, isMouseMoving, isModalOpen]);


  useEffect(() => {
    if (isModalOpen) {
      if (modalTimer <= 0) {
        resetSeats();
        window.location.reload();
        return;
      }

      const modalTimeout = setTimeout(() => {
        setModalTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(modalTimeout);
    }
  }, [modalTimer, isModalOpen, resetSeats]);

  const handleConfirm = () => {
    setIsModalOpen(false);
    setTimeLeft(3);
    setModalTimer(3);
  };

  return (
    <>
    <div>kalan süre:{timeLeft}</div>
      {isModalOpen && (
        <Modal
          message="İşleme devam etmek istiyor musunuz?"
          onConfirm={handleConfirm}
          onCancel={() => {
            resetSeats();
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default Timer;
