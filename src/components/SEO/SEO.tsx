import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  name: string;
  type: string;
  themeColor: string;
  image?: string;
  url?: string;
};

export function SEO({
  title,
  description,
  name,
  type,
  themeColor,
  image = 'https://art0tod.github.io/preview.png',
  url = 'https://art0tod.github.io'
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />

      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta name='theme-color' content={themeColor} />
      <link rel='canonical' href={url} />
      <link rel='icon' href='/favicon.ico' />
      <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: name,
          url: url,
          sameAs: ['https://github.com/art0tod', 'https://t.me/art0tod']
        })}
      </script>
    </Helmet>
  );
}
