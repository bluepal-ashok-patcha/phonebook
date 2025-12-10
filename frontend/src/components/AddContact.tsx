import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContact, getCategories } from '../api';
import { Category } from '../types';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddContact: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact({
        name,
        phoneNumber,
        email,
        address,
        isFavorite: false,
        profilePicture: '',
        category: categories.find(c => c.id === categoryId) || null,
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Contact</h1>
      <div className="space-y-4">
        <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value as number)}>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Add Contact</Button>
      </div>
    </form>
  );
};

export default AddContact;
