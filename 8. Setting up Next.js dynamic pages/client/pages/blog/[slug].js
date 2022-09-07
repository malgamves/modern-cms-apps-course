
export async function getStaticProps({ ...ctx }) {

    let pageData = []
  
    const client = new ApolloClient({
      link: new HttpLink({ uri: `${server}/graphql`, fetch }),
      cache: new InMemoryCache()
    });
  
    const { data } = await client.query({
      query: gql`
        query {
          posts {
            data {
              id
              attributes {
                title
                date
                body
                slug
                author
              }
            }
          }
        }
      `,

    })
  
  
    for (let index = 0; index < data.posts.data.length; index++) {
      if (data.posts.data[index].attributes.slug === ctx.params.slug) {
        pageData = data.posts.data[index]
      }
    }
  
    return {
      props: {
        posts: pageData,
      },
    }
  }

  export async function getStaticPaths() {
    const client = new ApolloClient({
      link: new HttpLink({ uri: `${server}/graphql`, fetch }),
      cache: new InMemoryCache()
    });
  
    const { data } = await client.query({
      query: gql`
          query {
            posts {
              data {
                id
                attributes {
                  slug
                  author
                }
              }
            }
      }
      `
    })
  
    const paths = data.posts.data.map(post => ({
      params: {
        slug: post.attributes.slug,
        posts: post.attributes
      },
    }))
  
    return {
      paths,
      fallback: false,
    }
  
  
  }


