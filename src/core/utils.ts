import { Sitemap } from "@/types/model";

interface ContactDataItem {
  key: string;
  data: {
    value: string | Record<string, string>;
  };
}

export const formatContactData = (data: ContactDataItem[]) => {
  return data?.reduce((acc: any, item: ContactDataItem) => {
    acc[item.key] = item.data.value;
    return acc;
  }, {});
};

export const formatAddress = (
  zip: string,
  city: string,
  street: string,
  houseNumber: string,
  country: string
) => {
  return `${street} ${houseNumber}, ${zip} ${city}, ${country}`;
};

export const parseSitemapXml = (xmlData: string) => {
  return xmlData
    .split("<url>")
    .slice(1)
    .map((url) => {
      const loc = url.split("<loc>")[1].split("</loc>")[0];
      const lastmod = url.split("<lastmod>")[1]?.split("</lastmod>")[0] || "";
      const changefreq =
        url.split("<changefreq>")[1]?.split("</changefreq>")[0] || "";
      const priority =
        url.split("<priority>")[1]?.split("</priority>")[0] || "";

      return {
        loc,
        lastmod,
        changefreq,
        priority,
      };
    }) as Sitemap[];
};
