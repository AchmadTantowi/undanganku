import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Paper, Box, Grid, Tabs, Tab, Card, 
  CardMedia, CardContent, CardActions, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, InputAdornment, Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { templates, musicList } from '../api/mockData';
import { getInvitationBySlug, saveInvitation } from '../api/storage';
import InvitationView from './InvitationView';

export default function TemplateSelection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [useTemplate, setUseTemplate] = useState(null);
  const [slug, setSlug] = useState('');
  const [slugError, setSlugError] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const filteredTemplates = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const handleUseClick = (tpl) => {
    setUseTemplate(tpl);
    // Generate simple default slug suggest
    const rand = Math.floor(100 + Math.random() * 900);
    setSlug(`${tpl.category}-event-${rand}`);
    setSlugError('');
  };

  const handleSlugSubmit = () => {
    // Validation
    const cleanSlug = slug.trim().toLowerCase();
    if (!cleanSlug) {
      setSlugError('URL kustom tidak boleh kosong.');
      return;
    }

    const slugRegex = /^[a-z0-9-_]+$/;
    if (!slugRegex.test(cleanSlug)) {
      setSlugError('URL hanya boleh berisi huruf kecil, angka, tanda hubung (-), dan garis bawah (_).');
      return;
    }

    // Check uniqueness
    const exists = getInvitationBySlug(cleanSlug);
    if (exists) {
      setSlugError('URL kustom ini sudah digunakan oleh undangan lain. Silakan cari yang lain.');
      return;
    }

    // Inisialisasi wording default berdasarkan kategori
    let wording = {};
    if (useTemplate.category === 'wedding') {
      wording = {
        groomName: 'Andi',
        brideName: 'Sari',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 hari ke depan
        time: '09:00 WIB - Selesai',
        location: 'Gedung Serbaguna Utama, Jl. Raya No. 123, Kota A',
        message: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.'
      };
    } else if (useTemplate.category === 'graduation') {
      wording = {
        graduateName: 'Rian Hidayat, S.T',
        degree: 'Sarjana Teknik / Teknik Elektro',
        school: 'Institut Teknologi Bandung',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '10:00 WIB - Selesai',
        location: 'Aula Barat ITB, Bandung',
        message: 'Dengan rasa syukur atas kelulusan ini, kami dengan hormat mengundang rekan-rekan untuk merayakannya bersama kami.'
      };
    } else {
      wording = {
        celebrantName: 'Rika',
        age: '17',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '15:00 - 18:00 WIB',
        location: 'Kafe Ceria Cozy, Jl. Melati No. 45, Jakarta',
        message: 'Ayo datang dan rayakan hari ulang tahunku yang ke-17! Kehadiranmu akan membuat hari ini sangat spesial.'
      };
    }

    // Cari musik default sesuai kategori template
    const defaultMusic = musicList.find(m => m.category === useTemplate.category) || musicList[0];

    const newInvitation = {
      id: `inv-${Date.now()}`,
      slug: cleanSlug,
      templateId: useTemplate.id,
      musicId: defaultMusic.id,
      w: wording
    };

    saveInvitation(newInvitation);
    setUseTemplate(null);
    navigate(`/editor/${cleanSlug}`);
  };

  // Mock data for previewing template
  const getPreviewMockData = (tpl) => {
    let mockWording = {};
    if (tpl.category === 'wedding') {
      mockWording = {
        groomName: 'Rian', brideName: 'Rina',
        date: '2026-10-10', time: '09:00 WIB - Selesai',
        location: 'Gedung Pernikahan Megah, Jakarta',
        message: 'Kami mengundang Anda untuk merayakan cinta kami.'
      };
    } else if (tpl.category === 'graduation') {
      mockWording = {
        graduateName: 'Ahmad, S.Kom', degree: 'Sarjana Komputer', school: 'Universitas Gadjah Mada',
        date: '2026-08-25', time: '08:00 WIB',
        location: 'Auditorium Utama UGM',
        message: 'Silakan datang dan rayakan kelulusan saya.'
      };
    } else {
      mockWording = {
        celebrantName: 'Budi', age: '17',
        date: '2026-12-05', time: '16:00 WIB',
        location: 'Rumah Kediaman Budi, Jakarta',
        message: 'Yuk hadir merayakan pesta ulang tahunku!'
      };
    }
    const categoryMusic = musicList.find(m => m.category === tpl.category) || musicList[0];
    
    return {
      t: tpl.id,
      w: mockWording,
      m: categoryMusic.id
    };
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex items-center gap-2 mb-6">
        <Button 
          variant="text" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/dashboard')}
          className="rounded-xl text-slate-600 font-bold"
        >
          Kembali ke Dashboard
        </Button>
      </Box>

      <Box className="mb-8 text-center sm:text-left">
        <Typography variant="h4" component="h1" className="font-extrabold text-indigo-600 mb-2">
          Pilih Template Undangan
        </Typography>
        <Typography variant="body1" className="text-slate-500">
          Pilih desain dasar premium yang paling cocok untuk merayakan momen berharga Anda.
        </Typography>
      </Box>

      <Box className="border-b border-slate-200 mb-8">
        <Tabs 
          value={activeCategory} 
          onChange={handleTabChange} 
          aria-label="Filter Kategori" 
          textColor="primary" 
          indicatorColor="primary"
          className="mb-1"
        >
          <Tab value="all" label="Semua Tema" className="font-bold" />
          <Tab value="wedding" label="Pernikahan" className="font-bold" />
          <Tab value="birthday" label="Ulang Tahun" className="font-bold" />
          <Tab value="graduation" label="Kelulusan" className="font-bold" />
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        {filteredTemplates.map((tpl) => (
          <Grid item xs={12} sm={6} md={4} key={tpl.id}>
            <Card className="transition-all duration-300 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 flex flex-col h-full bg-white">
              <CardMedia
                component="img"
                height="220"
                image={tpl.thumbnail}
                alt={tpl.name}
                className="h-56 object-cover"
              />
              <CardContent className="flex-grow">
                <Typography variant="h6" className="font-bold text-slate-800 mb-1">
                  {tpl.name}
                </Typography>
                <Typography variant="caption" className="text-indigo-600 uppercase font-extrabold tracking-wider">
                  {tpl.category === 'wedding' ? 'Pernikahan' : tpl.category === 'birthday' ? 'Ulang Tahun' : 'Kelulusan'}
                </Typography>
              </CardContent>
              <CardActions className="bg-slate-50 p-4 border-t border-slate-100 flex gap-2">
                <Button 
                  variant="outlined" 
                  color="inherit"
                  startIcon={<VisibilityIcon />}
                  onClick={() => setPreviewTemplate(tpl)}
                  className="rounded-xl font-bold flex-1"
                >
                  Preview
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleUseClick(tpl)}
                  className="rounded-xl font-bold flex-1 shadow-sm"
                >
                  Gunakan
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal Dialog Preview Template */}
      {previewTemplate && (
        <Dialog
          open={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ className: 'rounded-3xl overflow-hidden h-[90vh]' }}
        >
          <DialogTitle className="font-bold text-slate-800 flex justify-between items-center bg-slate-50 px-6 py-4 border-b">
            <span>Pratinjau: {previewTemplate.name}</span>
            <Button onClick={() => setPreviewTemplate(null)} color="inherit" className="font-bold">
              Tutup
            </Button>
          </DialogTitle>
          <DialogContent className="p-0 bg-slate-900 flex justify-center items-center overflow-hidden">
            {/* Simulasi guest view dengan query param mockup */}
            <Box className="w-full h-full max-w-md overflow-hidden relative">
              <iframe 
                src={`/invitation?data=${btoa(unescape(encodeURIComponent(JSON.stringify(getPreviewMockData(previewTemplate)))))}&to=Nama+Tamu+Undangan`}
                title="Template Preview"
                className="w-full h-full border-none"
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Dialog Input URL Kustom */}
      {useTemplate && (
        <Dialog
          open={Boolean(useTemplate)}
          onClose={() => setUseTemplate(null)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ className: 'rounded-3xl p-3' }}
        >
          <DialogTitle className="font-bold text-slate-800 pb-1">Tentukan URL Undangan</DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-slate-500 mb-4">
              Masukkan alamat link kustom yang akan digunakan untuk mengakses undangan digital Anda.
            </Typography>
            <TextField
              label="URL Kustom (Slug)"
              variant="outlined"
              fullWidth
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugError('');
              }}
              error={Boolean(slugError)}
              helperText={slugError}
              InputProps={{
                startAdornment: <InputAdornment position="start">undanganku.com/</InputAdornment>,
              }}
              className="bg-slate-50"
            />
            {slugError && (
              <Alert severity="error" className="rounded-xl mt-3 py-1 font-semibold text-xs">
                Link harus unik dan hanya berupa alfanumerik & tanda hubung.
              </Alert>
            )}
          </DialogContent>
          <DialogActions className="px-6 pb-4">
            <Button onClick={() => setUseTemplate(null)} color="inherit" className="rounded-xl">
              Batal
            </Button>
            <Button 
              onClick={handleSlugSubmit} 
              color="primary" 
              variant="contained" 
              className="rounded-xl px-5 font-bold shadow-md"
            >
              Buat & Edit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
