import React, { useEffect, useRef } from 'react';
import { useSelected } from '../SelectedContext';
import About from './About';
import Projects from './About';

interface ContentScrollerProps {
  // Add any additional props if needed
}

const ContentScroller: React.FC<ContentScrollerProps> = () => {
  const { selected } = useSelected();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && selected) {
      const targetElement = contentRef.current.querySelector(`#${selected}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selected]);

  return (
    <div ref={contentRef} className="overflow-y-auto h-full">
      <section id="about">
        <About />
		<Projects />
      </section>
    </div>
  );
};

export default ContentScroller;
