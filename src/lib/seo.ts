export const SITE_NAME = '読書 with Coco';

type BreadcrumbItem = {
  name: string;
  url: string;
};

type ReviewSchemaInput = {
  url: string;
  title: string;
  description: string;
  datePublished: Date;
  dateModified?: Date;
  image?: string | null;
  bookTitle?: string;
  author?: string;
};

type CollectionItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildReviewJsonLd(input: ReviewSchemaInput) {
  const itemReviewed = input.bookTitle
    ? {
        '@type': 'Book',
        name: input.bookTitle,
        author: input.author ? { '@type': 'Person', name: input.author } : undefined,
      }
    : undefined;

  return {
    '@type': 'Review',
    name: input.title,
    description: input.description,
    url: input.url,
    image: input.image || undefined,
    datePublished: input.datePublished.toISOString(),
    dateModified: input.dateModified?.toISOString(),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    itemReviewed,
  };
}

export function buildCollectionJsonLd(
  url: string,
  name: string,
  description: string,
  items: readonly CollectionItem[],
  totalCount = items.length
) {
  return {
    '@type': 'CollectionPage',
    url,
    name,
    description,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalCount,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function buildJsonLdGraph(nodes: readonly Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
