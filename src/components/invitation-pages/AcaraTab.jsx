import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';

export default function AcaraTab({ wording, template }) {
  const { theme, category } = template;
  const [timeLeft, setTimeLeft] = useState(null);

  const eventDate = wording.date ? new Date(`${wording.date}T00:00:00`) : null;

  useEffect(() => {
    if (!eventDate || isNaN(eventDate.getTime())) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate - now;
      
      if (difference <= 0) {
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [wording.date]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateStr;
    }
  };

  const handleOpenMap = () => {
    if (!wording.location) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wording.location)}`;
    window.open(url, '_blank');
  };

  return (
    <Box 
      className="flex flex-col items-center py-6 px-4 w-full text-center"
      style={{ fontFamily: theme.fontBody, color: theme.textColor }}
    >
      <Typography 
        variant="h4" 
        className="mb-6 font-bold"
        style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
      >
        Waktu & Tempat
      </Typography>

      {/* Countdown Timer */}
      {eventDate && timeLeft && (
        <Paper
          elevation={3}
          className="p-6 mb-8 w-full max-w-sm border border-white/20"
          style={{ 
            backgroundColor: theme.cardBg,
            borderRadius: category === 'birthday' ? '2rem' : '1rem',
          }}
        >
          <Typography variant="overline" className="tracking-wider font-semibold opacity-75 mb-3 block text-slate-500">
            Hitung Mundur Acara
          </Typography>
          
          {timeLeft.expired ? (
            <Typography variant="h6" className="font-bold text-slate-800 animate-pulse">
              🎉 Acara Sedang / Sudah Berlangsung! 🎉
            </Typography>
          ) : (
            <Box className="flex justify-around items-center">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds }
              ].map((item, idx) => (
                <Box key={idx} className="flex flex-col items-center">
                  <Box 
                    className="w-12 h-12 flex items-center justify-center text-lg font-black shadow-inner rounded-xl"
                    style={{ 
                      backgroundColor: theme.primaryColor, 
                      color: '#fff',
                      borderRadius: category === 'birthday' ? '50%' : '0.5rem',
                      fontFamily: theme.fontBody
                    }}
                  >
                    {String(item.val).padStart(2, '0')}
                  </Box>
                  <Typography variant="caption" className="mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      )}

      {/* Details Card */}
      <Paper
        elevation={3}
        className="p-6 w-full max-w-sm border border-white/20 flex flex-col gap-6"
        style={{ 
          backgroundColor: theme.cardBg,
          borderRadius: category === 'birthday' ? '2.5rem' : '1.25rem',
        }}
      >
        {/* Date Row */}
        <Box className="flex items-start text-left gap-4">
          <Box className="p-2.5 rounded-xl shadow-sm text-white" style={{ backgroundColor: theme.primaryColor, borderRadius: category === 'birthday' ? '1.5rem' : '0.5rem' }}>
            <CalendarMonthIcon />
          </Box>
          <Box>
            <Typography variant="caption" className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Tanggal</Typography>
            <Typography variant="body1" className="font-bold text-slate-800 text-[15px]">{formatDate(wording.date)}</Typography>
          </Box>
        </Box>

        {/* Time Row */}
        <Box className="flex items-start text-left gap-4">
          <Box className="p-2.5 rounded-xl shadow-sm text-white" style={{ backgroundColor: theme.primaryColor, borderRadius: category === 'birthday' ? '1.5rem' : '0.5rem' }}>
            <AccessTimeIcon />
          </Box>
          <Box>
            <Typography variant="caption" className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Waktu / Jam</Typography>
            <Typography variant="body1" className="font-semibold text-slate-800 text-[15px]">{wording.time || 'Silakan cek kembali'}</Typography>
          </Box>
        </Box>

        {/* Location Row */}
        <Box className="flex items-start text-left gap-4">
          <Box className="p-2.5 rounded-xl shadow-sm text-white" style={{ backgroundColor: theme.primaryColor, borderRadius: category === 'birthday' ? '1.5rem' : '0.5rem' }}>
            <PlaceIcon />
          </Box>
          <Box className="flex-1">
            <Typography variant="caption" className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Lokasi Acara</Typography>
            <Typography variant="body2" className="text-slate-700 leading-relaxed font-medium text-[13.5px]">{wording.location || 'Silakan cek kembali'}</Typography>
          </Box>
        </Box>

        {/* Google Maps Button */}
        {wording.location && (
          <Button
            variant="outlined"
            onClick={handleOpenMap}
            startIcon={<MapIcon />}
            className="mt-2 w-full py-2.5 font-bold transition-all border-2 text-[13px] hover:scale-102"
            style={{ 
              borderColor: theme.primaryColor, 
              color: theme.primaryColor,
              borderRadius: category === 'birthday' ? '2rem' : '0.75rem'
            }}
          >
            Buka Peta Lokasi (Google Maps)
          </Button>
        )}
      </Paper>
    </Box>
  );
}
