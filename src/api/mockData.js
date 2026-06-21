export const templates = [
  {
    id: 'wedding-classic',
    name: 'Classic Elegance',
    category: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60',
    theme: {
      primaryColor: '#6366f1', // Indigo
      secondaryColor: '#f43f5e', // Rose Accent
      backgroundColor: 'linear-gradient(135deg, #fdfbf7 0%, #f5f5f0 100%)',
      fontHeader: '"Playfair Display", Georgia, serif',
      fontBody: '"Inter", sans-serif',
      textColor: '#1f2937',
      cardBg: 'rgba(255, 255, 255, 0.9)',
      dividerStyle: 'floral'
    }
  },
  {
    id: 'wedding-modern',
    name: 'Modern Minimalist',
    category: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=60',
    theme: {
      primaryColor: '#1e293b', // Slate
      secondaryColor: '#b45309', // Amber Accent
      backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontHeader: '"Outfit", sans-serif',
      fontBody: '"Inter", sans-serif',
      textColor: '#0f172a',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      dividerStyle: 'minimal'
    }
  },
  {
    id: 'birthday-party',
    name: 'Neon Retro Party',
    category: 'birthday',
    thumbnail: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&auto=format&fit=crop&q=60',
    theme: {
      primaryColor: '#d946ef', // Fuchsia
      secondaryColor: '#06b6d4', // Cyan Accent
      backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', // Dark Mode neon
      fontHeader: '"Fredoka", cursive',
      fontBody: '"Outfit", sans-serif',
      textColor: '#f8fafc',
      cardBg: 'rgba(30, 41, 59, 0.8)', // Glassmorphism dark
      dividerStyle: 'dots'
    }
  },
  {
    id: 'birthday-cute',
    name: 'Pastel Dream',
    category: 'birthday',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=60',
    theme: {
      primaryColor: '#ec4899', // Pink
      secondaryColor: '#14b8a6', // Teal Accent
      backgroundColor: 'linear-gradient(135deg, #fff1f2 0%, #f0fdfa 100%)',
      fontHeader: '"Quicksand", sans-serif',
      fontBody: '"Inter", sans-serif',
      textColor: '#4c0519',
      cardBg: 'rgba(255, 255, 255, 0.85)',
      dividerStyle: 'hearts'
    }
  },
  {
    id: 'graduation-formal',
    name: 'Royal Scholar',
    category: 'graduation',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60',
    theme: {
      primaryColor: '#1d4ed8', // Royal Blue
      secondaryColor: '#eab308', // Gold Accent
      backgroundColor: 'linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%)',
      fontHeader: '"Cinzel", serif',
      fontBody: '"Inter", sans-serif',
      textColor: '#090d16',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      dividerStyle: 'gold-line'
    }
  }
];

export const musicList = [
  {
    id: 'romantic-acoustic',
    title: 'Acoustic Wedding Love',
    artist: 'Instrumental',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'wedding'
  },
  {
    id: 'sweet-piano',
    title: 'Sweet Piano Romance',
    artist: 'Classical Solo',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    category: 'wedding'
  },
  {
    id: 'party-beat',
    title: 'Retro Upbeat Fun',
    artist: 'SynthWave',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    category: 'birthday'
  },
  {
    id: 'cheerful-acoustic',
    title: 'Happy Kids Birthday',
    artist: 'Ukulele Joy',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    category: 'birthday'
  },
  {
    id: 'triumphant-orchestra',
    title: 'Academic Success',
    artist: 'Symphony Orchestra',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    category: 'graduation'
  }
];
