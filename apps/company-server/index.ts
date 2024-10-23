import http from "node:http";

import { httpClient } from "@devsoutinho/commons-http-client";

http
  .createServer(async (_, res) => {
    const githubPayload = await httpClient.get(
      "https://api.github.com/users/omariosouto"
    );

    res.write(JSON.stringify(githubPayload));
    res.end();
  })
  .listen(4000);
