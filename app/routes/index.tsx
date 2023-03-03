import { LoaderArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { getUserSession } from '~/server/auth.server';

export async function loader({ request }: LoaderArgs) {
  return await getUserSession(request);
}

export default function Index () {
  return <Link to="/login">Login</Link>
}

