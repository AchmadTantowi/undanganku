import React from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" className="py-12">
      <Paper elevation={3} className="p-8 rounded-2xl bg-white shadow-xl">
        <Box className="text-center">
          <Typography variant="h3" component="h1" className="font-extrabold text-indigo-600 mb-4">
            Undanganku
          </Typography>
          <Typography variant="h6" className="text-gray-600 mb-6">
            Selamat datang di template aplikasi undangan digital premium.
          </Typography>
          <div className="flex justify-center gap-4">
            <Button variant="contained" color="primary" size="large" className="rounded-xl px-6 py-2">
              Mulai Sekarang
            </Button>
            <Button variant="outlined" color="primary" size="large" className="rounded-xl px-6 py-2">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
