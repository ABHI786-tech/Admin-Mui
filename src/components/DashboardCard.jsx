import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  {
    id: 1,
    title: 'Total Employee',
    description: 'Total employee of the company',
  },
  {
    id: 2,
    title: "Employee's Rights",
    description: 'Employees rights and duties',
  },
  {
    id: 3,
    title: 'Add Employees',
    description: 'Add new employees to the system',
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          sx={{
            flex: 1,
            borderRadius: '24px',
            border: '2px solid',
            borderColor: selectedCard === index ? 'primary.main' : 'grey.300',
            boxShadow: selectedCard === index ? 6 : 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-4px)',
            },
          }}
        >
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            sx={{
              height: '100%',
              borderRadius: '24px',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                {card.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
