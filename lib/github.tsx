import { graphql } from "@octokit/graphql";
import memoize from "lodash/memoize";
import { GetStaticProps } from "next/types";

if (typeof process.env.GITHUB_TOKEN === "undefined") {
  throw new Error(
    "can't initialize github client: process.env.GITHUB_TOKEN unset"
  );
}

export const query = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`
  }
});

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  readme: string | null;
}

export const getRepo = memoize(
  async (owner: string, name: string): Promise<Repo> => {
    const resp = await query({
      query: `
        query repoInfo($owner: String!, $name: String!) { 
          repository(owner:$owner,name:$name){
            name
            description
            url
            homepageUrl
            
            readme: object(expression:"master:README.md"){
              ... on Blob {
                text
              }
            }
          }
        }
      `,
      owner,
      name
    });

    const repo = resp.repository;

    return {
      name: repo.name,
      description: repo.description || null,
      url: repo.url,
      homepageUrl: repo.homepageUrl || null,
      readme: repo.readme?.text || null
    };
  },

  // memo key function
  (owner, name) => `${owner}/${name}`
);
