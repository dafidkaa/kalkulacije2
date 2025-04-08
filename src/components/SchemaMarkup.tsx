import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: {
    name: string;
    text: string;
    url?: string;
    image?: string;
  }[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT5M" for 5 minutes)
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
}

interface FAQSchemaProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

export const ToolSchema: React.FC<ToolSchemaProps> = ({ 
  name, 
  description, 
  url,
  image,
  keywords
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'HRK'
    },
    url,
    ...(image && { image }),
    ...(keywords && { keywords: keywords.join(', ') })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const HowToSchema: React.FC<HowToSchemaProps> = ({ 
  name, 
  description, 
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image })
    })),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && { 
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: estimatedCost.currency,
        value: estimatedCost.value
      }
    }),
    ...(supply && { 
      supply: supply.map(item => ({
        '@type': 'HowToSupply',
        name: item
      }))
    }),
    ...(tool && { 
      tool: tool.map(item => ({
        '@type': 'HowToTool',
        name: item
      }))
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const FAQSchema: React.FC<FAQSchemaProps> = ({ questions }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const BreadcrumbSchema: React.FC<{
  items: {
    name: string;
    url: string;
  }[];
}> = ({ items }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const WebsiteSchema: React.FC<{
  name: string;
  url: string;
  description: string;
}> = ({ name, url, description }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const OrganizationSchema: React.FC<{
  name: string;
  url: string;
  logo?: string;
  description?: string;
}> = ({ name, url, logo, description }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
