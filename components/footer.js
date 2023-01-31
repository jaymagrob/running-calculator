import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      © 2023 Magnus Klein Ltd
      <nav>
        <ul>
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms-of-use">Terms Of Use</Link>
          </li>
          <li>
            <Link href="/sitemap">Sitemap</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}