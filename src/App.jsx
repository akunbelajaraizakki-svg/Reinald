import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// --- DATA DUMMY GLOBAL ---
const initialCourses = [
  { id: 1, category: "AKUNTANSI", title: "E-Modul Siklus Akuntansi Perusahaan Dagang", instructor: "Rei, S.E., M.Ak.", rating: "4.9", reviews: 128, lessons: 24, duration: "04:30:00", oldPrice: "Rp250.000", newPrice: "Rp50.000", priceValue: 50000, color: "from-indigo-500 to-violet-600", icon: "📊", status: "Published", students: 128 },
  { id: 2, category: "MANAJEMEN", title: "Teori Pengambilan Keputusan: Dari Analisis ke Tindakan", instructor: "Dr. Indra Fahrizal, MBA", rating: "5.0", reviews: 84, lessons: 17, duration: "01:00:38", oldPrice: "Rp150.000", newPrice: "Rp25.000", priceValue: 25000, color: "from-rose-400 to-orange-500", icon: "💡", status: "In Review", students: 0 },
  { id: 3, category: "LOGISTIK", title: "Manajemen Rantai Pasok Modern (Supply Chain)", instructor: "Tim Lentera", rating: "4.8", reviews: 210, lessons: 32, duration: "06:15:00", oldPrice: "Rp300.000", newPrice: "Rp99.000", priceValue: 99000, color: "from-emerald-400 to-teal-500", icon: "📦", status: "Published", students: 210 }
];

const initialUsers = [
  { id: 1, name: "Ahmad Budi", email: "ahmad@kampus.ac.id", role: "siswa", joinDate: "07 Sep 2026", status: "Active" },
  { id: 2, name: "Siti Nurhaliza", email: "siti@kampus.ac.id", role: "siswa", joinDate: "06 Sep 2026", status: "Active" },
  { id: 3, name: "Dr. Indra Fahrizal", email: "indra@mondy.com", role: "instruktur", joinDate: "12 Agu 2026", status: "Active" },
  { id: 4, name: "Admin Utama", email: "admin@mondy.com", role: "admin", joinDate: "01 Jan 2026", status: "Active" },
  { id: 5, name: "Budi Santoso", email: "budi.s@kampus.ac.id", role: "siswa", joinDate: "07 Sep 2026", status: "Pending" },
  { id: 6, name: "Dra. Rina Melati", email: "rina@mondy.com", role: "instruktur", joinDate: "07 Sep 2026", status: "Pending" }
];

const initialEbooks = [
  { id: 1, title: "Panduan Praktis Akuntansi Dasar", category: "Akuntansi", price: "Rp35.000" },
  { id: 2, title: "Manajemen Resiko Logistik", category: "Logistik", price: "Rp45.000" }
];

const initialTicketsAdmin = [
  { id: 1, user: "Ahmad Budi", subject: "Video Modul 2 tidak bisa diputar", priority: "Tinggi", status: "Open" },
  { id: 2, user: "Siti Nurhaliza", subject: "Salah penulisan nama di sertifikat", priority: "Sedang", status: "Closed" }
];

const initialBlogs = [
  { id: 1, title: "Pentingnya Pembelajaran Konstruktivis di Era AI", author: "Rei, S.E., M.Ak.", date: "05 Sep 2026", category: "Edukasi", status: "Published", excerpt: "Membahas bagaimana teknologi AI dapat berkolaborasi dengan pedagogi konstruktivis untuk menciptakan interaksi belajar yang tidak membosankan..." },
  { id: 2, title: "Tren Manajemen Rantai Pasok Modern 2027", author: "Tim Lentera", date: "01 Sep 2026", category: "Logistik", status: "Published", excerpt: "Prediksi dan pemetaan tren terbaru dalam dunia logistik, e-commerce, dan otomatisasi supply chain secara global..." }
];

// --- KOMPONEN PUBLIK (NAVBAR & FOOTER) ---
const Navbar = ({ settings }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isHome ? 'bg-[#090D16]/90 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-[#090D16] border-b border-white/10'} text-white`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-3 transition-transform hover:scale-105">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="w-9 h-9 object-contain rounded-xl" />
            ) : (
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-sm shadow-lg shadow-purple-500/50 animate-pulse">⚡</span>
            )}
            {settings?.platformName || "Mondy"}
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-300">
            <Link to="/" className="hover:text-purple-400 transition-colors">Kelas</Link>
            <Link to="/katalog" className="hover:text-purple-400 transition-colors">Try Out</Link>
            <Link to="/artikel" className="hover:text-purple-400 transition-colors">Perpustakaan</Link>
            <Link to="/dasbor" className="hover:text-purple-400 transition-colors">Ruang Belajar</Link>
          </nav>
        </div>
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white hidden md:block transition-colors">Masuk</Link>
          <Link to="/login" className="text-sm font-bold px-6 py-2.5 rounded-full text-white shadow-[0_8px_20px_rgba(147,51,234,0.3)] transition-all hover:-translate-y-1 hover:shadow-purple-500/50" style={{ background: 'linear-gradient(135deg, #9333EA 0%, #4F46E5 100%)' }}>Coba Gratis</Link>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ settings }) => (
  <footer className="bg-[#060911] text-slate-400 py-20 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-2 space-y-4">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
          {settings?.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
          ) : (
            <span className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-xs">⚡</span>
          )}
          {settings?.platformName || "Mondy"}
        </Link>
        <p className="text-sm leading-relaxed max-w-sm text-slate-400">Platform E-Modul & Pembelajaran Digital berstandar tinggi. Membantu meraih prestasi akademik terbaik melalui pendekatan interaktif.</p>
        <p className="text-xs font-bold tracking-widest uppercase opacity-40">© 2026 {settings?.platformName || "Mondy"} Academy. All rights reserved.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Navigasi</h4>
        <ul className="space-y-3 text-sm font-medium">
          <li><Link to="/katalog" className="hover:text-purple-400 transition-colors">Katalog Modul</Link></li>
          <li><Link to="/artikel" className="hover:text-purple-400 transition-colors">Perpustakaan Artikel</Link></li>
          <li><Link to="/login" className="hover:text-purple-400 transition-colors">Portal Admin</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Dukungan</h4>
        <ul className="space-y-3 text-sm font-medium">
          <li><Link to="/bantuan" className="hover:text-purple-400 transition-colors">Bantuan & FAQ</Link></li>
          <li><Link to="/syarat" className="hover:text-purple-400 transition-colors">Syarat & Ketentuan</Link></li>
          <li><Link to="/privasi" className="hover:text-purple-400 transition-colors">Kebijakan Privasi</Link></li>
        </ul>
      </div>
    </div>
  </footer>
);

// --- HALAMAN PUSAT BANTUAN & DUKUNGAN ---
const SupportPage = ({ settings, type }) => {
  const content = {
    faq: { title: "Bantuan & Pertanyaan yang Sering Diajukan (FAQ)", body: "Di sini Anda dapat menemukan jawaban seputar cara pendaftaran akun, pemutaran modul video pembelajaran, kendala akses kuis, hingga panduan klaim sertifikat kelulusan ber-QR code." },
    terms: { title: "Syarat & Ketentuan Layanan", body: "Dengan mengakses platform ini, pengguna setuju untuk menjaga kerahasiaan akun, mematuhi etika akademik, serta menggunakan materi pembelajaran sesuai dengan ketentuan hak cipta yang berlaku." },
    privacy: { title: "Kebijakan Privasi & Perlindungan Data", body: "Kami berkomitmen untuk melindungi data pribadi Anda seperti nama, email, dan riwayat progress belajar dengan sistem keamanan digital terbaik." }
  };
  const current = content[type] || content.faq;

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-20 animate-fadeIn">
        <h1 className="text-4xl font-black mb-6 text-white">{current.title}</h1>
        <div className="bg-[#121826] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 text-slate-300 leading-relaxed">
          <p className="text-lg">{current.body}</p>
        </div>
        <div className="mt-8">
          <Link to="/" className="text-purple-400 font-bold hover:underline">← Kembali ke Beranda</Link>
        </div>
      </div>
      <Footer settings={settings} />
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="bg-[#121826] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl hover:border-purple-500/50 transition-all duration-500 flex flex-col group hover:-translate-y-2 cursor-pointer hover:shadow-purple-500/10">
    <div className={`h-48 bg-gradient-to-br ${course.color} relative flex flex-col justify-between p-6 overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      <div className="relative z-10 flex justify-between items-start">
        <span className="bg-white/20 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-white/20 text-white">{course.category}</span>
        <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md text-white border border-white/20 text-xs">🤍</span>
      </div>
      <div className="text-center text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300 relative z-10">{course.icon}</div>
    </div>
    <div className="p-7 flex flex-col flex-1 bg-[#121826] text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex text-amber-400 text-sm">★★★★★</div>
        <span className="text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">{course.rating} ({course.reviews})</span>
      </div>
      <h3 className="font-extrabold text-white text-xl leading-tight mb-3 flex-1 group-hover:text-purple-400 transition-colors line-clamp-2">{course.title}</h3>
      <p className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">👨‍🏫 {course.instructor}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
        <div>
          <p className="text-xs font-bold text-slate-500 line-through mb-1">{course.oldPrice}</p>
          <p className="text-2xl font-black text-white tracking-tight">{course.newPrice}</p>
        </div>
        <Link to={`/detail/${course.id}`} className="px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #9333EA 0%, #4F46E5 100%)' }}>Detail Kelas</Link>
      </div>
    </div>
  </div>
);

const Home = ({ settings }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans selection:bg-purple-500 selection:text-white" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <main className="flex-1">
        <section className="pt-28 pb-36 px-6 relative overflow-hidden bg-[#090D16]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8 text-left">
              <h1 className="text-5xl lg:text-[4.5rem] font-black leading-[1.08] tracking-tighter text-white">
                {settings?.heroTitle || "Aplikasi Belajar Kuliah No 1 di Indonesia"}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
                {settings?.seoDesc || "Akses video dari dosen universitas top, sambil melihat pembahasan dan rangkuman soal, disertai AI untuk membantumu meraih IPK idaman."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button onClick={() => navigate('/katalog')} className="px-8 py-4 rounded-2xl font-black text-lg text-white shadow-[0_10px_30px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 hover:shadow-purple-500/60" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>
                  Coba Sekarang 🚀
                </button>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-[3rem] p-3 shadow-2xl relative border border-white/10 bg-[#121826] overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-indigo-900/30 rounded-[2.5rem] animate-pulse"></div>
                {settings?.heroBanner ? (
                  <img src={settings.heroBanner} alt="Hero Banner" className="w-full h-full object-cover rounded-[2.5rem]" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-900/50 to-indigo-900/50 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center relative border border-white/10">
                    <span className="text-[120px] drop-shadow-2xl relative z-10 animate-bounce">🎓</span>
                    <div className="absolute bottom-8 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-xl font-bold text-white border border-white/10">Video & Ringkasan Materi Top</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {settings?.adBannerUrl && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#121826]">
              <a href={settings.adLink || '#'} target="_blank" rel="noopener noreferrer" className="block">
                <img src={settings.adBannerUrl} alt="Banner Sponsor" className="w-full h-56 md:h-72 object-cover hover:opacity-95 transition-opacity" />
              </a>
            </div>
          </section>
        )}

        <section className="py-24 px-6 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-4">Semua yang kamu butuhkan untuk raih IPK idaman</h2>
            <p className="text-slate-400 font-medium">Tingkatkan pengalaman belajar dengan fitur-fitur kelas dunia.</p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121826] p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-between shadow-xl hover:border-purple-500/50 transition-all hover:scale-[1.01]">
              <div className="space-y-4 mb-8">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">Kelas</span>
                <h3 className="text-2xl font-black text-white">2.000+ Video Materi dari Dosen Top Universitas</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Diajarkan oleh dosen yang ahli di berbagai bidang dan jurusan kuliah Anda.</p>
              </div>
              <div className="bg-[#090D16] p-6 rounded-2xl border border-white/10 text-center text-4xl">📚</div>
            </div>

            <div className="bg-[#121826] p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-between shadow-xl hover:border-purple-500/50 transition-all hover:scale-[1.01]">
              <div className="space-y-4 mb-8">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">Try Out</span>
                <h3 className="text-2xl font-black text-white">Try Out UTS dan UAS Materi Kuliah</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Latihan Soal yang dikurasi khusus buat nge-boost pemahaman dan nilai kuliahmu.</p>
              </div>
              <div className="bg-[#090D16] p-6 rounded-2xl border border-white/10 text-center text-4xl">📝</div>
            </div>
          </div>
        </section>

        <section className="py-28 px-6 bg-[#090D16] border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-2xl">
                <h2 className="text-sm font-extrabold text-purple-400 tracking-widest uppercase mb-4">Kelas Tersedia</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Pilih topik dan mulai upgrade *skill* hari ini.</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {initialCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
};

const PublicArticleList = ({ settings }) => (
  <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
    <Navbar settings={settings} />
    <div className="bg-[#0B0F19] border-b border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Artikel & Perpustakaan</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">Temukan wawasan, pembaruan materi, dan pemikiran terbaru langsung dari para ahli dan instruktur di {settings?.platformName || "Mondy"}.</p>
      </div>
    </div>
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {initialBlogs.map(blog => (
          <div key={blog.id} className="bg-[#121826] rounded-[2rem] border border-white/10 overflow-hidden shadow-sm p-8 flex flex-col cursor-pointer hover:border-purple-500/50 transition-all group">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest w-fit mb-4">{blog.category}</span>
            <h4 className="text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors">{blog.title}</h4>
            <p className="text-slate-400 mb-6 leading-relaxed flex-1">{blog.excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 text-xs font-bold text-slate-500">
              <span>✍️ {blog.author}</span>
              <span>📅 {blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer settings={settings} />
  </div>
);

const Catalog = ({ settings }) => (
  <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
    <Navbar settings={settings} />
    <div className="bg-[#0B0F19] border-b border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-black text-white mb-8 tracking-tight">Katalog Try Out & Kelas</h1>
        <div className="flex items-center border border-white/10 rounded-3xl overflow-hidden max-w-2xl mx-auto bg-[#121826] shadow-xl">
          <span className="pl-6 text-2xl opacity-50">🔍</span>
          <input type="text" placeholder="Cari skill yang ingin dipelajari..." className="flex-1 p-5 outline-none text-white font-bold placeholder-slate-500 bg-transparent text-lg" />
          <button className="px-8 text-white font-bold h-full transition-colors text-lg" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Cari</button>
        </div>
      </div>
    </div>
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {initialCourses.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
    <Footer settings={settings} />
  </div>
);

const CourseDetail = ({ settings, instructorProfile }) => {
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const course = initialCourses[0]; 
  const adminFee = 2000;
  const totalPayment = course.priceValue + adminFee;

  const handlePreview = () => alert("Memuat pemutar video... \n\nMemutar pratinjau materi: Identifikasi Dokumen Sumber.");
  const handleDirectCheckout = () => { setIsCheckoutOpen(true); setCheckoutStep(1); };
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    alert(`Berhasil! "${course.title}" telah ditambahkan ke keranjang belanja Anda.`);
  };
  const handleProcessPayment = () => {
    if (!selectedPayment) return alert("Pilih metode pembayaran terlebih dahulu!");
    setCheckoutStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <div className="bg-[#0B0F19] border-b border-white/10 pt-16 pb-32 px-6 relative text-center">
        <div className="max-w-7xl mx-auto">
          <Link to="/katalog" className="text-sm text-purple-400 font-bold hover:text-white mb-6 inline-block transition-colors">← Kembali ke Katalog</Link>
          <div className="max-w-3xl mx-auto">
            <span className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 inline-block">{course.category}</span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{course.title}</h1>
            <p className="text-base text-slate-400 mb-8 max-w-2xl mx-auto">Kuasai pencatatan jurnal khusus, buku besar pembantu, hingga penyusunan laporan keuangan melalui pendekatan konstruktivis.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 -mt-16 relative z-10 w-full flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-6">Apa yang akan Anda pelajari?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-sm font-medium">
              <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Identifikasi karakteristik perusahaan dagang</p></div>
              <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Pencatatan 4 Jurnal Khusus</p></div>
              <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Posting ke Buku Besar Utama & Pembantu</p></div>
              <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Penyusunan Laporan Laba/Rugi & Neraca</p></div>
            </div>
          </div>

          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4">Deskripsi Matakuliah</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Dalam matakuliah ini Anda akan belajar tentang siklus akuntansi perusahaan dagang secara komprehensif. Dimulai dari analisis dokumen sumber, pencatatan transaksi ke dalam jurnal khusus, hingga penyusunan laporan keuangan akhir periode dengan pendekatan interaktif.</p>
            <h3 className="text-lg font-bold text-white mb-3">Persyaratan</h3>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              <li>Memahami konsep dasar persamaan dasar akuntansi.</li>
              <li>Telah menyelesaikan modul Pengantar Akuntansi Jasa.</li>
            </ul>
          </div>

          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm">
            <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">Kurikulum pada kursus ini</h3>
              <div className="text-right text-xs font-semibold text-slate-400"><span>17 Pembelajaran</span> • <span>01:00:38 Jam</span></div>
            </div>
            <div className="border border-white/10 rounded-xl overflow-hidden mb-4 bg-[#090D16]">
              <div className="bg-white/5 p-4 flex justify-between items-center cursor-pointer border-b border-white/10">
                <h4 className="font-bold text-white text-sm">Pengenalan Ruang Lingkup Materi</h4>
                <span className="text-xs font-semibold text-slate-400">7 Pembelajaran • 00:32:53 Jam</span>
              </div>
              <div className="divide-y divide-white/5">
                <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3 text-slate-300 font-medium text-sm"><span className="text-purple-400">▶</span><span>Tujuan Pembelajaran dan Lingkup Materi</span></div>
                  <span className="text-xs font-semibold text-slate-500">00:07:43</span>
                </div>
                <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3 text-slate-300 font-medium text-sm"><span className="text-purple-400">▶</span><span>Konsep Dasar Perusahaan Dagang</span></div>
                  <span className="text-xs font-semibold text-slate-500">00:05:25</span>
                </div>
                <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3 text-slate-300 font-medium text-sm"><span className="text-purple-400">▶</span><span>Identifikasi Dokumen Sumber</span></div>
                  <div className="flex items-center space-x-4">
                    <button onClick={handlePreview} className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded hover:bg-purple-500/20 transition-colors">Preview</button>
                    <span className="text-xs font-semibold text-slate-500">00:08:23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KARTU PROFIL INSTRUKTUR */}
          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="w-24 h-24 shrink-0 bg-purple-900/30 rounded-full overflow-hidden border-2 border-purple-500/30 flex items-center justify-center text-3xl">
              {instructorProfile?.avatar ? (
                <img src={instructorProfile.avatar} alt="Instruktur" className="w-full h-full object-cover" />
              ) : (
                "👨‍🏫"
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-bold text-white text-lg">{instructorProfile?.name || "Rei, S.E., M.Ak."}</h4>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">{instructorProfile?.title || "Ketua Peneliti Lentera Mondial"}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{instructorProfile?.bio || "Berpengalaman dalam pengembangan sistem informasi akuntansi dan E-Learning Management System (LMS)."}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[360px] shrink-0">
          <div className="bg-[#121826] rounded-[2rem] border border-white/10 shadow-xl p-6 sticky top-28">
            <div className="text-center mb-6">
              <h3 className="text-4xl font-extrabold text-white mb-1">{course.newPrice}</h3>
              <p className="text-slate-500 line-through text-sm font-medium">{course.oldPrice}</p>
            </div>
            <div className="space-y-3 mb-6">
              <button onClick={handleDirectCheckout} className="w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-colors" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Daftar Kelas Ini</button>
              <button onClick={handleAddToCart} className="w-full bg-white/5 text-purple-400 font-bold py-3.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 relative">
                Tambahkan ke Keranjang
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black shadow">{cartCount}</span>}
              </button>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h4 className="font-bold text-white text-sm mb-3">Kursus ini termasuk:</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-medium">
                <li className="flex items-center space-x-2"><span>🎥</span><span>{course.duration} jam Video On-Demand</span></li>
                <li className="flex items-center space-x-2"><span>📚</span><span>{course.lessons} Modul Pembelajaran</span></li>
                <li className="flex items-center space-x-2"><span>♾️</span><span>Akses selamanya</span></li>
                <li className="flex items-center space-x-2"><span>🏆</span><span>Sertifikat kelulusan ber-QR code</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer settings={settings} />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#121826] text-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative border border-white/10">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white font-bold text-xl">✕</button>
            
            {checkoutStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4">Konfirmasi Pendaftaran Kelas</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-3xl shrink-0">📊</div>
                  <div>
                    <h4 className="font-bold text-white text-lg leading-tight">{course.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">Oleh: {course.instructor}</p>
                  </div>
                </div>
                <div className="bg-[#090D16] p-5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Harga Modul</span><span>{course.newPrice}</span></div>
                  <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Biaya Admin (Platform)</span><span>Rp2.000</span></div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold text-white">Total Pembayaran</span>
                    <span className="text-2xl font-black text-purple-400">Rp{(totalPayment).toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <button onClick={() => setCheckoutStep(2)} className="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-colors" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Lanjut Pilih Pembayaran →</button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4">Pilih Metode Pembayaran</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="col-span-full"><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dompet Digital & Integrasi</p></div>
                  <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === 'lynk' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center gap-3"><input type="radio" name="payment" value="lynk" checked={selectedPayment === 'lynk'} onChange={() => setSelectedPayment('lynk')} className="w-5 h-5 accent-purple-600" /><span className="font-bold text-white">Lynk.id (Rekomendasi)</span></div>
                  </label>
                  <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === 'qris' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center gap-3"><input type="radio" name="payment" value="qris" checked={selectedPayment === 'qris'} onChange={() => setSelectedPayment('qris')} className="w-5 h-5 accent-purple-600" /><span className="font-bold text-white">QRIS (Semua E-Wallet)</span></div>
                  </label>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-white/10">
                  <button onClick={() => setCheckoutStep(1)} className="px-6 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors">Kembali</button>
                  <button onClick={handleProcessPayment} className="flex-1 text-white font-bold py-4 rounded-xl shadow-md transition-colors" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Bayar Rp{(totalPayment).toLocaleString('id-ID')}</button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="space-y-6 text-center py-10">
                <span className="text-7xl mb-6 block animate-bounce drop-shadow-xl">🎉</span>
                <h2 className="text-3xl font-black text-white mb-2">Pendaftaran Dikonfirmasi!</h2>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto font-medium">Pembayaran Anda berhasil dikonfirmasi. Modul pembelajaran kini telah ditambahkan ke ruang belajar Anda.</p>
                <button onClick={() => navigate('/dasbor')} className="text-white px-10 py-4 rounded-xl font-black shadow-lg transition-transform hover:-translate-y-1 w-full" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Mulai Belajar Sekarang 🚀</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- HALAMAN LOGIN ---
const Login = ({ settings }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email dan kata sandi wajib diisi!");
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        alert("Nama lengkap dan gelar wajib diisi!");
        return;
      }
      alert("Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan (Approval) dari Admin.");
      setIsRegister(false);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      if (email.includes('admin')) {
        navigate('/admin/dasbor');
      } else if (email.includes('indra') || email.includes('rei') || email.includes('instruktur')) {
        navigate('/instruktur/courses');
      } else {
        navigate('/dasbor');
      }
    }
  };

  const handleQuickLogin = (role) => {
    if (role === 'admin') navigate('/admin/dasbor');
    else if (role === 'instruktur') navigate('/instruktur/courses');
    else navigate('/dasbor');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#090D16] text-white relative overflow-hidden font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <Link to="/" className="absolute top-10 left-10 text-2xl font-black tracking-tighter text-white flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-xs">⚡</span>
        {settings?.platformName || "Mondy"}.
      </Link>
      
      <div className="bg-[#121826] p-10 rounded-[3rem] shadow-2xl border border-white/10 w-full max-w-md relative z-10 animate-fadeIn">
        <div className="text-center mb-6">
          <span className="text-4xl mb-2 block">👋</span>
          <h2 className="text-2xl font-black text-white mb-1 tracking-tight">{isRegister ? "Daftar Instruktur Baru" : "Selamat Datang"}</h2>
          <p className="text-slate-400 font-bold text-xs">{isRegister ? "Bergabunglah menjadi pengajar di platform kami" : "Masuk untuk melanjutkan aktivitas belajarmu."}</p>
        </div>
        
        <form onSubmit={handleAuthSubmit} className="space-y-3 mb-4">
          {isRegister && (
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Nama Lengkap & Gelar</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Dr. Budi, M.Ak." className="w-full p-3 rounded-xl border border-white/10 bg-[#090D16] text-white outline-none focus:border-purple-500 text-xs font-bold" />
            </div>
          )}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email / Username</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contoh@kampus.ac.id" className="w-full p-3 rounded-xl border border-white/10 bg-[#090D16] text-white outline-none focus:border-purple-500 text-xs font-bold" required />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Kata Sandi</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-3 rounded-xl border border-white/10 bg-[#090D16] text-white outline-none focus:border-purple-500 text-xs font-bold" required />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl font-black text-sm text-white shadow-xl transition-transform hover:-translate-y-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/50">
            {isRegister ? "Kirim Pendaftaran Instruktur" : "Masuk ke Sistem"}
          </button>
        </form>

        {!isRegister && (
          <div className="space-y-2 pt-3 border-t border-white/10 mb-4">
            <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider mb-2">Atau Akses Cepat Sebagai:</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleQuickLogin('siswa')} className="py-2.5 px-2 bg-purple-600/20 border border-purple-500/30 rounded-xl text-[11px] font-black text-purple-300 hover:bg-purple-600/30 transition-colors">
                👨‍🎓 Siswa
              </button>
              <button onClick={() => handleQuickLogin('instruktur')} className="py-2.5 px-2 bg-teal-600/20 border border-teal-500/30 rounded-xl text-[11px] font-black text-teal-300 hover:bg-teal-600/30 transition-colors">
                👨‍🏫 Instruktur
              </button>
              <button onClick={() => handleQuickLogin('admin')} className="py-2.5 px-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-[11px] font-black text-blue-300 hover:bg-blue-600/30 transition-colors">
                🛠️ Admin
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-2 border-t border-white/10">
          <button onClick={() => setIsRegister(!isRegister)} className="text-xs font-bold text-purple-400 hover:underline">
            {isRegister ? "Sudah punya akun? Masuk di sini" : "Ingin bergabung sebagai Instruktur baru? Daftar di sini"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ settings }) => (
  <div className="min-h-screen bg-[#090D16] text-white font-sans flex flex-col selection:bg-purple-500" style={{ fontSize: settings?.fontSize || '16px' }}>
    <Navbar settings={settings} />
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/10" style={{ background: `linear-gradient(135deg, ${settings?.primaryColor || '#9333EA'} 0%, #121826 100%)` }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <span>🏅</span> Lencana Pelajar Aktif (XP Badge)
            </span>
          </div>
          <h1 className="text-4xl font-black mb-3">Siap beraksi hari ini, Mahasiswa? 🚀</h1>
          <p className="text-purple-200 font-bold text-lg">Kamu memiliki 1 misi kelas yang belum diselesaikan.</p>
        </div>
        <div className="mt-8 md:mt-0 relative z-10 flex gap-4">
          <div className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center"><p className="text-xs font-black text-purple-200 uppercase tracking-wider mb-1">Total Poin</p><p className="text-3xl font-black text-white text-yellow-400">1,250 <span className="text-lg text-white">XP</span></p></div>
          <div className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center"><p className="text-xs font-black text-purple-200 uppercase tracking-wider mb-1">Api Streak</p><p className="text-3xl font-black text-white text-orange-400">3 <span className="text-lg text-white">Hari</span> 🔥</p></div>
        </div>
      </header>

      {/* Menu Tombol Cepat Menuju Sertifikat Saya */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/sertifikat" className="bg-[#121826] p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-purple-500/50 transition-all hover:scale-[1.02] group shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🎓</div>
            <div>
              <h4 className="font-extrabold text-white text-base">Sertifikat Saya</h4>
              <p className="text-xs text-slate-400">Lihat & unduh sertifikat lulus</p>
            </div>
          </div>
          <span className="text-purple-400 font-bold text-lg">→</span>
        </Link>
        <Link to="/katalog" className="bg-[#121826] p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-purple-500/50 transition-all hover:scale-[1.02] group shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📚</div>
            <div>
              <h4 className="font-extrabold text-white text-base">Katalog Modul</h4>
              <p className="text-xs text-slate-400">Jelajahi materi perkuliahan baru</p>
            </div>
          </div>
          <span className="text-indigo-400 font-bold text-lg">→</span>
        </Link>
        <Link to="/belajar" className="bg-[#121826] p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-purple-500/50 transition-all hover:scale-[1.02] group shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">⚡</div>
            <div>
              <h4 className="font-extrabold text-white text-base">Ruang Belajar Aktif</h4>
              <p className="text-xs text-slate-400">Lanjutkan progress perkuliahan</p>
            </div>
          </div>
          <span className="text-emerald-400 font-bold text-lg">→</span>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">⏳ Terakhir Dipelajari</h2>
        <div className="bg-[#121826] p-8 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-8 group hover:border-purple-500/50 transition-colors">
          <div className="w-32 h-32 bg-purple-900/20 rounded-[2rem] flex items-center justify-center text-5xl shrink-0 group-hover:scale-105 transition-transform duration-300 border border-purple-500/30 shadow-inner">📊</div>
          <div className="flex-1 w-full">
            <span className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2 block bg-purple-500/10 w-fit px-3 py-1 rounded-lg border border-purple-500/20">Modul 2</span>
            <h3 className="text-2xl font-black text-white mb-4">Siklus Akuntansi Perusahaan Dagang</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-black/40 rounded-full h-4 overflow-hidden border border-white/10 shadow-inner">
                <div className="h-full rounded-full w-[100%] relative transition-all duration-1000" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                </div>
              </div>
              <span className="font-extrabold text-emerald-400">100% (Lulus)</span>
            </div>
          </div>
          <Link to="/belajar" className="w-full md:w-auto text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl text-center shrink-0 hover:-translate-y-1 hover:shadow-purple-500/50" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Ulas Materi ▶</Link>
        </div>
      </div>
    </div>
  </div>
);

// --- RUANG BELAJAR (LEARNING ROOM) INTERAKTIF DENGAN TAB DISKUSI DOSEN & MAHASISWA ---
const LearningRoom = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('transcript');
  
  const [playlist, setPlaylist] = useState([
    { id: 1, title: "Apa itu Perusahaan Dagang?", duration: "08:15", active: true, locked: false, category: "Akuntansi Perusahaan Dagang (7)", desc: "Video ini membahas konsep perusahaan dagang yang berfokus pada penjualan barang, seperti supermarket, toko buku, atau penjualan spare parts. Siklus operasi perusahaan dagang melibatkan pembelian barang, penjualan, dan pengelolaan persediaan." },
    { id: 2, title: "Laporan Laba Rugi Perusahaan Dagang", duration: "12:40", active: true, locked: false, category: "Akuntansi Perusahaan Dagang (7)", desc: "Mempelajari cara menyusun laporan laba rugi komprehensif pada perusahaan dagang dengan menghitung harga pokok penjualan (HPP) dan beban operasional." },
    { id: 3, title: "Sistem Pencatatan dan Penilaian Persediaan", duration: "15:20", active: true, locked: false, category: "Akuntansi Perusahaan Dagang (7)", desc: "Memahami perbedaan sistem pencatatan perpetual dan periodic serta metode penilaian persediaan barang dagang." },
    { id: 4, title: "Jurnal Pencatatan: Metode Perpetual vs Periodic", duration: "10:05", active: true, locked: false, category: "Akuntansi Perusahaan Dagang (7)", desc: "Analisis perbandingan pembuatan jurnal transaksi pembelian dan penjualan menggunakan metode perpetual dan periodic." },
    { id: 5, title: "Kapan Menggunakan Metode Perpetual/Periodic?", duration: "09:30", active: true, locked: false, category: "Akuntansi Perusahaan Dagang (7)", desc: "Studi kasus pemilihan metode pencatatan yang paling efektif sesuai skala operasional perusahaan." },
    { id: 6, title: "Penyesuaian untuk Metode Perpetual dan Periodic", duration: "14:50", active: true, locked: false, category: "Akuntansi Perusahaan Dagang (7)", desc: "Penyusunan jurnal penyesuaian akhir periode dan kertas kerja (neraca lajur) perusahaan dagang." }
  ]);

  const [currentVideo, setCurrentVideo] = useState(playlist[0]);
  const completedCount = playlist.filter(item => item.active).length;
  const progressPercent = Math.round((completedCount / playlist.length) * 100);

  const [discussions, setDiscussions] = useState([
    { id: 1, user: "Ahmad Budi (Mahasiswa)", role: "student", text: "Prof, untuk penentuan HPP di metode perpetual apakah ada perbedaan signifikan dengan periodic?", time: "10:15", replies: [
      { id: 101, user: "Fanny Magdalena (Dosen)", role: "instructor", text: "Halo Ahmad! Secara prinsip perhitungannya sama, namun di perpetual pencatatan HPP dilakukan secara langsung setiap kali ada transaksi penjualan.", time: "10:30" }
    ]}
  ]);
  const [newDiscText, setNewDiscText] = useState('');

  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Halo! Saya Tutor AI Copilot 🤖. Selamat ya, materi kelas ini sudah Anda selesaikan 100%!` }
  ]);
  const [input, setInput] = useState('');

  const handleSelectVideo = (item) => {
    setPlaylist(playlist.map(p => p.id === item.id ? { ...p, active: true } : p));
    setCurrentVideo(item);
  };

  const handleSendDiscussion = () => {
    if (!newDiscText.trim()) return;
    const newEntry = {
      id: Date.now(),
      user: "Anda (Mahasiswa)",
      role: "student",
      text: newDiscText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replies: []
    };
    setDiscussions([...discussions, newEntry]);
    setNewDiscText('');
  };

  const handleSendAI = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let aiReply = "Penjelasan yang sangat baik! Terkait hal tersebut, pastikan Anda memahami saldo normal akun agar tidak keliru dalam pencatatan.";
      if (userText.toLowerCase().includes('dagang') || userText.toLowerCase().includes('perusahaan')) {
        aiReply = "Perusahaan dagang adalah perusahaan yang kegiatan utamanya membeli barang tanpa mengubah bentuk dan kemudian menjualnya kembali dengan tujuan mencari laba.";
      } else if (userText.toLowerCase().includes('hpp') || userText.toLowerCase().includes('harga pokok')) {
        aiReply = "Harga Pokok Penjualan (HPP) dihitung dengan rumus: Persediaan Awal + Pembelian Bersih - Persediaan Akhir.";
      }
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white font-sans flex flex-col">
      <header className="bg-[#0B0F19] border-b border-white/10 px-8 py-4 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate('/dasbor')} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10 transition-all hover:bg-white/10">
            ← Kembali
          </button>
          <h1 className="text-lg font-black tracking-tight text-white">Pengantar Akuntansi</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">SELESAI 100% 🎉</span>
          <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xs font-bold">G</div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        <div className="lg:col-span-2 p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          
          {progressPercent === 100 && (
            <div className="bg-gradient-to-r from-emerald-600/20 to-purple-600/20 p-6 rounded-[2rem] border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl animate-fadeIn">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-xl font-black text-white flex items-center gap-2 justify-center md:justify-start">
                  <span>🏆</span> Selamat, Anda Telah Lulus!
                </h3>
                <p className="text-xs text-slate-300 font-medium">Semua materi dan asesmen modul ini telah diselesaikan dengan sempurna. Anda berhak mendapatkan lencana & sertifikat.</p>
              </div>
              <Link to="/sertifikat" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-black text-xs shadow-lg transition-transform hover:scale-105 whitespace-nowrap flex items-center gap-2">
                Klaim Sertifikat Ber-QR Code 🎓
              </Link>
            </div>
          )}

          <div className="w-full aspect-video bg-[#121826] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/30"></div>
            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-slate-300">Mondy Academy</div>
            <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
              <div className="text-center space-y-2">
                <span className="text-7xl block animate-bounce">🎥</span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Memutar: {currentVideo.title}</p>
              </div>
            </div>
            <div onClick={() => alert(`Memutar video sesi: ${currentVideo.title}`)} className="w-20 h-20 bg-purple-600/90 hover:bg-purple-600 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shadow-2xl z-10 border border-white/20">
              <span className="text-2xl ml-1 text-white">▶️</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{currentVideo.title}</h2>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button onClick={() => setActiveTab('transcript')} className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${activeTab === 'transcript' ? 'bg-purple-600 border-purple-500 text-white shadow-lg' : 'bg-[#121826] border-white/10 text-slate-300 hover:bg-white/5'}`}>
                📄 Transcript
              </button>
              <button onClick={() => setActiveTab('discussion')} className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${activeTab === 'discussion' ? 'bg-purple-600 border-purple-500 text-white shadow-lg' : 'bg-[#121826] border-white/10 text-slate-300 hover:bg-white/5'}`}>
                💬 Diskusi Dosen & Mahasiswa ({discussions.length})
              </button>
              <button onClick={() => alert("Terima kasih! Rating modul ini: ⭐⭐⭐⭐⭐ (4.8/5)")} className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 bg-[#121826] border border-white/10 text-slate-300 hover:bg-white/5 transition-all">
                ⭐ Rating <span className="text-amber-400 font-black">4.8</span>
              </button>
            </div>

            {activeTab === 'transcript' && (
              <div className="bg-[#121826] p-6 rounded-2xl border border-purple-500/30 text-xs text-slate-300 leading-relaxed space-y-2">
                <p className="font-bold text-purple-400">--- Transkrip Otomatis Sesi ---</p>
                <p>[00:00] Selamat datang di materi {currentVideo.title}. Mari kita bedah bersama poin-poin pentingnya.</p>
                <p>[02:10] Perhatikan dokumen sumber transaksi karena ini menjadi dasar utama pencatatan akuntansi.</p>
                <p>[05:45] Analisis saldo normal akun sangat krusial dalam menyusun laporan keuangan yang akurat.</p>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="bg-[#121826] p-6 rounded-2xl border border-purple-500/30 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-black text-white text-sm">Forum Tanya Jawab & Diskusi Kelas</h3>
                  <span className="text-xs text-purple-400 font-bold">Dosen Pengampu: Fanny Magdalena, M.Ak.</span>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {discussions.map((d) => (
                    <div key={d.id} className="bg-[#090D16] p-4 rounded-xl border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-purple-400">{d.user}</span>
                        <span className="text-[10px] text-slate-500">{d.time}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-semibold">{d.text}</p>

                      {d.replies.length > 0 && (
                        <div className="pl-4 border-l-2 border-teal-500 space-y-2 mt-3 pt-2">
                          {d.replies.map(rep => (
                            <div key={rep.id} className="bg-teal-950/30 p-3 rounded-lg border border-teal-500/20">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] font-black text-teal-400">{rep.user} 🎓</span>
                                <span className="text-[9px] text-slate-500">{rep.time}</span>
                              </div>
                              <p className="text-xs text-slate-300">{rep.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input 
                    type="text" 
                    value={newDiscText} 
                    onChange={e => setNewDiscText(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && handleSendDiscussion()}
                    placeholder="Tulis pertanyaan untuk dosen atau sesama mahasiswa..." 
                    className="flex-1 bg-[#090D16] border border-white/10 rounded-xl p-3 text-xs font-bold text-white outline-none focus:border-purple-500 placeholder-slate-500" 
                  />
                  <button onClick={handleSendDiscussion} className="bg-purple-600 text-white px-5 py-3 rounded-xl font-bold text-xs shadow hover:bg-purple-700 transition-colors">
                    Kirim Diskusi
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-xl space-y-6">
            <div>
              <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">Pengajar</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-2xl">👩‍🏫</div>
                <div>
                  <h4 className="font-extrabold text-white text-base">Fanny Magdalena S.E., M.Ak., AK., CA.</h4>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">Dosen Akuntansi FEB UNTAR & Partner KJA PT ACE Solusindo</p>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">Deskripsi Materi</p>
              <p className="text-sm text-slate-300 leading-relaxed">{currentVideo.desc}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#121826] border-l border-white/10 flex flex-col h-full overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-[#0B0F19]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-white text-sm">Pengantar Akuntansi</h3>
              <span className="text-xs font-black text-emerald-400">{progressPercent}%</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mb-4">{completedCount} dari {playlist.length} Materi Selesai</p>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-xs opacity-50">🔍</span>
              <input type="text" placeholder="Cari materi..." className="w-full bg-[#121826] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold text-white placeholder-slate-500 outline-none focus:border-purple-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 px-3 pt-2">Akuntansi Perusahaan Dagang (7)</p>
            {playlist.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleSelectVideo(item)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${item.id === currentVideo.id ? 'bg-purple-600/20 border-purple-500/50 shadow-lg' : 'bg-[#090D16] border-white/5 hover:border-white/20'}`}
              >
                <div className="flex items-center space-x-3 mr-3">
                  <span className="text-sm">▶️</span>
                  <div>
                    <h4 className={`text-xs font-extrabold leading-snug ${item.id === currentVideo.id ? 'text-purple-300' : 'text-slate-200'}`}>{item.title}</h4>
                    <span className="text-[10px] font-bold text-slate-500 mt-1 block">{item.duration}</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border border-purple-400 bg-purple-600 text-white text-[10px] flex items-center justify-center shrink-0">
                  ✓
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#090D16] border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <span className="text-xs font-black text-white">Tutor AI Copilot</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="max-h-32 overflow-y-auto space-y-2 pr-1 custom-scrollbar text-xs">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-purple-600 text-white ml-6' : 'bg-[#121826] border border-white/10 text-slate-300 mr-6'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-[#121826] border border-white/10 rounded-xl p-1.5">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSendAI()}
                placeholder="Tanya AI tentang materi ini..." 
                className="flex-1 bg-transparent px-2 text-xs font-bold text-white outline-none placeholder-slate-500" 
              />
              <button onClick={handleSendAI} className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow hover:scale-105 transition-transform">
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Assessment = () => (<div className="min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center p-6 text-center"><div className="bg-[#121826] border border-white/10 p-16 rounded-[3rem] shadow-2xl max-w-2xl w-full"><span className="text-7xl mb-8 block drop-shadow-lg">📝</span><h1 className="text-4xl font-black mb-4 text-white tracking-tight">Latihan Terakhir</h1><p className="font-bold text-slate-400 mb-10">Uji pemahamanmu sebelum meraih sertifikat kelulusan.</p><Link to="/sertifikat" className="bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-xl block w-full shadow-xl hover:-translate-y-1 transition-transform">Kumpul & Klaim Sertifikat 🏆</Link></div></div>);

// --- HALAMAN SERTIFIKAT KELULUSAN DENGAN TOMBOL DOWNLOAD ---
const Certificate = () => {
  const navigate = useNavigate();

  const handleDownloadCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#060911] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 w-full p-4 flex justify-between items-center max-w-5xl">
        <button onClick={() => navigate('/belajar')} className="text-sm font-bold text-slate-400 hover:text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          ← Kembali ke Ruang Belajar
        </button>
      </div>

      <div className="bg-[#121826] border border-purple-500/30 p-12 md:p-20 rounded-[3rem] text-center max-w-4xl w-full shadow-2xl relative z-10 space-y-8 animate-fadeIn">
        <span className="text-6xl block animate-bounce">🎓</span>
        <div>
          <span className="text-xs font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">Sertifikat Resmi Kelulusan</span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-white mt-4 mb-2">Sertifikat Kelulusan</h1>
          <p className="text-sm text-slate-400">Diberikan kepada mahasiswa atas keberhasilan menuntaskan seluruh kurikulum pembelajaran.</p>
        </div>

        <div className="py-6 border-y border-white/10 space-y-2">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Nama Peserta</p>
          <h3 className="text-2xl md:text-3xl font-black text-purple-300">Ahmad Budi</h3>
          <p className="text-xs text-slate-400 mt-2">Telah menyelesaikan matakuliah <strong className="text-white">Pengantar Akuntansi (Perusahaan Dagang)</strong> dengan predikat Memuaskan.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button onClick={handleDownloadCertificate} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
            📥 Download / Cetak Sertifikat (PDF)
          </button>
          <button onClick={() => navigate('/dasbor')} className="w-full sm:w-auto bg-white/5 text-slate-300 hover:text-white px-8 py-4 rounded-2xl font-bold border border-white/10 transition-colors">
            Kembali ke Dasbor
          </button>
        </div>

        <div className="text-[10px] text-slate-500 tracking-wider uppercase">
          Verifikasi ID: MONDY-CERT-2026-9984 • Terbit resmi oleh Mondy Academy Institute
        </div>
      </div>
    </div>
  );
};

// --- ADMIN PORTAL ---
const AdminLayout = ({ settings, setSettings }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);
  
  const [adminCourses, setAdminCourses] = useState(initialCourses);
  const [users, setUsers] = useState(initialUsers);
  const [ebooks, setEbooks] = useState(initialEbooks);
  const [tickets, setTickets] = useState(initialTicketsAdmin);
  const [blogs, setBlogs] = useState(initialBlogs);

  const [activeMoocTab, setActiveMoocTab] = useState('kursus');
  const [activeUserTab, setActiveUserTab] = useState('siswa');
  const [activeSettingTab, setActiveSettingTab] = useState('umum');
  const [searchQuery, setSearchQuery] = useState('');

  const [tempSettings, setTempSettings] = useState(settings);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'AKUNTANSI', customCategory: '' });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'siswa' });

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'siswa' });

  const [coupons, setCoupons] = useState([
    { id: 1, code: "MONDY2026", discount: "20%", expiry: "31 Des 2026", status: "Active" },
    { id: 2, code: "AKUNTANSIMODEN", discount: "Rp15.000", expiry: "15 Okt 2026", status: "Active" }
  ]);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({ code: '', discount: '', expiry: '' });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Edukasi', customCategory: '', excerpt: '', author: 'Admin Utama' });

  const actionAlert = (action, item) => alert(`Fungsi ${action} untuk ${item} berhasil dipanggil!`);
  const handleDeleteItem = (setState, stateArray, id) => {
    if(window.confirm("Yakin ingin menghapus data ini?")) {
      setState(stateArray.filter(item => item.id !== id));
    }
  };

  const handleOpenEditUser = (u) => {
    setEditUser(u.id);
    setUserForm({ name: u.name, email: u.email, role: u.role });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name.trim() || !userForm.email.trim()) return alert("Nama dan Email wajib diisi!");
    setUsers(users.map(u => u.id === editUser ? { ...u, ...userForm } : u));
    setIsUserModalOpen(false);
    alert("Data pengguna berhasil diperbarui!");
  };

  const handleSaveNewUser = () => {
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) return alert("Nama dan Email wajib diisi!");
    const createdUser = {
      id: Date.now(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      joinDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "Active"
    };
    setUsers([createdUser, ...users]);
    setIsAddUserModalOpen(false);
    setNewUserForm({ name: '', email: '', role: 'siswa' });
    alert("Pengguna baru berhasil ditambahkan!");
  };

  const handleSaveCoupon = () => {
    if (!couponForm.code.trim() || !couponForm.discount.trim()) return alert("Kode kupon dan diskon wajib diisi!");
    const newC = {
      id: Date.now(),
      code: couponForm.code.toUpperCase(),
      discount: couponForm.discount,
      expiry: couponForm.expiry || "30 Hari ke depan",
      status: "Active"
    };
    setCoupons([newC, ...coupons]);
    setIsCouponModalOpen(false);
    setCouponForm({ code: '', discount: '', expiry: '' });
    alert("Kupon diskon berhasil dibuat!");
  };

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    alert("Pengaturan sistem web berhasil diperbarui!");
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempSettings({ ...tempSettings, [field]: imageUrl });
    }
  };

  const handleApproveUser = (id) => { setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' } : u)); };
  const handleRejectUser = (id) => { if(window.confirm("Tolak dan hapus pendaftaran pengguna ini?")) { setUsers(users.filter(u => u.id !== id)); } };
  const handleApproveCourse = (id) => { setAdminCourses(adminCourses.map(c => c.id === id ? { ...c, status: 'Published' } : c)); };

  const filteredCourses = adminCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => { setEditId(null); setFormData({ title: '', category: 'AKUNTANSI', customCategory: '' }); setIsModalOpen(true); };
  const handleEdit = (course) => { 
    setEditId(course.id); 
    const isStandard = ["AKUNTANSI", "MANAJEMEN", "LOGISTIK"].includes(course.category);
    setFormData({ title: course.title, category: isStandard ? course.category : 'Lainnya', customCategory: isStandard ? '' : course.category }); 
    setIsModalOpen(true); 
  };
  
  const handleSave = () => {
    if (!formData.title.trim()) return alert("Judul tidak boleh kosong!");
    const finalCategory = formData.category === 'Lainnya' ? (formData.customCategory || 'UMUM') : formData.category;

    if (editId) { 
      setAdminCourses(adminCourses.map(c => c.id === editId ? { ...c, ...formData, category: finalCategory } : c)); 
    } else {
      const newCourse = { id: Date.now(), ...formData, category: finalCategory, instructor: "Admin", rating: "0.0", reviews: 0, lessons: 0, duration: "00:00:00", oldPrice: "-", newPrice: "Rp0", color: "from-slate-400 to-slate-600", icon: "📁", status: "Published", students: 0 };
      setAdminCourses([newCourse, ...adminCourses]);
    }
    setIsModalOpen(false);
  };

  const handleOpenBlogModal = (blog = null) => {
    if (blog) {
      setEditBlogId(blog.id);
      const isStandard = ["Edukasi", "Logistik", "Manajemen", "Akuntansi", "Umum"].includes(blog.category);
      setBlogForm({ title: blog.title, category: isStandard ? blog.category : 'Lainnya', customCategory: isStandard ? '' : blog.category, excerpt: blog.excerpt, author: blog.author });
    } else {
      setEditBlogId(null);
      setBlogForm({ title: '', category: 'Edukasi', customCategory: '', excerpt: '', author: 'Admin Utama' });
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = () => {
    if (!blogForm.title.trim() || !blogForm.excerpt.trim()) return alert("Judul dan ringkasan artikel wajib diisi!");
    const finalCategory = blogForm.category === 'Lainnya' ? (blogForm.customCategory || 'Umum') : blogForm.category;

    if (editBlogId) {
      setBlogs(blogs.map(b => b.id === editBlogId ? { ...b, ...blogForm, category: finalCategory } : b));
    } else {
      const newBlog = { id: Date.now(), ...blogForm, category: finalCategory, date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Published' };
      setBlogs([newBlog, ...blogs]);
    }
    setIsBlogModalOpen(false);
  };

  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Ikhtisar Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">TOTAL MAHASISWA</p><p className="text-3xl font-extrabold text-slate-900">{users.filter(u => u.role === 'siswa' && u.status === 'Active').length}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">MODUL AKTIF</p><p className="text-3xl font-extrabold text-slate-900">{adminCourses.filter(c => c.status === 'Published').length}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">PENDAPATAN BULAN INI</p><p className="text-3xl font-extrabold text-green-600">Rp 12.4M</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500"><p className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-widest">MENUNGGU REVIEW</p><p className="text-3xl font-extrabold text-slate-900">{users.filter(u => u.status === 'Pending').length + adminCourses.filter(c => c.status === 'In Review').length}</p></div>
      </div>
    </>
  );

  const renderManajemenMOOC = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Manajemen MOOC</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Tambah Data</button>
      </div>
      <div className="flex space-x-2 border-b border-slate-200 mb-6">
        <button onClick={() => setActiveMoocTab('kursus')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeMoocTab === 'kursus' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Daftar Kursus</button>
        <button onClick={() => setActiveMoocTab('review')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeMoocTab === 'review' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Review Modul <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px]">{adminCourses.filter(c => c.status === 'In Review').length}</span></button>
        <button onClick={() => setActiveMoocTab('kategori')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeMoocTab === 'kategori' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Kategori Topik</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {activeMoocTab !== 'review' && (
          <div className="p-4 bg-slate-50 border-b border-slate-200"><input type="text" placeholder="Cari kursus..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none text-sm focus:border-blue-500" /></div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">{activeMoocTab === 'kategori' ? 'NAMA KATEGORI' : 'JUDUL MODUL'}</th>
                {activeMoocTab !== 'kategori' && <th className="px-6 py-4 font-bold">KATEGORI</th>}
                {activeMoocTab !== 'kategori' && <th className="px-6 py-4 font-bold">STATUS</th>}
                <th className="px-6 py-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeMoocTab === 'kursus' && filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-slate-800">{course.title}</td>
                  <td className="px-6 py-5"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-bold">{course.category}</span></td>
                  <td className="px-6 py-5"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{course.status}</span></td>
                  <td className="px-6 py-5 text-center space-x-4"><button onClick={() => handleEdit(course)} className="text-blue-600 font-bold hover:underline">Edit</button><button onClick={() => handleDeleteItem(setAdminCourses, adminCourses, course.id)} className="text-red-500 font-bold hover:underline">Hapus</button></td>
                </tr>
              ))}
              {activeMoocTab === 'review' && adminCourses.filter(c => c.status === 'In Review').map((course) => (
                <tr key={course.id} className="hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-slate-800"><p>{course.title}</p><p className="text-xs font-medium text-slate-400 mt-1">Oleh: {course.instructor}</p></td>
                  <td className="px-6 py-5"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-bold">{course.category}</span></td>
                  <td className="px-6 py-5"><span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded text-[10px] font-bold uppercase">In Review</span></td>
                  <td className="px-6 py-5 text-center space-x-3">
                    <button onClick={() => handleApproveCourse(course.id)} className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-green-600">Setujui & Publish</button>
                    <button onClick={() => actionAlert('Revisi', course.title)} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">Minta Revisi</button>
                  </td>
                </tr>
              ))}
              {activeMoocTab === 'review' && adminCourses.filter(c => c.status === 'In Review').length === 0 && (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-400 font-medium">Semua modul sudah di-review. Tidak ada antrean pengajuan baru.</td></tr>
              )}
              {activeMoocTab === 'kategori' && (
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">Akuntansi</td><td className="px-6 py-4 text-center space-x-4"><button className="text-blue-600 font-bold hover:underline">Edit</button></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">{editId ? `Edit ${activeMoocTab}` : `Tambah ${activeMoocTab} Baru`}</h3><button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button></div>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cover / Thumbnail Modul</label><input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none cursor-pointer border border-slate-200 rounded-xl" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Nama Kursus</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Masukkan judul..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
              {activeMoocTab === 'kursus' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Kategori</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold text-slate-700 bg-slate-50 mb-3">
                    <option value="AKUNTANSI">Akuntansi</option><option value="MANAJEMEN">Manajemen</option><option value="LOGISTIK">Logistik</option><option value="Lainnya">Lainnya (Ketik Sendiri)</option>
                  </select>
                  {formData.category === 'Lainnya' && (
                    <input type="text" value={formData.customCategory} onChange={(e) => setFormData({...formData, customCategory: e.target.value.toUpperCase()})} placeholder="Contoh: PARIWISATA" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-3 pt-4 border-t border-slate-100"><button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Batal</button><button onClick={handleSave} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-colors">Simpan</button></div>
          </div>
        </div>
      )}
    </>
  );

  const renderPengguna = () => {
    let filteredUsers;
    if (activeUserTab === 'persetujuan') { filteredUsers = users.filter(u => u.status === 'Pending'); } 
    else { filteredUsers = users.filter(u => u.role === activeUserTab && u.status === 'Active'); }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Data Pengguna</h1>
          <button onClick={() => setIsAddUserModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Tambah Pengguna</button>
        </div>
        <div className="flex space-x-2 border-b border-slate-200 mb-6">
          <button onClick={() => setActiveUserTab('siswa')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'siswa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Data Siswa</button>
          <button onClick={() => setActiveUserTab('instruktur')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'instruktur' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Data Instruktur</button>
          <button onClick={() => setActiveUserTab('admin')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'admin' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Data Admin</button>
          <button onClick={() => setActiveUserTab('persetujuan')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'persetujuan' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Persetujuan Akun <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px]">{users.filter(u => u.status === 'Pending').length}</span></button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                <tr><th className="px-6 py-4 font-bold">NAMA LENGKAP</th><th className="px-6 py-4 font-bold">EMAIL</th><th className="px-6 py-4 font-bold">TGL DAFTAR</th><th className="px-6 py-4 font-bold">STATUS</th><th className="px-6 py-4 font-bold text-center">AKSI</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-6 py-5 font-bold text-slate-800"><p>{u.name}</p>{activeUserTab === 'persetujuan' && <p className="text-[10px] text-slate-400 mt-1 uppercase">Mendaftar sebagai: {u.role}</p>}</td>
                    <td className="px-6 py-5">{u.email}</td>
                    <td className="px-6 py-5">{u.joinDate}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{u.status}</span>
                    </td>
                    <td className="px-6 py-5 text-center space-x-3">
                      {activeUserTab === 'persetujuan' ? (
                        <>
                          <button onClick={() => handleApproveUser(u.id)} className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-green-600">Approve</button>
                          <button onClick={() => handleRejectUser(u.id)} className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200">Tolak</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => actionAlert('Kirim Pesan', u.name)} className="text-indigo-600 font-bold hover:underline">Pesan</button>
                          <button onClick={() => handleOpenEditUser(u)} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteItem(setUsers, users, u.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">Tidak ada data pengguna di kategori ini.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Tambah Pengguna Baru</h3><button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Lengkap & Gelar</label><input type="text" value={newUserForm.name} onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})} placeholder="Contoh: Budi Santoso" className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email / Username</label><input type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} placeholder="budi@kampus.ac.id" className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Peran (Role)</label>
                  <select value={newUserForm.role} onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})} className="w-full p-4 rounded-xl border bg-slate-50 font-semibold">
                    <option value="siswa">Siswa</option><option value="instruktur">Instruktur</option><option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsAddUserModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveNewUser} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold">Simpan</button></div>
            </div>
          </div>
        )}

        {isUserModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Edit Data Pengguna</h3><button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Lengkap</label><input type="text" value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email</label><input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Peran (Role)</label>
                  <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})} className="w-full p-4 rounded-xl border bg-slate-50 font-semibold">
                    <option value="siswa">Siswa</option><option value="instruktur">Instruktur</option><option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsUserModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveUser} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold">Simpan</button></div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderEbook = () => (
    <>
      <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-extrabold text-slate-900">Manajemen E-Book</h1><button onClick={() => actionAlert('Tambah', 'E-Book')} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Tambah E-Book</button></div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600"><thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider"><tr><th className="px-6 py-4 font-bold">Judul Buku</th><th className="px-6 py-4 font-bold">Kategori</th><th className="px-6 py-4 font-bold">Harga</th><th className="px-6 py-4 font-bold text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">
            {ebooks.map((b) => (<tr key={b.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">{b.title}</td><td className="px-6 py-4">{b.category}</td><td className="px-6 py-4 font-semibold text-slate-900">{b.price}</td><td className="px-6 py-4 text-center space-x-4"><button onClick={() => actionAlert('Edit', b.title)} className="text-blue-600 font-bold hover:underline">Edit</button><button onClick={() => handleDeleteItem(setEbooks, ebooks, b.id)} className="text-red-500 font-bold hover:underline">Hapus</button></td></tr>))}
          </tbody></table>
        </div>
      </div>
    </>
  );

  const renderKeuangan = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Keuangan & Manajemen Kupon</h1>
        <button onClick={() => setIsCouponModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Buat Kupon</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Admin Revenue</p><p className="text-3xl font-extrabold text-slate-900">Rp 8.500.000</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Instructor Revenue</p><p className="text-3xl font-extrabold text-slate-900">Rp 3.900.000</p></div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-lg">Daftar Kupon Diskon Aktif</h3>
          <span className="text-xs font-bold text-slate-400">{coupons.length} Kupon Tersedia</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">KODE KUPON</th>
                <th className="px-6 py-4 font-bold">BESAR DISKON</th>
                <th className="px-6 py-4 font-bold">MASA BERLAKU</th>
                <th className="px-6 py-4 font-bold">STATUS</th>
                <th className="px-6 py-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-black text-blue-600 tracking-wide">{c.code}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{c.discount}</td>
                  <td className="px-6 py-4">{c.expiry}</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2.5 py-1 rounded text-[10px] font-bold uppercase">{c.status}</span></td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDeleteItem(setCoupons, coupons, c.id)} className="text-red-500 font-bold hover:underline">Hapus Kupon</button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">Belum ada kupon diskon aktif.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCouponModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Buat Kupon Diskon Baru</h3><button onClick={() => setIsCouponModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kode Kupon</label><input type="text" value={couponForm.code} onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} placeholder="Contoh: MONDYPROMO" className="w-full p-4 rounded-xl border font-bold uppercase" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Besar Diskon</label><input type="text" value={couponForm.discount} onChange={(e) => setCouponForm({...couponForm, discount: e.target.value})} placeholder="Contoh: 25%" className="w-full p-4 rounded-xl border font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Masa Berlaku</label><input type="text" value={couponForm.expiry} onChange={(e) => setCouponForm({...couponForm, expiry: e.target.value})} placeholder="Contoh: 31 Des 2026" className="w-full p-4 rounded-xl border font-semibold" /></div>
            </div>
            <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsCouponModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveCoupon} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold">Simpan</button></div>
          </div>
        </div>
      )}
    </>
  );

  const renderTiket = () => (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Tiket Support</h1>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600"><thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider"><tr><th className="px-6 py-4 font-bold">Pengguna</th><th className="px-6 py-4 font-bold">Subjek Masalah</th><th className="px-6 py-4 font-bold">Prioritas</th><th className="px-6 py-4 font-bold text-center">Status</th><th className="px-6 py-4 font-bold text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">
            {tickets.map((t) => (<tr key={t.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">{t.user}</td><td className="px-6 py-4">{t.subject}</td><td className="px-6 py-4"><span className={`font-bold ${t.priority === 'Tinggi' ? 'text-red-600' : 'text-amber-600'}`}>{t.priority}</span></td><td className="px-6 py-4 text-center"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{t.status}</span></td><td className="px-6 py-4 text-center space-x-3"><button onClick={() => actionAlert('Balas Macro', t.subject)} className="text-blue-600 font-bold hover:underline">Balas</button><button onClick={() => setTickets(tickets.map(x => x.id === t.id ? {...x, status: 'Closed'} : x))} className="text-slate-500 font-bold hover:underline">Tutup</button></td></tr>))}
          </tbody></table>
        </div>
      </div>
    </>
  );

  const renderBlog = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Artikel & Blog</h1>
        <button onClick={() => handleOpenBlogModal()} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700">+ Tulis Artikel</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr><th className="px-6 py-4 font-bold">JUDUL ARTIKEL</th><th className="px-6 py-4 font-bold">PENULIS</th><th className="px-6 py-4 font-bold">TGL PUBLIKASI</th><th className="px-6 py-4 font-bold">STATUS</th><th className="px-6 py-4 font-bold text-center">AKSI</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-slate-800 max-w-xs truncate" title={b.title}>{b.title}</td>
                  <td className="px-6 py-5">{b.author}</td>
                  <td className="px-6 py-5">{b.date}</td>
                  <td className="px-6 py-5"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${b.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span></td>
                  <td className="px-6 py-5 text-center space-x-3">
                    <button onClick={() => handleOpenBlogModal(b)} className="text-blue-600 font-bold hover:underline">Edit</button>
                    <button onClick={() => handleDeleteItem(setBlogs, blogs, b.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">Belum ada artikel yang dipublikasikan.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderPengaturan = () => {
    return (
      <div className="max-w-5xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Pengaturan Sistem Web</h1>
          <button onClick={handleSaveSettings} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-blue-700 transition-colors">Simpan Perubahan</button>
        </div>
        <div className="flex space-x-8 border-b border-slate-200 mb-8 overflow-x-auto">
          <button onClick={() => setActiveSettingTab('umum')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'umum' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Identitas Web</button>
          <button onClick={() => setActiveSettingTab('tampilan')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'tampilan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Tampilan & Tema</button>
          <button onClick={() => setActiveSettingTab('pembelajaran')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'pembelajaran' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Sistem Pembelajaran</button>
          <button onClick={() => setActiveSettingTab('pembayaran')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'pembayaran' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Payment Gateway</button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          {activeSettingTab === 'umum' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Platform</label><input type="text" value={tempSettings.platformName} onChange={(e) => setTempSettings({...tempSettings, platformName: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email Dukungan (Support)</label><input type="email" defaultValue="support@mondy.com" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
              </div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Judul Utama Hero (Landing Page)</label><input type="text" value={tempSettings.heroTitle} onChange={(e) => setTempSettings({...tempSettings, heroTitle: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Deskripsi SEO Singkat</label><textarea value={tempSettings.seoDesc} onChange={(e) => setTempSettings({...tempSettings, seoDesc: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold h-24 resize-none"></textarea></div>
            </div>
          )}
          {activeSettingTab === 'tampilan' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Warna Utama (Primary Color)</label>
                  <input type="color" value={tempSettings.primaryColor} onChange={(e) => setTempSettings({...tempSettings, primaryColor: e.target.value})} className="w-full h-12 p-1 rounded-xl border border-slate-200 cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Ukuran Font Dasar</label>
                  <select value={tempSettings.fontSize} onChange={(e) => setTempSettings({...tempSettings, fontSize: e.target.value})} className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold bg-slate-50">
                    <option value="14px">14px (Kecil)</option>
                    <option value="16px">16px (Normal)</option>
                    <option value="18px">18px (Besar)</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Upload Logo Platform</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logoUrl')} className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 outline-none cursor-pointer border border-slate-200 rounded-xl mb-2" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800/50"><Link to="/" className="text-2xl font-serif font-bold text-white mb-1 block">Mondy<span className="text-blue-500">Admin</span></Link><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Management Console</div></div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <button onClick={() => navigate('/admin/dasbor')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('dasbor') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📊 Dashboard</button>
          <div className="px-6 py-3 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pembelajaran</div>
          <button onClick={() => { navigate('/admin/mooc'); setActiveMoocTab('kursus'); }} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('mooc') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📚 Manajemen MOOC</button>
          <button onClick={() => navigate('/admin/ebook')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('ebook') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📖 E-Book Digital</button>
          <div className="px-6 py-3 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operasional</div>
          <button onClick={() => { navigate('/admin/pengguna'); setActiveUserTab('siswa'); }} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('pengguna') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>👥 Data Pengguna</button>
          <button onClick={() => navigate('/admin/keuangan')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('keuangan') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>💰 Keuangan & Kupon</button>
          <div className="px-6 py-3 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dukungan & Sistem</div>
          <button onClick={() => navigate('/admin/tiket')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('tiket') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>🎧 Tiket Support</button>
          <button onClick={() => navigate('/admin/blog')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('blog') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📝 Artikel & Blog</button>
          <button onClick={() => navigate('/admin/pengaturan')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('pengaturan') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>⚙️ Pengaturan Web</button>
        </nav>
        <div className="p-6 border-t border-slate-800/50"><button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center">← Keluar (Log Out)</button></div>
      </aside>
      <div className="flex-1 p-10 overflow-y-auto relative">
        {isActive('dasbor') && renderDashboard()}
        {isActive('mooc') && renderManajemenMOOC()}
        {isActive('pengguna') && renderPengguna()}
        {isActive('ebook') && renderEbook()}
        {isActive('keuangan') && renderKeuangan()}
        {isActive('tiket') && renderTiket()}
        {isActive('blog') && renderBlog()}
        {isActive('pengaturan') && renderPengaturan()}
      </div>

      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900">{editBlogId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Judul Artikel</label>
                <input type="text" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} placeholder="Masukkan judul..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Kategori Topik</label>
                <select value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 bg-slate-50 font-semibold text-slate-700 mb-3">
                  <option value="Edukasi">Edukasi</option><option value="Logistik">Logistik</option><option value="Manajemen">Manajemen</option><option value="Akuntansi">Akuntansi</option><option value="Umum">Umum</option>
                  <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
                </select>
                {blogForm.category === 'Lainnya' && (
                  <input type="text" value={blogForm.customCategory} onChange={(e) => setBlogForm({...blogForm, customCategory: e.target.value})} placeholder="Contoh: Pariwisata, Sistem Informasi..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Isi Artikel / Ringkasan</label>
                <textarea value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} placeholder="Tuliskan isi artikel Anda di sini..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 min-h-[150px] resize-y"></textarea>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsBlogModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Batal</button>
              <button onClick={handleSaveBlog} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-colors">Publikasikan Artikel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- WIZARD COURSE BUILDER INSTRUKTUR ---
const CourseBuilderWizard = ({ onGoBack, onAddCourse }) => {
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({ title: '', category: 'AKUNTANSI', customCategory: '', price: '', description: '' });

  const [sections, setSections] = useState([
    { id: 'sec-1', title: 'Bagian 1: Pengantar', lessons: [{ id: 'les-1', title: 'Video Pembelajaran (YouTube Link)', icon: '▶️', color: 'text-rose-500' }, { id: 'les-2', title: 'Modul PDF / PPT / Word', icon: '📄', color: 'text-blue-500' }] }
  ]);
  const [draggedLesson, setDraggedLesson] = useState(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [lessonForm, setLessonForm] = useState({ title: '', type: 'youtube', link: '' });

  const handleAddSection = () => setSections([...sections, { id: `sec-${Date.now()}`, title: `Bagian ${sections.length + 1}: Topik Baru`, lessons: [] }]);
  const openLessonModal = (sectionId) => { setActiveSectionId(sectionId); setLessonForm({ title: '', type: 'youtube', link: '' }); setIsLessonModalOpen(true); };

  const submitLesson = () => {
    if(!lessonForm.title.trim()) return alert("Judul materi wajib diisi!");
    let icon = '📄'; let color = 'text-blue-500';
    if(lessonForm.type === 'youtube' || lessonForm.type === 'video') { icon = '▶️'; color = 'text-rose-500'; }
    if(lessonForm.type === 'link') { icon = '🔗'; color = 'text-indigo-500'; }
    if(lessonForm.type === 'quiz') { icon = '📝'; color = 'text-amber-500'; }
    if(lessonForm.type === 'assignment') { icon = '📋'; color = 'text-emerald-500'; }
    if(lessonForm.type === 'discussion') { icon = '💬'; color = 'text-teal-500'; }
    if(lessonForm.type === 'liveclass') { icon = '🔴'; color = 'text-red-500'; }
    setSections(sections.map(sec => sec.id === activeSectionId ? { ...sec, lessons: [...sec.lessons, { id: `les-${Date.now()}`, title: lessonForm.title, icon, color }] } : sec));
    setIsLessonModalOpen(false);
  };

  const handleDeleteLesson = (sectionId, lessonId) => { if(window.confirm("Hapus materi ini?")) setSections(sections.map(sec => sec.id === sectionId ? { ...sec, lessons: sec.lessons.filter(l => l.id !== lessonId) } : sec)); };
  const handleDragStart = (e, sectionId, lessonIndex) => { setDraggedLesson({ sectionId, lessonIndex }); };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e, targetSectionId, targetLessonIndex) => {
    e.preventDefault();
    if (!draggedLesson) return;
    const newSections = JSON.parse(JSON.stringify(sections));
    const sourceSection = newSections.find(s => s.id === draggedLesson.sectionId);
    const targetSection = newSections.find(s => s.id === targetSectionId);
    const [movedLesson] = sourceSection.lessons.splice(draggedLesson.lessonIndex, 1);
    if (targetLessonIndex === undefined) targetSection.lessons.push(movedLesson); else targetSection.lessons.splice(targetLessonIndex, 0, movedLesson);
    setSections(newSections);
    setDraggedLesson(null);
  };

  // FUNGSI SUBMIT DAN SIMPAN KE STATE UTAMA
  const handleFinalSubmit = () => {
    if (!courseData.title.trim()) {
      alert("Harap isi Judul Modul di Tahap 1 terlebih dahulu!");
      setStep(1);
      return;
    }

    const finalCategory = courseData.category === 'Lainnya (Ketik Sendiri)' 
      ? (courseData.customCategory.trim().toUpperCase() || 'UMUM') 
      : courseData.category;

    const newCourseObj = {
      id: Date.now(),
      category: finalCategory,
      title: courseData.title,
      instructor: 'Rei, S.E., M.Ak.',
      rating: '5.0',
      reviews: 0,
      lessons: sections.reduce((total, s) => total + s.lessons.length, 0) || 1,
      duration: '02:00:00',
      old_price: courseData.price ? `Rp${(Number(courseData.price) * 1.5).toLocaleString('id-ID')}` : 'Rp100.000',
      new_price: courseData.price ? `Rp${Number(courseData.price).toLocaleString('id-ID')}` : 'Gratis',
      price_value: Number(courseData.price || 0),
      color: 'from-teal-500 to-emerald-600',
      icon: '📚',
      status: 'In Review',
      students: 0,
      sections: sections
    };

    if (onAddCourse) {
      onAddCourse(newCourseObj);
    }

    alert(`Modul "${newCourseObj.title}" berhasil diajukan! Statusnya saat ini "In Review" menunggu persetujuan Admin.`);
    onGoBack();
  };

  const renderContentByStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Informasi Dasar Modul</h2>
            <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cover / Thumbnail Modul</label><input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-teal-700 font-medium border border-slate-200 rounded-xl p-3" /></div>
            <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Judul Modul</label><input type="text" value={courseData.title} onChange={e => setCourseData({...courseData, title: e.target.value})} placeholder="Contoh: Akuntansi Lanjutan" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kategori</label>
                <select value={courseData.category} onChange={e => setCourseData({...courseData, category: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 mb-3">
                  <option value="AKUNTANSI">Akuntansi</option><option value="MANAJEMEN">Manajemen</option><option value="LOGISTIK">Logistik</option>
                  <option value="Lainnya (Ketik Sendiri)">Lainnya (Ketik Sendiri)</option>
                </select>
                {courseData.category === 'Lainnya (Ketik Sendiri)' && (
                  <input type="text" value={courseData.customCategory} onChange={e => setCourseData({...courseData, customCategory: e.target.value.toUpperCase()})} placeholder="Contoh: PARIWISATA" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500" />
                )}
              </div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Harga (Rp)</label><input type="number" value={courseData.price} onChange={e => setCourseData({...courseData, price: e.target.value})} placeholder="0 (Gratis) / 250000" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500" /></div>
            </div>
            <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Deskripsi Singkat</label><textarea rows="3" value={courseData.description} onChange={e => setCourseData({...courseData, description: e.target.value})} placeholder="Penjelasan singkat modul perkuliahan..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500"></textarea></div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button onClick={onGoBack} className="text-slate-500 font-bold hover:underline">Batalkan</button>
              <button onClick={() => setStep(2)} className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition">Lanjut ke Tahap Berikutnya →</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 mb-2 text-center">Kurikulum & Materi (Drag & Drop)</h2>
            <p className="text-xs text-slate-500 text-center mb-6">Tarik icon ⠿ untuk memindahkan materi. Klik tombol tambah sesi untuk menyematkan video atau berkas.</p>
            {sections.map((section) => (
              <div key={section.id} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">{section.title}</h3>
                  <button onClick={() => openLessonModal(section.id)} className="text-teal-600 font-bold text-xs hover:underline">+ Tambah Sesi</button>
                </div>
                <div className="space-y-2">
                  {section.lessons.map((lesson, idx) => (
                    <div key={lesson.id} draggable onDragStart={(e) => handleDragStart(e, section.id, idx)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, section.id, idx)} className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl cursor-move shadow-sm hover:border-teal-500 transition">
                      <div className="flex items-center gap-3"><span className="text-slate-300 font-black">⠿</span><span>{lesson.icon}</span><span className="text-sm font-semibold text-slate-800">{lesson.title}</span></div>
                      <button onClick={() => handleDeleteLesson(section.id, lesson.id)} className="text-rose-500 text-xs font-bold hover:underline">HAPUS</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleAddSection} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl font-bold text-slate-500 hover:border-teal-500 hover:text-teal-600 transition">+ Tambah Bagian Baru</button>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button onClick={() => setStep(1)} className="text-slate-500 font-bold hover:underline">← Kembali</button>
              <button onClick={() => setStep(3)} className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition">Lanjut ke Tahap Berikutnya →</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Assessment & Ujian Modul</h2>
            <p className="text-xs text-slate-500 mb-6">Atur bobot kuis kelulusan untuk mahasiswa.</p>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Passing Grade Kuis (%)</label><input type="number" defaultValue="75" className="w-full p-4 rounded-xl border border-slate-200 font-bold text-teal-600" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Instruksi Tugas Akhir</label><textarea rows="3" defaultValue="Kumpulkan laporan analisis siklus akuntansi dalam format PDF maksimal 5 halaman." className="w-full p-4 rounded-xl border border-slate-200"></textarea></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button onClick={() => setStep(2)} className="text-slate-500 font-bold hover:underline">← Kembali</button>
              <button onClick={() => setStep(4)} className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition">Review & Publish →</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-12 space-y-6">
            <div className="text-6xl animate-bounce">🚀</div>
            <h2 className="text-3xl font-black text-slate-900">Siap untuk dipublikasikan?</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">Modul ini akan masuk ke status <strong>"In Review"</strong> di tab Course Saya dan akan diperiksa oleh Admin sebelum tampil di Katalog Publik.</p>
            <div className="pt-4 flex justify-center gap-4">
              <button onClick={() => setStep(3)} className="px-6 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100">← Kembali</button>
              <button onClick={handleFinalSubmit} className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-xl font-extrabold text-base shadow-lg shadow-teal-600/30 transition transform hover:-translate-y-0.5">Submit for Review</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${step === s ? 'bg-teal-600 text-white' : step > s ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{step > s ? '✓' : s}</div>
            <span className={`text-xs font-bold ${step === s ? 'text-slate-900' : 'text-slate-400'}`}>{s === 1 ? 'Informasi' : s === 2 ? 'Kurikulum' : s === 3 ? 'Assessment' : 'Review'}</span>
          </div>
        ))}
      </div>
      {renderContentByStep()}

      {isLessonModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h3 className="font-black text-lg text-slate-900">Tambah Sesi Pembelajaran</h3>
            <div><label className="text-xs font-bold text-slate-500 block mb-1">Judul Sesi</label><input type="text" value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} className="w-full p-3 border rounded-xl" /></div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Tipe Sesi</label>
              <select value={lessonForm.type} onChange={e => setLessonForm({...lessonForm, type: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50">
                <option value="youtube">Video YouTube</option>
                <option value="pdf">Dokumen PDF / Slide</option>
                <option value="quiz">Kuis Interaktif</option>
                <option value="assignment">Tugas Mandiri</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2"><button onClick={() => setIsLessonModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 font-bold rounded-xl text-slate-600 text-sm">Batal</button><button onClick={submitLesson} className="flex-1 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-sm">Tambahkan</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PORTAL INSTRUKTUR LENGKAP DENGAN FITUR FUNGSIONAL ---
const InstructorLayout = ({ instructorProfile, setInstructorProfile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);

  const [instructorCourses, setInstructorCourses] = useState(initialCourses);

  const handleAddCourse = (newCourse) => {
  setInstructorCourses((prev) => [newCourse, ...prev]);
};
  const [blogs, setBlogs] = useState(initialBlogs);
  const [activeTab, setActiveTab] = useState('courses');
  const [isBuildingCourse, setIsBuildingCourse] = useState(false);
  const [activeSettingTab, setActiveSettingTab] = useState('profil');
  const [tempProfile, setTempProfile] = useState(instructorProfile);

  // State Fitur-Fitur Instruktur
  const [materials, setMaterials] = useState([
    { id: 1, title: 'Modul Teori Siklus Akuntansi.pdf', type: 'PDF', size: '2.4 MB', course: 'Akuntansi Perusahaan Dagang', date: '01 Sep 2026' },
    { id: 2, title: 'Slide Presentasi Jurnal Khusus.pptx', type: 'PPT', size: '8.1 MB', course: 'Akuntansi Perusahaan Dagang', date: '03 Sep 2026' },
    { id: 3, title: 'Template Kertas Kerja Neraca Lajur.xlsx', type: 'Excel', size: '1.2 MB', course: 'Akuntansi Perusahaan Dagang', date: '05 Sep 2026' }
  ]);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [materialForm, setMaterialForm] = useState({ title: '', type: 'PDF', course: 'Akuntansi Perusahaan Dagang' });

  const [assessments, setAssessments] = useState([
    { id: 1, title: 'Kuis Evaluasi Modul 1: Jurnal Khusus', type: 'Pilihan Ganda', questionsCount: 15, duration: '30 Menit', passingGrade: 75 },
    { id: 2, title: 'Tugas Kasus: Penyusunan Neraca Lajur PT Mandiri', type: 'Upload Berkas', questionsCount: 1, duration: '7 Hari', passingGrade: 80 }
  ]);

  const [studentsList, setStudentsList] = useState([
    { id: 101, name: 'Ahmad Budi', email: 'ahmad@kampus.ac.id', course: 'Akuntansi Perusahaan Dagang', progress: 100, score: 92, status: 'Lulus' },
    { id: 102, name: 'Siti Nurhaliza', email: 'siti@kampus.ac.id', course: 'Akuntansi Perusahaan Dagang', progress: 65, score: 78, status: 'Belajar' },
    { id: 103, name: 'Budi Santoso', email: 'budi.s@kampus.ac.id', course: 'Akuntansi Perusahaan Dagang', progress: 30, score: 0, status: 'Belajar' }
  ]);

  const [liveSessions, setLiveSessions] = useState([
    { id: 1, topic: 'Bedah Kasus Laporan Keuangan Akhir Periode', date: '18 Sep 2026', time: '19:30 WIB', platform: 'Zoom Meeting', link: 'https://zoom.us/j/998822' }
  ]);

  // Handler Umum
  const handleDeleteItem = (setState, stateArray, id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setState(stateArray.filter(item => item.id !== id));
    }
  };

  const handleSaveMaterial = () => {
    if (!materialForm.title.trim()) return alert("Nama materi wajib diisi!");
    const newEntry = {
      id: Date.now(),
      title: materialForm.title,
      type: materialForm.type,
      size: '3.5 MB',
      course: materialForm.course,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setMaterials([newEntry, ...materials]);
    setIsMaterialModalOpen(false);
    setMaterialForm({ title: '', type: 'PDF', course: 'Akuntansi Perusahaan Dagang' });
    alert("Berkas materi berhasil ditambahkan ke pustaka!");
  };

  const handleSaveProfile = () => {
    setInstructorProfile(tempProfile);
    alert("Profil publik instruktur berhasil diperbarui!");
  };

  // --- SUB-HALAMAN FUNGSIONAL ---
  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Overview Kinerja Instruktur</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Tren Pendaftaran Siswa Saya (6 Bulan Terakhir)</h3>
          <div className="flex items-end gap-3 h-48">
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[30%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Apr</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[45%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Mei</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[60%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Jun</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[55%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Jul</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[80%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Agu</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[100%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Sep</span></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">TOTAL SISWA</p><p className="text-4xl font-extrabold text-slate-900">{studentsList.length * 42}</p></div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">COURSE AKTIF</p><p className="text-4xl font-extrabold text-slate-900">{instructorCourses.length}</p></div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">RATA-RATA RATING</p><p className="text-3xl font-extrabold text-slate-900">4.9 <span className="text-amber-500">★</span></p></div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">ESTIMASI BAGI HASIL</p><p className="text-2xl font-extrabold text-teal-600">Rp 5.120.000</p></div>
        </div>
      </div>
    </>
  );

  const renderMaterials = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Library Materi & E-Book</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola dokumen pedoman, slide, dan lembar kerja yang disematkan ke modul pembelajaran.</p>
        </div>
        <button onClick={() => setIsMaterialModalOpen(true)} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Unggah Dokumen</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">NAMA FILE</th>
              <th className="px-6 py-4 font-bold">FORMAT</th>
              <th className="px-6 py-4 font-bold">KURSUS TERKAIT</th>
              <th className="px-6 py-4 font-bold">UKURAN</th>
              <th className="px-6 py-4 font-bold text-center">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materials.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800">📄 {m.title}</td>
                <td className="px-6 py-4"><span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded text-xs font-bold">{m.type}</span></td>
                <td className="px-6 py-4 text-xs text-slate-500">{m.course}</td>
                <td className="px-6 py-4 text-xs">{m.size}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button onClick={() => alert(`Mengunduh berkas: ${m.title}`)} className="text-teal-600 font-bold hover:underline">Unduh</button>
                  <button onClick={() => handleDeleteItem(setMaterials, materials, m.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderVideos = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Video Pembelajaran Terintegrasi</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar rekaman video perkuliahan dan link streaming.</p>
        </div>
        <button onClick={() => alert("Membuka dialog tambah URL YouTube / Vimeo...")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Sambungkan Video</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Pengantar Dokumen Sumber Transaksi Dagang", duration: "08:15", status: "Terhubung (YouTube)", views: 240 },
          { title: "Posting Buku Besar Pembantu Piutang", duration: "12:40", status: "Terhubung (YouTube)", views: 185 },
          { title: "Penyusunan Laporan Laba Rugi Komprehensif", duration: "15:20", status: "Terhubung (LMS Storage)", views: 160 }
        ].map((v, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-3">
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-3xl text-white cursor-pointer hover:bg-slate-800 transition">
              ▶️
            </div>
            <h4 className="font-bold text-slate-800 text-sm leading-snug">{v.title}</h4>
            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>⏱️ {v.duration}</span>
              <span>👁️ {v.views} tayangan</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderAssessments = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Assessment & Bank Soal</h1>
          <p className="text-sm text-slate-500 mt-1">Evaluasi pemahaman mahasiswa melalui kuis mandiri dan penugasan esai terstruktur.</p>
        </div>
        <button onClick={() => alert("Membuka modul pembuat butir kuis...")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Buat Asesmen Baru</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">JUDUL ASESMEN</th>
              <th className="px-6 py-4 font-bold">TIPE</th>
              <th className="px-6 py-4 font-bold">JUMLAH BUTIR</th>
              <th className="px-6 py-4 font-bold">DURASI / BATAS</th>
              <th className="px-6 py-4 font-bold">PASSING GRADE</th>
              <th className="px-6 py-4 font-bold text-center">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assessments.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800">{a.title}</td>
                <td className="px-6 py-4"><span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded text-xs font-bold">{a.type}</span></td>
                <td className="px-6 py-4 text-xs">{a.questionsCount} Butir</td>
                <td className="px-6 py-4 text-xs">{a.duration}</td>
                <td className="px-6 py-4 font-bold text-emerald-600">{a.passingGrade}%</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button onClick={() => alert("Mengedit butir pertanyaan...")} className="text-teal-600 font-bold hover:underline">Kelola Soal</button>
                  <button onClick={() => handleDeleteItem(setAssessments, assessments, a.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderEngagement = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Engagement & Sesi Live</h1>
          <p className="text-sm text-slate-500 mt-1">Interaksi langsung melalui jadwal webinar dan ruang asistensi perkuliahan.</p>
        </div>
        <button onClick={() => alert("Membuka form penambahan jadwal Live Class...")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Jadwalkan Sesi</button>
      </div>

      <div className="space-y-6">
        {liveSessions.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div className="space-y-1">
              <span className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">🔴 Live Class</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{s.topic}</h3>
              <p className="text-sm text-slate-500">📅 {s.date} • ⏰ {s.time} via {s.platform}</p>
            </div>
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-teal-700 transition">
              Buka Tautan Zoom 🚀
            </a>
          </div>
        ))}
      </div>
    </>
  );

  const renderStudents = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Pemantauan Peserta</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar mahasiswa terdaftar, progres materi, dan evaluasi capaian belajar.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">NAMA MAHASISWA</th>
              <th className="px-6 py-4 font-bold">MODUL</th>
              <th className="px-6 py-4 font-bold">PROGRES</th>
              <th className="px-6 py-4 font-bold">NILAI AKHIR</th>
              <th className="px-6 py-4 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {studentsList.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800"><p>{s.name}</p><p className="text-xs text-slate-400 font-normal">{s.email}</p></td>
                <td className="px-6 py-4 text-xs">{s.course}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full" style={{ width: `${s.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-extrabold text-slate-800">{s.score > 0 ? s.score : '-'}</td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${s.status === 'Lulus' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderMonetization = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Monetisasi & Riwayat Payout</h1>
          <p className="text-sm text-slate-500 mt-1">Laporan pendapatan penjualan modul dan pengajuan penarikan dana.</p>
        </div>
        <button onClick={() => alert("Pengajuan penarikan dana (Payout) telah dikirim ke bagian Keuangan!")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">Tarik Saldo (Payout)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">TOTAL SALDO TERSEDIA</p><p className="text-3xl font-extrabold text-teal-600">Rp 5.120.000</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">TOTAL DITARIK (LIFETIME)</p><p className="text-3xl font-extrabold text-slate-900">Rp 14.800.000</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">REKENING TERDAFTAR</p><p className="text-base font-extrabold text-slate-800 mt-2">Bank Mandiri •• 9012</p></div>
      </div>
    </>
  );

  const renderCertificateSettings = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Template Sertifikat</h1>
          <p className="text-sm text-slate-500 mt-1">Atur kriteria kelulusan dan penomoran otomatis ber-QR code.</p>
        </div>
        <button onClick={() => alert("Pengaturan parameter sertifikat disimpan!")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">Simpan Format</button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Format Nomor Sertifikat</label>
          <input type="text" defaultValue="MONDY-CERT/{YEAR}/{ID}" className="w-full p-4 rounded-xl border border-slate-200 font-semibold" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div><h4 className="font-bold text-slate-800">Verifikasi QR Code Publik</h4><p className="text-xs text-slate-500">Tampilkan halaman verifikasi autentisitas saat QR di-scan.</p></div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-teal-600" />
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#FAFAFF] font-sans">
      <aside className="w-64 bg-[#0B1B1A] text-slate-300 flex flex-col shrink-0 shadow-xl z-20">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-serif font-bold text-white mb-1 block tracking-tight">Mondy<span className="text-teal-400">Instruktur</span></Link>
          <div className="text-[9px] font-bold text-teal-500/70 uppercase tracking-widest mt-1">Instructor Portal</div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/dasbor'); }} className={`w-full text-left flex items-center px-6 py-3.5 font-bold text-sm transition-colors ${isActive('dasbor') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📈 Dashboard</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/courses'); setActiveTab('courses'); }} className={`w-full text-left flex items-center px-6 py-3.5 font-bold text-sm transition-colors ${isActive('courses') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📚 Course Saya</button>
          <button onClick={() => setIsBuildingCourse(true)} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-teal-400 hover:bg-white/5 border-l-4 border-transparent'}`}>➕ Buat Modul</button>

          <div className="px-6 py-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Library & Materi</div>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/materi'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('materi') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📁 Materi & E-Book</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/video'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('video') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>🎥 Video Pembelajaran</button>

          <div className="px-6 py-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Interaksi & Evaluasi</div>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/assessment'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('assessment') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📝 Assessment</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/engagement'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('engagement') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>💬 Engagement</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/peserta'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('peserta') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>👥 Peserta</button>

          <div className="px-6 py-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kinerja & Sistem</div>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/analytics'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('analytics') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📊 Analytics</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/monetisasi'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('monetisasi') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>💰 Monetisasi</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/sertifikat'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('sertifikat') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>🏆 Sertifikat</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/pengaturan'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('pengaturan') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>⚙️ Pengaturan</button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center">← Keluar (Log Out)</button>
        </div>
      </aside>

      <div className="flex-1 p-10 overflow-y-auto relative">
        {isBuildingCourse ? (
          <CourseBuilderWizard onGoBack={() => setIsBuildingCourse(false)} onAddCourse={handleAddCourse} />
        ) : (
          <>
            {isActive('dasbor') && renderDashboard()}
            {isActive('courses') && renderCourseSaya()}
            {isActive('materi') && renderMaterials()}
            {isActive('video') && renderVideos()}
            {isActive('assessment') && renderAssessments()}
            {isActive('engagement') && renderEngagement()}
            {isActive('peserta') && renderStudents()}
            {isActive('analytics') && renderDashboard()}
            {isActive('monetisasi') && renderMonetization()}
            {isActive('sertifikat') && renderCertificateSettings()}
            {isActive('pengaturan') && renderPengaturan()}
          </>
        )}
      </div>

      {/* Modal Tambah Berkas Materi */}
      {isMaterialModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Unggah Materi Baru</h3><button onClick={() => setIsMaterialModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Judul Dokumen</label><input type="text" value={materialForm.title} onChange={e => setMaterialForm({...materialForm, title: e.target.value})} placeholder="Contoh: Modul Siklus Akuntansi.pdf" className="w-full p-4 rounded-xl border font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Format Berkas</label>
                <select value={materialForm.type} onChange={e => setMaterialForm({...materialForm, type: e.target.value})} className="w-full p-4 rounded-xl border bg-slate-50 font-semibold">
                  <option value="PDF">PDF Document</option>
                  <option value="PPT">PowerPoint Presentation</option>
                  <option value="Excel">Spreadsheet (XLSX)</option>
                  <option value="Word">DOCX Document</option>
                </select>
              </div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Pilih File dari Komputer</label><input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-teal-50 file:text-teal-700 font-bold border rounded-xl p-2" /></div>
            </div>
            <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsMaterialModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveMaterial} className="flex-1 py-4 bg-teal-600 text-white rounded-xl font-bold">Simpan Berkas</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- ROUTER UTAMA DENGAN GLOBAL SETTINGS STATE ---
const App = () => {
  const [globalSettings, setGlobalSettings] = useState({
    platformName: "Mondy",
    primaryColor: "#9333EA",
    fontSize: "16px",
    heroTitle: "Aplikasi Belajar Kuliah No 1 di Indonesia",
    seoDesc: "Akses video dari dosen universitas top, sambil melihat pembahasan dan rangkuman soal, disertai AI untuk membantumu meraih IPK idaman.",
    logoUrl: "",
    heroBanner: "",
    adBannerUrl: "",
    adLink: ""
  });

  const [instructorProfile, setInstructorProfile] = useState({
    name: "Laurensius Reinald Diansilves Due, S.Pd., M.Pd.",
    title: "Dosen Pengantar Akuntansi I",
    bio: "Berpengalaman dalam pengembangan sistem informasi akuntansi dan E-Learning Management System (LMS).",
    avatar: ""
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home settings={globalSettings} />} />
        <Route path="/katalog" element={<Catalog settings={globalSettings} />} />
        <Route path="/artikel" element={<PublicArticleList settings={globalSettings} />} />
        <Route path="/detail/:id" element={<CourseDetail settings={globalSettings} instructorProfile={instructorProfile} />} />
        <Route path="/login" element={<Login settings={globalSettings} />} />
        <Route path="/dasbor" element={<Dashboard settings={globalSettings} />} />
        <Route path="/belajar" element={<LearningRoom />} />
        <Route path="/asesmen" element={<Assessment />} />
        <Route path="/sertifikat" element={<Certificate />} />
        <Route path="/admin/*" element={<AdminLayout settings={globalSettings} setSettings={setGlobalSettings} />} />
        <Route path="/instruktur/*" element={<InstructorLayout instructorProfile={instructorProfile} setInstructorProfile={setInstructorProfile} />} />
        
        {/* Rute Halaman Dukungan Footer */}
        <Route path="/bantuan" element={<SupportPage settings={globalSettings} type="faq" />} />
        <Route path="/syarat" element={<SupportPage settings={globalSettings} type="terms" />} />
        <Route path="/privasi" element={<SupportPage settings={globalSettings} type="privacy" />} />
      </Routes>
    </Router>
  );
};

export default App;