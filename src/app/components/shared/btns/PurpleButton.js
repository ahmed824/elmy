export default function PurpleButton({ label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="relative font-regular bg-gradient-to-r from-[#601596] via-[#A436F0] to-[#601596] text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <span className="inline-block transform transition-transform duration-300 group-hover:-translate-x-full">
          {label}
        </span>
        <span className="absolute top-0 right-0 transform translate-x-full transition-transform duration-300 group-hover:translate-x-0">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#601596] via-[#A436F0] via-white/20 via-[#A436F0] to-[#601596] opacity-80 hover:opacity-90 transition-opacity" />
    </button>
  );
}
