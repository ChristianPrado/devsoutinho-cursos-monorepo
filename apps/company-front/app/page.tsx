"use client";

import { httpClient } from "@devsoutinho/commons-http-client";

export default function Page() {
  httpClient.get("");

  return <h1>Hello, Next.js!</h1>;
}
