import { expect, test } from "vitest";
// TODO:@/のように読みたい
import { db } from "../../utils/db.server";
import { faker } from "@faker-js/faker";

// このファイルでuser CRUDまとめてやるかもしれない
// とりあえず通るテストを書く。リファクタリングは後

test("can get user", async () => {
  const createUser = await db.user.create({
    data: {
      username: faker.person.fullName(),
      passwordHash: faker.internet.password(),
    },
  });
  console.log("createUserは", createUser);

  const getUser = await db.user.findUnique({
    where: { id: createUser.id },
  });
  if (!getUser) {
    return null;
  }
  console.log("getUserは", getUser);

  expect(createUser.id).toEqual(getUser.id);
});
