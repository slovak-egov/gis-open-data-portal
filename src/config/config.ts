const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  keycloak: {
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
    url: process.env.NEXT_PUBLIC_KEYCLOAK_API_URL || "",
  },
};

export default config;
