import axios, { AxiosResponseHeaders, Method } from "axios";
import { GraphQLClient } from "graphql-request";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

export async function callApi<T>(
  url: string,
  method: Method,
  body?: any
): Promise<{ data: T; headers: AxiosResponseHeaders }> {
  try {
    const header = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };
    const data = await axios({
      url: `https://api.github.com/${url}`,
      method,
      data: body,
      headers: header,
    });
    return { data: data.data, headers: data.headers };
  } catch (error) {
    throw error;
  }
}

const githubApiEndPoint = `https://api.github.com/graphql`;
export const graphQLClient = new GraphQLClient(githubApiEndPoint, {
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});
