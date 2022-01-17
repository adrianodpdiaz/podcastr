import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"
import { api } from "../../services/api";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US"

import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from './episode.module.scss'

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  const router = useRouter();

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>

      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode =  {
      id:data.id,
      title: data.title,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'MMM d yyyy', {locale: enUS}),
      thumbnail: data.thumbnail,
      description: data.description,
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      url: data.file.url
  };

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24    // 24 hours
  }
}