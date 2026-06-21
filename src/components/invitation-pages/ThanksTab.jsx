import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function ThanksTab({ wording, template }) {
  const { theme, category } = template;

  const getThanksMessage = () => {
    if (wording && wording.thanksMessage) {
      return wording.thanksMessage;
    }
    switch (category) {
      case 'wedding':
        return 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami berdua.\n\nAtas kehadiran dan doa restunya, kami ucapkan terima kasih.';
      case 'birthday':
        return 'Kehadiran dan doa restu kalian adalah hadiah terbaik untukku!\n\nTerima kasih banyak atas perhatian dan kasih sayang semuanya. Sampai jumpa di pesta ulang tahunku!';
      case 'graduation':
        return 'Kehadiran dan ucapan selamat dari Bapak/Ibu/Saudara/i merupakan kehormatan yang sangat besar bagi kami.\n\nTerima kasih atas segala dukungan, doa, dan kasih sayang yang telah diberikan selama perjalanan akademis ini.';
      default:
        return 'Terima kasih banyak atas perhatian dan dukungan Anda sekalian.\n\nSemoga kita senantiasa diberkahi kebahagiaan.';
    }
  };

  const getCelebrantSignature = () => {
    switch (category) {
      case 'wedding':
        return `${wording.groomName} & ${wording.brideName}`;
      case 'birthday':
        return wording.celebrantName;
      case 'graduation':
        return wording.graduateName;
      default:
        return 'Kami Yang Mengundang';
    }
  };

  const getIllustration = () => {
    switch (category) {
      case 'wedding':
        return 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80';
      case 'birthday':
        return 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format&fit=crop&q=80';
      case 'graduation':
        return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80';
      default:
        return 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80';
    }
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
        Terima Kasih
      </Typography>

      {/* Decorative Image Card */}
      <Paper
        elevation={3}
        className="overflow-hidden mb-8 w-full max-w-sm border border-white/20"
        style={{ 
          borderRadius: category === 'birthday' ? '2.5rem' : '1.25rem',
        }}
      >
        <img 
          src={getIllustration()} 
          alt="Thank you illustration" 
          className="w-full h-44 object-cover"
        />
      </Paper>

      {/* Thank you message paper */}
      <Paper 
        elevation={2}
        className="p-6 w-full max-w-sm mb-6 border border-white/20"
        style={{ 
          backgroundColor: theme.cardBg,
          borderRadius: category === 'birthday' ? '2rem' : '1rem',
        }}
      >
        <Typography 
          variant="body1" 
          className="whitespace-pre-line text-[14px] leading-relaxed text-slate-700"
          style={{ fontFamily: theme.fontBody, color: category === 'graduation' && theme.textColor === '#f8fafc' ? '#e2e8f0' : undefined }}
        >
          {getThanksMessage()}
        </Typography>

        <Box className="mt-8">
          <Typography variant="body2" className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mb-2">
            Kami yang berbahagia,
          </Typography>
          <Typography 
            variant="h4" 
            className="font-bold font-italic"
            style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
          >
            {getCelebrantSignature()}
          </Typography>
        </Box>
      </Paper>

      <Typography variant="caption" className="opacity-50 mt-4 text-[10px] uppercase tracking-wider font-semibold">
        Dibuat dengan ❤️ oleh Undanganku
      </Typography>
    </Box>
  );
}
