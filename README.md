"req.session.user" adalah keyword yang berisi sesi yang mana sesi tersebut didapat dari hasil berhasil login (dilihat di loginController.js), bawaan dari express-session adalah "req. session" dan user adalah nama session yang dibuat "Namanya bebas aja suka-suka"

di file homeController: Kenapa informasi user tidak diambil dari database langsung menggunakan query seperti informasi lainnya yang di bawahnya?
Karena tidak perlu buat query lagi, karena data yang diinginkan sudah dikirimkan berbarengan dengan query saat membuat session. Informasi tersebut berada di tabel yang sama dengan informasi yang diperlukan untuk login.
