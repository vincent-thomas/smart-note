export function fromBuffer(buffer: Buffer): Buffer {
  return JSON.parse(buffer.toString());
}

export function toBuffer(object: unknown): Buffer {
  return Buffer.from(JSON.stringify(object));
}
