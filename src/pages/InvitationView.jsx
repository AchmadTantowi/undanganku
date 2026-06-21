import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, CircularProgress, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MailOpenIcon from '@mui/icons-material/Mail';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { templates, musicList } from '../api/mockData';

export default function InvitationView() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  
  // Guest Name from URL parameter (e.g., &to=Nama+Tamu)
  const guestName = searchParams.get('to') || 'Tamu Kehormatan';

  useEffect(() => {
    const rawData = searchParams.get('data');
    if (!rawData) {
      setError('Data undangan tidak ditemukan. Harap pastikan tautan Anda benar.');
      setLoading(false);
      return;
    }

    try {
      const decodedData = JSON.parse(decodeURIComponent(escape(atob(rawData))));
      setData(decodedData);
      
      const tpl = templates.find((t) => t.id === decodedData.t);
      if (!tpl) {
        setError('Template tidak valid.');
      } else {
        setTemplate(tpl);
      }
    } catch (e) {
      console.error(e);
      setError('Gagal memuat data undangan. Tautan mungkin rusak.');
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Audio setup when data/music is loaded
  useEffect(() => {
    if (data && data.m) {
      const song = musicList.find((m) => m.id === data.m);
      if (song) {
        audioRef.current = new Audio(song.url);
        audioRef.current.loop = true;
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [data]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked by browser policy.', err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error(err));
    }
  };

  if (loading) {
    return (
      <Box className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <CircularProgress size={60} thickness={4} className="text-indigo-600 mb-4" />
        <Typography variant="body1" className="text-slate-600">Memuat Undangan...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <Paper elevation={3} className="p-8 max-w-md text-center rounded-3xl">
          <Typography variant="h5" color="error" className="font-bold mb-4">Ups! Terjadi Kesalahan</Typography>
          <Typography variant="body1" className="text-slate-600 mb-6">{error}</Typography>
          <Button variant="contained" href="/" className="rounded-xl px-6">Kembali ke Beranda</Button>
        </Paper>
      </Box>
    );
  }

  const { theme, category } = template;
  const wording = data.w;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <Box className="min-h-screen relative overflow-hidden flex justify-center items-center py-6 px-4" style={{ background: theme.backgroundColor }}>
      
      {/* Cover / Welcome Screen */}
      {!isOpen && (
        <Box 
          className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8 text-center"
          style={{ 
            background: theme.backgroundColor,
            fontFamily: theme.fontBody,
            color: theme.textColor
          }}
        >
          <Box className="mt-8">
            <Typography variant="overline" className="tracking-widest font-bold text-[11px] uppercase opacity-75">
              {category === 'wedding' ? 'The Wedding of' : category === 'birthday' ? 'Birthday Invitation' : 'Graduation Celebration'}
            </Typography>
            <Typography 
              variant="h3" 
              className="mt-6 mb-4 font-bold"
              style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
            >
              {category === 'wedding' ? `${wording.groomName} & ${wording.brideName}` : category === 'birthday' ? wording.celebrantName : wording.graduateName}
            </Typography>
          </Box>

          <Paper 
            elevation={2} 
            className="p-6 rounded-2xl max-w-sm w-full my-auto flex flex-col items-center shadow-lg"
            style={{ backgroundColor: theme.cardBg }}
          >
            <Typography variant="caption" className="text-slate-400 block uppercase tracking-widest text-[9px] mb-2">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </Typography>
            <Typography variant="h6" className="font-bold text-slate-800 mb-4">
              {guestName}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenInvitation}
              startIcon={<MailOpenIcon />}
              className="rounded-xl px-6 py-2.5 shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
            >
              Buka Undangan
            </Button>
          </Paper>

          <Typography variant="caption" className="opacity-50 mb-8">
            Dibuat secara gratis dengan Undanganku
          </Typography>
        </Box>
      )}

      {/* Main Invitation Page */}
      {isOpen && (
        <Box className="w-full max-w-[500px] relative animate-fade-in">
          
          {/* Floating Audio Controller */}
          <IconButton 
            onClick={toggleMusic} 
            className="fixed bottom-6 right-6 z-40 p-4 shadow-xl text-white transition-transform hover:scale-115"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>

          <Paper 
            elevation={6} 
            className="w-full rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between p-8 min-h-[80vh] py-12 transition-all duration-500"
            style={{ 
              background: theme.backgroundColor,
              fontFamily: theme.fontBody,
              color: theme.textColor
            }}
          >
            {/* Top Divider */}
            <Box className="text-center">
              {theme.dividerStyle === 'floral' && <Typography className="text-3xl" style={{ color: theme.secondaryColor }}>✿ ┈┈┈┈┈┈┈┈ ✿</Typography>}
              {theme.dividerStyle === 'hearts' && <Typography className="text-3xl" style={{ color: theme.secondaryColor }}>♥ ┈┈┈┈┈┈┈┈ ♥</Typography>}
              {theme.dividerStyle === 'gold-line' && <Box className="h-0.5 w-24 mx-auto my-3" style={{ backgroundColor: theme.secondaryColor }} />}
            </Box>

            {/* Content card */}
            <Box 
              className="rounded-2xl p-8 my-8 text-center shadow-md border border-white/40"
              style={{ backgroundColor: theme.cardBg }}
            >
              {category === 'wedding' && (
                <Box>
                  <Typography variant="overline" className="tracking-widest font-bold uppercase text-[12px] text-slate-500">
                    Maha Suci Allah, Kami Mengundang Anda
                  </Typography>
                  <Typography 
                    variant="h3" 
                    className="my-6 font-bold"
                    style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
                  >
                    {wording.groomName} & {wording.brideName}
                  </Typography>
                </Box>
              )}

              {category === 'birthday' && (
                <Box>
                  <Typography variant="overline" className="tracking-widest font-bold uppercase text-[12px] text-slate-500">
                    Let's celebrate the {wording.age ? `${wording.age}th` : ''} Birthday of
                  </Typography>
                  <Typography 
                    variant="h3" 
                    className="my-6 font-bold"
                    style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
                  >
                    {wording.celebrantName}
                  </Typography>
                </Box>
              )}

              {category === 'graduation' && (
                <Box>
                  <Typography variant="overline" className="tracking-widest font-bold uppercase text-[12px] text-slate-500">
                    Syukuran Kelulusan & Wisuda
                  </Typography>
                  <Typography 
                    variant="h3" 
                    className="my-6 font-bold"
                    style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
                  >
                    {wording.graduateName}
                  </Typography>
                  <Typography variant="h6" className="italic font-medium text-slate-600 mb-2">
                    {wording.degree}
                  </Typography>
                  <Typography variant="body2" className="font-bold text-[12px] uppercase tracking-wider text-slate-500 mb-4">
                    {wording.school}
                  </Typography>
                </Box>
              )}

              <Box className="my-6 py-4 border-y border-slate-100/50">
                <Typography variant="body1" className="font-semibold text-[16px] text-slate-700">
                  {formatDate(wording.date)}
                </Typography>
                <Typography variant="body2" className="text-slate-500 mt-1">
                  Waktu: {wording.time}
                </Typography>
              </Box>

              <Box className="my-6">
                <Typography variant="caption" className="text-slate-400 block uppercase tracking-widest text-[10px] mb-1">
                  Tempat / Lokasi
                </Typography>
                <Typography variant="body1" className="font-medium text-[14px]">
                  {wording.location}
                </Typography>
              </Box>

              <Box className="mt-6 pt-6 border-t border-dashed border-slate-200">
                <Typography variant="body2" className="italic text-[13px] text-slate-500">
                  "{wording.message}"
                </Typography>
              </Box>
            </Box>

            {/* Bottom Divider */}
            <Box className="text-center">
              {theme.dividerStyle === 'floral' && <Typography className="text-3xl" style={{ color: theme.secondaryColor }}>✿ ┈┈┈┈┈┈┈┈ ✿</Typography>}
              {theme.dividerStyle === 'hearts' && <Typography className="text-3xl" style={{ color: theme.secondaryColor }}>♥ ┈┈┈┈┈┈┈┈ ♥</Typography>}
              {theme.dividerStyle === 'gold-line' && <Box className="h-0.5 w-24 mx-auto my-3" style={{ backgroundColor: theme.secondaryColor }} />}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
