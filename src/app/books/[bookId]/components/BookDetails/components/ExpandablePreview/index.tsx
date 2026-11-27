'use client';

import { clsx } from 'clsx';
import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';

import { Button } from '@/components/Button';

interface Props {
  children: React.ReactNode;
  collapsedClassName: string;
  collapseLabel: string;
  expandLabel: string;
}

const Component: React.FC<Props> = ({
  children,
  collapsedClassName,
  collapseLabel,
  expandLabel,
}) => {
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement || isExpanded) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      setIsOverflowing(contentElement.scrollHeight > contentElement.clientHeight);
    });

    resizeObserver.observe(contentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isExpanded]);

  const handleContentFocus = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleToggleClick = useCallback(() => {
    setIsExpanded((wasExpanded) => !wasExpanded);
  }, []);

  const isFaded = isOverflowing && !isExpanded;

  return (
    <div>
      <div
        className={clsx('relative', {
          'after:absolute after:inset-x-0 after:bottom-0 after:h-[48px] after:bg-linear-to-t after:from-white after:to-transparent':
            isFaded,
          [collapsedClassName]: !isExpanded,
          'overflow-hidden': !isExpanded,
        })}
        id={contentId}
        onFocusCapture={handleContentFocus}
        ref={contentRef}
      >
        {children}
      </div>
      {isOverflowing && (
        <Button
          aria-controls={contentId}
          aria-expanded={isExpanded}
          className="mt-[24px]"
          onClick={handleToggleClick}
          type="button"
          variant="outlined"
        >
          {isExpanded ? collapseLabel : expandLabel}
        </Button>
      )}
    </div>
  );
};

export const ExpandablePreview = memo(Component);
