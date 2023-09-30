import { expect, test } from "vitest";
// TODO:@/のように読みたい
import { db } from "../../utils/db.server";
import { faker } from "@faker-js/faker";

// このファイルでuser CRUDまとめてやるかもしれない
// とりあえず通るテストを書く。リファクタリングは後

test("can get user", async () => {
  const mockUser = await db.user.create({
    data: {
      username: faker.person.fullName(),
      passwordHash: faker.internet.password(),
    },
  });
  console.log("mockUserは", mockUser);

  const result = await db.user.findUnique({
    where: { id: mockUser.id },
  });
  if (!result) {
    return null;
  }
  console.log("resultは", result);

  expect(mockUser.id).toEqual(result.id);
});
