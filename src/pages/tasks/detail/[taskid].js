import { useRouter } from 'next/router';

export default function Detail() {
  const router = useRouter();

  return <h1>Detail Task {router.query.taskid}</h1>;
}
