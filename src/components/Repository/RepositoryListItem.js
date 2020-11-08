import React from "react";
import { useMutation } from "@apollo/client";
import { REPOSITORY_FRAGMENT } from "./fragments";

import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
  WATCH_REPOSITORY,
} from "./queries";

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: "SUBSCRIBED",
  UNSUBSCRIBED: "UNSUBSCRIBED",
};

const RepositoryListItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => {
  const isSubscribed = viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

  const [addStar] = useMutation(STAR_REPOSITORY);
  const [removeStar] = useMutation(UNSTAR_REPOSITORY);
  const [updateSubscription] = useMutation(
    WATCH_REPOSITORY,

    {
      update(
        cache,
        {
          data: {
            updateSubscription: {
              subscribable: { id },
            },
          },
        }
      ) {
        const repository = cache.readFragment({
          id: `Repository:${id}`,
          fragment: REPOSITORY_FRAGMENT,
        });

        const totalCount =
          viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
            ? repository.watchers.totalCount - 1
            : repository.watchers.totalCount + 1;

        cache.writeFragment({
          id: `Repository:${id}`,
          fragment: REPOSITORY_FRAGMENT,
          data: {
            ...repository,
            watchers: {
              ...repository.watchers,
              totalCount,
            },
          },
        });
      },

      optimisticResponse: {
        updateSubscription: {
          __typename: "Mutation",
          subscribable: {
            __typename: "Repository",
            id,
            viewerSubscription: isSubscribed
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
          },
        },
      },
    }
  );

  return (
    <div>
      <h2>
        <a href={url}>{name}</a>
      </h2>

      <button
        onClick={() =>
          updateSubscription({
            variables: {
              id,
              viewerSubscription: isSubscribed
                ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
            },
          })
        }
      >
        {watchers.totalCount} {isSubscribed ? "Unwatch" : "Watch"}
      </button>

      {viewerHasStarred ? (
        <button onClick={() => removeStar({ variables: { id } })}>
          {stargazers.totalCount} Star
        </button>
      ) : (
        <button onClick={() => addStar({ variables: { id } })}>
          {stargazers.totalCount} Unstar
        </button>
      )}
      <div>
        <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
        <div>
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryListItem;
