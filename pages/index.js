import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NextLink from 'next/link';

export default function Home() {
  const cards = [
    { name: 'Split Pace', href: '/pace/split-pace', description: 'Calculate the pacing needed to run to a finish target.' },
    { name: 'Negative Split', href: '/pace/negative-split', description: 'Calculate the pacing needed to run second half faster than the first.' },
    { name: 'Positive Split', href: '/pace/positive-split', description: 'Calculate the pacing needed to run first half faster than the second.' },
  ];

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                  </Typography>
                  <Typography>
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button  size="large" sx={{ textAlign: 'center' }} href={card.href} component={NextLink}>Calculator</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}