import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [photos, setPhotos] = useState([
    { src: 'https://i.postimg.cc/DJdGr5RP/image1.jpg', caption: 'Memory 1' },
    { src: 'https://i.postimg.cc/Q9s9d1V9/image2.jpg', caption: 'Memory 2' },
    { src: 'https://i.postimg.cc/Zv5Wrm8J/image3.jpg', caption: 'Memory 3' },
    { src: 'https://i.postimg.cc/hXkQNHB0/image4.jpg', caption: 'Memory 4' },
    { src: 'https://i.postimg.cc/PCp83dBx/image5.jpg', caption: 'Memory 5' },
    { src: 'https://i.postimg.cc/rKp441j5/image6.jpg', caption: 'Memory 6' },
    { src: 'https://i.postimg.cc/Rqdfqs7M/image7.jpg', caption: 'Memory 7' },
    { src: 'https://i.postimg.cc/14mVxGLb/image8.jpg', caption: 'Memory 8' },
    { src: 'https://i.postimg.cc/6y1vf8bg/image9.jpg', caption: 'Memory 9' },
    { src: 'https://i.postimg.cc/R3wJmXCx/image10.jpg', caption: 'Memory 10' },
    { src: 'https://i.postimg.cc/gXDwXj6M/image11.jpg', caption: 'Memory 11' },
  ]);
  const [timeline, setTimeline] = useState([]);
  const [theme, setTheme] = useState('romantic');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const storedTimeline = localStorage.getItem("timeline");
      const storedTheme = localStorage.getItem("theme");

      if (storedNotes) setNotes(JSON.parse(storedNotes));
      if (storedTimeline) setTimeline(JSON.parse(storedTimeline));
      if (storedTheme) setTheme(storedTheme);
    } catch (e) {
      console.error("Failed to load data", e);
    }
  }, []);

  useEffect(() => { localStorage.setItem("notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("timeline", JSON.stringify(timeline)); }, [timeline]);
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);

  const addNote = (event) => {
    event.preventDefault();
    const note = event.target.note.value.trim();
    if(note) {
      setNotes(prev => [note, ...prev]);
      event.target.note.value = '';
    }
  };

  const addTimeline = (event) => {
    event.preventDefault();
    const date = event.target.date.value;
    const title = event.target.title.value;
    const desc = event.target.desc.value;
    if(date && title) {
      setTimeline(prev => [{ date, title, desc }, ...prev]);
      event.target.date.value = '';
      event.target.title.value = '';
      event.target.desc.value = '';
    }
  };

  const deleteItem = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));

  const toggleHeartAnimation = () => setIsMessageVisible(prev => !prev);

  const exportData = () => {
    const data = { notes, photos, timeline, theme };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "love-scrapbook.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const importedData = JSON.parse(ev.target.result);
        if(importedData.notes) setNotes(importedData.notes);
        if(importedData.photos) setPhotos(importedData.photos);
        if(importedData.timeline) setTimeline(importedData.timeline);
        if(importedData.theme) setTheme(importedData.theme);
      } catch(e) {
        console.error("Failed to import data", e);
      }
    };
    reader.readAsText(file);
  };

  const themes = {
    romantic: 'bg-gradient-to-br from-[#ffdde1] to-[#ee9ca7] text-gray-800',
    light: 'bg-gray-50 text-gray-800',
    dark: 'bg-gray-900 text-gray-200',
  };
  const sectionThemes = {
    romantic: 'bg-white bg-opacity-80 text-gray-800',
    light: 'bg-white text-gray-800',
    dark: 'bg-gray-800 text-gray-200',
  };
  const cardThemes = {
    romantic: 'bg-white text-gray-800',
    light: 'bg-white text-gray-800',
    dark: 'bg-gray-700 text-gray-200',
  };
  const headerThemes = {
    romantic: 'bg-white bg-opacity-80 text-[#e91e63]',
    light: 'bg-white text-gray-800',
    dark: 'bg-gray-800 text-[#ff79c6]',
  };
  const buttonThemes = {
    romantic: 'bg-[#e91e63] hover:bg-[#d81b60] text-white',
    light: 'bg-blue-500 hover:bg-blue-600 text-white',
    dark: 'bg-[#ff79c6] hover:bg-[#d81b60] text-white',
  };

  const ScrapbookSection = ({ title, children }) => (
    <section className={`max-w-4xl mx-auto my-8 p-6 rounded-2xl shadow-xl ${sectionThemes[theme]}`}>
      <h2 className={`text-3xl font-bold mb-4 ${headerThemes[theme]}`}>{title}</h2>
      {children}
    </section>
  );

  return (
    <div className={`min-h-screen font-sans ${themes[theme]}`}>
      <header className={`sticky top-0 z-10 p-4 text-center backdrop-blur-sm ${headerThemes[theme]}`}>
        <h1 className="text-4xl font-bold mb-2">💖 Our Love Scrapbook 💖</h1>
        <label className="text-sm font-medium">
          Theme:
          <select value={theme} onChange={e => setTheme(e.target.value)}
            className={`ml-2 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme==='dark'?'bg-gray-700 text-gray-200':'bg-white text-gray-800'}`}>
            <option value="romantic">Romantic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </header>

      <ScrapbookSection title="Click My Heart!">
        <div className="flex flex-col items-center">
          <motion.button whileTap={{scale:0.9}} animate={{scale:[1,1.1,1]}} transition={{duration:1,repeat:Infinity}}
            className="text-8xl p-4" onClick={toggleHeartAnimation}>❤️</motion.button>
          <AnimatePresence>
            {isMessageVisible && (
              <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}}
                className={`mt-4 p-6 rounded-2xl shadow-lg text-center ${sectionThemes[theme]}`}>
                <p className="text-2xl font-semibold text-pink-600">
                  My heart belongs to you. You are my everything ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrapbookSection>

      <ScrapbookSection title="💌 Love Notes">
        <form onSubmit={addNote} className="flex gap-2 mb-4 flex-wrap">
          <input name="note" placeholder="Write a note..." className="flex-grow p-3 rounded-xl border border-gray-300"/>
          <button type="submit" className={`px-6 py-3 rounded-xl ${buttonThemes[theme]}`}>Add</button>
        </form>
        <AnimatePresence>
          <div className="flex flex-col-reverse gap-3">
            {notes.map((note,index) => (
              <motion.div key={note+index} initial={{opacity:0, y:50}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-50, scale:0.8}}
                className={`p-4 rounded-xl shadow-md flex justify-between ${cardThemes[theme]}`}>
                <p className="flex-grow">{note}</p>
                <button onClick={()=>deleteItem(setNotes,index)} className={`ml-4 px-3 py-1 rounded-full ${buttonThemes[theme]}`}>Delete</button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </ScrapbookSection>

      <ScrapbookSection title="📸 Memories Gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo,index) => (
            <motion.div key={photo.src+index} initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}}
              whileHover={{scale:1.05}} className={`p-4 rounded-xl shadow-md ${cardThemes[theme]}`}>
              <img src={photo.src} alt={photo.caption} className="w-full h-48 object-cover rounded-lg mb-2"/>
              <p className="text-center italic">{photo.caption}</p>
            </motion.div>
          ))}
        </div>
      </ScrapbookSection>

      <ScrapbookSection title="⏳ Our Journey">
        <form onSubmit={addTimeline} className="flex flex-col sm:flex-row gap-2 mb-4 flex-wrap">
          <input name="date" type="date" className="p-3 rounded-xl border border-gray-300"/>
          <input name="title" placeholder="Title" className="flex-grow p-3 rounded-xl border border-gray-300"/>
          <input name="desc" placeholder="Description" className="flex-grow p-3 rounded-xl border border-gray-300"/>
          <button type="submit" className={`px-6 py-3 rounded-xl ${buttonThemes[theme]}`}>Add</button>
        </form>
        <AnimatePresence>
          <div className="flex flex-col-reverse gap-3">
            {timeline.map((item,index) => (
              <motion.div key={item.date+index} initial={{opacity:0, y:50}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-50, scale:0.8}}
                className={`p-4 rounded-xl shadow-md ${cardThemes[theme]}`}>
                <h3 className="font-bold text-lg mb-1">{item.date} - {item.title}</h3>
                <p>{item.desc}</p>
                <button onClick={()=>deleteItem(setTimeline,index)} className={`mt-2 px-3 py-1 rounded-full ${buttonThemes[theme]}`}>Delete</button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </ScrapbookSection>

      <ScrapbookSection title="🎶 Background Music">
        <audio controls className="w-full mt-4">
          <source src="https://li.sten.to/k0mpywpq" type="audio/mpeg"/>
        </audio>
      </ScrapbookSection>

      <footer className={`text-center p-6 ${themes[theme]}`}>
        <p className="mb-4">Made with 💖 | Everything saves automatically</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button onClick={exportData} className={`px-6 py-3 rounded-xl ${buttonThemes[theme]}`}>📤 Export</button>
          <label className={`px-6 py-3 rounded-xl ${buttonThemes[theme]}`}>
            <input type="file" accept="application/json" onChange={importData} className="hidden"/>📥 Import
          </label>
        </div>
      </footer>
    </div>
  );
};

export default App;
