import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AIMetaTagsProps {
    title: string;
    description: string;
    url: string;
    image?: string;
    type?: 'calculator' | 'converter' | 'tool';
}

/**
 * AI-Specific Meta Tags Component
 * Optimizes pages for AI tools like ChatGPT, Perplexity, Claude, etc.
 */
export const AIMetaTags: React.FC<AIMetaTagsProps> = ({
    title,
    description,
    url,
    image,
    type = 'calculator'
}) => {
    return (
        <Helmet>
            {/* Enhanced Robots Meta Tags */}
            <meta
                name="robots"
                content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            />
            <meta name="googlebot" content="index, follow" />

            {/* AI-Friendly Product Schema */}
            <meta property="product:category" content={`${type} Tool`} />
            <meta property="product:price:amount" content="0" />
            <meta property="product:price:currency" content="EUR" />

            {/* Open Graph - Enhanced */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Kalkulacije.com" />
            <meta property="og:locale" content="hr_HR" />

            {image && (
                <>
                    <meta property="og:image" content={image} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:image:alt" content={`${title} - Besplatni Online Kalkulator`} />
                </>
            )}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Additional AI-Friendly Tags */}
            <meta name="application-name" content="Kalkulacije.com" />
            <meta name="apple-mobile-web-app-title" content="Kalkulacije" />
            <meta name="format-detection" content="telephone=no" />
        </Helmet>
    );
};
