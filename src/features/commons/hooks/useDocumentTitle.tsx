import { useEffect } from "react";

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    const text = title
      ? title[0].toUpperCase() + title.slice(1)
      : "My profile page | Apra-saputra";

    // Update document title
    document.title = text;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", text);

    // Canonical URL
    const canonicalUrl = "https://my-profile-apra-saputra.vercel.app";
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // Open Graph Tags
    const ogTags = {
      "og:title": text,
      "og:description": "A brief description of your page for social sharing.",
      // "og:image": "https://www.example.com/image.jpg",
      "og:url": canonicalUrl,
      "og:type": "website",
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content as string);
    });

    // Twitter Cards
    const twitterTags = {
      "twitter:card": "summary_large_image",
      "twitter:title": text,
      "twitter:description": "A brief description of your page for Twitter.",
      // "twitter:image": "https://www.example.com/image.jpg",
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content as string);
    });

    // Viewport for Mobile Devices
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.setAttribute("name", "viewport");
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=1");
  }, [title]);

  return null;
};

export default useDocumentTitle;
