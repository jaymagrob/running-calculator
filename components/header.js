import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <h1>
        <Link href="/">Runners Calculator</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/pace/split-pace">Split pace</Link>
          </li>
          <li>
            <Link href="/pace/negative-split">Negative split</Link>
          </li>
          <li>
            <Link href="/pace/positive-split">Positive split</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}