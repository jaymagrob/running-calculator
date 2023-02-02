import NextLink from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Header() {
  return (
    <Toolbar sx={{ flexWrap: 'wrap' }}>
    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
      <NextLink href="/">Runners Calculator</NextLink>
    </Typography>
    <nav>
      <NextLink href="/pace/split-pace">
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Features
        </Link>
      </NextLink>
      <NextLink href="/pace/negative-split">
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Enterprise
        </Link>
      </NextLink>
      <NextLink href="/pace/positive-split">
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Support
        </Link>
      </NextLink>
    </nav>
  </Toolbar>
  )
}
