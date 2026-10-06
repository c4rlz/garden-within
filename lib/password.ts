/**
 * Compares SHA-256 digests byte by byte, so the check takes the same time
 * however much of the guess is right. Uses Web Crypto rather than node:crypto
 * because middleware (edge runtime) imports auth.ts.
 */
export async function passwordsMatch(given: string, expected: string) {
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all(
    [given, expected].map((s) => crypto.subtle.digest("SHA-256", encoder.encode(s)))
  );
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
