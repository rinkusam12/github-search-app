import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Repos from "../../components/RepoList/Repos";
import { getUserInfo } from "../../lib/gitApi";
import { Repo, UserDetailModel } from "../../lib/UserDetailModel";

const User: React.FC<{ user: UserDetailModel["user"] }> = (props) => {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(
    props.user.repositoriesContributedTo.pageInfo.hasNextPage
  );
  const [contribRepos, setContribRepos] = useState<Repo[]>(
    props.user.repositoriesContributedTo.nodes
  );
  const [after, setAfter] = useState(
    props.user.repositoriesContributedTo.pageInfo.endCursor
  );
  return (
    <div>
      <a className="py-4 block px-5" href="/">
        Back to homepage
      </a>
      <div className="border-1 border-purple-600 text-center">
        <h1 className="text-3xl py-4">Name: {props.user.name}</h1>
        <p className="text-sm py-4">username: {props.user.login}</p>
        <p className="text-sm py-4">
          Profile URL: <a href={props.user.url}>{props.user.url}</a>
        </p>
        <p>
          <img
            width="100px"
            height="100px"
            className="mx-auto py-4"
            src={props.user.avatarUrl}
            alt={props.user.name}
          />
        </p>
        <div className="flex justify-center gap-10 py-4 items-center">
          <p>Follower: {props.user.followers.totalCount}</p>
          <p>Followings: {props.user.following.totalCount}</p>
          <p>Total Repositories: {props.user.repositories.totalCount}</p>
          <p>
            Total Repositories Contributed:{" "}
            {props.user.repositoriesContributedTo.totalCount}
          </p>
        </div>

        {props.user.repositoriesContributedTo.totalCount > 0 && (
          <div className="text-left">
            <h3 className="text-sm text-left">Contributed Repository</h3>
            <Repos list={contribRepos} />
            {hasNext && (
              <div className="text-center">
                <button
                  className="border-1 border-purple-600 px-5 py-3 my-4 hover:text-white hover:bg-purple-600"
                  onClick={async () => {
                    setLoading(true);
                    const user = await getUserInfo(props.user.login, after);
                    setContribRepos([
                      ...contribRepos,
                      ...user.user.repositoriesContributedTo.nodes,
                    ]);
                    setAfter(
                      user.user.repositoriesContributedTo.pageInfo.endCursor
                    );
                    setLoading(false);
                    setHasNext(
                      user.user.repositoriesContributedTo.pageInfo.hasNextPage
                    );
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getUserInfo(ctx.params.user as string);
  if (!user.user) {
    return { notFound: true };
  }
  return {
    props: {
      user: user.user,
    },
  };
};

export default User;
