import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AISummaryProps {
    summary: string;
    keywords?: string[];
    useCases?: string[];
    statistics?: {
        label: string;
        value: string;
        source?: string;
    }[];
}

/**
 * AI-Friendly Summary Component (GEO Optimization)
 * Hidden from users but optimized for AI tool extraction
 */
export const AISummary: React.FC<AISummaryProps> = ({
    summary,
    keywords,
    useCases,
    statistics
}) => {
    return (
        <>
            {/* Hidden AI-readable summary */}
            <div className="sr-only" aria-hidden="true" data-ai-summary="true">
                <p>{summary}</p>

                {keywords && keywords.length > 0 && (
                    <div data-ai-keywords="true">
                        Ključne riječi: {keywords.join(', ')}
                    </div>
                )}

                {useCases && useCases.length > 0 && (
                    <div data-ai-use-cases="true">
                        <h3>Primjeri korištenja:</h3>
                        <ul>
                            {useCases.map((useCase, index) => (
                                <li key={index}>{useCase}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {statistics && statistics.length > 0 && (
                    <div data-ai-statistics="true">
                        <h3>Statistika:</h3>
                        <ul>
                            {statistics.map((stat, index) => (
                                <li key={index}>
                                    {stat.label}: {stat.value}
                                    {stat.source && ` (Izvor: ${stat.source})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Add to meta tags for AI tools */}
            <Helmet>
                <meta name="ai-summary" content={summary} />
                {keywords && (
                    <meta name="ai-keywords" content={keywords.join(', ')} />
                )}
            </Helmet>
        </>
    );
};

interface UseCaseExampleProps {
    title: string;
    scenario: string;
    input: string;
    output: string;
    explanation?: string;
    icon?: React.ReactNode;
}

/**
 * Use Case Example Component
 * Real-world scenarios that AI tools can reference
 */
export const UseCaseExample: React.FC<UseCaseExampleProps> = ({
    title,
    scenario,
    input,
    output,
    explanation,
    icon
}) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 my-6">
            <div className="flex items-start gap-3 mb-4">
                {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-700 leading-relaxed">{scenario}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded border-l-4 border-gray-300">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Unos:</p>
                    <p className="text-gray-900">{input}</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Rezultat:</p>
                    <p className="text-gray-900 font-semibold">{output}</p>
                </div>
            </div>

            {explanation && (
                <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
                    <strong>Objašnjenje:</strong> {explanation}
                </div>
            )}
        </div>
    );
};
