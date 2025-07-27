// frontend/src/components/SalonSignupForm.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if needed

const SalonSignupForm = () => {
  const [form, setForm] = useState({
    salon_name: '',
    contact_email: '',
    country: '',
    city: '',
    styles_offered: [],
    website: '',
    instagram: '',
    image_url: '',
  });

  const [styleInput, setStyleInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => {
        setForm(f => ({
          ...f,
          country: data.country_name || '',
          city: data.city || ''
        }));
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStyleAdd = (e) => {
    e.preventDefault();
    if (styleInput && !form.styles_offered.includes(styleInput)) {
      setForm({ ...form, styles_offered: [...form.styles_offered, styleInput] });
      setStyleInput('');
    }
  };

  const handleStyleRemove = (style) => {
    setForm({ ...form, styles_offered: form.styles_offered.filter(s => s !== style) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('salon_signups').insert([form]);
    if (error) {
      alert('Error submitting form: ' + error.message);
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return <p className="text-green-600 text-center text-lg">🎉 Salon registered successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required name="salon_name" placeholder="Salon Name" value={form.salon_name} onChange={handleChange} className="input" />
      <input name="contact_email" placeholder="Email" value={form.contact_email} onChange={handleChange} className="input" />
      <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="input" />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="input" />

      <div>
        <label className="block mb-1">Styles Offered</label>
        <div className="flex space-x-2">
          <input value={styleInput} onChange={(e) => setStyleInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleStyleAdd(e)} placeholder="e.g., Braids" className="input" />
          <button onClick={handleStyleAdd} className="btn">Add</button>
        </div>
        <div className="flex flex-wrap mt-2 space-x-2">
          {form.styles_offered.map((style) => (
            <span key={style} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm cursor-pointer" onClick={() => handleStyleRemove(style)}>
              {style} &times;
            </span>
          ))}
        </div>
      </div>

      <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="input" />
      <input name="instagram" placeholder="Instagram" value={form.instagram} onChange={handleChange} className="input" />

      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-500 text-center">
        Upload image: Coming soon
      </div>

      <button type="submit" disabled={submitting} className="btn w-full">
        {submitting ? 'Submitting...' : 'Register Salon'}
      </button>
    </form>
  );
};

export default SalonSignupForm;
