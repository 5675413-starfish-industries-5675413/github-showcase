# Catalog

YAML records are the source of truth. JSON syntax is accepted as a YAML subset. Language records match the exact checked-in Linguist baseline. Directory-safe IDs combine a normalized name with the stable upstream numeric language ID. Aliases are metadata, not additional entries.

`schemas/` rejects undeclared fields. A missing example has null paths and commands and a pending demonstration. Format records declare their family, media type, source, recipe, and limitations. Feature records distinguish pending, configured, and demonstrated; demonstrated requires evidence links.

`generated/` is rebuilt with `npm run catalog:build`. Do not edit generated exports manually. Verification fields are derived from matching evidence, never from catalog claims.
