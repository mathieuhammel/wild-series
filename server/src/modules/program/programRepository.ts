import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
};

class ProgramRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from program");

    return rows as Program[];
  }
}

export default new ProgramRepository();
