import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, CircularProgress, IconButton, BottomNavigation, BottomNavigationAction } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// Tab Icons
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// Mock Data
import { templates, musicList } from '../api/mockData';

// Tab Components
import OpeningTab from '../components/invitation-pages/OpeningTab';
import SalamTab from '../components/invitation-pages/SalamTab';
import AcaraTab from '../components/invitation-pages/AcaraTab';
import ReservasiTab from '../components/invitation-pages/ReservasiTab';
import ThanksTab from '../components/invitation-pages/ThanksTab';
import { getInvitationBySlug } from '../api/storage';

export default function InvitationView(props) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation & View State
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  
  // Guest Name from URL parameter (e.g., &to=Nama+Tamu)
  const guestName = searchParams.get('to') || 'Tamu Kehormatan';
  const invitationId = searchParams.get('data') || 'default';

  // Get slug from route parameters if available
  const { slug } = useParams();

  useEffect(() => {
    // If dynamic data is supplied as props (for editor preview mode)
    if (props && props.previewData) {
      setData(props.previewData);
      const tpl = templates.find((t) => t.id === props.previewData.t);
      if (tpl) {
        setTemplate(refineTemplateTheme(tpl));
      } else {
        setError('Template tidak valid.');
      }
      setLoading(false);
      return;
    }

    const rawData = searchParams.get('data');
    
    // Check if we have a slug route parameter
    if (slug) {
      const storedInvitation = getInvitationBySlug(slug);
      if (storedInvitation) {
        const mappedData = {
          t: storedInvitation.templateId,
          m: storedInvitation.musicId,
          w: storedInvitation.w
        };
        setData(mappedData);
        const tpl = templates.find((t) => t.id === storedInvitation.templateId);
        if (tpl) {
          setTemplate(refineTemplateTheme(tpl));
        } else {
          setError('Template tidak valid.');
        }
        setLoading(false);
        return;
      }
    }

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
        setTemplate(refineTemplateTheme(tpl));
      }
    } catch (e) {
      console.error(e);
      setError('Gagal memuat data undangan. Tautan mungkin rusak.');
    } finally {
      setLoading(false);
    }
  }, [searchParams, slug, props]);

  // Helper function to apply styling based on category
  const refineTemplateTheme = (tpl) => {
    const refinedTpl = { ...tpl };
    const category = refinedTpl.category;

    if (category === 'wedding') {
      refinedTpl.theme = {
        primaryColor: '#0284c7', // Elegant Blue (Blue Butterfly)
        secondaryColor: '#f43f5e', // Rose / Floral Accent
        backgroundColor: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', // Pastel Blue Background
        fontHeader: '"Playfair Display", "Cinzel", Georgia, serif',
        fontBody: '"Inter", sans-serif',
        textColor: '#1e3a8a', // Dark Blue text
        cardBg: 'rgba(255, 255, 255, 0.9)',
        dividerStyle: 'floral'
      };
    } else if (category === 'graduation') {
      refinedTpl.theme = {
        primaryColor: '#eab308', // Shiny Gold Accent
        secondaryColor: '#fbbf24', // Amber Gold
        backgroundColor: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', // Dark Emerald Green
        fontHeader: '"Cinzel", serif',
        fontBody: '"Outfit", sans-serif',
        textColor: '#f8fafc', // White/slate light text
        cardBg: 'rgba(6, 78, 59, 0.85)', // Semi-transparent emerald glassmorphism
        dividerStyle: 'gold-line'
      };
    } else if (category === 'birthday') {
      refinedTpl.theme = {
        primaryColor: '#db2777', // Deep pink
        secondaryColor: '#0284c7', // Sea Blue
        backgroundColor: 'linear-gradient(135deg, #fef08a 0%, #7dd3fc 100%)', // Yellow & Light Blue Gradient (Bikini Bottom)
        fontHeader: '"Fredoka", cursive',
        fontBody: '"Quicksand", sans-serif',
        textColor: '#1e3a8a', // Dark Blue text
        cardBg: 'rgba(255, 255, 255, 0.88)',
        dividerStyle: 'hearts'
      };
    }
    return refinedTpl;
  };

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
    setActiveTab(1); // Auto transition to SalamTab after opening
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
        <Typography variant="body1" className="text-slate-600 font-semibold">Memuat Undangan...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <Paper elevation={3} className="p-8 max-w-md text-center rounded-3xl shadow-xl">
          <Typography variant="h5" color="error" className="font-bold mb-4">Ups! Terjadi Kesalahan</Typography>
          <Typography variant="body1" className="text-slate-600 mb-6">{error}</Typography>
          <Button variant="contained" href="/" className="rounded-xl px-6 py-2.5 font-bold">Kembali ke Beranda</Button>
        </Paper>
      </Box>
    );
  }

  const { theme, category } = template;
  const wording = data.w;

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <OpeningTab
            wording={wording}
            template={template}
            guestName={guestName}
            isOpen={isOpen}
            handleOpenInvitation={handleOpenInvitation}
          />
        );
      case 1:
        return <SalamTab wording={wording} template={template} />;
      case 2:
        return <AcaraTab wording={wording} template={template} />;
      case 3:
        return (
          <ReservasiTab
            wording={wording}
            template={template}
            guestName={guestName}
            invitationId={invitationId}
          />
        );
      case 4:
        return <ThanksTab wording={wording} template={template} />;
      default:
        return null;
    }
  };

  return (
    <Box 
      className="h-screen w-screen flex justify-center items-center bg-slate-900 overflow-hidden"
    >
      {/* Mobile Smartphone Frame Simulation Container */}
      <Box 
        className="w-full max-w-md h-full flex flex-col relative shadow-2xl overflow-hidden transition-all duration-500"
        style={{ 
          background: theme.backgroundColor,
          color: theme.textColor,
          fontFamily: theme.fontBody
        }}
      >
        {/* Fullscreen Cover (when closed) */}
        {!isOpen ? (
          <Box className="flex-1 overflow-y-auto flex flex-col justify-center items-center">
            <OpeningTab
              wording={wording}
              template={template}
              guestName={guestName}
              isOpen={isOpen}
              handleOpenInvitation={handleOpenInvitation}
            />
          </Box>
        ) : (
          <>
            {/* Scrollable Content Wrapper */}
            <Box className="flex-1 overflow-y-auto pb-24 pt-4 px-2">
              {/* Divider Decorator Top */}
              <Box className="text-center mt-2 mb-4">
                {theme.dividerStyle === 'floral' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>✿ ┈┈┈┈┈┈┈┈ ✿</Typography>}
                {theme.dividerStyle === 'hearts' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>♥ ┈┈┈┈┈┈┈┈ ♥</Typography>}
                {theme.dividerStyle === 'gold-line' && <Box className="h-0.5 w-24 mx-auto my-3" style={{ backgroundColor: theme.secondaryColor }} />}
              </Box>

              {/* Render Selected Tab Component */}
              <Box className="animate-fade-in">
                {renderTabContent()}
              </Box>

              {/* Divider Decorator Bottom */}
              <Box className="text-center mt-6 mb-2">
                {theme.dividerStyle === 'floral' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>✿ ┈┈┈┈┈┈┈┈ ✿</Typography>}
                {theme.dividerStyle === 'hearts' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>♥ ┈┈┈┈┈┈┈┈ ♥</Typography>}
                {theme.dividerStyle === 'gold-line' && <Box className="h-0.5 w-24 mx-auto my-3" style={{ backgroundColor: theme.secondaryColor }} />}
              </Box>
            </Box>

            {/* Floating Audio Controller (Above Bottom Nav) */}
            <IconButton 
              onClick={toggleMusic} 
              className="absolute bottom-20 right-6 z-40 p-3.5 shadow-lg text-white transition-transform duration-300 hover:scale-110 active:scale-95"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>

            {/* Bottom Navigation Menu */}
            <Paper 
              className="absolute bottom-0 left-0 right-0 z-40 border-t border-slate-100" 
              elevation={8}
              style={{ 
                borderRadius: category === 'birthday' ? '1.5rem 1.5rem 0 0' : '0'
              }}
            >
              <BottomNavigation
                showLabels
                value={activeTab}
                onChange={(event, newValue) => {
                  setActiveTab(newValue);
                }}
                className="h-16"
              >
                <BottomNavigationAction 
                  label="Cover" 
                  icon={<HomeIcon />} 
                  style={{ color: activeTab === 0 ? theme.primaryColor : '#94a3b8' }}
                />
                <BottomNavigationAction 
                  label="Salam" 
                  icon={<FavoriteIcon />} 
                  style={{ color: activeTab === 1 ? theme.primaryColor : '#94a3b8' }}
                />
                <BottomNavigationAction 
                  label="Acara" 
                  icon={<EventIcon />} 
                  style={{ color: activeTab === 2 ? theme.primaryColor : '#94a3b8' }}
                />
                <BottomNavigationAction 
                  label="RSVP" 
                  icon={<HowToRegIcon />} 
                  style={{ color: activeTab === 3 ? theme.primaryColor : '#94a3b8' }}
                />
                <BottomNavigationAction 
                  label="Thanks" 
                  icon={<CardGiftcardIcon />} 
                  style={{ color: activeTab === 4 ? theme.primaryColor : '#94a3b8' }}
                />
              </BottomNavigation>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}
