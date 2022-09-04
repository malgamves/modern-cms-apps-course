import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import fetch from 'cross-fetch'
import { server } from '../../config';


import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

import styles from '../../styles/Home.module.css'

export default function Blog({ posts }) {
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
													<p>{posts.attributes.body}</p>
                    </div>
                </div>
            </main>

        </div>
    )
}

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


