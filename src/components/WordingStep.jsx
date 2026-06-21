import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Stack, Alert } from '@mui/material';
import { templates } from '../api/mockData';
import { updateWording } from '../store/invitationSlice';

export default function WordingStep() {
  const dispatch = useDispatch();
  const templateId = useSelector((state) => state.invitation.templateId);
  const wording = useSelector((state) => state.invitation.wording);

  const selectedTemplate = templates.find((t) => t.id === templateId);

  if (!selectedTemplate) {
    return (
      <Alert severity="warning" className="rounded-xl">
        Harap pilih template terlebih dahulu pada langkah pertama.
      </Alert>
    );
  }

  const handleInputChange = (field) => (event) => {
    dispatch(updateWording({ [field]: event.target.value }));
  };

  const category = selectedTemplate.category;

  return (
    <Box>
      <Typography variant="h5" component="h2" className="font-bold text-slate-800 mb-2">
        Sesuaikan Informasi Undangan
      </Typography>
      <Typography variant="body2" className="text-slate-500 mb-6">
        Isi detail acara Anda di bawah ini untuk ditampilkan di halaman undangan.
      </Typography>

      <Stack spacing={3}>
        {category === 'wedding' && (
          <>
            <TextField
              label="Nama Mempelai Pria"
              variant="outlined"
              fullWidth
              value={wording.groomName || ''}
              onChange={handleInputChange('groomName')}
              placeholder="Contoh: Rian"
            />
            <TextField
              label="Nama Mempelai Wanita"
              variant="outlined"
              fullWidth
              value={wording.brideName || ''}
              onChange={handleInputChange('brideName')}
              placeholder="Contoh: Rina"
            />
          </>
        )}

        {category === 'birthday' && (
          <>
            <TextField
              label="Nama Yang Berulang Tahun"
              variant="outlined"
              fullWidth
              value={wording.celebrantName || ''}
              onChange={handleInputChange('celebrantName')}
              placeholder="Contoh: Budi"
            />
            <TextField
              label="Ulang Tahun Ke-"
              variant="outlined"
              type="number"
              fullWidth
              value={wording.age || ''}
              onChange={handleInputChange('age')}
              placeholder="Contoh: 17"
            />
          </>
        )}

        {category === 'graduation' && (
          <>
            <TextField
              label="Nama Wisudawan / Lulusan"
              variant="outlined"
              fullWidth
              value={wording.graduateName || ''}
              onChange={handleInputChange('graduateName')}
              placeholder="Contoh: Ahmad, S.Kom"
            />
            <TextField
              label="Gelar / Jurusan"
              variant="outlined"
              fullWidth
              value={wording.degree || ''}
              onChange={handleInputChange('degree')}
              placeholder="Contoh: Sarjana Komputer / Teknik Informatika"
            />
            <TextField
              label="Nama Sekolah / Universitas"
              variant="outlined"
              fullWidth
              value={wording.school || ''}
              onChange={handleInputChange('school')}
              placeholder="Contoh: Universitas Gadjah Mada"
            />
          </>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tanggal Acara"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={wording.date || ''}
              onChange={handleInputChange('date')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Waktu / Jam"
              variant="outlined"
              fullWidth
              value={wording.time || ''}
              onChange={handleInputChange('time')}
              placeholder="Contoh: 09:00 WIB - Selesai"
            />
          </Grid>
        </Grid>

        <TextField
          label="Lokasi Acara / Alamat Lengkap"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={wording.location || ''}
          onChange={handleInputChange('location')}
          placeholder="Contoh: Gd. Serbaguna Indah, Jalan Mawar No. 10, Jakarta"
        />

        <TextField
          label="Kalimat Undangan / Pesan Tambahan"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={wording.message || ''}
          onChange={handleInputChange('message')}
          placeholder="Kami mengundang rekan-rekan sekalian untuk datang..."
        />
      </Stack>
    </Box>
  );
}

// Simple Grid helper import since we are using Grid inside
import { Grid } from '@mui/material';
