import { GetStaticProps } from "next";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
}

type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(ep => {
    return {
      id: ep.id,
      title: ep.title,
      members: ep.members,
      publishedAt: format(parseISO(ep.published_at), 'MMM d yy', {locale: enUS}),
      thumbnail: ep.thumbnail,
      description: ep.description,
      duration: Number(ep.file.duration),
      durationAsString: convertDurationToTimeString(Number(ep.file.duration)),
      url: ep.file.url
    }
  })

  return {
    props: {
      episodes: episodes
    },
    revalidate: 60 * 60 * 8
  }
}