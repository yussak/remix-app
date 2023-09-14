import { type ActionArgs, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

function validateJokeName(name: string) {
  if (name.length < 3) {
    return "joke name is too short";
  }
}

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return "joke content is too short";
  }
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const content = form.get("content");
  const name = form.get("name");

  if (typeof content !== "string" || typeof name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "form not submitted correctly.",
    });
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };
  const fields = { content, name };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJoke() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <p>new joke</p>
      <form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
              name="name"
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p className="form-validation-error" id="name-error" role="alert">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:{" "}
            <textarea
              name="content"
              aria-invalid={Boolean(actionData?.fieldErrors?.content)}
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              id="content-error"
              role="alert"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
