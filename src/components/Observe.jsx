import { useEffect, useRef, useState } from 'react';

const VIEWS = ['Front', 'Side', 'Back'];
const MOODS = {
  Calm: ['Low taper', 'Classic low cut', 'Soft fade'],
  Burti: ['Burst fade', 'Textured burst', 'Curved burst'],
  Rough: ['Rugged crop', 'Sharp drop fade', 'Natural twist fade'],
};

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.5 6.5 10 4.8h4l1.5 1.7H18a3 3 0 0 1 3 3v7.2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3h2.5Z" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
);

const Observe = ({ compact = false }) => {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState('Calm');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

  const startCamera = async () => {
    setError('');
    setOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setError('Camera access was unavailable. You can upload each view instead.');
    }
  };

  const capture = () => {
    const video = videoRef.current;
    if (!video?.videoWidth || photos.length === 3) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    setPhotos((current) => [...current, canvas.toDataURL('image/jpeg', 0.86)]);
  };

  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file || photos.length === 3) return;
    const reader = new FileReader();
    reader.onload = () => setPhotos((current) => [...current, reader.result]);
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const close = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setOpen(false);
  };

  const observe = () => {
    const pool = MOODS[mood];
    setRecommendation(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <section className={`observe ${compact ? 'observe-compact' : ''}`} aria-labelledby="observe-title">
      {compact && <div className="observe-compact-label"><strong>Observe</strong><span>Let Native choose a hairstyle for you.</span></div>}
      <div className="observe-copy">
        <p className="observe-kicker">Native vision</p>
        <h2 id="observe-title">Let Native pick your next look.</h2>
        <p>Take three quick views, choose an energy, and let Observe select the style—no scrolling required.</p>
      </div>

      <div className="observe-console">
        <button className="observe-lens" onClick={startCamera} aria-label="Open camera for Observe">
          <CameraIcon /><span>Observe</span>
        </button>

        <div className="observe-cards" aria-label="Observe photo guide">
          {VIEWS.map((view, index) => (
            <button key={view} className="observe-card" onClick={startCamera}>
              <span className="observe-card-face observe-card-front">
                <b>0{index + 1}</b><strong>{view}</strong><small>{photos[index] ? 'Captured ✓' : 'Tap to capture'}</small>
              </span>
              <span className="observe-card-face observe-card-back">
                {photos[index] ? <img src={photos[index]} alt={`${view} view`} /> : <><CameraIcon /><small>Keep your head in frame</small></>}
              </span>
            </button>
          ))}
        </div>

        <div className="observe-moods">
          <span>Choose your energy</span>
          <div role="group" aria-label="Observe mood">
            {Object.keys(MOODS).map((item) => (
              <button key={item} className={mood === item ? 'active' : ''} onClick={() => { setMood(item); setRecommendation(''); }}>{item}</button>
            ))}
          </div>
          <button className="observe-submit" disabled={photos.length < 3} onClick={observe}>
            {photos.length < 3 ? `${3 - photos.length} views to go` : 'Find my look'}
          </button>
        </div>
      </div>

      {recommendation && (
        <div className="observe-result" role="status">
          <span>Native picked</span><strong>{recommendation}</strong><button onClick={startCamera}>Retake views</button>
        </div>
      )}

      {open && (
        <div className="camera-modal" role="dialog" aria-modal="true" aria-label="Observe camera">
          <div className="camera-panel">
            <button className="camera-close" onClick={close} aria-label="Close camera">×</button>
            <p className="observe-kicker">View {Math.min(photos.length + 1, 3)} of 3</p>
            <h3>{photos.length < 3 ? `${VIEWS[photos.length]} view` : 'All views captured'}</h3>
            <div className="camera-stage">
              {photos.length < 3 ? <video ref={videoRef} autoPlay muted playsInline /> : <img src={photos[2]} alt="Last captured view" />}
              <div className="camera-guide" />
            </div>
            {error && <p className="camera-error">{error}</p>}
            <div className="camera-actions">
              <button onClick={capture} disabled={!!error || photos.length === 3}>Capture {photos.length < 3 ? VIEWS[photos.length] : ''}</button>
              <label>Upload instead<input type="file" accept="image/*" capture="user" onChange={upload} /></label>
              {photos.length > 0 && <button className="camera-quiet" onClick={() => setPhotos((p) => p.slice(0, -1))}>Undo</button>}
            </div>
            <div className="camera-dots">{VIEWS.map((view, i) => <span key={view} className={i < photos.length ? 'done' : ''}>{view}</span>)}</div>
            {photos.length === 3 && <button className="camera-finish" onClick={close}>Use these views</button>}
          </div>
        </div>
      )}
    </section>
  );
};

export default Observe;
