import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { PostData } from '../../lib/posts';

type Prop = {
  postData: PostData
}
const Post: FC<Prop> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
export default Post;

export const getStaticPaths: GetStaticPaths = async() => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async({ params }) => {
  let postData: PostData;
  if (typeof params.id === "string") {
    postData = await getPostData(params.id);
  }
  return {
    props: {
      postData,
    },
  };
}

