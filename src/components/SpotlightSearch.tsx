import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Code, User, Briefcase } from 'lucide-react';
import { SearchItem } from '../types';
import { projects } from '../data/portfolio';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpotlightSearch: React.FC<SpotlightSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItems: SearchItem[] = [
    { id: 'about', title: 'About Me', description: 'Learn about my background and experience', type: 'section', href: '#about' },
    { id: 'skills', title: 'Skills & Technologies', description: 'View my technical expertise', type: 'section', href: '#skills' },
    { id: 'projects', title: 'Featured Projects', description: 'Explore my latest work', type: 'section', href: '#projects' },
    { id: 'contact', title: 'Contact Me', description: 'Get in touch for opportunities', type: 'section', href: '#contact' },
    ...projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      type: 'project' as const,
      href: `#project-${project.id}`
    }))
  ];

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleItemClick(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleItemClick = (item: SearchItem) => {
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'section': return <User className="w-4 h-4" />;
      case 'project': return <Code className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full mt-40 max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-6 py-4 border-b border-gray-200/50">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search portfolio..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg"
              />
              <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                ESC
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-orange-50 border-r-2 border-orange-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className={`p-2 rounded-lg mr-4 ${
                      index === selectedIndex ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ))
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-200/50 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <kbd className="bg-white border border-gray-200 rounded px-1 mr-1">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center">
                  <kbd className="bg-white border border-gray-200 rounded px-1 mr-1">↵</kbd>
                  Select
                </span>
              </div>
              <span>Powered by ⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpotlightSearch;
