#!/usr/bin/env node

/**
 * Blog Post Validator
 * Validates generated blog posts against acceptance criteria
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Validation rules based on acceptance criteria
 */
const validationRules = [
  {
    name: 'H1 equals computed title with keyword',
    test: (post, data) => {
      const h1Match = post.content.match(/^# (.+)$/m);
      if (!h1Match) return { pass: false, message: 'No H1 found' };
      
      const h1 = h1Match[1];
      const hasKeyword = h1.toLowerCase().includes(data.main_keyword.toLowerCase().replace('kako ', ''));
      
      return {
        pass: hasKeyword,
        message: hasKeyword ? 'H1 contains keyword' : `H1 "${h1}" missing keyword "${data.main_keyword}"`
      };
    }
  },
  
  {
    name: 'Intro contains direct answer and calculator link',
    test: (post, data) => {
      const introMatch = post.content.match(/^# .+?\n\n(.+?)\n\n## /s);
      if (!introMatch) return { pass: false, message: 'No intro section found' };
      
      const intro = introMatch[1];
      const hasAnswer = intro.includes('**Brzi odgovor:**');
      const hasCalculatorLink = intro.includes('](');
      
      return {
        pass: hasAnswer && hasCalculatorLink,
        message: `Intro - Answer: ${hasAnswer}, Calculator link: ${hasCalculatorLink}`
      };
    }
  },
  
  {
    name: 'Required sections present in correct order',
    test: (post, data) => {
      const requiredSections = [
        'Što je .+ i gdje se koristi',
        'Formula za .+',
        'Primjeri iz prakse',
        'Kako koristiti .+',
        'Česte greške i kako ih izbjeći',
        'ČPP',
        'Zaključak'
      ];
      
      const content = post.content;
      const foundSections = [];
      let lastIndex = 0;
      
      for (const sectionPattern of requiredSections) {
        const regex = new RegExp(`^## ${sectionPattern}`, 'm');
        const match = content.slice(lastIndex).match(regex);
        
        if (match) {
          foundSections.push(sectionPattern);
          lastIndex += match.index + match[0].length;
        }
      }
      
      return {
        pass: foundSections.length >= 6,
        message: `Found ${foundSections.length}/7 required sections: ${foundSections.join(', ')}`
      };
    }
  },
  
  {
    name: 'At least 2 worked examples',
    test: (post, data) => {
      const examplesSection = post.content.match(/## Primjeri iz prakse\n\n(.*?)\n\n## /s);
      if (!examplesSection) return { pass: false, message: 'No examples section found' };
      
      const examples = examplesSection[1];
      const exampleCount = (examples.match(/### /g) || []).length;
      
      return {
        pass: exampleCount >= 2,
        message: `Found ${exampleCount} examples (minimum 2 required)`
      };
    }
  },
  
  {
    name: 'Common mistakes section has ≥3 items',
    test: (post, data) => {
      const mistakesSection = post.content.match(/## Česte greške i kako ih izbjeći\n\n(.*?)\n\n## /s);
      if (!mistakesSection) return { pass: false, message: 'No mistakes section found' };
      
      const mistakes = mistakesSection[1];
      const mistakeCount = (mistakes.match(/^- /gm) || []).length;
      
      return {
        pass: mistakeCount >= 3,
        message: `Found ${mistakeCount} mistakes (minimum 3 required)`
      };
    }
  },
  
  {
    name: 'FAQ has ≥4 Q&A pairs',
    test: (post, data) => {
      const faqCount = post.data.faq ? post.data.faq.length : 0;
      
      return {
        pass: faqCount >= 4,
        message: `Found ${faqCount} FAQ items (minimum 4 required)`
      };
    }
  },
  
  {
    name: 'Internal calculator links present',
    test: (post, data) => {
      const content = post.content;
      const calculatorLinks = (content.match(/\[.*?\]\(\/kalkulator.*?\)/g) || []).length;
      
      // Should have links in intro, how-to-use, and conclusion
      return {
        pass: calculatorLinks >= 3,
        message: `Found ${calculatorLinks} calculator links (minimum 3 required)`
      };
    }
  },
  
  {
    name: 'Related calculators section present',
    test: (post, data) => {
      const hasRelated = post.content.includes('> **Povezano:**');
      const relatedLinks = (post.content.match(/> \*\*Povezano:\*\* .*?\[.*?\]\(.*?\)/g) || []).length;
      
      return {
        pass: hasRelated && relatedLinks > 0,
        message: `Related section present: ${hasRelated}, Links found: ${relatedLinks}`
      };
    }
  },
  
  {
    name: 'Front-matter complete',
    test: (post, data) => {
      const required = ['title', 'description', 'date', 'status', 'tags', 'category', 'canonical'];
      const missing = required.filter(field => !post.data[field]);
      
      return {
        pass: missing.length === 0,
        message: missing.length === 0 ? 'All required fields present' : `Missing: ${missing.join(', ')}`
      };
    }
  },
  
  {
    name: 'Main keyword in key locations',
    test: (post, data) => {
      const keyword = data.main_keyword.toLowerCase();
      const content = post.content.toLowerCase();
      const title = post.data.title.toLowerCase();
      const description = post.data.description.toLowerCase();
      
      const locations = {
        title: title.includes(keyword.replace('kako ', '')),
        description: description.includes(keyword.replace('kako ', '')),
        h1: content.includes(keyword.replace('kako ', '')),
        firstParagraph: content.slice(0, 500).includes(keyword.replace('kako ', '')),
        conclusion: content.includes('zaključak') && content.slice(content.indexOf('zaključak')).includes(keyword.replace('kako ', ''))
      };
      
      const passedLocations = Object.values(locations).filter(Boolean).length;
      
      return {
        pass: passedLocations >= 4,
        message: `Keyword found in ${passedLocations}/5 key locations: ${Object.entries(locations).filter(([k,v]) => v).map(([k]) => k).join(', ')}`
      };
    }
  }
];

/**
 * Validate a single blog post
 */
async function validateBlogPost(filePath, inputData = null) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const post = matter(content);
    
    console.log(`\n🔍 Validating: ${path.basename(filePath)}`);
    console.log('=' .repeat(50));
    
    const results = [];
    let passedCount = 0;
    
    for (const rule of validationRules) {
      try {
        const result = rule.test(post, inputData || {});
        results.push({
          name: rule.name,
          ...result
        });
        
        if (result.pass) {
          passedCount++;
          console.log(`✅ ${rule.name}: ${result.message}`);
        } else {
          console.log(`❌ ${rule.name}: ${result.message}`);
        }
      } catch (error) {
        console.log(`⚠️  ${rule.name}: Error - ${error.message}`);
        results.push({
          name: rule.name,
          pass: false,
          message: `Validation error: ${error.message}`
        });
      }
    }
    
    const score = (passedCount / validationRules.length) * 100;
    console.log(`\n📊 Score: ${passedCount}/${validationRules.length} (${score.toFixed(1)}%)`);
    
    if (score >= 80) {
      console.log('🎉 Post passes validation!');
    } else if (score >= 60) {
      console.log('⚠️  Post needs improvements');
    } else {
      console.log('❌ Post fails validation');
    }
    
    return {
      filePath,
      score,
      passedCount,
      totalRules: validationRules.length,
      results
    };
    
  } catch (error) {
    console.error(`❌ Failed to validate ${filePath}:`, error);
    return {
      filePath,
      score: 0,
      passedCount: 0,
      totalRules: validationRules.length,
      results: [],
      error: error.message
    };
  }
}

/**
 * Validate all blog posts in directory
 */
async function validateAllPosts(blogDir) {
  try {
    const files = await fs.readdir(blogDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`Found ${markdownFiles.length} blog posts to validate`);
    
    const results = [];
    for (const file of markdownFiles) {
      const filePath = path.join(blogDir, file);
      const result = await validateBlogPost(filePath);
      results.push(result);
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 VALIDATION SUMMARY');
    console.log('='.repeat(60));
    
    results.forEach(result => {
      const status = result.score >= 80 ? '✅' : result.score >= 60 ? '⚠️' : '❌';
      console.log(`${status} ${path.basename(result.filePath)}: ${result.score.toFixed(1)}%`);
    });
    
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    console.log(`\n📊 Average Score: ${avgScore.toFixed(1)}%`);
    
    return results;
    
  } catch (error) {
    console.error('Failed to validate posts:', error);
    return [];
  }
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: 
  node validate-blog-post.js <file.md>              # Validate single post
  node validate-blog-post.js <file.md> <input.json> # Validate with input data
  node validate-blog-post.js --all <blog-dir>       # Validate all posts
`);
    process.exit(1);
  }
  
  if (args[0] === '--all') {
    const blogDir = args[1] || path.join(path.dirname(__dirname), 'content/blog');
    await validateAllPosts(blogDir);
  } else {
    const filePath = args[0];
    const inputFile = args[1];
    
    let inputData = null;
    if (inputFile) {
      try {
        inputData = JSON.parse(await fs.readFile(inputFile, 'utf-8'));
      } catch (error) {
        console.warn('Failed to load input data:', error.message);
      }
    }
    
    await validateBlogPost(filePath, inputData);
  }
}

// Export for use as module
export { validateBlogPost, validateAllPosts, validationRules };

// Run CLI if executed directly
const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] === scriptPath) {
  main().catch(console.error);
}
