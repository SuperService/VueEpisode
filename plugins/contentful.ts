import * as contentful from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = contentful.createClient({
    space: config.public.contentfulSpace,
    // accessToken: config.public.contentfulPublicAccessToken,
    accessToken: '1uuS9K4kK-0PEVF8hiPdW44_5rda7LxZgJVr6dYJZqQ',
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
