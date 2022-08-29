import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BlogList from '../components/BlogList'
import fetch from 'cross-fetch'
import { server } from '../config';

import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>a food blog</title>
        <meta name="description" content="a food blog with identity issues" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          this is <Link href="/">a food blog?</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing, im trying to see how far thsi line of text goes so here goes nothing - ok wow it goes so far but i need to see
          ig it can go further. im trying to see how far thsi line of text goes so here goes nothing

        </p>
        <BlogList allBlogs={posts.posts} />
      </main>

      <footer className={styles.footer}>
        <p>
          Hosted on <a href="https://github.com/malgamves">GitHub</a> built by <a href="https://malgamves.dev">Daniel</a>
        </p>
      </footer>
    </div>
  )
}


export async function getStaticProps() {

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
    `
  })


  return {
    props: {
      posts: data,
    },
  }
}
