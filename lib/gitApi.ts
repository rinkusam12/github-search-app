import { gql } from "graphql-request";
import { AllContributorModel } from "./AllContributorModel";
import { AllUsersModel } from "./AllUsersModel";
import { callApi, graphQLClient } from "./api";
import { RepoDetailModel } from "./RepoDetailModel";
import { SearchRepoModel } from "./SearchRepoModel";
import { UserDetailModel } from "./UserDetailModel";
const org = process.env.NEXT_PUBLIC_GITHUB_ORG;

export async function getAllContributers(
  owner: string,
  repo: string,
  page?: number
) {
  let pageUrl = `repos/${owner}/${repo}/contributors?per_page=100`;
  if (page) {
    pageUrl = `repos/${owner}/${repo}/contributors?per_page=100&page=${page}`;
  }
  return callApi<AllContributorModel[]>(pageUrl, "GET");
}

export async function searchUser(
  name: string,
  after?: string
): Promise<AllUsersModel> {
  const query = gql`
  query ($after: String) {
    search(query: "${name} in:name", type: USER, first: 10, after: $after) {
      nodes {
        ... on User {
          name
          url
          avatarUrl
          login
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  
  `;

  const data = await graphQLClient.request<AllUsersModel>(query, { after });
  return data;
}

export async function searchRepos(
  repo: string,
  after?: string
): Promise<SearchRepoModel> {
  const query = gql`
  query ($after: String) {
    search(query: "${repo} in:name", type: REPOSITORY, first: 10, after:$after) {
      nodes {
        ... on Repository {
          name
          owner {
            id
            login
          }
          url
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  `;

  const data = await graphQLClient.request<SearchRepoModel>(query, { after });
  return data;
}

export async function getUserInfo(
  username: string,
  after?: string
): Promise<UserDetailModel> {
  const query = gql`
    query ($after: String) {
      user(login: "${username}") {
        bio
        name
        login
        url
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories {
          totalCount
        }
        repositoriesContributedTo(first: 50, after: $after) {
          totalCount
          nodes {
            name
            url
            owner {
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;
  try {
    const data = await graphQLClient.request<UserDetailModel>(query, {
      after,
    });
    return data;
    
  } catch (error) {
    return null
  }
}

export async function getRepoDetails(repo_name: string, owner_name: string) {
 
  const query = gql`
  {
    repository(name: "${repo_name}", owner: "${owner_name}") {
      name
      owner {
        id
        login
      }
      url
      homepageUrl
      openGraphImageUrl
    }
  }
  `;

  try {
    const data = await graphQLClient.request<RepoDetailModel>(query);
    return data;
  } catch (error) {
      return null
  }

}
