import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactDetails from './components/ContactDetails';
import Favorites from './components/Favorites';
import CategoryManager from './components/CategoryManager';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">Phonebook</Link>
              </div>
              <div className="flex space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-800">Contacts</Link>
                <Link to="/favorites" className="text-gray-600 hover:text-gray-800">Favorites</Link>
                <Link to="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link>
                <Link to="/add" className="text-gray-600 hover:text-gray-800">Add Contact</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
