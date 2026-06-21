import { templates } from './mockData';

const STORAGE_KEY = 'undanganku_invitations';

// Inisialisasi data dummy awal jika localStorage kosong
const dummyInvitations = [
  {
    id: 'dummy-wedding',
    slug: 'pernikahan-budi-siti',
    templateId: 'wedding-classic',
    musicId: 'romantic-acoustic',
    createdAt: new Date('2026-06-01').toISOString(),
    w: {
      groomName: 'Budi',
      brideName: 'Siti',
      date: '2026-10-10',
      time: '09:00 WIB - Selesai',
      location: 'Gedung Serbaguna Indah, Jl. Mawar No. 12, Jakarta',
      message: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'
    }
  },
  {
    id: 'dummy-graduation',
    slug: 'wisuda-ahmad',
    templateId: 'graduation-formal',
    musicId: 'triumphant-orchestra',
    createdAt: new Date('2026-06-15').toISOString(),
    w: {
      graduateName: 'Ahmad Tantowi, S.Kom',
      degree: 'Sarjana Komputer / Teknik Informatika',
      school: 'Universitas Gadjah Mada',
      date: '2026-08-25',
      time: '08:00 WIB - Selesai',
      location: 'Auditorium UGM, Yogyakarta',
      message: 'Dengan rasa syukur yang mendalam atas selesainya studi akademis, kami mengundang kerabat sekalian untuk hadir di acara syukuran kelulusan kami.'
    }
  }
];

export const initDummyData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyInvitations));
  }
};

export const getInvitations = () => {
  initDummyData();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getInvitationBySlug = (slug) => {
  const invitations = getInvitations();
  return invitations.find((inv) => inv.slug === slug) || null;
};

export const saveInvitation = (invitation) => {
  const invitations = getInvitations();
  const index = invitations.findIndex((inv) => inv.slug === invitation.slug);
  
  const updatedInvitation = {
    ...invitation,
    createdAt: invitation.createdAt || new Date().toISOString()
  };

  if (index !== -1) {
    invitations[index] = updatedInvitation;
  } else {
    invitations.push(updatedInvitation);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invitations));
  return updatedInvitation;
};

export const deleteInvitation = (slug) => {
  const invitations = getInvitations();
  const filtered = invitations.filter((inv) => inv.slug !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
