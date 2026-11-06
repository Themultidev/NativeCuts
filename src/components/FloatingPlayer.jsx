import { useEffect, useRef, useState } from 'react';

export const landingPlaylist = [];

const FloatingPlayer = () => {
  const audioRef = useRef(null);
  const objectUrlRef = useRef('');
  const [track, setTrack] = useState(landingPlaylist[0] || null);
  const [playing, setPlaying] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => () => objectUrlRef.current && URL.revokeObjectURL(objectUrlRef.current), []);

  const toggle = async () => {
    if (!track) { setEditing(true); return; }
    if (playing) audioRef.current?.pause(); else await audioRef.current?.play();
    setPlaying((value) => !value);
  };

  const chooseTrack = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    setTrack({ title: file.name.replace(/\.[^.]+$/, ''), artist: 'Native Cuts', src: objectUrlRef.current });
    setPlaying(false);
    setEditing(false);
  };

  return (
    <aside className={`floating-player ${editing ? 'is-editing' : ''}`} aria-label="Site music player">
      {track && <audio ref={audioRef} src={track.src} loop onEnded={() => setPlaying(false)} />}
      <button className={`player-disc ${playing ? 'is-playing' : ''}`} onClick={toggle} aria-label={playing ? 'Pause site music' : 'Play site music'}>
        <span className="player-disc-ring" /><span className="player-disc-label">NC</span>
      </button>
      <div className="player-copy"><strong>{track?.title || 'Site soundtrack'}</strong>{track && <span>{track.artist}</span>}</div>
      <button className="player-toggle" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      <button className="player-edit" onClick={() => setEditing((value) => !value)}>Change</button>
      {editing && <div className="player-editor"><strong>Change soundtrack</strong><label>Choose audio<input type="file" accept="audio/*" onChange={chooseTrack} /></label></div>}
    </aside>
  );
};

export default FloatingPlayer;
