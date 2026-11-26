import { memo } from 'react';
import Markdown, { type Components, type Options } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';
import { isBookId } from '@/utils/bookRecords';

const LIST_CLASS_NAME = 'flex flex-col gap-[12px] pl-[24px]';
const ID_PREFIX = 'user-content-';

const ALLOWED_ELEMENTS: (keyof Components)[] = [
  'a',
  'b',
  'br',
  'del',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'input',
  'li',
  'ol',
  'p',
  'pre',
  's',
  'section',
  'strong',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
];

const getMarkdownLinkHref = (href: string) => {
  if (href === '#') {
    return null;
  }

  if (href.startsWith('#')) {
    return `#${ID_PREFIX}${href.slice(1)}`;
  }

  if (!URL.canParse(href, process.env.OPEN_LIBRARY_URL)) {
    return null;
  }

  const linkUrl = new URL(href, process.env.OPEN_LIBRARY_URL);
  const [, section, bookId] = linkUrl.pathname.split('/');
  const isOpenLibraryLink = linkUrl.hostname === new URL(process.env.OPEN_LIBRARY_URL).hostname;
  const isBookLink = isOpenLibraryLink && section === 'works' && isBookId(bookId);

  return isBookLink ? ROUTES.book(bookId) : linkUrl.href;
};

const renderHeadingAsParagraph: Components['h1'] = ({ children, id }) => (
  <Typography className="font-semibold" id={id} variant="body">
    {children}
  </Typography>
);

const MARKDOWN_COMPONENTS: Components = {
  // eslint-disable-next-line id-length -- keys are HTML tag names
  a: ({ children, href, node: _node, ...anchorProps }) => {
    const linkHref = href ? getMarkdownLinkHref(href) : null;

    return linkHref ? (
      <Link {...anchorProps} href={linkHref} variant="inline">
        {children}
      </Link>
    ) : (
      children
    );
  },
  h1: renderHeadingAsParagraph,
  h2: renderHeadingAsParagraph,
  h3: renderHeadingAsParagraph,
  h4: renderHeadingAsParagraph,
  h5: renderHeadingAsParagraph,
  h6: renderHeadingAsParagraph,
  hr: () => <hr className="border-gray-light" />,
  img: ({ alt }) => alt,
  ol: ({ children }) => <ol className={`${LIST_CLASS_NAME} list-decimal`}>{children}</ol>,
  // eslint-disable-next-line id-length -- keys are HTML tag names
  p: ({ children, id }) => (
    <Typography id={id} variant="body">
      {children}
    </Typography>
  ),
  pre: ({ children }) => <Typography variant="body">{children}</Typography>,
  ul: ({ children }) => <ul className={`${LIST_CLASS_NAME} list-disc`}>{children}</ul>,
};

const Component: React.FC<Options> = ({
  components,
  rehypePlugins,
  remarkPlugins,
  ...markdownProps
}) => (
  <div className="flex flex-col gap-[12px]">
    <Markdown
      allowedElements={ALLOWED_ELEMENTS}
      components={{ ...MARKDOWN_COMPONENTS, ...components }}
      rehypePlugins={[
        rehypeRaw,
        [rehypeSanitize, { ...defaultSchema, clobberPrefix: ID_PREFIX }],
        ...(rehypePlugins ?? []),
      ]}
      remarkPlugins={[remarkBreaks, [remarkGfm, { singleTilde: false }], ...(remarkPlugins ?? [])]}
      remarkRehypeOptions={{ clobberPrefix: '' }}
      unwrapDisallowed
      {...markdownProps}
    />
  </div>
);

export const ReactMarkdown = memo(Component);
