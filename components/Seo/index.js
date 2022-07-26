import Head from "next/head";
import { useRouter } from "next/router";

export const Seo = ({ title, description }) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
        key="ogurl"
      />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/og.png`}
        key="ogimage"
      />
      <meta
        property="og:site_name"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
        key="ogsitename"
      />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@codewithshahmir" />
    </Head>
  );
};
