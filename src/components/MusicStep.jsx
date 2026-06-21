import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Paper, Alert } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { musicList, templates } from '../api/mockData';
import { setMusic } from '../store/invitationSlice';

export default function MusicStep() {
  const dispatch = useDispatch();
  const templateId = useSelector((state) => state.invitation.templateId);
  const selectedMusicId = useSelector((state) => state.invitation.musicId);

  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(new Audio());

  const selectedTemplate = templates.find((t) => t.id === templateId);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      audioRef.current.pause();
    };
  }, []);

  if (!selectedTemplate) {
    return (
      <Alert severity="warning" className="rounded-xl">
        Harap pilih template terlebih dahulu pada langkah pertama.
      </Alert>
    );
  }

  const category = selectedTemplate.category;

  // Filter music matching template category, but allow other categories too
  const filteredMusic = [
    ...musicList.filter((m) => m.category === category),
    ...musicList.filter((m) => m.category !== category)
  ];

  const handlePlayToggle = (music) => {
    if (playingId === music.id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = music.url;
      audioRef.current.play()
        .then(() => {
          setPlayingId(music.id);
        })
        .catch(err => console.error("Audio playback error:", err));
    }
  };

  const handleSelect = (musicId) => {
    dispatch(setMusic(musicId));
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" className="font-bold text-slate-800 mb-2">
        Pilih Background Musik
      </Typography>
      <Typography variant="body2" className="text-slate-500 mb-6">
        Pilih lagu yang akan mengiringi tamu Anda ketika mereka membuka undangan.
      </Typography>

      <Paper elevation={0} variant="outlined" className="rounded-2xl overflow-hidden bg-white">
        <List className="divide-y divide-slate-100 p-0">
          {filteredMusic.map((music) => {
            const isSelected = selectedMusicId === music.id;
            const isPlaying = playingId === music.id;
            const isRecommended = music.category === category;

            return (
              <ListItem 
                key={music.id} 
                className={`py-4 transition-colors duration-200 ${
                  isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <IconButton 
                  color={isPlaying ? "secondary" : "primary"}
                  onClick={() => handlePlayToggle(music)}
                  className="mr-3 bg-slate-100 hover:bg-slate-200 p-3"
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <ListItemText
                  primary={
                    <Box className="flex items-center gap-2">
                      <Typography variant="subtitle1" className={`font-semibold ${isSelected ? 'text-indigo-600' : 'text-slate-800'}`}>
                        {music.title}
                      </Typography>
                      {isRecommended && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                          Rekomendasi
                        </span>
                      )}
                    </Box>
                  }
                  secondary={`${music.artist} • ${music.category === 'wedding' ? 'Pernikahan' : music.category === 'birthday' ? 'Ulang Ulang' : 'Kelulusan'}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant={isSelected ? "contained" : "outlined"}
                    color={isSelected ? "primary" : "inherit"}
                    onClick={() => handleSelect(music.id)}
                    className="rounded-xl px-4"
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
}
