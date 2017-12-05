function extractMeta(string) {
  const [_, rawMeta, content] = string.split('---\n');
  const meta = rawMeta
    .trim()
    .split('\n')
    .map(line => line.split(': '))
    .reduce(
      (metaData, [key, value]) => ({
        ...metaData,
        [key]: value
      }),
      {}
    );

  return { content, meta };
}

module.exports = extractMeta;
