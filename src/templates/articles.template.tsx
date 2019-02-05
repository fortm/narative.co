import React from 'react'

export default props => {
  console.log(props)

  return <div>Articles</div>
}
// import React, { Component } from 'react'

// import { graphql, StaticQuery } from 'gatsby'
// import styled, { css } from 'styled-components'

// import { AuthorAvatar } from '@components/Author'
// import Heading from '@components/Heading'
// import Helmet from '@components/Helmet'
// import Layout from '@components/Layout'
// import { MicrodataBreadcrumb, RichText } from '@components/Media'
// import Img from '@components/Media/Media.Img'
// import Section from '@components/Section'

// import mediaqueries from '@styles/media'
// import { titleCase } from '@utils'
// import { ExIcon } from '../../icons/ui'

// interface PostState {
//   showProgress: boolean
//   contentOffset: number
//   contentHeight: number
// }

// class Post extends Component<IDetailPage, PostState> {
//   narrowSectionRef: React.RefObject<HTMLElement> = React.createRef()
//   article = this.props.pageContext.node
//   relateds = this.props.pageContext.relateds
//   hasCalculatedHeightBefore = false

//   get section() {
//     const prefixParts = this.props.pathContext.node.pathPrefix.split('/')
//     // Return the final prefix (so without the /fr/)
//     return prefixParts[prefixParts.length - 1]
//   }

//   get sectionUrl() {
//     const { location } = this.props
//     // Find the parent URL of this section (stops me having to care about locale URL issues)
//     return location.pathname
//       .split('/')
//       .filter(Boolean)
//       .slice(0, -1)
//       .join('/')
//   }

//   // The author of this article
//   get author() {
//     return this.article.author
//   }

//   render = () => {
//     const { location, ...props } = this.props

//     const article = this.article
//     const color = this.color
//     const sectionUrl = this.sectionUrl
//     const sectionName = titleCase(this.section)

//     return (
//       <Layout navTheme="dark">
//         <StaticQuery
//           query={graphql`
//             query HopperLogo {
//               logo: file(name: { eq: "hopper-logo-coral" }) {
//                 childImageSharp {
//                   fixed(height: 60) {
//                     src
//                   }
//                 }
//               }
//             }
//           `}
//           render={data => (
//             <Microdata
//               article={article}
//               publicationLogo={data.logo.childImageSharp.fixed.src}
//               location={location}
//               sectionName={sectionName}
//               sectionUrl={[location.origin, sectionUrl].join('/')}
//             />
//           )}
//         />
//         <HeroWrap>
//           <Hero as="header">
//             <BackContainer to={this.state.previousPath}>
//               <ExIcon fill="#fff" />
//             </BackContainer>
//             <Title white>{article.title}</Title>
//             <Excerpt white>{article.excerpt}</Excerpt>
//             {article.author && (
//               <AuthorLinkWrap to={this.authorUrl}>
//                 {
//                   <AuthorAvatar
//                     {...article.author}
//                     hasBorder={true}
//                     style={{ marginLeft: 'auto', marginRight: 'auto' }}
//                   />
//                 }
//                 <Byline styles="h3" white>
//                   {article.author && article.author.name + ' - '}
//                   {article.postDate}
//                 </Byline>
//               </AuthorLinkWrap>
//             )}
//             <Media
//               src={article.hero.Article__Hero}
//               start={color[0]}
//               mid={color[1]}
//               end={color[2]}
//             />
//           </Hero>
//         </HeroWrap>
//         <NarrowSection ref={this.narrowSectionRef}>
//           <Content
//             textHighlightColor={textHighlightColor}
//             content={article.body}
//           />
//         </NarrowSection>
//         {/* {this.relateds.length ? (
//           <Footer>
//             <Section>
//               <SectionHeading as="h3">
//                 <FormattedMessage id="post.related" />
//               </SectionHeading>
//               {this.relateds.map(related => (
//                 <CardPost
//                   key={`RelatedPost_${related.id}`}
//                   as={Link}
//                   to={related.path}
//                   title={related.title}
//                   excerpt={related.excerpt}
//                   author={related.author}
//                   createdAt={related.postDate}
//                   media={related.hero.CardPost}
//                 />
//               ))}
//               <Button
//                 as={Link}
//                 to={sectionUrl}
//                 text={<FormattedMessage id="post.relatedCta" />}
//                 width="100%"
//                 style={{ marginTop: '4rem' }}
//               />
//             </Section>
//           </Footer>
//         ) : null} */}
//       </Layout>
//     )
//   }
// }

// export default Post

// const HeroWrap = styled(Section)`
//   ${mediaqueries.tablet`
//     padding: 0;
//     margin-bottom: 3.5rem;
//   `};
// `

// const Hero = styled.header`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 5.5rem;
//   margin-bottom: 0;
//   padding-top: 4rem;
//   padding-bottom: 2rem;
//   z-index: 0;
//   text-align: center;
//   min-height: 100vh;
//   min-height: calc(100vh - 5.5rem);

//   > * {
//     margin-bottom: 0 !important;
//   }

//   > *:not(:first-child) {
//     margin-top: 1.5rem;
//   }

//   ${mediaqueries.desktop_up`
//     margin-top: ${p => p.theme.dimensions.navigationWithMargin};
//     margin-bottom: 11rem;
//     min-height: 52rem;
//     padding-top: 2rem;
//   `};
// `

// const heroContentPadding = css`
//   padding-left: 1.5rem;
//   padding-right: 1.5rem;
// `

// const BackContainer = styled(Link)`
//   position: absolute;
//   right: 20px;
//   top: 30px;

//   ${mediaqueries.tablet_up`
//     display: none;
//   `};
// `

// const Title = styled(Heading.h1)`
//   max-width: 80rem;
//   margin-bottom: 2.5rem;
//   ${heroContentPadding};
// `

// const Excerpt = styled(Heading.h2)`
//   max-width: 54rem;
//   margin-top: 2.5rem;
//   ${heroContentPadding};
// `

// const AuthorLinkWrap = styled(Link)`
//   text-decoration: none;
// `

// const Byline = styled(Heading.h6)`
//   ${heroContentPadding} margin-top: 2.5rem;
//   ${mediaqueries.tablet`
//     font-weight: normal;
//   `};
// `

// const Media = styled(Img).attrs<{ start: string; mid: string; end: string }>(
//   {}
// )`
//   position: absolute !important;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   z-index: -1;
//   border-top-right-radius: ${p => p.theme.borderRadius};
//   border-top-left-radius: ${p => p.theme.borderRadius};

//   img {
//     filter: grayscale(100%) blur(8px);
//   }

//   &::before {
//     content: '';
//     top: 0;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     position: absolute;
//     z-index: 1;
//     background: linear-gradient(
//       159.86deg,
//       ${p => p.start} 3.35%,
//       ${p => p.mid} 50.7%,
//       ${p => p.end} 104.07%
//     );
//   }
// `

// const NarrowSection = styled(Section)`
//   max-width: ${p => p.theme.dimensions.narrowContainer};
//   padding-bottom: 4.5rem;

//   ${mediaqueries.desktop_up`
//     padding-bottom: 10rem;
//   `};
// `

// const Content = styled(RichText).attrs<{ textHighlightColor: string }>({})`
//   position: relative;
//   margin-bottom: 4.5rem;

//   ${mediaqueries.desktop_up`
//     margin-bottom: 9.5rem;
//   `} * {
//     &::selection {
//       background: ${p => p.textHighlightColor};
//     }

//     &::-moz-selection {
//       background: ${p => p.textHighlightColor};
//     }
//   }

//   *:last-child {
//     margin-bottom: 0;
//   }
// `

// const Footer = styled.footer`
//   background-color: ${p => p.theme.colors.grey.lightest};
//   padding-top: 5.5rem;
//   padding-bottom: 5.5rem;

//   ${mediaqueries.desktop_up`
//     padding-top: 13rem;
//     padding-bottom: 13rem;

//     nav {
//       margin-top: 5rem;
//     }
//   `};
// `

// const Microdata = ({
//   article: { title, excerpt, author, hero, postDate },
//   location,
//   publicationLogo,
//   sectionName,
//   sectionUrl,
// }: {
//   article: IArticleNode
//   location: Location
//   publicationLogo: string
//   sectionName: string
//   sectionUrl: string
// }) => {
//   let isoDateStr
//   try {
//     isoDateStr = new Date(postDate!).toISOString()
//   } catch (error) {
//     // Now all browsers can parse our date string. That's fine. The crawler can
//     console.log(error)
//   }

//   return (
//     <>
//       <MicrodataBreadcrumb
//         levels={[
//           {
//             name: sectionName,
//             item: sectionUrl,
//           },
//           { name: title, item: location.href },
//         ]}
//       />
//       <Helmet
//         title={title}
//         description={excerpt}
//         image={hero.Article__Hero.src}
//       >
//         <script type="application/ld+json">
//           {`
//           {
//             "@context": "https://schema.org",
//             "@type": "NewsArticle",
//             "mainEntityOfPage": {
//               "@type": "WebPage",
//               "@id": "${location.href}"
//             },
//             "headline": "${title}",
//             "image": "${hero.Article__Hero.src}",
//             "datePublished": "${isoDateStr}",
//             "dateModified": "${isoDateStr}",
//             "author": {
//               "@type": "Person",
//               "name": "${author ? author.name : 'Hopper Editors'}"
//             },
//             "publisher": {
//               "@type": "Organization",
//               "name": "Hopper",
//               "logo": {
//                 "@type": "ImageObject",
//                 "url": "${location.origin + publicationLogo}"
//               }
//             },
//             "description": "${excerpt}"
//           }
//         `}
//         </script>
//       </Helmet>
//     </>
//   )
// }
