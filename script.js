/* =========================================================
   DIGITAL GANPATI INVITATION — EDIT ONLY THIS CONFIG FIRST
   ========================================================= */
const CONFIG = {
  familyName: "सुशीला सिंह मल्ल एवं परिवार",
  date: "18th September 2026",
  pujaTime: "शाम 5:00 बजे",
  venue: "Flat No. 309, F Block, Silver Line Apartment, Near Crown Mall, BBD University, Ayodhya Road, Lucknow",
  mapLink: "https://www.google.com/maps?vet=10CAAQoqAOahcKEwjQreqnjeuWAxUAAAAAHQAAAAAQCA..i&fvr=1&pvq=CgwvZy8xeWRudnk3NW0&lqi=ChxzaWx2ZXJsaW5lIGFwYXJ0bWVudCBibG9jayA5kgEfbXVsdGlfdW5pdF9yZXNpZGVudGlhbF9idWlsZGluZw&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KbXphGWgWJk5MRCNR5C-hEPE&daddr=Chinhat,+BBD,+Faizabad+Rd,+Ganeshpur+Rahmanpur,+Uttar+Pradesh+226028",
  calendar: {
    title: "Ganpati Puja",
    start: "20260920T110000",
    end: "20260920T150000"
  },
  schedule: [
    { time: "10:00 AM", title: "Ganpati Sthapana", text: "Welcoming Bappa home with love and devotion." },
    { time: "11:00 AM", title: "Ganpati Puja", text: "A peaceful puja with family and loved ones." },
    { time: "01:00 PM", title: "Maha Aarti", text: "Come together for the divine aarti." },
    { time: "01:30 PM", title: "Bhog & Prasad", text: "Prasad, conversations and moments together." }
  ],
  aartis: [
    {
      title: "Sukhkarta Dukhharta",
      subtitle: "Ganpati Aarti",
      audio: "assets/audio/sukhkarta.mp3",
      lyrics: `सुखकर्ता दुखहर्ता वार्ता विघ्नाची ।
नूर्वी पूर्वी प्रेम कृपा जयाची ॥

सर्वांगी सुंदर उटी शेंदुराची ।
कंठी झळके माळ मुक्ताफळांची ॥`
    },
    {
      title: "Jai Ganesh Deva",
      subtitle: "Shri Ganesh Aarti",
      audio: "assets/audio/jai-ganesh-deva.mp3",
      lyrics: `जय गणेश, जय गणेश, जय गणेश देवा ।
माता जाकी पार्वती, पिता महादेवा ॥

एकदंत दयावंत, चार भुजा धारी ।
माथे सिंदूर सोहे, मूसे की सवारी ॥`
    },
    {
      title: "Ganpati Bappa Morya",
      subtitle: "Devotional Chant",
      audio: "assets/audio/ganpati-bappa.mp3",
      lyrics: `गणपति बाप्पा मोरया ।
मंगल मूर्ति मोरया ॥

विघ्नहर्ता मोरया ।
सुखकर्ता मोरया ॥`
    }
  ]
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

window.addEventListener("load", () => setTimeout(() => $("#loader").classList.add("hidden"), 1200));

$("#familyName").textContent = CONFIG.familyName;
$("#eventDate").textContent = CONFIG.date;
$("#pujaTime").textContent = CONFIG.pujaTime;
$("#venue").textContent = CONFIG.venue;

$("#timeline").innerHTML = CONFIG.schedule.map(x =>
  `<article class="timeline-item reveal"><time>${x.time}</time><h3>${x.title}</h3><p>${x.text}</p></article>`
).join("");

$("#aartiList").innerHTML = CONFIG.aartis.map((x, i) =>
  `<article class="aarti-card reveal" data-index="${i}">
    <span class="num">0${i + 1}</span><h3>${x.title}</h3><p>${x.subtitle}</p>
    <button class="outline-btn play-aarti">Play Aarti</button>
  </article>`
).join("");

const audio = $("#audio"), playBtn = $("#playBtn"), progress = $("#progress");
const bgAudio = $("#bgAudio");
let isBgMusicEnabled = false;
let current = 0;

function loadTrack(i, autoplay = false) {
  current = i;
  const track = CONFIG.aartis[i];
  audio.src = track.audio;
  $("#trackNumber").textContent = String(i + 1).padStart(2, "0");
  $("#trackTitle").textContent = track.title;
  $("#lyricsTitle").textContent = track.title;
  $("#lyricsText").textContent = track.lyrics;
  $$(".aarti-card").forEach((c, n) => c.classList.toggle("active", n === i));
  if (autoplay) audio.play().catch(() => { });
}
$$(".play-aarti").forEach(btn => btn.addEventListener("click", e => {
  loadTrack(+e.target.closest(".aarti-card").dataset.index, true);
}));

playBtn.addEventListener("click", () => {
  if (!audio.src) loadTrack(0);
  if (audio.paused) { audio.play().catch(() => { }); playBtn.textContent = "❚❚" }
  else { audio.pause(); playBtn.textContent = "▶" }
});
audio.addEventListener("play", () => {
  playBtn.textContent = "❚❚";
  if (isBgMusicEnabled && bgAudio) bgAudio.pause();
});
audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
  if (isBgMusicEnabled && bgAudio) bgAudio.play().catch(() => {});
});
audio.addEventListener("timeupdate", () => {
  if (audio.duration) progress.style.width = (audio.currentTime / audio.duration * 100) + "%";
  $("#duration").textContent = formatTime(audio.currentTime);
});
audio.addEventListener("ended", () => {
  current = (current + 1) % CONFIG.aartis.length; loadTrack(current, true);
});
function formatTime(s) { if (!Number.isFinite(s)) return "0:00"; return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` }

$("#mapBtn").onclick = () => window.open(CONFIG.mapLink, "_blank");
$("#calendarBtn").onclick = () => {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CONFIG.calendar.title)}&dates=${CONFIG.calendar.start}/${CONFIG.calendar.end}&details=${encodeURIComponent("Ganpati Puja — " + CONFIG.familyName)}&location=${encodeURIComponent(CONFIG.venue)}`;
  window.open(url, "_blank");
};

$("#enterBtn").onclick = () => {
  document.querySelector(".invitation").scrollIntoView({ behavior: "smooth" });
  if (bgAudio && bgAudio.paused && !isBgMusicEnabled) {
    bgAudio.play().then(() => {
      isBgMusicEnabled = true;
      $("#soundToggle").textContent = "♫";
    }).catch(() => {});
  }
};
$("#blessBtn").onclick = () => {
  const msg = $("#blessingMessage"); msg.textContent = "🌸 Flower offered with devotion. Ganpati Bappa Morya!";
  for (let i = 0; i < 18; i++) makePetal(true);
  setTimeout(() => msg.textContent = "", 3500);
};

function makePetal(burst = false) {
  const p = document.createElement("i"); p.className = "petal";
  p.style.left = (burst ? 45 + Math.random() * 10 : Math.random() * 100) + "%";
  p.style.top = burst ? (45 + Math.random() * 10) + "%" : "-20px";
  p.style.animationDuration = (4 + Math.random() * 5) + "s";
  p.style.transform = `rotate(${Math.random() * 360}deg)`;
  $("#petals").appendChild(p); setTimeout(() => p.remove(), 10000);
}
setInterval(() => makePetal(false), 850);

$("#blessingForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#guestName").value.trim(), msg = $("#guestMessage").value.trim();
  if (!name || !msg) return;
  const card = document.createElement("article"); card.className = "guest-card reveal visible";
  card.innerHTML = `<strong>${escapeHtml(name)}</strong><p>${escapeHtml(msg)}</p>`;
  $("#guestBlessings").prepend(card); e.target.reset();
});
function escapeHtml(s) { return s.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])) }

function fallbackCopyTextToClipboard(text) {
  if (navigator.clipboard) { navigator.clipboard.writeText(text).catch(()=>{}); return; }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.select();
  try { document.execCommand('copy'); } catch (err) {}
  document.body.removeChild(textArea);
}

$("#shareBtn").onclick = async () => {
  const data = { title: "Ganpati Invitation", text: `You're invited to our Ganpati Puja by ${CONFIG.familyName}. Ganpati Bappa Morya!`, url: location.href };
  if (navigator.share) {
    try { await navigator.share(data); } catch (e) {}
  } else {
    fallbackCopyTextToClipboard(location.href);
    alert("Invitation link copied!");
  }
};
$("#copyBtn").onclick = () => {
  fallbackCopyTextToClipboard(location.href);
  $("#copyBtn").textContent = "Copied ✓";
  setTimeout(() => $("#copyBtn").textContent = "Copy Link", 2000);
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") });
}, { threshold: .12 });
$$(".reveal").forEach(x => observer.observe(x));

$("#soundToggle").onclick = () => {
  if (isBgMusicEnabled) {
    isBgMusicEnabled = false;
    if (bgAudio) bgAudio.pause();
    if (!audio.paused) audio.pause();
    $("#soundToggle").textContent = "♪";
  } else {
    isBgMusicEnabled = true;
    if (bgAudio && audio.paused) bgAudio.play().catch(()=>{});
    $("#soundToggle").textContent = "♫";
  }
};
