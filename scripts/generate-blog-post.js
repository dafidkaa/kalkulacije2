#!/usr/bin/env node

/**
 * Blog Post Generator
 * Generates SEO-optimized blog posts from templates and input data
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

const TEMPLATES_DIR = path.join(projectRoot, 'content/templates');
const BLOG_DIR = path.join(projectRoot, 'content/blog');
const CATEGORIES_FILE = path.join(TEMPLATES_DIR, 'categories.json');

/**
 * Load category templates
 */
async function loadCategoryTemplates() {
  try {
    const content = await fs.readFile(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load category templates:', error);
    throw error;
  }
}

/**
 * Generate title from pattern and data
 */
function generateTitle(pattern, data, template) {
  const keywordTitle = capitalizeKeyword(data.main_keyword);
  const calculator = data.calculator?.title || template.calculator_default.title;
  
  return pattern
    .replace('{keyword_title}', keywordTitle)
    .replace('{calculator}', calculator);
}

/**
 * Generate meta description from pattern and data
 */
function generateMetaDescription(pattern, data, template) {
  const keywordDesc = data.main_keyword.toLowerCase();
  const calculator = data.calculator?.title || template.calculator_default.title;
  
  return pattern
    .replace('{keyword_desc}', keywordDesc)
    .replace('{calculator}', calculator);
}

/**
 * Capitalize keyword for title (remove "kako" if duplicate)
 */
function capitalizeKeyword(keyword) {
  const cleaned = keyword.replace(/^kako\s+/i, '').replace(/^izračunati\s+/i, '');
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Generate front-matter
 */
function generateFrontMatter(data, template) {
  const title = generateTitle(template.title_pattern, data, template);
  const description = generateMetaDescription(template.meta_description_pattern, data, template);
  
  const tags = data.tags || [...template.default_tags, ...data.query_variants.slice(0, 2)];
  const calculator = data.calculator || template.calculator_default;
  const secondaryCalculators = data.secondary_calculators || template.secondary_calculators_default;
  
  return {
    title,
    description,
    date: data.date,
    updatedAt: data.updatedAt || data.date,
    status: data.status || 'published',
    tags: [...new Set(tags)], // Remove duplicates
    category: data.category,
    heroImage: data.hero_image,
    canonical: `https://kalkulacije.com/blog/${data.slug}`,
    faq: data.faq || []
  };
}

/**
 * Generate article body sections
 */
function generateBody(data, template, frontMatter) {
  const sections = [];
  const calculator = data.calculator || template.calculator_default;
  const secondaryCalculators = data.secondary_calculators || template.secondary_calculators_default;
  const keywordTitle = capitalizeKeyword(data.main_keyword);
  
  // H1
  sections.push(`# ${template.h1.replace('{keyword_title}', keywordTitle)}`);
  sections.push('');
  
  // Process each section according to template order
  template.section_order.forEach(sectionType => {
    switch (sectionType) {
      case 'intro':
        sections.push(generateIntroSection(data, calculator));
        break;
      case 'what_is':
        sections.push(generateWhatIsSection(data, template));
        break;
      case 'formula':
        sections.push(generateFormulaSection(data));
        break;
      case 'examples':
        sections.push(generateExamplesSection(data, calculator));
        break;
      case 'how_to_use_calculator':
        sections.push(generateHowToUseSection(calculator));
        break;
      case 'mistakes':
        sections.push(generateMistakesSection(data, template, calculator));
        break;
      case 'faq':
        sections.push(generateFAQSection(data));
        break;
      case 'conclusion':
        sections.push(generateConclusionSection(data, calculator));
        break;
      case 'related':
        sections.push(generateRelatedSection(secondaryCalculators));
        break;
    }
    sections.push('');
  });
  
  return sections.join('\n');
}

/**
 * Generate intro section
 */
function generateIntroSection(data, calculator) {
  const quickAnswer = data.quick_answer || `${data.manual_formula?.prose || 'Koristite odgovarajuću formulu za izračun.'} `;
  
  return `**Brzi odgovor:** ${quickAnswer}  
Ako želite rezultat u sekundi, upotrijebite naš [${calculator.title}](${calculator.href}).`;
}

/**
 * Generate "What is" section
 */
function generateWhatIsSection(data, template) {
  const keywordTitle = data.main_keyword;
  const variants = data.query_variants || template.default_query_variants;
  const variantsText = variants.slice(0, 3).join(', ');
  
  return `## Što je ${keywordTitle} i gdje se koristi

${keywordTitle} je postupak koji se koristi u mnogim situacijama. Također se naziva i ${variantsText}.

Najčešće se koristi za:
- Planiranje i organizaciju
- Financijske kalkulacije  
- Svakodnevne praktične potrebe
- Profesionalne analize`;
}

/**
 * Generate formula section
 */
function generateFormulaSection(data) {
  const formula = data.manual_formula;
  if (!formula) {
    return `## Formula za ${data.main_keyword}

Osnovna formula:
\`\`\`
Rezultat = Ulazni podaci × Faktor
\`\`\``;
  }
  
  let section = `## ${formula.heading || 'Formula za ' + data.main_keyword}

${formula.prose}`;

  if (formula.latex) {
    section += `

\`\`\`
${formula.latex}
\`\`\``;
  }
  
  return section;
}

/**
 * Generate examples section
 */
function generateExamplesSection(data, calculator) {
  if (!data.examples || data.examples.length === 0) {
    return `## Primjeri iz prakse

### Osnovni primjer
1. Unesite potrebne podatke
2. Primijenite formulu
3. Dobijte rezultat

> Brže: [${calculator.title}](${calculator.href})

### Napredni primjer
1. Složeniji slučaj s dodatnim parametrima
2. Korak po korak rješavanje
3. Provjera rezultata`;
  }
  
  let section = '## Primjeri iz prakse\n';
  
  data.examples.forEach((example, index) => {
    section += `\n### ${example.title}\n`;
    example.steps.forEach((step, stepIndex) => {
      section += `${stepIndex + 1}. ${step}\n`;
    });
    
    if (index === 0) {
      section += `\n> Brže: [${calculator.title}](${calculator.href})\n`;
    }
  });
  
  return section;
}

/**
 * Generate how to use calculator section
 */
function generateHowToUseSection(calculator) {
  return `## Kako koristiti ${calculator.title}

1. Otvorite [${calculator.title}](${calculator.href})
2. Unesite potrebne podatke u odgovarajuća polja
3. Kliknite "Izračunaj" za trenutni rezultat
4. Rezultat će se prikazati odmah s objašnjenjem

Kalkulator automatski provjerava unos i upozorava na greške.`;
}

/**
 * Generate mistakes section
 */
function generateMistakesSection(data, template, calculator) {
  const mistakes = data.common_mistakes || template.mistake_hints;
  
  let section = '## Česte greške i kako ih izbjeći\n';
  
  mistakes.forEach(mistake => {
    section += `- ${mistake}\n`;
  });
  
  section += `\nSavjet: Uvijek provjerite rezultat u [${calculator.title}](${calculator.href}) za sigurnost.`;
  
  return section;
}

/**
 * Generate FAQ section
 */
function generateFAQSection(data) {
  if (!data.faq || data.faq.length === 0) {
    return `## ČPP

**P:** Kako provjeriti je li rezultat točan?  
**O:** Ponovite izračun ili koristite naš kalkulator za provjeru.

**P:** Što ako dobivam drugačije rezultate?  
**O:** Provjerite ulazne podatke i formulu koju koristite.`;
  }
  
  let section = '## ČPP\n';
  
  data.faq.forEach(item => {
    section += `\n**P:** ${item.q}  \n**O:** ${item.a}\n`;
  });
  
  return section;
}

/**
 * Generate conclusion section
 */
function generateConclusionSection(data, calculator) {
  return `## Zaključak

${data.main_keyword} možete izračunati ručno pomoću formule ili brže pomoću našeg kalkulatora. Oba pristupa imaju svoje prednosti - ručni izračun pomaže razumijevanju, dok kalkulator štedi vrijeme.

Za najbrže i najpreciznije rezultate, preporučujemo [${calculator.title}](${calculator.href}).`;
}

/**
 * Generate related section
 */
function generateRelatedSection(secondaryCalculators) {
  const links = secondaryCalculators
    .map(calc => `[${calc.title}](${calc.href})`)
    .join(' · ');
    
  return `> **Povezano:** ${links}`;
}

/**
 * Generate JSON-LD schemas
 */
function generateJSONLD(data, frontMatter) {
  const schemas = [];
  
  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": frontMatter.title,
    "description": frontMatter.description,
    "image": frontMatter.heroImage ? `https://kalkulacije.com${frontMatter.heroImage}` : undefined,
    "datePublished": frontMatter.date,
    "dateModified": frontMatter.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "Kalkulacije Tim"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kalkulacije",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kalkulacije.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": frontMatter.canonical
    }
  };
  
  schemas.push(articleSchema);
  
  // FAQ schema
  if (frontMatter.faq && frontMatter.faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": frontMatter.faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
    
    schemas.push(faqSchema);
  }
  
  return schemas;
}

/**
 * Generate complete markdown file
 */
function generateMarkdown(data, template) {
  const frontMatter = generateFrontMatter(data, template);
  const body = generateBody(data, template, frontMatter);
  const schemas = generateJSONLD(data, frontMatter);
  
  // Convert front-matter to YAML
  const yamlFrontMatter = Object.entries(frontMatter)
    .map(([key, value]) => {
      if (key === 'faq' && Array.isArray(value)) {
        return `${key}:\n${value.map(item =>
          `  - q: "${item.q.replace(/"/g, '\\"')}"\n    a: "${item.a.replace(/"/g, '\\"')}"`
        ).join('\n')}`;
      } else if (Array.isArray(value)) {
        return `${key}:\n${value.map(item => `  - "${item}"`).join('\n')}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');
  
  let markdown = `---\n${yamlFrontMatter}\n---\n\n${body}`;
  
  // Add JSON-LD schemas
  schemas.forEach(schema => {
    markdown += `\n\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  });
  
  return markdown;
}

/**
 * Main generation function
 */
async function generateBlogPost(inputData) {
  try {
    // Load templates
    const templates = await loadCategoryTemplates();
    const template = templates[inputData.category];
    
    if (!template) {
      throw new Error(`Template not found for category: ${inputData.category}`);
    }
    
    // Generate markdown
    const markdown = generateMarkdown(inputData, template);
    
    // Ensure blog directory exists
    await fs.mkdir(BLOG_DIR, { recursive: true });
    
    // Write file
    const filePath = path.join(BLOG_DIR, `${inputData.slug}.md`);
    await fs.writeFile(filePath, markdown, 'utf-8');
    
    console.log(`✅ Generated blog post: ${filePath}`);
    return filePath;
    
  } catch (error) {
    console.error('❌ Failed to generate blog post:', error);
    throw error;
  }
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: node generate-blog-post.js <input-file.json>

Example input file:
{
  "slug": "kako-izracunati-postotak",
  "category": "Postotci i PDV",
  "main_keyword": "kako izračunati postotak",
  "date": "2025-08-30",
  "hero_image": "/images/blog/kako-izracunati-postotak/hero.jpg",
  "faq": [
    {"q": "Kako izračunati 20% od 100?", "a": "20% od 100 = 20"}
  ]
}
`);
    process.exit(1);
  }
  
  const inputFile = args[0];
  
  try {
    const inputData = JSON.parse(await fs.readFile(inputFile, 'utf-8'));
    await generateBlogPost(inputData);
  } catch (error) {
    console.error('Failed to process input file:', error);
    process.exit(1);
  }
}

// Export for use as module
export { generateBlogPost, loadCategoryTemplates };

// Run CLI if executed directly
const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] === scriptPath) {
  main().catch(console.error);
}
