import React from "react";
import _ from "lodash";
import moment from "moment-strftime";
import { graphql } from "gatsby";

import { Layout } from "../components/index";
import { markdownify, Link, withPrefix, classNames, getPages } from "../utils";

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

const Home = (props) => {
  let display_posts = _.orderBy(
    getPages(props.pageContext.pages, "/posts"),
    "frontmatter.date",
    "desc"
  );

  const [loves, setLoves] = React.useState([]);

  React.useEffect(() => {
    const initialState = display_posts.map((page) => ({
      id: page.name,
      loves: 0,
      isLoved: !!localStorage.getItem(page.name),
    }));

    setLoves(initialState);

    async function fetchData() {
      const response = await fetch(
        "https://netaip.netlify.app/.netlify/functions/get-loves"
      );
      const data = await response.json();

      const newLoves = loves.map((page) => {
        const item = data.find((post) => page.id === post.id);

        if (!item) {
          return page;
        }

        return { ...page, loves: item.loves };
      });

      setLoves(newLoves);
    }

    fetchData();
  }, []);

  function addLove(id) {
    const newLoves = loves.map((page) => {
      if (page.id === id) {
        return { ...page, loves: page.loves + 1, isLoved: true };
      }

      return page;
    });

    localStorage.setItem(id, "liked");
    fetch(`https://netaip.netlify.app/.netlify/functions/add-love?id=${id}`);

    setLoves(newLoves);
  }

  function removeLove(id) {
    const newLoves = loves.map((page) => {
      if (page.id === id) {
        return { ...page, loves: page.loves - 1, isLoved: false };
      }

      return page;
    });

    localStorage.removeItem(id);
    fetch(`https://netaip.netlify.app/.netlify/functions/remove-love?id=${id}`);

    setLoves(newLoves);
  }

  function handleLove(id) {
    if (loves.find((page) => page.id === id)?.isLoved) {
      removeLove(id);
    } else {
      addLove(id);
    }
  }

  return (
    <Layout {...props}>
      {_.get(props, "pageContext.frontmatter.has_intro", null) && (
        <div className="intro">
          <div className="inner-md">
            {_.get(props, "pageContext.frontmatter.intro_content", null) && (
              <div className="intro-text">
                {markdownify(
                  _.get(props, "pageContext.frontmatter.intro_content", null)
                )}
              </div>
            )}
            {_.get(props, "pageContext.frontmatter.intro_actions", null) && (
              <div className="intro-cta">
                {_.map(
                  _.get(props, "pageContext.frontmatter.intro_actions", null),
                  (action, action_idx) => (
                    <Link
                      key={action_idx}
                      to={withPrefix(_.get(action, "url", null))}
                      className={classNames({
                        button:
                          _.get(action, "style", null) === "primary" ||
                          _.get(action, "style", null) === "secondary",
                        "button-secondary":
                          _.get(action, "style", null) === "secondary",
                      })}
                      {...(_.get(action, "new_window", null)
                        ? { target: "_blank", rel: "noopener" }
                        : null)}
                    >
                      {_.get(action, "label", null)}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="post-feed">
        {_.map(display_posts, (post, post_idx) => (
          <article key={post_idx} className="post post-card">
            <div className="post-card-inside">
              {_.get(post, "frontmatter.thumb_img_path", null) && (
                <img
                  className="thumbnail"
                  src={withPrefix(
                    _.get(post, "frontmatter.thumb_img_path", null)
                  )}
                  alt={_.get(post, "frontmatter.title", null)}
                />
              )}
              <div className="post-card-content">
                <header className="post-header">
                  <div className="post-meta"></div>
                  <h2 className="post-title">
                    <Link
                      to={withPrefix(_.get(post, "url", null))}
                      rel="bookmark"
                    >
                      {_.get(post, "frontmatter.title", null)}
                    </Link>
                  </h2>
                </header>
                <div className="post-excerpt">
                  {_.get(post, "frontmatter.excerpt", null) && (
                    <p>
                      <Link
                        to={withPrefix(_.get(post, "url", null))}
                        rel="bookmark"
                      >
                        {_.get(post, "frontmatter.excerpt", null)}
                      </Link>
                    </p>
                  )}
                </div>
                <div className="love">
                  <button onClick={() => handleLove(post.name)}>
                    <i
                      className={`fa-heart ${
                        loves.find((page) => page.id === post.name)?.isLoved
                          ? "fas"
                          : "far"
                      }`}
                    ></i>
                  </button>
                  <div className="how-many-people-liked-this">
                    {loves.find((page) => page.id === post.name)?.loves}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
