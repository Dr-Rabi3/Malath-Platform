function HomeInfo({ className }) {
  return (
    <div className={`flex gap-5 h-fit rounded-lg p-6 ${className}`}>
      <div className="border-l-[4px] border-brand-600 pl-4 text-white">
        <h2>02</h2>
        <h5>Project Supervision</h5>
      </div>
      <div className="border-l-[4px] border-brand-600 pl-4 text-white">
        <h2>03</h2>
        <h5>Real Estate Marketing</h5>
      </div>
      <div className="border-l-[4px] border-brand-600 pl-4 text-white">
        <h2>02</h2>
        <h5>Marketing Services</h5>
      </div>
    </div>
  );
}

export default HomeInfo;
