# Abel - Personal portfolio

Abel-Personal portfolio is a fully responsive personal portfolio website, responsive for all devices, built using HTML, CSS, and JavaScript.

Refer and get ideas from https://github.com/codewithsadee/vcard-personal-portfolio

## How to run

- compile scss to css

```shell
yarn compile_style
```

- live server

### Google Search Console

https://search.google.com/search-console/welcome

### Add markup schema for blog

```shell
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ blogTitle }}",
  "description": "{{ blogDescription }}",
  "author": {
    "@type": "Person",
    "name": "Abel Truong"
  },
  "datePublished": "{{ blogDatePublished }}",
  "url": "https://abeltruong.asia/?article=who-am-i#blog"
}
</script>
```

- Markup schema cho homepage

```shell
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Abel Truong Blog",
  "url": "https://abeltruong.asia/",
  "description": "Trang blog chia sẻ về cuộc sống, kinh nghiệm, và kiến thức.",
  "author": {
    "@type": "Person",
    "name": "Abel Truong"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://abeltruong.asia/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

- How to test markup schema

```shell
https://developers.google.com/search/docs/appearance/structured-data
```

- Example code

```shell
<meta name="blog-title" content="Tiêu đề của bài blog">
<meta name="blog-description" content="Mô tả ngắn của bài blog">
<meta name="blog-date" content="2024-09-16">
<meta name="blog-url" content="https://abeltruong.asia/?article=who-am-i#blog">

<script>
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": document.querySelector('meta[name="blog-title"]').getAttribute('content'),
    "description": document.querySelector('meta[name="blog-description"]').getAttribute('content'),
    "author": {
      "@type": "Person",
      "name": "Abel Truong"
    },
    "datePublished": document.querySelector('meta[name="blog-date"]').getAttribute('content'),
    "url": document.querySelector('meta[name="blog-url"]').getAttribute('content')
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaData);
  document.head.appendChild(script);
</script>
```

https://search.google.com/search-console?resource_id=https%3A%2F%2Fabeltruong.asia%2F
