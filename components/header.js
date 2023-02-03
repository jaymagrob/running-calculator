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
        <Link
          variant="button"
          component={NextLink}
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
          href='/pace/negative-split'
        >
          Negative Split
        </Link>
      
        <Link
          variant="button"
          component={NextLink}
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
          href='/pace/positive-split'
        >
          Positive Split
        </Link>
      
        <Link
          variant="button"
          component={NextLink}
          color="text.primary"
          sx={{ my: 1, mx: 1.5 }}
          href='/pace/split-pace'
        >
          Split Pace
        </Link>
      
    </nav>
  </Toolbar>
  )
}
