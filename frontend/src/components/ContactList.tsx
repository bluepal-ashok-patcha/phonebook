import React, { useEffect, useState } from 'react';
import { getContacts, toggleFavorite } from '../api';
import { Contact } from '../types';
import { IconButton, Card, CardContent, Typography, TextField, Pagination } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleToggleFavorite = async (id: number) => {
    try {
      const updatedContact = await toggleFavorite(id);
      setContacts(contacts.map(c => (c.id === id ? updatedContact : c)));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedContacts = filteredContacts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact List
      </Typography>
      <TextField
        label="Search Contacts"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedContacts.map(contact => (
          <Card key={contact.id} sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardContent>
              <div className="flex justify-between items-center">
                <Typography variant="h6">{contact.name}</Typography>
                <IconButton onClick={() => handleToggleFavorite(contact.id)}>
                  {contact.isFavorite ? <Star color="primary" /> : <StarBorder />}
                </IconButton>
              </div>
              <Typography color="textSecondary">{contact.phoneNumber}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          count={Math.ceil(filteredContacts.length / itemsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ContactList;
