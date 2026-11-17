import React, { createContext, useContext, useState } from 'react';

interface CallModalContextType {
  isOpen: boolean;
  selectedDish: string | null;
  openCallModal: (dishName?: string) => void;
  closeCallModal: () => void;
}

const CallModalContext = createContext<CallModalContextType | null>(null);

export const CallModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);

  const openCallModal = (dishName?: string) => {
    setSelectedDish(dishName || null);
    setIsOpen(true);
  };

  const closeCallModal = () => {
    setIsOpen(false);
    setSelectedDish(null);
  };

  return (
    <CallModalContext.Provider value={{ isOpen, selectedDish, openCallModal, closeCallModal }}>
      {children}
    </CallModalContext.Provider>
  );
};

export const useCallModal = (): CallModalContextType => {
  const ctx = useContext(CallModalContext);
  if (!ctx) {
    throw new Error('useCallModal must be used within a CallModalProvider');
  }
  return ctx;
};
