import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select, List, ListItem, ListItemText, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ReservasiTab({ wording, template, guestName, invitationId }) {
  const { theme, category } = template;

  // Form State
  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState('hadir');
  const [guestsCount, setGuestsCount] = useState(1);
  const [wishes, setWishes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Comments / Wishes List State
  const [commentsList, setCommentsList] = useState([]);

  // Base key for localStorage
  const storageKey = `rsvp_wishes_${invitationId || 'default'}`;

  // Default wishes based on category
  const getDefaultWishes = () => {
    switch (category) {
      case 'wedding':
        return [
          { name: 'Budi Santoso', attendance: 'hadir', guestsCount: 2, wishes: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin!', date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
          { name: 'Siti Rahma', attendance: 'hadir', guestsCount: 1, wishes: 'Selamat ya! Sangat bahagia melihat kalian bersatu. Semoga awet sampai kakek nenek.', date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() }
        ];
      case 'birthday':
        return [
          { name: 'Agus Wijaya', attendance: 'hadir', guestsCount: 1, wishes: 'Selamat ulang tahun! Semoga makin berprestasi, sehat, dan sukses selalu ya!', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
          { name: 'Diana Putri', attendance: 'tidak_hadir', guestsCount: 0, wishes: 'Happy Birthday! Maaf berhalangan hadir secara langsung, tapi doaku selalu menyertaimu. Selamat bersenang-senang!', date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() }
        ];
      case 'graduation':
        return [
          { name: 'Dr. Indah Lestari', attendance: 'hadir', guestsCount: 1, wishes: 'Selamat atas kelulusan dan gelar barunya! Semoga ilmunya berkah dan sukses di dunia kerja.', date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
          { name: 'Rian Kurniawan', attendance: 'hadir', guestsCount: 2, wishes: 'Congratulations bro! Mantap perjuangan selama ini akhirnya terbayar lunas. Sukses terus!', date: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString() }
        ];
      default:
        return [
          { name: 'Teman Baik', attendance: 'hadir', guestsCount: 1, wishes: 'Selamat atas acaranya! Semoga sukses dan dilancarkan semuanya.', date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() }
        ];
    }
  };

  useEffect(() => {
    // Load existing wishes from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCommentsList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved wishes', e);
        setCommentsList(getDefaultWishes());
      }
    } else {
      const defaultList = getDefaultWishes();
      setCommentsList(defaultList);
      localStorage.setItem(storageKey, JSON.stringify(defaultList));
    }
  }, [storageKey, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !wishes.trim()) return;

    const newComment = {
      name: name.trim(),
      attendance,
      guestsCount: attendance === 'hadir' ? Number(guestsCount) : 0,
      wishes: wishes.trim(),
      date: new Date().toISOString()
    };

    const updatedList = [newComment, ...commentsList];
    setCommentsList(updatedList);
    localStorage.setItem(storageKey, JSON.stringify(updatedList));

    setWishes('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const timeAgo = (dateStr) => {
    try {
      const diff = Date.now() - new Date(dateStr).getTime();
      const mins = Math.floor(diff / 1000 / 60);
      if (mins < 1) return 'Baru saja';
      if (mins < 60) return `${mins} menit yang lalu`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours} jam yang lalu`;
      return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    } catch (e) {
      return '';
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
        Reservasi & Ucapan
      </Typography>

      {/* RSVP Form Card */}
      <Paper
        elevation={3}
        className="p-6 mb-8 w-full max-w-sm border border-white/20 text-left"
        style={{ 
          backgroundColor: theme.cardBg,
          borderRadius: category === 'birthday' ? '2.5rem' : '1.25rem',
        }}
      >
        <Typography variant="h6" className="font-bold text-slate-800 mb-4 text-center">
          Konfirmasi Kehadiran
        </Typography>

        {submitted ? (
          <Box className="flex flex-col items-center py-6 text-center">
            <CheckCircleIcon className="text-emerald-500 text-5xl mb-2" />
            <Typography variant="body1" className="font-bold text-emerald-700">
              Terima Kasih!
            </Typography>
            <Typography variant="body2" className="text-slate-500">
              Ucapan dan konfirmasi kehadiran Anda berhasil dikirim.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Nama Anda"
              variant="outlined"
              fullWidth
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <FormControl component="fieldset">
              <FormLabel component="legend" className="text-[12px] font-bold text-slate-500">Konfirmasi Kehadiran</FormLabel>
              <RadioGroup 
                row 
                value={attendance} 
                onChange={(e) => setAttendance(e.target.value)}
              >
                <FormControlLabel value="hadir" control={<Radio size="small" style={{ color: theme.primaryColor }} />} label="Hadir" />
                <FormControlLabel value="tidak_hadir" control={<Radio size="small" style={{ color: theme.primaryColor }} />} label="Tidak Hadir" />
              </RadioGroup>
            </FormControl>

            {attendance === 'hadir' && (
              <FormControl fullWidth size="small">
                <FormLabel className="text-[12px] font-bold text-slate-500 mb-1">Jumlah Tamu yang Hadir</FormLabel>
                <Select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <MenuItem key={n} value={n}>{n} Orang</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Ucapan / Doa Baik"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Berikan ucapan terbaik Anda di sini..."
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              className="mt-2 py-2.5 font-bold shadow-md hover:scale-102 transition-all"
              style={{ 
                backgroundColor: theme.primaryColor, 
                color: '#fff',
                borderRadius: category === 'birthday' ? '2rem' : '0.75rem'
              }}
            >
              Kirim Ucapan
            </Button>
          </form>
        )}
      </Paper>

      {/* Wishes Scrolling List */}
      <Paper
        elevation={3}
        className="p-6 w-full max-w-sm border border-white/20 text-left"
        style={{ 
          backgroundColor: theme.cardBg,
          borderRadius: category === 'birthday' ? '2.5rem' : '1.25rem',
        }}
      >
        <Typography variant="h6" className="font-bold text-slate-800 mb-4 text-center">
          Daftar Ucapan & Doa ({commentsList.length})
        </Typography>

        <Box className="max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-3 custom-scrollbar">
          {commentsList.length === 0 ? (
            <Typography variant="body2" className="text-slate-400 text-center py-6">
              Belum ada ucapan. Jadilah yang pertama memberikan ucapan!
            </Typography>
          ) : (
            commentsList.map((item, idx) => (
              <Box 
                key={idx} 
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 shadow-sm flex flex-col gap-1.5"
                style={{ 
                  borderRadius: category === 'birthday' ? '1.5rem' : '0.75rem',
                }}
              >
                <Box className="flex justify-between items-center">
                  <Typography variant="body2" className="font-extrabold text-slate-800 text-[13px] truncate">
                    {item.name}
                  </Typography>
                  <Typography variant="caption" className="text-[10px] text-slate-400 font-medium">
                    {timeAgo(item.date)}
                  </Typography>
                </Box>
                
                <Box className="flex gap-2 items-center">
                  <span 
                    className={`text-[9px] px-2 py-0.5 font-bold uppercase rounded-md ${
                      item.attendance === 'hadir' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-rose-50 text-rose-500 border border-rose-100'
                    }`}
                  >
                    {item.attendance === 'hadir' ? 'Hadir' : 'Absen'}
                  </span>
                  {item.attendance === 'hadir' && item.guestsCount > 0 && (
                    <span className="text-[9px] px-2 py-0.5 font-bold uppercase rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                      {item.guestsCount} Orang
                    </span>
                  )}
                </Box>

                <Typography variant="body2" className="text-slate-600 text-[12.5px] leading-relaxed italic mt-1 break-words">
                  "{item.wishes}"
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
}
