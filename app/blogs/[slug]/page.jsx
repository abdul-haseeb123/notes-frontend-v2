async function getBlog(slug) {
  const res = await fetch(
    process.env.BACKEND_URL + `/api/blogs/?populate=cover&slug=${slug}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await getBlog(params.slug);
  const blog = data.data[0];
  if (data.data.length === 0) {
    return {
      title: "Blog not found",
    };
  } else {
    const blog = data.data[0];
    return {
      title: blog.attributes.title,
      description: blog.attributes.description,
      type: "article",
      openGraph: {
        title: blog.attributes.title,
        description: blog.attributes.description,
        type: "article",
        images: [
          process.env.BACKEND_URL + blog.attributes.cover.data.attributes.url,
        ],
      },
    };
  }
}

export default async function page({ params }) {
  const data = await getBlog(params.slug);
  const blog = data.data[0];
  return (
    <main
      className="container p-4 prose dark:prose-invert mx-auto prose-lg ck-content"
      dangerouslySetInnerHTML={{ __html: blog.attributes.content }}
    ></main>
  );
}
