import Image, { type StaticImageData } from 'next/image';
import { memo } from 'react';
import { Toaster as SonnerToaster } from 'sonner';

import errorCircleIcon from '@/assets/icons/error-circle.svg';
import successCircleIcon from '@/assets/icons/success-circle.svg';

const ICON_CLASS_NAME = 'size-[20px]';

const Component: React.FC = () => (
  <SonnerToaster
    className="z-4! font-[inherit]!"
    closeButton
    duration={5000}
    gap={12}
    icons={{
      close: 'Dismiss',
      error: (
        <Image alt="Error" className={ICON_CLASS_NAME} src={errorCircleIcon as StaticImageData} />
      ),
      success: (
        <Image
          alt="Success"
          className={ICON_CLASS_NAME}
          src={successCircleIcon as StaticImageData}
        />
      ),
    }}
    offset={16}
    position="bottom-right"
    toastOptions={{
      classNames: {
        closeButton:
          'order-last h-[36px] rounded-[8px] px-[16px] text-body whitespace-nowrap transition-colors hover:bg-gray-light',
        error: 'border-error',
        success: 'border-success',
        title: 'text-subtitle',
        toast:
          'flex items-center gap-[12px] rounded-[8px] border bg-white p-[8px_16px] shadow-raised',
      },
      closeButtonAriaLabel: 'Dismiss',
      unstyled: true,
    }}
  />
);

export const Toaster = memo(Component);
