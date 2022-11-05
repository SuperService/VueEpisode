import * as contentful from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = contentful.createClient({
    // space: config.public.contentfulSpace,
    // accessToken: config.public.contentfulPublicAccessToken,
    space: '5xe8h3b9y55t',
    accessToken: '1uuS9K4kK-0PEVF8hiPdW44_5rda7LxZgJVr6dYJZqQ',
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
