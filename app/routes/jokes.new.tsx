import { type ActionArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const content = form.get("content");
  const name = form.get("name");

  if (typeof content !== "string" || typeof name !== "string") {
    throw new Error("form not submitted correctly.");
  }

  const fields = { content, name };

  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJoke() {
  return (
    <div>
      <p>new joke</p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
