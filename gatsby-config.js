require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteTitle: `young's devlog`,
    siteTitleAlt: `young's devlog`,
    siteHeadline: `young's devlog`,
    siteUrl: `https://lxxjn0-dev.netlify.app`,
    siteDescription: `자바 주니어 백엔드 개발자의 학습 내용을 담고있는 블로그입니다.`,
    siteLanguage: `KR`,
    siteImage: `/banner.jpg`,
    author: `lxxjn0`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        formatString: 'MM.DD.YYYY',
        navigation: [
          {
            title: `About`,
            slug: `/about`,
          },
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Tags`,
            slug: `/tags`,
          },
        ],
        externalLinks: [
          {
            name: `Github`,
            url: `https://github.com/lxxjn0`,
          },
          {
            name: `Instagram`,
            url: `https://www.instagram.com/lxxjn0_`,
          },
          {
            name: `Resume`,
            url: `https://lxxjn0-resume.netlify.app/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-144003810-6`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Young's devlog`,
        short_name: `Young's devlog`,
        description: `junior back-end developer's devlog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://lxxjn0-dev.netlify.app',
        sitemap: 'https://lxxjn0-dev.netlify.app/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteTitle
                siteDescription
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) => {
              return allPost.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  title: node.title,
                  description: node.excerpt,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                })
              })
            },
            query: `
              {
                allPost(
                  sort: { fields: date, order: DESC },
                ) {
                  nodes {
                    slug
                    title
                    date(formatString: "YYYY.MM.DD")
                    excerpt
                    description
                    tags {
                      name
                      slug
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'young\'s devlog RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/',
            // optional configuration to specify external rss feed, such as feedburner
            link: 'https://feeds.feedburner.com/gatsby/blog',
          },
        ],
      },
    },
  ],
}
