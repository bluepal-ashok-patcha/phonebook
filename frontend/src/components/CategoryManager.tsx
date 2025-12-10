import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api';
import { Category } from '../types';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (currentCategory.id) {
        await updateCategory(currentCategory.id, currentCategory);
      } else {
        await createCategory(currentCategory as Omit<Category, 'id'>);
      }
      fetchCategories();
      setOpen(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category Manager</h1>
        <Button variant="contained" onClick={() => { setCurrentCategory({}); setOpen(true); }}>
          Add Category
        </Button>
      </div>
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
            <span>{category.name}</span>
            <div>
              <IconButton onClick={() => { setCurrentCategory(category); setOpen(true); }}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(category.id)}>
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentCategory.id ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={currentCategory.name || ''}
            onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Icon"
            fullWidth
            value={currentCategory.icon || ''}
            onChange={(e) => setCurrentCategory({ ...currentCategory, icon: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
