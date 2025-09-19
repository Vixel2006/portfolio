import markdown
import os
from jinja2 import Environment, FileSystemLoader
import yaml
import re

# --- Configuration ---
BLOGS_DIR = 'blogs'
OUTPUT_DIR = 'blog-posts'
TEMPLATES_DIR = 'blog_templates'
# Point to the template for index.html
INDEX_TEMPLATE_PATH = 'index_template.html' 
# Define where the final generated index.html should be saved
FINAL_INDEX_OUTPUT_PATH = 'index.html'

# --- Setup Jinja2 Environment ---
env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
blog_card_template = env.get_template('blog_card_template.html')
blog_post_page_template = env.get_template('blog_post_page_template.html')

# --- Ensure output directory exists ---
os.makedirs(OUTPUT_DIR, exist_ok=True)

all_blog_posts_data = []

# --- Manual Front Matter Parsing Function ---
def parse_markdown_with_frontmatter(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.match(r'---\n(.*?)\n---\n(.*)', content, re.DOTALL)

    if match:
        yaml_str = match.group(1)
        markdown_content = match.group(2).strip()
        metadata = yaml.safe_load(yaml_str)
    else:
        metadata = {}
        markdown_content = content.strip()
    
    return metadata, markdown_content

# --- Process each Markdown file ---
for filename in os.listdir(BLOGS_DIR):
    if filename.endswith('.md'):
        filepath = os.path.join(BLOGS_DIR, filename)
        
        metadata, markdown_content = parse_markdown_with_frontmatter(filepath)

        html_content = markdown.markdown(markdown_content)

        title = metadata.get('title', 'Untitled Post')
        date = metadata.get('date', 'N/A')
        author = metadata.get('author', 'Unknown Author')
        excerpt = metadata.get('excerpt', 'No excerpt available.')

        slug = os.path.splitext(filename)[0]
        post_url = f"{slug}.html"
        full_post_output_path = os.path.join(OUTPUT_DIR, post_url)

        all_blog_posts_data.append({
            'title': title,
            'date': date,
            'excerpt': excerpt,
            'url': os.path.join(OUTPUT_DIR, post_url).replace(os.sep, '/')
        })

        rendered_page = blog_post_page_template.render(
            title=title,
            date=date,
            author=author,
            excerpt=excerpt,
            content=html_content
        )
        with open(full_post_output_path, 'w', encoding='utf-8') as f:
            f.write(rendered_page)
        print(f"Generated: {full_post_output_path}")


# --- Sort blog posts by date (newest first) ---
all_blog_posts_data.sort(key=lambda x: x['date'], reverse=True)

# --- Generate blog cards HTML for index.html ---
blog_cards_html = ""
for post_data in all_blog_posts_data:
    blog_cards_html += blog_card_template.render(**post_data)


# --- Inject blog cards into index_template.html and save as index.html ---
# Read the index template
with open(INDEX_TEMPLATE_PATH, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Find the placeholder and replace it
PLACEHOLDER = '<!-- BLOG_POST_CARDS_INJECTION_POINT -->'
if PLACEHOLDER in index_content:
    index_content = index_content.replace(PLACEHOLDER, blog_cards_html)
    # Write the modified content to the FINAL_INDEX_OUTPUT_PATH (index.html)
    with open(FINAL_INDEX_OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print(f"Injected blog cards into {FINAL_INDEX_OUTPUT_PATH} (from template {INDEX_TEMPLATE_PATH})")
else:
    print(f"Warning: Placeholder '{PLACEHOLDER}' not found in {INDEX_TEMPLATE_PATH}. Blog cards not injected.")

print("Blog generation complete!")
