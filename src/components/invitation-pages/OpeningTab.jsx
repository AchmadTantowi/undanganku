import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import MailOpenIcon from '@mui/icons-material/Mail';

export default function OpeningTab({ wording, template, guestName, isOpen, handleOpenInvitation }) {
  const { theme, category } = template;

  const titleText = category === 'wedding' 
    ? 'The Wedding of' 
    : category === 'birthday' 
      ? 'Birthday Invitation' 
      : 'Graduation Celebration';

  const celebrantName = category === 'wedding' 
    ? `${wording.groomName} & ${wording.brideName}` 
    : category === 'birthday' 
      ? wording.celebrantName 
      : wording.graduateName;

  return (
    <Box 
      className="flex flex-col items-center justify-between min-h-[75vh] w-full text-center py-6 px-4"
      style={{ fontFamily: theme.fontBody, color: theme.textColor }}
    >
      {/* Decorative Ornaments */}
      <Box className="mt-4 w-full">
        <Typography 
          variant="overline" 
          className="tracking-widest font-bold text-[12px] uppercase opacity-85 block mb-2"
          style={{ letterSpacing: '0.2em' }}
        >
          {titleText}
        </Typography>
        
        {category === 'wedding' && (
          <Typography className="text-xl mb-2 animate-pulse" style={{ color: theme.secondaryColor }}>
            🦋 ✨ 🦋
          </Typography>
        )}
        {category === 'birthday' && (
          <Typography className="text-2xl mb-2 animate-bounce" style={{ color: theme.secondaryColor }}>
            🎈 🎂 🎈
          </Typography>
        )}
        {category === 'graduation' && (
          <Typography className="text-2xl mb-2" style={{ color: theme.secondaryColor }}>
            🎓 ✨ 🎓
          </Typography>
        )}

        <Typography 
          variant="h3" 
          className="mt-4 mb-4 font-bold leading-tight drop-shadow-sm px-2"
          style={{ 
            fontFamily: theme.fontHeader, 
            color: theme.primaryColor,
            fontSize: category === 'wedding' ? '2.5rem' : '2.75rem'
          }}
        >
          {celebrantName}
        </Typography>

        {category === 'graduation' && wording.degree && (
          <Typography variant="h6" className="font-semibold italic opacity-90 -mt-2">
            {wording.degree}
          </Typography>
        )}
      </Box>

      {/* Guest Name Card */}
      <Paper 
        elevation={4} 
        className={`p-6 w-full max-w-sm my-auto flex flex-col items-center shadow-xl border border-white/20`}
        style={{ 
          backgroundColor: theme.cardBg,
          borderRadius: category === 'birthday' ? '2.5rem' : '1.25rem',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Typography 
          variant="caption" 
          className="text-slate-400 block uppercase tracking-widest text-[9px] mb-2 font-bold"
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
        </Typography>
        
        <Typography 
          variant="h5" 
          className="font-extrabold mb-4 px-2 py-1 text-center"
          style={{ 
            color: theme.textColor,
            fontFamily: theme.fontBody 
          }}
        >
          {guestName}
        </Typography>
        
        {!isOpen && (
          <Button
            variant="contained"
            size="large"
            onClick={handleOpenInvitation}
            startIcon={<MailOpenIcon />}
            className="w-full py-3 shadow-md hover:shadow-lg transition-all duration-300 font-bold tracking-wider hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: theme.primaryColor, 
              color: '#fff',
              borderRadius: category === 'birthday' ? '2rem' : '0.75rem',
              fontFamily: theme.fontBody
            }}
          >
            Buka Undangan
          </Button>
        )}
      </Paper>

      {/* Footer info / Date snippet */}
      <Box className="mb-4">
        {isOpen ? (
          <Typography variant="body2" className="opacity-75 font-semibold">
            {wording.date ? new Date(wording.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </Typography>
        ) : (
          <Typography variant="caption" className="opacity-60 text-[10px] uppercase tracking-widest font-semibold">
            Dibuat gratis dengan Undanganku
          </Typography>
        )}
      </Box>
    </Box>
  );
}
