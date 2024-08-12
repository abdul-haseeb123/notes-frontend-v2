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
  if (data.error) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">
          Error while fetching About Us content
        </h1>
      </main>
    );
  }
  if (!about) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">About is not Published Yet</h1>
      </main>
    );
  }
  return (
    <main
      className="container prose  lg:prose-lg xl:prose-xl dark:prose-invert ck-content mx-auto py-6 sm:px-0 px-3"
      dangerouslySetInnerHTML={{ __html: about.attributes.content }}
    ></main>
  );
}
