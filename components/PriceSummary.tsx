interface PriceSummaryProps {
  selectedSeats: number[];
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ selectedSeats }) => {
  const totalPrice = selectedSeats.length * 1000;

  return (
    <div className="p-4 bg-bgColor rounded">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2">
          {selectedSeats.map((seat) => (
            <div key={seat} className="w-7 h-10 border border-gray-400 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-sm">{seat}</span>
            </div>
          ))}

        </div>
        <div className="">
          <div className="flex items-center justify-end space-x-1">
            <span className="text-sm mt-1">{selectedSeats.length}x</span>
            <div className="w-3 h-5 border border-gray-400 bg-yellow-400 rounded-lg"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{totalPrice} TL</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;