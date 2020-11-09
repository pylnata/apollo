import React from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import { REPOSITORY_FRAGMENT } from "./fragments";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import StarIcon from "@material-ui/icons/Star";
import WatchLaterIcon from "@material-ui/icons/WatchLater";

import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
  WATCH_REPOSITORY,
} from "./queries";

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: "SUBSCRIBED",
  UNSUBSCRIBED: "UNSUBSCRIBED",
};

const useStyles = makeStyles((theme) => ({
  side: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
  title: {
    color: blue[700],
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
  },
  mr: {
    marginRight: 10,
  },
  owner: {
    color: blue[700]
  }
}));

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
  const classes = useStyles();

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
        <a className={classes.title} href={url}>
          {name}
        </a>
      </h2>

      <div className={classes.side}>
        <Button
          startIcon={<WatchLaterIcon />}
          color="secondary"
          variant="contained"
          className={classes.mr}
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
        </Button>

        {viewerHasStarred ? (
          <Button
            startIcon={<StarIcon />}
            color="secondary"
            variant="contained"
            onClick={() => removeStar({ variables: { id } })}
          >
            {stargazers.totalCount} Star
          </Button>
        ) : (
          <Button
            startIcon={<StarIcon />}
            color="secondary"
            variant="contained"
            onClick={() => addStar({ variables: { id } })}
          >
            {stargazers.totalCount} Unstar
          </Button>
        )}
      </div>

      <div className={classes.description}>
        <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />

        <div>
          {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a className={classes.owner} href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryListItem;
