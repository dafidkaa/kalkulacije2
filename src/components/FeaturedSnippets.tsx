import React from 'react';
import { CheckCircle, TrendingUp } from 'lucide-react';

interface QuickAnswerProps {
    question: string;
    answer: string;
    details?: string;
    highlight?: string;
}

/**
 * Quick Answer Component for Featured Snippets
 * Optimized for Google's featured snippet extraction
 */
export const QuickAnswer: React.FC<QuickAnswerProps> = ({
    question,
    answer,
    details,
    highlight
}) => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg shadow-sm">
            <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {question}
                    </h3>
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                        {answer}
                    </p>
                    {highlight && (
                        <div className="bg-white border-l-4 border-green-500 p-3 my-3 rounded">
                            <p className="text-lg font-bold text-green-700">{highlight}</p>
                        </div>
                    )}
                    {details && (
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                            {details}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

interface ComparisonTableProps {
    title: string;
    caption?: string;
    headers: string[];
    rows: (string | number)[][];
    highlightColumn?: number;
}

/**
 * Comparison Table Component for Featured Snippets
 * Structured for easy extraction by search engines
 */
export const ComparisonTable: React.FC<ComparisonTableProps> = ({
    title,
    caption,
    headers,
    rows,
    highlightColumn
}) => {
    return (
        <div className="my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
            {caption && (
                <p className="text-gray-600 mb-4">{caption}</p>
            )}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-4 text-left text-sm font-semibold text-white"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`px-6 py-4 text-sm ${cellIndex === highlightColumn
                                                ? 'font-bold text-blue-600'
                                                : 'text-gray-900'
                                            }`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface StatisticCardProps {
    value: string;
    label: string;
    source?: string;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'blue' | 'green' | 'purple' | 'orange';
}

/**
 * Citation-Worthy Statistic Card
 * Designed for AI tools to easily extract and cite
 */
export const StatisticCard: React.FC<StatisticCardProps> = ({
    value,
    label,
    source,
    trend,
    color = 'blue'
}) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200'
    };

    return (
        <div className={`${colorClasses[color]} border-2 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`text-4xl font-bold ${colorClasses[color].split(' ')[1]}`}>
                    {value}
                </div>
                {trend && trend !== 'neutral' && (
                    <TrendingUp
                        className={`w-6 h-6 ${trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`}
                    />
                )}
            </div>
            <p className="text-gray-700 font-medium mb-1">{label}</p>
            {source && (
                <p className="text-xs text-gray-500 mt-2">
                    Izvor: {source}
                </p>
            )}
        </div>
    );
};
