import React, { useState, useEffect } from 'react';

// Sample pairings data - you can expand this
const pairings = [
  {
    id: 1,
    theme: "Courage",
    stoic: "You have power over your mind—not outside events. Realize this, and you will find strength.",
    stoicAuthor: "Marcus Aurelius",
    bible: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    bibleRef: "Joshua 1:9"
  },
  {
    id: 2,
    theme: "Discipline",
    stoic: "First say to yourself what you would be; and then do what you have to do.",
    stoicAuthor: "Epictetus",
    bible: "Like a city whose walls are broken through is a person who lacks self-control.",
    bibleRef: "Proverbs 25:28"
  },
  {
    id: 3,
    theme: "Wisdom",
    stoic: "It is impossible for a man to learn what he thinks he already knows.",
    stoicAuthor: "Epictetus",
    bible: "The beginning of wisdom is this: Get wisdom, and whatever you get, get insight.",
    bibleRef: "Proverbs 4:7"
  },
  {
    id: 4,
    theme: "Patience",
    stoic: "How much trouble he avoids who does not look to see what his neighbor says or does.",
    stoicAuthor: "Marcus Aurelius",
    bible: "Be completely humble and gentle; be patient, bearing with one another in love.",
    bibleRef: "Ephesians 4:2"
  },
  {
    id: 5,
    theme: "Perseverance",
    stoic: "The impediment to action advances action. What stands in the way becomes the way.",
    stoicAuthor: "Marcus Aurelius",
    bible: "Let us run with perseverance the race marked out for us.",
    bibleRef: "Hebrews 12:1"
  }
];

export default function SoulStack() {
  const [current, setCurrent] = useState(0);
  const [reflection, setReflection] = useState('');
  const [savedReflections, setSavedReflections] = useState({});

  // Load saved reflections on mount
  useEffect(() => {
    const saved = localStorage.getItem('soulstack-reflections');
    if (saved) {
      setSavedReflections(JSON.parse(saved));
    }
  }, []);

  // Load saved reflection for current pairing
  useEffect(() => {
    const saved = savedReflections[pairings[current].id];
    setReflection(saved || '');
  }, [current, savedReflections]);

  const getTodaysPairing = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return dayOfYear % pairings.length;
  };

  const handleSave = () => {
    const newReflections = {
      ...savedReflections,
      [pairings[current].id]: reflection
    };
    setSavedReflections(newReflections);
    localStorage.setItem('soulstack-reflections', JSON.stringify(newReflections));
  };

  const handleShuffle = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * pairings.length);
    } while (newIndex === current && pairings.length > 1);
    setCurrent(newIndex);
  };

  const handleToday = () => {
    setCurrent(getTodaysPairing());
  };

  const currentPairing = pairings[current];

  return (
    <div className="min-h-screen bg-white p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-2" style={{color: '#a12121'}}>
            SOULSTACK
          </h1>
          <p className="text-lg font-bold" style={{color: '#303438'}}>
            STOIC × BIBLE FLASHCARDS v1.0
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={handleToday}
            className="px-6 py-3 font-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            style={{backgroundColor: '#a12121'}}
          >
            TODAY'S
          </button>
          <button
            onClick={handleShuffle}
            className="px-6 py-3 font-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            style={{backgroundColor: '#303438'}}
          >
            SHUFFLE
          </button>
        </div>

        {/* Main Flashcard */}
        <div className="mb-8">
          <div className="border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8">
            {/* Theme Badge */}
            <div className="inline-block mb-6">
              <div 
                className="px-4 py-2 font-black text-white border-4 border-black text-xl"
                style={{backgroundColor: '#FFD700'}}
              >
                {currentPairing.theme.toUpperCase()}
              </div>
            </div>

            {/* Stoic Quote */}
            <div className="mb-8">
              <div className="border-4 border-black p-6 mb-4" style={{backgroundColor: '#a12121'}}>
                <h2 className="text-white font-black text-xl mb-4">STOIC WISDOM</h2>
                <blockquote className="text-white text-lg leading-relaxed">
                  "{currentPairing.stoic}"
                </blockquote>
                <cite className="text-white font-bold block mt-4 text-right">
                  — {currentPairing.stoicAuthor}
                </cite>
              </div>
            </div>

            {/* Bible Verse */}
            <div>
              <div className="border-4 border-black p-6" style={{backgroundColor: '#303438'}}>
                <h2 className="text-white font-black text-xl mb-4">BIBLICAL TRUTH</h2>
                <blockquote className="text-white text-lg leading-relaxed">
                  "{currentPairing.bible}"
                </blockquote>
                <cite className="text-white font-bold block mt-4 text-right">
                  — {currentPairing.bibleRef}
                </cite>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection Section */}
        <div className="border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8">
          <h3 className="font-black text-2xl mb-4" style={{color: '#a12121'}}>
            REFLECTION
          </h3>
          <p className="font-bold mb-4" style={{color: '#303438'}}>
            How does this speak to you today?
          </p>
          
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full h-32 p-4 border-4 border-black font-mono text-lg resize-none focus:outline-none focus:ring-4 focus:ring-yellow-400"
            style={{backgroundColor: '#f8f8f8'}}
          />
          
          <button
            onClick={handleSave}
            className="mt-4 px-8 py-3 font-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            style={{backgroundColor: '#FFD700', color: '#000'}}
          >
            SAVE REFLECTION
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="font-bold" style={{color: '#303438'}}>
            Build your soul. Stack your habits. Code your clarity.
          </p>
          <p className="text-sm mt-2" style={{color: '#303438'}}>
            Entry Level v1.0 • {current + 1} of {pairings.length}
          </p>
        </div>
      </div>
    </div>
  );
}