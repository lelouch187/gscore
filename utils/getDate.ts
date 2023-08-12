export default function (msSeconds: string) {
  const date = new Date(Number(msSeconds) * 1000);
  return date.toLocaleDateString('en-US');
}
