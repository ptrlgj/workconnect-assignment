import { createSerializer, parseAsInteger } from "nuqs";

/** 1-based page; clearOnDefault drops `?page=1` from the URL. */
export const pageParser = parseAsInteger.withDefault(1).withOptions({ history: "push" });

/** Call with a pathname base, otherwise page 1 serializes to `""`. */
export const serializeListParams = createSerializer({ page: pageParser });

export const clampPage = (page: number, pageCount: number) =>
  Math.min(Math.max(page, 1), pageCount);
