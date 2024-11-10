import React, { useState } from 'react';

interface ContactFormProps {
  onClose: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/mkgnbnzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setTimeout(onClose, 3000);
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          Poruka je uspješno poslana!
        </h3>
        <p className="text-gray-600">
          Hvala vam na poruci. Odgovorit ćemo vam u najkraćem mogućem roku.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-red-600 mb-2">
          Došlo je do greške
        </h3>
        <p className="text-gray-600 mb-4">
          Nažalost, poruku nije bilo moguće poslati. Molimo pokušajte ponovno ili nas kontaktirajte direktno putem emaila.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Pokušaj ponovno
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ime i Prezime
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                   placeholder-gray-400 shadow-sm 
                   focus:border-green-500 focus:ring-green-500"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                   placeholder-gray-400 shadow-sm 
                   focus:border-green-500 focus:ring-green-500"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Poruka
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                   placeholder-gray-400 shadow-sm 
                   focus:border-green-500 focus:ring-green-500"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-green-600 px-4 py-3 text-white font-medium
                 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                 focus:ring-offset-2 disabled:opacity-50"
      >
        {status === 'sending' ? 'Slanje...' : 'Pošalji poruku'}
      </button>
    </form>
  );
}