import { expect, test } from "vitest";
// TODO:@/のように読みたい
import { db } from "../../utils/db.server";
import { faker } from "@faker-js/faker";

// このファイルでuser CRUDまとめてやる
// とりあえず通るテストを書く。リファクタリングは後

test("can get user", async () => {
  // テストのたびにuser作られてしまうのでテスト後に削除する
  // db.user.delete実装後テストコードの最後で呼び出す
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
