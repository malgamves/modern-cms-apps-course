import Link from 'next/link'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ReactMarkdown from 'react-markdown'

const BlogList = ({ allBlogs }) => {
    function truncateSummary(content) {
        return content.slice(0, 100).trimEnd()
    }

    function reformatDate(fullDate) {
        const date = new Date(fullDate)
        return date.toDateString().slice(4)
    }

    return (
        <>
            <div className={styles.grid}>
                {allBlogs.data.map(post => (
                    <div key={post.attributes.slug}>
                        {/* <Link href={{ pathname: `/blog/${post.attributes.slug}` }} passHref>
                            <h2>{post.attributes.title} &rarr; {reformatDate(post.attributes.date)}</h2>

                        </Link> */}
                        <p><ReactMarkdown
                            source={truncateSummary(post.attributes.body)}
                        /></p>
                        <h2><Link href={{ pathname: `/blog/${post.attributes.slug}` }} passHref>{post.attributes.title}</Link></h2>
                        <p>{reformatDate(post.attributes.date)}</p>
                    </div>

                    

                ))}

            </div>

            
                    <h2><Link
                href="/split"
                className={styles.card}
                passHref>Examples &rarr;</Link></h2>
            
            
            <p>Discover and deploy boilerplate example Next.js projects. im trying to see how far thsi line of text goes so here goes nothing</p>


            
                    <h2><Link
                href="/split"
                className={styles.card}
                passHref>Deploy &rarr;</Link></h2>
            
            
            <p>
                Instantly deploy your Next.js site to a public URL with Vercel. Just making this longer yeah - how long can this go?
            </p>

        </>
    )
}

export default BlogList
