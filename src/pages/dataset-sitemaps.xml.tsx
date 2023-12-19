import { FEATURE_CLASSES_QUERY } from "@/queries/feature-class.query";
import { FeatureClass } from "@/types/model";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextApiResponse } from "next/types";

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_PAGE_URL}/dataset`;

function generateSiteMap(posts: FeatureClass[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       ?.map(({ id, updatedAt }: FeatureClass) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
           <lastmod>${updatedAt}</lastmod>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function DatasetSiteMaps() {
  return <></>;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
    }),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: FEATURE_CLASSES_QUERY,
    variables: {
      take: 1000,
    },
  });

  const sitemap = generateSiteMap(data?.featureClasses?.data || []);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default DatasetSiteMaps;
