interface PriceSummaryProps {
    selectedSeats: number[];
  }
  
  const PriceSummary: React.FC<PriceSummaryProps> = ({ selectedSeats }) => {
    const totalPrice = selectedSeats.length * 1000;
  
    return (
      <div className="p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-bold">Toplam Fiyat: {totalPrice} TL</h2>
      </div>
    );
  };
  
  export default PriceSummary;
  