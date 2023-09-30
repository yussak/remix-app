import { expect, test } from "vitest";
// TODO:@/のように読みたい
import { db } from "../../utils/db.server";
import { faker } from "@faker-js/faker";

test("can get user", async () => {
  // TODO:faker-jsで書き換える
  //　https://fakerjs.dev/guide/frameworks.html
  const mockUser = {
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    username: faker.person.fullName(),
    passwordHash: faker.internet.password(),
  };
  console.log("mockUserは", mockUser);

  const result = await db.user.findUnique({
    where: { id: mockUser.id },
  });
  console.log("resultは", result);

  // 'result' は 'null' の可能性があります。とあるので必要なら対処
  expect(mockUser.id).toEqual(result.id);
});
