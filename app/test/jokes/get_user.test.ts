import { expect, test } from "vitest";
// TODO:@/のように読みたい
import { db } from "../../utils/db.server";

test("can get user", async () => {
  // TODO:faker-jsで書き換える
  //　https://fakerjs.dev/guide/frameworks.html
  const mockUser = {
    id: "e2872ed6-6b9e-4d88-82bf-0f21734ba555",
    createdAt: "2023-09-30T05:37:31.109Z",
    updatedAt: "2023-09-30T05:37:31.109Z",
    username: "user5",
    passwordHash:
      "$2a$10$.IAF/11dLE9wpmMy1GaejeoxLfMjkdyjHsOCZw07HGxrpAlERXiT6",
  };
  // console.log("mockUserは", mockUser);

  const result = await db.user.findUnique({
    where: { id: "e2872ed6-6b9e-4d88-82bf-0f21734ba555" },
  });
  // console.log("resultは", result);

  // 'result' は 'null' の可能性があります。とあるので必要なら対処
  expect(mockUser.id).toEqual(result.id);
});
