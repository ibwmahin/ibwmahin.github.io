import { useEffect } from 'react';

export const useKeyboardShortcut = (
  keys: string[],
  callback: () => void,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = event.ctrlKey || event.metaKey;
      const keyPressed = event.key.toLowerCase();
      
      if (keys.includes('mod') && isModifierPressed && keys.includes(keyPressed)) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};