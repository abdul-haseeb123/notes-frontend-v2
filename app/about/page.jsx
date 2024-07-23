async function getAbout() {
  const res = await fetch(process.env.BACKEND_URL + "/api/about", {
    cache: "no-store",
  });
  return res.json();
}

export const metadata = {
  title: "About",
  description: "About the site",
  type: "article",
  openGraph: {
    title: "About",
    description: "About the site",
    type: "article",
  },
};

export default async function about() {
  const data = await getAbout();
  const about = data.data;
  return (
    <main
      className="container prose  lg:prose-lg xl:prose-xl dark:prose-invert ck-content mx-auto py-6 sm:px-0 px-3"
      dangerouslySetInnerHTML={{ __html: about.attributes.content }}
    ></main>
  );
}
