// 0script.js
document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION =====
    // Smooth scroll untuk navigasi (fixed version)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Khusus "minum air"
            if (this.textContent.trim().toLowerCase() === 'minum air') {
                e.preventDefault();
                const youtubeUrl = 'https://www.youtube.com/shorts/ODgnitAHXLk?feature=share';
                const userConfirmed = confirm(`Anda akan dibawa ke halaman YouTube:\n${youtubeUrl}\n\nLanjutkan?`);
                if (userConfirmed) {
                    window.open(youtubeUrl, '_blank');
                }
                return;
            }
            
            // Untuk link internal
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, targetId);
                    updateActiveNav(targetId);
                }
            }
        });
    });
    
    // Update navigasi aktif saat scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('.page-section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNav(sectionId);
            }
        });
    });
    
    function updateActiveNav(targetId) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== GANTI FOTO =====
    document.querySelector('#row3 button').addEventListener('click', function() {
        const gambar = [
            'fototo/kelompok apsod.jpg',
            'fototo/kelompok pbo.jpg',
            'fototo/bukber.jpg',
        ];
        const randomIndex = Math.floor(Math.random() * gambar.length);
        document.querySelector('#hero2 img').src = gambar[randomIndex];
    });
    
    // ===== FORM VALIDASI =====
    document.querySelector('form').addEventListener('submit', function(event) {
        const nama = document.querySelector('input[type="text"]').value;
        const pesan = document.querySelector('textarea').value;

        if (nama.trim() === '' || pesan.trim() === '') {
            alert('Nama dan Pesan tidak boleh kosong!');
            event.preventDefault();
        }
    });
});

// pesan ke tele
// 0script.js
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode yang sudah ada sebelumnya)

    // ===== KIRIM PESAN KE TELEGRAM =====
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validasi form
        const nama = document.querySelector('input[type="text"]').value.trim();
        const pesan = document.querySelector('textarea').value.trim();

        if (nama === '' || pesan === '') {
            alert('Nama dan Pesan tidak boleh kosong!');
            return;
        }

        // Konfirmasi sebelum kirim
        const confirmSend = confirm(`Kirim pesan ke Telegram?\n\nNama: ${nama}\nPesan: ${pesan}`);
        
        if (confirmSend) {``
            const telegramUsername = 'luqmanaaa'; 
            const encodedMessage = encodeURIComponent(`Halo, saya ${nama}\n\n${pesan}`);
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
            
            window.open(telegramUrl, '_blank');
            document.querySelector('form').reset();
            alert('Aplikasi Telegram akan terbuka. Jika tidak terinstall, buka di perangkat yang sudah install Telegram.');
        }
    });
});