import React from 'react'
import _ from 'lodash'
import moment from 'moment-strftime'
import { graphql } from 'gatsby'

import { Layout } from '../components/index'
import { htmlToReact, withPrefix } from '../utils'

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`
const Post = (props) => {
  const [loves, setLoves] = React.useState(0)

  function addLove () {
    const newLoves = loves + 1
    setLoves(newLoves)
  }

  return (
    <Layout {...props}>
      <article className='post post-full'>
        <header className='post-header inner-md'>
          <div className='post-meta'>
            <time className='published' dateTime={moment(_.get(props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>
              {moment(_.get(props, 'pageContext.frontmatter.date', null)).strftime('%A, %B %e, %Y')}
            </time>
          </div>
          <h1 className='post-title'>{_.get(props, 'pageContext.frontmatter.title', null)}</h1>
          {_.get(props, 'pageContext.frontmatter.subtitle', null) && (
           <div className='post-subtitle'>
             {htmlToReact(_.get(props, 'pageContext.frontmatter.subtitle', null))}
           </div>
           )}
        </header>
        {_.get(props, 'pageContext.frontmatter.content_img_path', null) && (
         <div className='post-thumbnail'>
           <img className='thumbnail' src={withPrefix(_.get(props, 'pageContext.frontmatter.content_img_path', null))} alt={_.get(props, 'pageContext.frontmatter.title', null)} />
         </div>
         )}
        <div className='post-content inner-md'>
          {htmlToReact(_.get(props, 'pageContext.html', null))}
          <div className='love'>
            <button onClick={addLove}>
              luv
            </button>
            <div>
              {loves} people loved
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default Post
