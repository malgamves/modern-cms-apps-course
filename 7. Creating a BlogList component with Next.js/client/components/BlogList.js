import Link from 'next/link'
import styles from '../styles/Home.module.css'

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
                        <h2 className={styles.card}><Link href={{ pathname: `/blog/${post.attributes.slug}` }} passHref>{post.attributes.title}</Link> <p>by {post.attributes.author} on {reformatDate(post.attributes.date)}</p></h2>
                        <p className={styles.description} >{`${truncateSummary(post.attributes.body)}` + '... (more)'} </p>
                    </div>
                ))}

            </div>

        </>
    )
}

export default BlogList