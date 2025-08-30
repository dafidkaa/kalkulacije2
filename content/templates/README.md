# Blog Post Template System

Programmatically generate SEO-optimized Croatian blog articles that teach manual calculation **and** promote calculators.

## 🎯 Goal

Generate high-quality blog posts that:
- Teach users how to calculate manually (educational value)
- Promote relevant calculators (conversion/engagement)
- Rank well in Croatian search results (SEO optimized)
- Follow consistent structure and quality standards

## 📁 File Structure

```
content/templates/
├── categories.json           # Category templates (8 categories)
├── examples/                # Example input files
│   ├── postotak-example.json
│   └── bmi-example.json
└── README.md               # This file

scripts/
├── generate-blog-post.js   # Main generator script
└── validate-blog-post.js   # Validation script
```

## 🚀 Quick Start

### 1. Generate a Blog Post

```bash
# Create input file (see examples/)
node scripts/generate-blog-post.js content/templates/examples/postotak-example.json

# Output: content/blog/kako-izracunati-postotak.md
```

### 2. Validate Generated Post

```bash
# Validate single post
node scripts/validate-blog-post.js content/blog/kako-izracunati-postotak.md

# Validate with original input data
node scripts/validate-blog-post.js content/blog/kako-izracunati-postotak.md content/templates/examples/postotak-example.json

# Validate all posts
node scripts/validate-blog-post.js --all content/blog/
```

### 3. Build Blog Indexes

```bash
npm run build:blog
```

## 📝 Input File Format

Create a JSON file with your post data:

```json
{
  "slug": "kako-izracunati-postotak",
  "category": "Postotci i PDV",
  "main_keyword": "kako izračunati postotak",
  "calculator": {
    "title": "Kalkulator Postotka",
    "href": "/kalkulator-postotka"
  },
  "secondary_calculators": [
    { "title": "Kalkulator Plaće", "href": "/kalkulator-place" }
  ],
  "query_variants": ["postotak od broja", "izračun postotka"],
  "date": "2025-08-30",
  "hero_image": "/images/blog/kako-izracunati-postotak/hero.jpg",
  "quick_answer": "Postotak se izračunava formulom: (dio/cjelina) × 100.",
  "manual_formula": {
    "heading": "Formula za izračun postotka",
    "prose": "Osnovna formula za postotak je: Postotak = (Dio ÷ Cjelina) × 100",
    "latex": "P = (d / c) × 100"
  },
  "examples": [
    {
      "title": "Osnovni primjer",
      "steps": [
        "Imamo 25 jabuka od ukupno 100 jabuka",
        "Postotak = (25 ÷ 100) × 100 = 25%"
      ]
    }
  ],
  "common_mistakes": [
    "Miješanje dijela i cjeline u formuli",
    "Zaboravljanje množenja sa 100"
  ],
  "faq": [
    {
      "q": "Kako izračunati 20% od 150?",
      "a": "20% od 150 = (20 ÷ 100) × 150 = 30."
    }
  ]
}
```

## 📋 Available Categories

1. **Datumi i dani** - Date calculations, working days
2. **Vrijeme** - Time calculations, hour conversions
3. **Površina** - Area calculations, square meters
4. **Postotci i PDV** - Percentages, VAT, discounts
5. **Plaća** - Salary calculations (Croatia specific)
6. **Zdravlje** - BMI, calories, health metrics
7. **Krediti** - Loan calculations, interest rates
8. **Pretvarači** - Unit conversions, temperature

## 🎨 Generated Structure

Each post follows this exact structure:

```markdown
---
title: "Kako izračunati [keyword] – Formula, Primjeri i Kalkulator"
description: "SEO optimized description..."
date: "2025-08-30"
# ... complete front-matter
---

# Kako izračunati [keyword]

**Brzi odgovor:** Direct answer + [Calculator Link]

## Što je [keyword] i gdje se koristi
Definition + use cases

## Formula za [keyword]
Mathematical formula + code block

## Primjeri iz prakse
### Example 1
### Example 2
> Brže: [Calculator Link]

## Kako koristiti [Calculator Name]
Step-by-step calculator guide

## Česte greške i kako ih izbjeći
- Common mistake 1
- Common mistake 2
- Common mistake 3

## ČPP
**P:** Question 1
**O:** Answer 1

## Zaključak
Summary + primary CTA

> **Povezano:** [Calculator 1] · [Calculator 2]

<script type="application/ld+json">
{Article JSON-LD schema}
</script>

<script type="application/ld+json">
{FAQ JSON-LD schema}
</script>
```

## ✅ Validation Criteria

The validator checks 10 acceptance criteria:

1. **H1 contains keyword** - Main keyword present in heading
2. **Intro has answer + calculator link** - Quick answer and CTA
3. **Required sections present** - All 7 sections in correct order
4. **≥2 worked examples** - Practical examples with steps
5. **≥3 common mistakes** - Error prevention tips
6. **≥4 FAQ items** - Comprehensive Q&A
7. **≥3 calculator links** - Internal linking strategy
8. **Related calculators section** - Cross-promotion
9. **Complete front-matter** - All required metadata
10. **Keyword in key locations** - SEO optimization

**Passing Score:** 80%+ (8/10 criteria)

## 🔧 Customization

### Adding New Categories

1. Add category to `categories.json`:

```json
"Nova Kategorija": {
  "title_pattern": "Kako izračunati {keyword_title} – Formula i Kalkulator",
  "meta_description_pattern": "Naučite {keyword_desc} uz {calculator}.",
  "h1": "Kako izračunati {keyword_title}",
  "default_tags": ["tag1", "tag2"],
  "default_query_variants": ["variant1", "variant2"],
  "section_order": ["intro", "what_is", "formula", "examples", "how_to_use_calculator", "mistakes", "faq", "conclusion", "related"],
  "mistake_hints": ["Greška 1", "Greška 2", "Greška 3"],
  "calculator_default": {"title": "Novi Kalkulator", "href": "/novi-kalkulator"},
  "secondary_calculators_default": [...]
}
```

### Modifying Templates

Edit `categories.json` to change:
- Title patterns
- Default tags and query variants
- Section order
- Common mistake hints
- Default calculators

### Custom Sections

Modify `generateBody()` function in `generate-blog-post.js` to add new section types.

## 📊 SEO Features

- **Keyword optimization** - Main keyword in title, H1, description, content
- **Internal linking** - Calculator links throughout content
- **Structured data** - Article and FAQ JSON-LD schemas
- **Meta tags** - Complete title, description, canonical
- **Croatian localization** - Native language content
- **Related content** - Cross-linking between calculators

## 🚀 Production Workflow

1. **Create input file** with post data
2. **Generate post** using script
3. **Validate output** against criteria
4. **Review and edit** if needed
5. **Build blog indexes** for deployment
6. **Deploy** to production

## 📈 Performance

- **Fast generation** - Seconds per post
- **Consistent quality** - Template-based structure
- **SEO optimized** - Built-in best practices
- **Scalable** - Easy to generate many posts
- **Maintainable** - Centralized templates

## 🛠️ Development

### Running Tests

```bash
# Test generator
node scripts/generate-blog-post.js content/templates/examples/postotak-example.json

# Test validator
node scripts/validate-blog-post.js content/blog/kako-izracunati-postotak.md

# Test all posts
node scripts/validate-blog-post.js --all
```

### Adding Features

1. **New validation rules** - Add to `validationRules` array
2. **New sections** - Add to section generators
3. **New templates** - Add to `categories.json`
4. **New schemas** - Modify `generateJSONLD()`

## 📞 Support

For issues or questions:
1. Check validation output for specific errors
2. Review example input files
3. Verify category template configuration
4. Test with minimal input data first
