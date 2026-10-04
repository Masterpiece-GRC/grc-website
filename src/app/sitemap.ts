import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.masterpiecegrcconsulting.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.masterpiecegrcconsulting.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.masterpiecegrcconsulting.com/services', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: 'https://www.masterpiecegrcconsulting.com/why-masterpiece', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
     { url: 'https://www.masterpiecegrcconsulting.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ];
}