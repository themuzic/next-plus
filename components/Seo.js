import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Movies & TV</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8"></meta>
      <meta name="author" content="Jay"></meta>
    </Head>
  );
}
