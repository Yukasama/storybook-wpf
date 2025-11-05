import { Configuration, FrontendApi } from "@ory/client-fetch";

const customFetch: typeof fetch = async (input, init) => {
  // Prevent automatic redirect following
  const modifiedInit = {
    ...init,
    redirect: "manual" as RequestRedirect,
  };

  const response = await fetch(input, modifiedInit);

  // For 303 redirects and opaqueredirect responses, we need to handle them manually
  if (response.status === 303 || response.type === "opaqueredirect") {
    // Create a custom error that includes the response
    const error = new Error("303 Redirect") as Error & {
      response: Response;
      status: number;
    };
    error.response = response;
    error.status = 303;
    throw error;
  }

  return response;
};

export const frontendApi = new FrontendApi(
  new Configuration({
    basePath: typeof window !== "undefined" ? "" : "http://localhost:4433",
    credentials: "include",
    fetchApi: customFetch,
  })
);
