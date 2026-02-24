import { MessageCircle } from 'lucide-react';

const PHONE = '919557875108';
const MESSAGE = encodeURIComponent('Hello Arambhik Academy, I want information about classes.');
const LINK = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export const WhatsAppButton = () => {
  return (
    <a
      href={LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] wa-ping" />
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center wa-badge-pulse">
        <span className="text-[9px] font-bold text-white leading-none">1</span>
      </span>
      <MessageCircle className="h-7 w-7 text-white fill-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
    </a>
  );
};
