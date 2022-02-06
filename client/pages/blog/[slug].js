import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import fetch from 'cross-fetch'

import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

import styles from '../../styles/Home.module.css'

export default function Home({ posts }) {
    function reformatDate(fullDate) {
        const date = new Date(fullDate)
        return date.toDateString().slice(4)
      }
    return (
        <div className={styles.containerblog}>
            <Head>
                <title>{posts.attributes.title}</title>
            </Head>

            <main className={styles.mainblog}>
                <div className={[styles.split, styles.left].join(" ")}>
                    <div className={styles.centered}>
                        <h1 className={styles.title}>
                        {posts.attributes.title}
                        </h1>
                        <p className={styles.descriptionleft}>by {posts.attributes.author}, written on {reformatDate(posts.attributes.date)}</p>

                        <p className={styles.back}>
                            <Link href="/">&larr; go back home</Link>
                        </p>
                    </div>
                </div>

                <div className={[styles.split, styles.right].join(" ")}>
                    <div className={styles.centered}>
                        <ReactMarkdown>{`\`${posts.attributes.body}\``}</ReactMarkdown> 
                    </div>
                </div>
            </main>

        </div>
    )
}


export async function getStaticProps({ ...ctx }) {

    let pageData = []
  
    const client = new ApolloClient({
      link: new HttpLink({ uri: 'http://localhost:1337/graphql', fetch }),
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
                cover {
                  data {
                    id
                    attributes {
                      url
                    }
                    }
                  }
                author
              }
            }
          }
        }
      `,
      variables: { slug: ctx.params.slug },
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
      link: new HttpLink({ uri: 'http://localhost:1337/graphql', fetch }),
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
  