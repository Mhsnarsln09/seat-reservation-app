import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { toast } from 'react-toastify';

interface TimerProps {
  resetSeats: () => void;
}

const Timer: React.FC<TimerProps> = ({ resetSeats }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTimer, setModalTimer] = useState(3);


  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseMoving(true);
      if (!isModalOpen) setTimeLeft(30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isModalOpen]);


  useEffect(() => {
    if (timeLeft <= 0 && !isModalOpen) {
      setIsModalOpen(true);
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
    if (isMouseMoving) {
      setIsMouseMoving(false);
    }
  }, [isMouseMoving]);


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
    setTimeLeft(30);
    setModalTimer(5);
    toast.success('İşleme devam ediliyor!');
  };

  return (
    <>
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
