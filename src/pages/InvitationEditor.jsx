import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Paper, Box, Grid, Tabs, Tab, 
  TextField, Stack, Alert, Snackbar, Dialog, DialogTitle, DialogContent, 
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import { getInvitationBySlug, saveInvitation } from '../api/storage';
import { templates, musicList } from '../api/mockData';
import InvitationView from './InvitationView';

export default function InvitationEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [wording, setWording] = useState({});
  const [selectedMusicId, setSelectedMusicId] = useState('');
  
  // Audio state for previewing music in tab
  const [playingMusicId, setPlayingMusicId] = useState(null);
  const audioRef = useRef(new Audio());

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const data = getInvitationBySlug(slug);
    if (!data) {
      setErrorMsg(`Undangan dengan URL kustom "/${slug}" tidak ditemukan.`);
      return;
    }
    setInvitation(data);
    setWording(data.w || {});
    setSelectedMusicId(data.musicId || '');
    
    return () => {
      audioRef.current.pause();
    };
  }, [slug]);

  if (errorMsg) {
    return (
      <Container maxWidth="md" className="py-12">
        <Alert severity="error" className="rounded-2xl shadow-md p-4">
          <Typography variant="h6" className="font-bold mb-1">Terjadi Kesalahan</Typography>
          <Typography variant="body2" className="mb-4">{errorMsg}</Typography>
          <Button variant="contained" onClick={() => navigate('/dashboard')} className="rounded-xl font-bold">
            Kembali ke Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!invitation) {
    return null;
  }

  const selectedTemplate = templates.find(t => t.id === invitation.templateId);
  const category = selectedTemplate ? selectedTemplate.category : 'wedding';

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field) => (event) => {
    setWording(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = () => {
    const updated = {
      ...invitation,
      musicId: selectedMusicId,
      w: wording
    };
    saveInvitation(updated);
    setSaveSuccess(true);
  };

  const handleMusicPlayToggle = (music) => {
    if (playingMusicId === music.id) {
      audioRef.current.pause();
      setPlayingMusicId(null);
    } else {
      audioRef.current.src = music.url;
      audioRef.current.play()
        .then(() => setPlayingMusicId(music.id))
        .catch(err => console.error(err));
    }
  };

  const handleSelectMusic = (musicId) => {
    setSelectedMusicId(musicId);
  };

  // Render components for each tab
  const renderTabPanel = () => {
    switch (activeTab) {
      case 0: // Wording & Music
        return (
          <Box className="space-y-6">
            <Typography variant="h6" className="font-bold text-slate-800">
              Pilih Background Musik
            </Typography>
            <Paper elevation={0} variant="outlined" className="rounded-2xl overflow-hidden bg-white">
              <List className="divide-y divide-slate-100 p-0">
                {musicList.map((music) => {
                  const isSelected = selectedMusicId === music.id;
                  const isPlaying = playingMusicId === music.id;
                  const isRecommended = music.category === category;

                  return (
                    <ListItem 
                      key={music.id} 
                      className={`py-3 transition-colors duration-200 ${
                        isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <IconButton 
                        color={isPlaying ? "secondary" : "primary"}
                        onClick={() => handleMusicPlayToggle(music)}
                        className="mr-3 bg-slate-100 hover:bg-slate-200"
                      >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                      <ListItemText
                        primary={
                          <Box className="flex items-center gap-2">
                            <Typography variant="subtitle2" className={`font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-800'}`}>
                              {music.title}
                            </Typography>
                            {isRecommended && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                                Rekomendasi
                              </span>
                            )}
                          </Box>
                        }
                        secondary={`${music.artist} • ${music.category === 'wedding' ? 'Pernikahan' : music.category === 'birthday' ? 'Ulang Tahun' : 'Kelulusan'}`}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          variant={isSelected ? "contained" : "outlined"}
                          color={isSelected ? "primary" : "inherit"}
                          onClick={() => handleSelectMusic(music.id)}
                          className="rounded-xl px-4 text-xs font-bold"
                          startIcon={<MusicNoteIcon />}
                        >
                          {isSelected ? 'Terpilih' : 'Pilih'}
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Box>
        );
      case 1: // Opening Tab
        return (
          <Stack spacing={3}>
            <Typography variant="h6" className="font-bold text-slate-800">
              Pengaturan Opening / Sampul
            </Typography>
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
                  placeholder="Contoh: Sarjana Komputer"
                />
                <TextField
                  label="Nama Sekolah / Universitas"
                  variant="outlined"
                  fullWidth
                  value={wording.school || ''}
                  onChange={handleInputChange('school')}
                  placeholder="Contoh: Universitas Indonesia"
                />
              </>
            )}
          </Stack>
        );
      case 2: // Salam Tab
        return (
          <Stack spacing={3}>
            <Typography variant="h6" className="font-bold text-slate-800">
              Pengaturan Halaman Salam & Doa
            </Typography>
            <TextField
              label="Quotes / Doa / Kalimat Salam Pembuka"
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              value={wording.message || ''}
              onChange={handleInputChange('message')}
              placeholder="Tuliskan pesan pembuka atau doa di sini..."
            />
          </Stack>
        );
      case 3: // Acara Tab
        return (
          <Stack spacing={3}>
            <Typography variant="h6" className="font-bold text-slate-800">
              Pengaturan Detail Acara
            </Typography>
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
              label="Alamat Lengkap Tempat Acara"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={wording.location || ''}
              onChange={handleInputChange('location')}
              placeholder="Contoh: Gd. Serbaguna Indah, Jalan Mawar No. 10, Jakarta"
            />
          </Stack>
        );
      case 4: // Thanks / Penutup Tab
        return (
          <Stack spacing={3}>
            <Typography variant="h6" className="font-bold text-slate-800">
              Pengaturan Ucapan Terima Kasih (Thanks)
            </Typography>
            <TextField
              label="Pesan Terima Kasih Penutup"
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              value={wording.thanksMessage || 'Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i sekalian berkenan hadir dan memberikan doa restu.'}
              onChange={handleInputChange('thanksMessage')}
              placeholder="Tuliskan kalimat penutup undangan di sini..."
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  // Pack content for simulation in preview modal
  const getPreviewData = () => {
    return {
      t: invitation.templateId,
      w: wording,
      m: selectedMusicId
    };
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button 
          variant="text" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/dashboard')}
          className="rounded-xl text-slate-600 font-bold"
        >
          Kembali ke Dashboard
        </Button>
        <Box className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => setPreviewOpen(true)}
            className="rounded-xl font-bold flex-1 sm:flex-initial"
          >
            Preview
          </Button>
          <Button 
            variant="contained" 
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            className="rounded-xl font-bold flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 shadow-md"
          >
            Simpan Perubahan
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side: Tabs Nav */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} variant="outlined" className="rounded-3xl p-3 bg-white">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={handleTabChange}
              aria-label="Editor sections"
              sx={{ borderRight: 0 }}
              className="text-left"
            >
              <Tab label="Template & Musik" className="font-bold items-start py-3" />
              <Tab label="Opening / Sampul" className="font-bold items-start py-3" />
              <Tab label="Salam & Pembuka" className="font-bold items-start py-3" />
              <Tab label="Detail Acara" className="font-bold items-start py-3" />
              <Tab label="Ucapan Penutup" className="font-bold items-start py-3" />
            </Tabs>
          </Paper>
        </Grid>

        {/* Right Side: Form Content Panel */}
        <Grid item xs={12} md={9}>
          <Paper elevation={0} variant="outlined" className="rounded-3xl p-6 bg-white min-h-[400px]">
            {renderTabPanel()}
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar notification */}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={4000}
        onClose={() => setSaveSuccess(false)}
        message="Perubahan undangan berhasil disimpan ke Local Storage!"
        className="rounded-xl"
      />

      {/* Preview Dialog */}
      {previewOpen && (
        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{ className: 'rounded-3xl overflow-hidden h-[90vh]' }}
        >
          <DialogTitle className="font-bold text-slate-800 flex justify-between items-center bg-slate-50 px-6 py-4 border-b">
            <span>Pratinjau Hasil Undangan</span>
            <Button onClick={() => setPreviewOpen(false)} color="inherit" className="font-bold">
              Tutup
            </Button>
          </DialogTitle>
          <DialogContent className="p-0 bg-slate-900 flex justify-center items-center overflow-hidden">
            <Box className="w-full h-full max-w-md overflow-hidden relative">
              <iframe 
                src={`/invitation?data=${btoa(unescape(encodeURIComponent(JSON.stringify(getPreviewData()))))}&to=Nama+Tamu+Undangan`}
                title="Live Preview"
                className="w-full h-full border-none"
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}
