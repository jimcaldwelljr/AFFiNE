import { Scrollable } from '@affine/component';
import clsx from 'clsx';
import { type CSSProperties, forwardRef, memo } from 'react';
import type { ScrollSeekPlaceholderProps, VirtuosoProps } from 'react-virtuoso';

import * as styles from './styles.css';

export type PDFVirtuosoContext = {
  width: number;
  height: number;
  pageClassName?: string;
  onPageSelect?: (index: number) => void;
};

export type PDFVirtuosoProps = VirtuosoProps<unknown, PDFVirtuosoContext>;

export const Scroller = forwardRef<HTMLDivElement, PDFVirtuosoProps>(
  ({ context: _, ...props }, ref) => {
    return (
      <Scrollable.Root>
        <Scrollable.Viewport ref={ref} {...props} />
        <Scrollable.Scrollbar />
      </Scrollable.Root>
    );
  }
);

Scroller.displayName = 'pdf-virtuoso-scroller';

export const ScrollSeekPlaceholder = forwardRef<
  HTMLDivElement,
  ScrollSeekPlaceholderProps & {
    context?: PDFVirtuosoContext;
  }
>(({ context }, ref) => {
  const className = context?.pageClassName;
  const width = context?.width ?? 537;
  const height = context?.height ?? 759;
  const style = { width, aspectRatio: `${width} / ${height}` };

  return (
    <div className={className} style={style} ref={ref}>
      <LoadingSvg />
    </div>
  );
});

ScrollSeekPlaceholder.displayName = 'pdf-virtuoso-scroll-seek-placeholder';

export const List = forwardRef<HTMLDivElement, PDFVirtuosoProps>(
  ({ context: _, className, ...props }, ref) => {
    return (
      <div
        className={clsx([styles.virtuosoList, className])}
        ref={ref}
        {...props}
      />
    );
  }
);

List.displayName = 'pdf-virtuoso-list';

export const ListWithSmallGap = forwardRef<HTMLDivElement, PDFVirtuosoProps>(
  ({ context: _, className, ...props }, ref) => {
    return (
      <List className={clsx([className, 'small-gap'])} ref={ref} {...props} />
    );
  }
);

ListWithSmallGap.displayName = 'pdf-virtuoso-small-gap-list';

export const Item = forwardRef<HTMLDivElement, PDFVirtuosoProps>(
  ({ context: _, ...props }, ref) => {
    return <div className={styles.virtuosoItem} ref={ref} {...props} />;
  }
);

Item.displayName = 'pdf-virtuoso-item';

export const ListPadding = () => (
  <div style={{ width: '100%', height: '20px' }} />
);

export const LoadingSvg = memo(
  ({ className, style }: { className?: string; style?: CSSProperties }) => {
    return (
      <svg
        className={clsx([styles.pdfLoading, className])}
        style={style}
        width="16"
        height="24"
        viewBox="0 0 537 759"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        fillOpacity="0.07"
      >
        <rect x="32" y="82" width="361" height="30" rx="4" />
        <rect x="32" y="142" width="444" height="30" rx="4" />
        <rect x="32" y="202" width="387" height="30" rx="4" />
        <rect x="32" y="262" width="461" height="30" rx="4" />
        <rect x="32" y="322" width="282" height="30" rx="4" />
        <rect x="32" y="382" width="361" height="30" rx="4" />
        <rect x="32" y="442" width="444" height="30" rx="4" />
        <rect x="32" y="502" width="240" height="30" rx="4" />
        <rect x="32" y="562" width="201" height="30" rx="4" />
        <rect x="32" y="622" width="224" height="30" rx="4" />
        <rect x="314" y="502" width="191" height="166" rx="4" />
      </svg>
    );
  }
);

LoadingSvg.displayName = 'pdf-loading';
