import Head from "next/head";
import { join } from "path";
import Layout from "../../../../components/Layout";
import { resolveBgJsons } from "../../../../components/utils/backgroundResolver";
import {
  getAllPaths,
  getMarkdownData,
} from "../../../../components/utils/markdownEngine";

const notesDir = join(process.cwd(), "", "modules", "notes", "documentation");

export default function NotePage({ noteData, bgJsons }: any) {
  return (
    <Layout bgJsons={bgJsons}>
      <Head>
        <title>{noteData.tile}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: noteData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPaths(notesDir);
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const bgJsons: string[] = resolveBgJsons();
  const noteData = await getMarkdownData(notesDir, params.id);

  return {
    props: {
      noteData,
      bgJsons,
    },
    revalidate: 1,
  };
}