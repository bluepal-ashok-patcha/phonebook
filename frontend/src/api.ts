import axios from 'axios';
import { Contact, Category } from './types';

const API_URL = 'http://localhost:8080/api';

// Contact API calls
export const getContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(`${API_URL}/contacts`);
  return response.data;
};

export const getContact = async (id: number): Promise<Contact> => {
    const response = await axios.get(`${API_URL}/contacts/${id}`);
    return response.data;
}

export const createContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> => {
  const response = await axios.post(`${API_URL}/contacts`, contact);
  return response.data;
}

export const updateContact = async (id: number, contact: Partial<Contact>): Promise<Contact> => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contact);
    return response.data;
}

export const deleteContact = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/contacts/${id}`);
}

export const toggleFavorite = async (id: number): Promise<Contact> => {
  const response = await axios.patch(`${API_URL}/contacts/${id}/favorite`);
  return response.data;
};


// Category API calls
export const getCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
}

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
}

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await axios.put(`${API_URL}/categories/${id}`, category);
    return response.data;
}

export const deleteCategory = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/categories/${id}`);
}
