import React, { useState, useEffect } from 'react';
import '../styles/Seat.css';

interface Seat {
  id: number;
  status: 'empty' | 'selected' | 'occupied';
  name?: string;
  surname?: string;
}

interface SeatsProps {
  selectedSeats: number[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>;
}

const Seats: React.FC<SeatsProps> = ({ selectedSeats, setSelectedSeats }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<number | null>(null);

  useEffect(() => {
    const fetchSeatData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      const initialSeats: Seat[] = Array.from({ length: 76 }, (_, i) => ({
        id: i + 1,
        status: i < 10 ? 'occupied' : 'empty', 
        ...(i < 10 && users[i] ? { name: users[i]?.name.split(' ')[0], surname: users[i]?.name.split(' ')[1] } : {}),
      }));
      setSeats(initialSeats);
    };

    fetchSeatData();
  }, []);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') {
      alert('Bu koltuk dolu!');
      return;
    }
    if (selectedSeats.length >= 3 && !selectedSeats.includes(seat.id)) {
      alert('En fazla 3 koltuk seçebilirsiniz!');
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : [...prev, seat.id]
    );
  };

  const renderSeatRow = (rowSeats: Seat[], rowIndex:number) => {
    return (
      <div className="flex justify-center space-x-[1.25rem]" key={rowIndex}>
        {/* Sol Grup */}
        <div className="grid grid-cols-2 gap-2">
          {rowSeats.slice(0, 2).map((seat) => (
            <div
              key={seat.id}
              className={`relative w-3 h-5 rounded-lg flex items-center justify-center text-sm ${
                seat.status === 'occupied'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : selectedSeats.includes(seat.id)
                  ? 'bg-yellow-400'
                  : 'bg-white'
              } border border-gray-600 cursor-pointer`}
              onClick={() => handleSeatClick(seat)}
              onMouseEnter={() => seat.status === 'occupied' && setHoveredSeat(seat.id)}
              onMouseLeave={() => setHoveredSeat(null)}
            >
              {hoveredSeat === seat.id && seat.status === 'occupied' && seat.name && seat.surname && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded shadow"
                  style={{ zIndex: 10 }}
                >
                  {seat.name} {seat.surname}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Sağ Grup */}
        <div className="grid grid-cols-2 gap-2">
          {rowSeats.slice(2, 4).map((seat) => (
            <div
              key={seat.id}
              className={`relative w-3 h-5 rounded-lg flex items-center justify-center text-sm ${
                seat.status === 'occupied'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : selectedSeats.includes(seat.id)
                  ? 'bg-yellow-400'
                  : 'bg-white'
              } border border-gray-600 cursor-pointer`}
              onClick={() => handleSeatClick(seat)}
              onMouseEnter={() => seat.status === 'occupied' && setHoveredSeat(seat.id)}
              onMouseLeave={() => setHoveredSeat(null)}
            >
              {hoveredSeat === seat.id && seat.status === 'occupied' && seat.name && seat.surname && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded shadow"
                  style={{ zIndex: 10 }}
                >
                  {seat.name} {seat.surname}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-1 seats-container">
      {Array.from({ length: 19 }, (_, rowIndex) =>
        renderSeatRow(seats.slice(rowIndex * 4, rowIndex * 4 + 4), rowIndex)
      )}
    </div>
  );
};

export default Seats;
