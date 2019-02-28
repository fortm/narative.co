import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import ButtonArrow from '@components/Button/Button.Arrow'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

import { IArticleNode } from '@typings'

/**
 *  [LONG], [SHORT]
 *  [SHORT], [LONG]
 *  -------
 *  QUOTE PLAEMENT
 *  -------
 *  [SHORT], [LONG]
 */

/**
 * Okay, I know, the Grid is manually setup and we're manually selecting an
 * index from the array of articles... but it's only 8 and it works perfectly fine.
 *
 * TODO: Figure out CSS grid for reverse grid row items and inserting a quote inside.
 */
const ArticlesGrid = ({ articles }: { articles: IArticleNode[] }) => {
  return (
    <>
      <Grid>
        <GridItem article={articles[0]} />
        <GridItem article={articles[1]} narrow />
      </Grid>
      <Grid reverse>
        <GridItem article={articles[2]} narrow />
        <GridItem article={articles[3]} />
      </Grid>
      <HorizontalRule>
        <div>From our clients</div>
      </HorizontalRule>
      <Testimonial />
      <HorizontalRule>
        <div>More from Narative</div>
      </HorizontalRule>
      <Grid>
        <GridItem article={articles[4]} />
        <GridItem article={articles[5]} narrow />
      </Grid>

      {articles[6] && (
        <Grid>
          <GridItem article={articles[6]} narrow />
          <GridItem article={articles[7]} />
        </Grid>
      )}
    </>
  )
}

export default ArticlesGrid

const GridItem = ({ article, narrow }) => {
  if (!article) return null

  const hasOverflow = narrow && article.title.length > 35

  return (
    <ArticleLink to={`/articles/${article.slug}`}>
      <Item>
        <Image background={article.backgroundColor} narrow={narrow}>
          <Media src={article.backgroundImage.fluid} />
        </Image>
        <Title dark hasOverflow={hasOverflow}>
          {article.title}
        </Title>
        <Excerpt narrow={narrow} hasOverflow={hasOverflow}>
          {article.excerpt}
        </Excerpt>
        <TimeToRead>{article.readingTime.text}</TimeToRead>
      </Item>
    </ArticleLink>
  )
}

const Testimonial = () => {
  return (
    <TestimonialGrid>
      <HopperLogo />
      <div>
        <Blockquote to="/articles/building-the-new-hopper-com">
          “Working with Narative on the new Hopper.com has been an absolute
          pleasure. Not only is the team insanely smart and efficient, they’re
          incredible human beings who truly care about the work they touch.”
        </Blockquote>
        <ButtonArrow
          text="Read more"
          color="#000"
          as={Link}
          to="/articles/building-the-new-hopper-com"
        />
      </div>
    </TestimonialGrid>
  )
}

const wide = '1fr'
const narrow = '457px'
const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${p =>
    p.reverse ? `${narrow} ${wide}` : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;
  margin-bottom: 80px;

  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 0;
  `}
`

const Image = styled.div`
  position: relative;
  height: 280px;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
  border-radius: 5px;
  margin-bottom: 30px;
  background-color: ${p => p.background};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    height: 240px;
    margin-bottom: 0;
    box-shadow: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  `}

  ${mediaqueries.phablet`
    height: 200px;
  `}
`

const Item = styled.div`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  `}
`

const Title = styled(Heading.h2)`
  font-size: 22px;
  margin-bottom: ${p => (p.hasOverflow ? '45px' : '10px')};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.tablet`
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 18px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};
  display: ${p => (p.hasOverflow ? 'none' : 'box')};
  max-width: ${p => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.tablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`

const TimeToRead = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.5;

  ${mediaqueries.tablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`

const ArticleLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${Image} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2 {
    color: ${p => p.theme.colors.purple};
  }

  ${mediaqueries.tablet`
    &:hover ${Image} {
      box-shadow: none;
    }

    &:hover h2 {
      color: #000;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`

const TestimonialGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${(195 / 1140) * 100}% ${(945 / 1140) * 100}%;
  grid-template-rows: 1;
  column-gap: 34px;
  margin-bottom: 80px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    padding: 0 20px;
    margin-bottom: 60px;

    & > svg {
      height: 25px;
      width: 94.29px;
      margin-bottom: 15px;
    }
  `}
`

const Blockquote = styled(Link)`
  display: block;
  font-family: ${p => p.theme.fontfamily.serif};
  font-size: 36px;
  font-weight: 500;
  font-style: italic;
  color: rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  max-width: 852px;
  margin-bottom: 30px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #000;
  }

  ${mediaqueries.tablet`
    font-size: 24px;
    margin-bottom: 20px;
  `}
`

const HorizontalRule = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.25);
  margin-bottom: 80px;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.25);
  }

  & > div {
    position: relative;
    display: inline-block;
    background: #fafafa;
    z-index: 0;
    width: ${(230 / 1140) * 100}%;

    ${mediaqueries.tablet`
      width: auto;
      padding-right: 20px;
    `}
  }
`

const HopperLogo = () => (
  <svg
    width="132"
    height="35"
    viewBox="0 0 132 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39.8869 14.3C39.1868 13.7 39.0868 13.6 39.0868 13.4C39.0868 13.3 39.3869 10.4 39.1868 7.7C38.6868 1.4 35.7864 0 34.7862 0C34.6862 0 34.6862 0 34.5862 0.1C34.2861 0.5 34.2861 1.7 34.6862 3.9C34.8862 4.8 35.3863 6.4 35.8864 8.1C36.4864 10 37.0865 11.9 37.2866 13L37.3866 13.2L35.8864 13.7L35.7864 13.5C35.4863 12.7 34.9862 11.5 34.5862 10C33.7861 7.6 32.7859 4.6 31.9858 3.4C31.3857 2.4 30.0855 1.1 29.4855 1.1H29.3854C29.0854 1.2 28.7854 1.5 28.6853 2.1C28.2853 3.7 28.7854 6.7 30.8857 9.7C32.986 12.5 33.9861 14.1 34.0861 14.6L34.1861 14.8L34.0861 14.9C34.0861 14.9 33.686 15.4 33.086 15.4C32.7859 15.4 32.4859 15.3 32.2859 15C27.5852 10.4 22.7845 8.1 18.1839 8.1C15.3835 8.1 13.2832 8.9 12.283 9.4C11.883 9.6 11.5829 9.7 11.3829 9.7C11.1829 9.7 11.1829 9.6 11.0828 9.6C10.9828 9.5 10.9828 9.5 10.9828 9.3C10.9828 8 10.8828 6.5 10.5828 6.1C10.4828 6 10.3827 6 10.2827 6C8.48247 5.9 5.8821 7.2 4.98198 9.1C4.38189 10.2 4.58192 11.3 5.28202 12.4C5.98212 13.4 7.08228 13.4 7.78237 13.5C8.18243 13.5 8.48247 13.6 8.58249 13.8C8.6825 14.1 8.38246 14.2 8.18243 14.5C1.28145 19.9 -0.41879 24.5 0.0812809 26.1C0.181295 26.3 0.281309 26.5 0.481338 26.5C0.681366 26.5 0.78138 26.4 0.981409 26.3C6.38218 21.7 11.883 19.3 17.4838 19.3C27.6852 19.3 34.8862 26.9 36.8865 29.3C37.2866 29.8 37.7866 30.4 38.1867 31C39.2868 32.4 40.387 33.8 41.3871 34.5C42.1873 35 43.0874 35.1 43.4874 34.6C43.7875 34.3 43.8875 33.6 43.6875 32.7C43.2874 30.6 41.3871 28.3 40.087 27C38.9868 25.8 38.5867 25.3 38.6868 24.9C38.7868 24.8 38.7868 24.6 39.0868 24.6C42.2873 23.9 44.1875 22.8 44.4876 21.2C44.9877 18.6 41.3871 15.6 39.8869 14.3ZM71.8915 11.9C68.491 11.9 65.6906 14.5 65.6906 17.6C65.6906 18.3 65.8906 19 66.0907 19.7L66.1907 19.8L66.0907 19.9C65.3906 20.7 64.7905 21.2 64.1904 21.2C62.9902 21.2 62.9902 19.5 62.9902 17.4C62.8902 14.8 62.8902 11.9 60.5899 11.9C57.8895 11.9 55.7892 15.4 54.489 18.4L53.9889 19.4L54.189 16C54.389 12.5 54.489 9.2 54.489 5.9C54.489 2.9 54.389 1.2 54.289 0.8C54.189 0.6 53.5889 0.2 53.0888 0.2C52.7888 0.2 51.6886 0.7 51.4886 0.9C51.2886 1.3 51.0885 5.4 51.0885 9.3C51.0885 18.5 51.6886 22.4 51.7886 22.9V23C51.8886 23.2 52.3887 23.3 52.7888 23.3C53.1888 23.3 53.7889 23.2 53.8889 23L53.9889 22.8C55.0891 19.9 57.1894 15 58.9896 15C59.9898 15 59.9898 16.3 60.0898 17.8C60.1898 20.2 60.2898 23.2 63.5903 23.2C64.7905 23.2 65.9906 22.5 67.0908 21.2L67.2908 21L67.4909 21.2C68.691 22.4 70.3913 23.2 72.1915 23.2C75.692 23.2 78.4924 20.6 78.4924 17.5C78.0924 14.5 75.292 11.9 71.8915 11.9ZM71.8915 21.1C70.2913 21.1 69.0911 19.5 69.0911 17.6C69.0911 15.7 70.3913 14.1 71.8915 14.1C73.4917 14.1 74.7919 15.7 74.7919 17.6C74.7919 19.5 73.4917 21.1 71.8915 21.1ZM85.5934 11.9C84.3933 11.9 83.0931 12.3 82.0929 13L81.7929 13.2L81.6929 12.9C81.5928 12.5 81.5928 12.2 81.5928 12.2C81.4928 12 80.8928 11.9 80.4927 11.9C80.1927 11.9 79.5926 12 79.4926 12.2C79.3925 12.6 78.8925 17.1 78.8925 25.2V25.3C78.9925 25.4 78.9925 25.5 78.9925 25.9C79.0925 29.9 79.3925 33.8 79.5926 34.3C79.7926 34.5 80.8928 35 81.1928 35H81.2928C81.8929 35 82.393 34.6 82.393 34.4C82.393 34.3 82.493 33.9 82.493 31.3V29.3C82.493 27.9 82.393 27 82.393 25.8C82.293 25 82.2929 24.1 82.1929 22.7V22.4L82.493 22.6C83.4931 23.1 84.4933 23.4 85.4934 23.4C88.9939 23.4 91.7943 20.8 91.7943 17.7C91.8943 14.5 89.0939 11.9 85.5934 11.9ZM85.5934 21.1C82.9931 21.1 82.0929 19.3 82.0929 17.6C82.0929 15.5 83.3931 14.1 85.5934 14.1C87.1936 14.1 88.4938 15.7 88.4938 17.6C88.4938 19.5 87.1936 21.1 85.5934 21.1ZM99.3954 11.9C98.1952 11.9 96.895 12.3 95.8949 13L95.5948 13.2L95.4948 12.9C95.3948 12.5 95.3948 12.2 95.3948 12.2C95.2948 12 94.6947 11.9 94.2947 11.9C93.9946 11.9 93.3945 12 93.2945 12.2C93.1945 12.6 92.6944 17.1 92.6944 25.2V25.3C92.7944 25.4 92.7944 25.5 92.7944 25.9C92.8945 29.9 93.1945 33.8 93.3945 34.3C93.5946 34.5 94.6947 35 94.9948 35H95.0948C95.6948 35 96.1949 34.6 96.1949 34.4C96.1949 34.3 96.2949 33.9 96.2949 31.3V29.3C96.2949 27.9 96.1949 27 96.1949 25.8C96.0949 25 96.0949 24.1 95.9949 22.8V22.5L96.2949 22.7C97.2951 23.2 98.2952 23.5 99.2954 23.5C102.796 23.5 105.596 20.9 105.596 17.8C105.696 14.5 102.896 11.9 99.3954 11.9ZM99.3954 21.1C96.795 21.1 95.8949 19.3 95.8949 17.6C95.8949 15.5 97.1951 14.1 99.3954 14.1C100.996 14.1 102.296 15.7 102.296 17.6C102.296 19.5 100.996 21.1 99.3954 21.1ZM131.7 16.2C131.7 16.2 131.6 16.3 131.6 16.4C130.7 18.2 128.8 21.2 127.399 21.2C126.999 21.2 126.799 20.9 126.799 20.5C126.799 20 127.199 19 127.699 17.9C128.099 16.8 128.7 15.6 128.7 14.9C128.7 13.7 127.899 13.1 126.499 13.1C126.399 13.1 123.399 13.1 122.499 12.5L122.399 12.4V12.3C122.399 11.6 122.199 9.8 120.698 9.8C119.898 9.8 119.398 11 119.398 11.6C119.398 13.2 120.198 13.9 120.598 14.1C120.698 14.2 120.698 14.2 120.698 14.2L120.798 14.3L120.698 14.4C120.298 15.9 119.398 17.2 118.998 18C117.598 20 115.898 20.9 113.597 20.9C111.897 20.9 110.597 20 110.197 18.5L110.097 18.1L110.397 18.2C111.297 18.5 112.097 18.6 112.897 18.6C115.098 18.6 117.398 17.5 117.398 15.1C117.398 13.1 115.498 11.6 112.897 11.6C109.497 11.6 106.696 14.2 106.696 17.3C106.696 19.6 108.497 23 113.497 23C117.498 23 119.498 19.4 120.098 18.3L120.198 18.2C120.898 17 121.499 15.5 121.699 14.9L121.799 14.7L121.999 14.8C122.299 14.9 123.699 15.2 124.599 15.2C124.999 15.2 125.299 15.4 125.299 15.8C125.299 15.9 125.199 16 125.199 16.1L125.099 16.2L124.899 16.5C124.399 17.6 123.699 19.2 123.699 20.3C123.699 21.7 124.599 23.1 126.599 23.1C129.4 23.1 131.1 19.6 131.7 18.5L131.8 18.4C131.9 18.1 132 17.7 132 17.2C131.9 16.8 131.8 16.2 131.7 16.2ZM110.097 17.2C110.297 15.5 111.597 14.1 112.897 14.1C114.097 14.1 114.898 14.7 114.898 15.8C114.898 17.1 113.097 17.6 111.597 17.6C110.997 17.6 110.497 17.5 110.197 17.4L109.997 17.3L110.097 17.2Z"
      fill="black"
    />
  </svg>
)
