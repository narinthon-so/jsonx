import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({ 
  title = 'JSON Validator & Formatter - PWA', 
  description = 'A modern, privacy-focused JSON Validator, Formatter, and Minifier. Works offline as a PWA.',
  keywords = 'json validator, json formatter, json minify, pwa, offline json tools, developer tools',
  image = '/og-image.png',
  url = import.meta.env.VITE_APP_URL || 'https://jsonx.zylonode.com'
}: SEOProps) => {
  const fullTitle = title.includes('JSON Validator') ? title : `${title} | JSON Validator`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data per AI Search Best Practices */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": fullTitle,
          "description": description,
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "permissions": "offline-capable",
          "url": url,
          "image": image,
          "author": {
            "@type": "Organization",
            "name": "ZyloNode",
            "url": "https://zylonode.com"
          }
        })}
      </script>
    </Helmet>
  );
};
