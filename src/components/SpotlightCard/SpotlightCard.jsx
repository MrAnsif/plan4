
const SpotlightCard = ({ children, className = "", }) => {
 return (
    <div
      className={`relative rounded-4xl bg-[#F5F4F1] overflow-hidden p-8  ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;