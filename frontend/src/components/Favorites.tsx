import React, { useEffect, useState } from 'react';
import { getContacts, toggleFavorite } from '../api';
import { Contact } from '../types';
import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const Favorites: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data.filter(c => c.isFavorite));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleToggleFavorite = async (id: number) => {
    try {
      await toggleFavorite(id);
      // Remove from favorites list if unfavorited
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Favorite Contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{contact.name}</h2>
              <IconButton onClick={() => handleToggleFavorite(contact.id)}>
                {contact.isFavorite ? <Star className="text-yellow-500" /> : <StarBorder />}
              </IconButton>
            </div>
            <p className="text-gray-600">{contact.phoneNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
