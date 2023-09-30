import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Error("Joke not found");
  }
  return json({ joke });
};

export default function Joke() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} permalink</Link>
    </div>
  );
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">
      There was an error loading joke by the id "${jokeId}". Sorry. There was an
    </div>
  );
}
