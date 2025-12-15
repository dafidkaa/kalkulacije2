import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

/**
 * Visual Breadcrumbs Component
 * Provides navigation context for users and search engines
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="container mx-auto px-4 py-3" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
                <li>
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        aria-label="Početna stranica"
                    >
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Početna</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                        {item.href && index < items.length - 1 ? (
                            <Link
                                to={item.href}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 font-medium" aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
