import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (val: string | number) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl bg-[#141416] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/20 text-left text-xs sm:text-sm text-white flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer focus:outline-none focus:border-[#D90302] ${
          isOpen ? 'border-[#D90302] ring-1 ring-[#D90302]/30 shadow-lg' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className={selectedOption ? 'text-zinc-100 font-medium' : 'text-zinc-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-[#D90302]' : ''
          }`}
        />
      </button>

      {/* Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl bg-[#121214] border border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl max-h-60 overflow-y-auto"
          >
            <div className="p-1 space-y-0.5">
              {options.map((option) => {
                const isSelected = String(option.value) === String(value);
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#D90302] text-white font-semibold'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

