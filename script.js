class MusicPlayer {
  constructor() {
    this.initializeElements();
    this.initializeState();
    this.loadFavorites();
    this.bindEvents();
    this.loadSong(0);
  }

  initializeElements() {
    // Cache all DOM elements
    this.container = document.querySelector(".container");
    this.songName = document.querySelector(".song-name");
    this.songArtist = document.querySelector(".song-artist");
    this.cover = document.querySelector(".cover");
    this.playPauseBtn = document.querySelector(".play-pause");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.audio = document.querySelector("audio");
    this.songTime = document.querySelector(".song-time");
    this.songProgress = document.querySelector(".song-progress");
    this.coverName = document.querySelector(".cover span:nth-child(2)");
    this.coverArtist = document.querySelector(".cover span:nth-child(1)");
    this.flipBtn = document.querySelector(".player-btn");
    this.playerWrapper = document.querySelector(".player_wrapper");
    this.flipBack = document.querySelector(".flip-back");
    this.repeatBtn = document.querySelector(".repeat-btn");
    this.shuffleBtn = document.querySelector(".shuffle-btn");
    this.currSong = document.querySelector(".current-song");
    this.lyrics = document.getElementById("lyrics");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.songTitle = document.getElementById("song-title");
    this.favoriteSong = document.getElementById("favorite");
    this.showFavorites = document.getElementById("showFavorites");
    this.favoritesPage = document.querySelector(".favorites-page");
    this.initialText = document.querySelector(".intialText");
  }

  initializeState() {
    this.songData = [
      {
        id: 1,
        name: "Ghaba",
        artist: "Marwan Pablo",
        src: "Ghaba.mp3",
        favorite: false,
        arabic: true,
        thumbnail: "img/pablo1.png",
        lyrics:
          'السلامُ عليكم، إظهر يا مختفي<br>الصورة مش واضحة بس مش هتفرق<br>(مش هتفرق، مش هتفرق)<br>فاكرينها بالحظ، جت عشان ببتسم<br>كل التماثيل هتكسر<br>مش بمثل، أنا مش ببتذل<br>هصارحك في وشك، أنا مش هتكسف<br>(شياطين عمَالة تزن في ودني)<br>ياه<br><br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br><br>كلامكو كله مثير للشفقة (شفقة)<br>أول ما جيت حلت البركة (بركة)<br>طبقنا طابق على طبقك (علي طبقك)<br>(No way) دوه حقي، دي مش صدقة<br>حلكِ مني عشان إنت عطلة (فكك)<br>ما شفتكوش أيام الحارة (كنتوا فين؟)<br>أيام ما سهرنا تحت المطرة (مطرة)<br>أيام الأكشن والإثارة (ووه)<br><br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br><br>‫‫مش محتاج لـ Invitation<br>‫‫بابلو Villain، ده Invasion<br>‫‫حط المدينة ع الـ Rotation<br>‫‫معايا حل الـ Situation (ذيع)<br>(Money) Get the money ‫‫صباع للـ Haters،<br>‫‫بكده أكون خلصت الـ Mission (ماشي)<br>أقتلهم واحد ورا واحد (تررراه)<br>‫زي Final Destination<br><br>ووه، ووه، ووه، ووه (أقتلهم واحد ورا واحد)<br>(Final Destination زي) ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br>ووه، ووه، ووه، ووه<br><br>كبرنا وفهمنا، خسرنا وكسبنا<br>دايمًا حاضرين مهما غيبنا<br>الفقر شُفنا والقحط عِشنا<br>ربك بيعوض الحمد لله<br>لو ع النوع فريد، سالك، مش بكيد، ياه<br>صاحبي الدنيا دي ما بتنصرش البريء، ياه<br>عشان البشر جُم سنوا القوانين، ياه<br>تقع تاني تقوم وتقول "هل من مزيد؟"، ياه<br>آه، ده الموضوع، دية الغريزة<br>بإيدك وسنانك وما تحلّش الفريسة<br>وفي قلب الوحل لازم تلاقي الميزة<br>بقينا عايشين أكننا جوة<br><br>غابة، غابة، غابة، غابة<br>غابة، غابة، غابة، غابة<br>غابة، غابة، غابة، غابة<br>غابة، غابة، غابة، غابة',
      },
      {
        id: 2,
        name: "Masra7ya",
        artist: "Marwan Pablo",
        src: "Masra7eya Marwan Pablo.mp3",
        favorite: false,
        thumbnail: "img/pablo2.png",
        arabic: true,
        lyrics:
          "إيه<br>مسرحية، مسرحية<br>عايشين أكننا في مسرحية<br>مسرحية، مسرحية<br>مسرحية، مسرحية<br>(روح) طخيت مشوار<br>ورُحت للمُر عشان أشربه<br>بطلت أتوقعهم يفضلوا<br>ما أناقش حد في اللي بيختاره<br>تملي نفسي تقولي سيبَك<br>ماشية فيدني عشان أفيدك<br>وأنا ماليش في شغل التاروت<br>بس الأغلبية بيعرضوا<br>ينسى نفسه أنا أفكره<br>اللي يزاولني أنا أكدره<br>اللي يقدرني أنا أقدره<br>اللي يكبرني أنا أكبره<br>والمسرح عمال بيتملي<br>ما ألعبش دور أنا فيه بفتري<br>ببيع كتير عشان بشتري<br>مع ذلك غلوا منا وفاروا<br>قدري ما حدش هيأخره<br>مسرحية، مسرحية<br>عايشين أكننا في مسرحية<br>مسرحية، مسرحية<br>مسرحية، مسرحية<br>(طخيت مشوار)<br>وصلنا وعدينا<br>دُرنا ولفينا<br>طريقنا شقينا<br>في شوال عبينا<br>تعبنا وخفينا<br>جروحنا خبينا<br>بنينا وهدينا<br>وعمرنا ما غلينا<br>بشر عايزة اللي يشكمها شكم<br>دنيا تطير برج أجدعها عقل<br>ناس من برة هالله هالله شكل<br>عِشرة سنين وما صانوش الأكل<br>زي العايبة اللي فيها تجيبه فيك<br>يا إبن آدم إرضى باللي ليك<br>عشان من غيرك ماشية ومش ماشية بيك<br>عدينا السهل، دخلنا في الغريق<br>مسرحية، مسرحية<br>عايشين أكننا في مسرحية<br>مسرحية، مسرحية<br>مسرحية، مسرحية<br>كـ-كلنا في سيرك إحنا بلياتشو<br>حتى اللضا عمو أبو كرش هابشه<br>من زمان جدو على الحيطة ناقشه<br>قالولي محتاجينك، دا مش وقته<br>مع ذلك فلة ولا بأس، فلة ولا بأس<br>As long I'm gettin' racks, yeah<br>كبيت على الفاضي وإتملى وعمره ما إكتفى<br>قفلت الحنفية وإتكرهت بعدها، غيرت ‫الدور<br>مسرحية، مسرحية<br>عايشين أكننا في مسرحية<br>مسرحية، مسرحية<br>مسرحية، مسرحية<br>آدينا بنقول<br>برة النص هنا مش مسموح<br>نقطونا زي المحلول<br>Robin Hood حولوني بقيت<br>سبت قلبي، في دماغي مسحول<br>رايحة جاية زي البندول<br>جبت كاش، جبتش مجموع<br>شطبنا العرض وطفينا النور<br>Like oh",
      },
      {
        id: 3,
        name: "All girls are the same",
        artist: "Juice WRLD",
        src: "All girls are the same.mp3",
        favorite: false,
        lyrics:
          "Mmm, they're rottin' my brain, love<br>These hoes are the same<br>I admit it, another ho got me finished<br>Broke my heart, oh, no, you didn't<br>Fuck sippin', I'ma down a whole bottle<br>Hard liquor, hard truth, can't swallow<br>Need a bartender, put me out my sorrow<br>Wake up the next day in the Monte Carlo<br>With a new woman, tell me she from Colorado<br>And she love women, she'll be gone by tomorrow<br>Who am I kiddin'?<br>All this jealousy and agony that I sit in<br>I'm a jealous boy, really feel like John Lennon<br>I just want real love, guess it's been a minute<br>Pissed off from the way that I don't fit in<br>I don't fit in<br>Tell me what's the secret to love, I don't get it<br>Feel like I be runnin' a race, I'm not winnin'<br>Ran into the devil today and she grinnin'<br>Hey, these girls are insane<br>Uh, all girls are the same<br>They're rottin' my brain, love<br>Think I need a change<br>Before I go insane, love<br>All girls are the same<br>They're rottin' my brain, love<br>Think I need a change<br>Before I go insane, love<br>Ten minutes, she told me it would take ten minutes<br>To break my heart, oh no, she didn't<br>Fuck livin', I'ma drown in my sorrow<br>Fuck givin', I'ma take not borrow<br>And I'm still sinnin', I'm still losin' my mind<br>I know I been trippin', I'm still wastin' my time<br>All the time given, am I dyin'? Am I livin'?<br>It's fuck feelings, my sorrow go up to the ceilin'<br>Ah, now I am insane<br>Demons in my brain, love<br>Peace I can't attain<br>'Cause all these girls the same, love<br>Now I am insane<br>Demons in my brain, love<br>Peace I can't attain<br>'Cause all these girls the same, love",
        arabic: false,
        thumbnail: "img/download.jpeg",
      },
      {
        id: 4,
        name: "Bnnit",
        artist: "Marwan Pablo",
        src: "Bnnit.mp3",
        favorite: false,
        lyrics:
          "Gang, gang, gang, gang<br>Gang, gang, gang, gang<br><br>ماشي بعربيتي في نص الليل<br>‫مطلع إيدي، مشغل Phonk<br><br>نحبو الفخر<br>الحاسة الكام دي؟<br>حاسس بالرملة على الأرض<br>زميلي قلبي مش في باريس<br>في برلين<br>‫سألوني ع الدعوة، قُلتلهم أنا ماليش<br>‫خلوني جاضض، أنا قافش<br>‫Pull up أكني عايش Lavish<br>بصحيها بعد ما نامت<br>Woah, woah, woah (Woah, woah)<br>باكو ليا وباكو ليه<br>ضحكوا علينا بملاليم<br>‫قالولنا إسمه الـ Salary<br>(Fuck it)<br><br>Bonne nuit<br>فلوسي جديدة بس أنا قديم<br>‫Capone back home هيكون غشيم<br>راجع البيت بالـ ‫SUV<br>‫مش بـ Keep it غير لو Hunnid<br><br>بيبي أنا آخد الترام، آه<br>لو مش إحنا مين إللي غيرنا؟ (مين؟)<br>‫كتير حواليا بالـ Prada<br>بسرح في سيجارتي ع السبنسة<br>ما بتجيش هنا باللماضة (فوق)<br>إنتو مش منا، إنتو غيرنا (قولهم)<br>(ها) Detox-كل أما آجي أحب أ<br>ألاقي الناس كلها رزلة (قولهم)<br>Alone ربنا عالم إني مش عايز أكون<br>في الأوضة ع السرير ممدد جنب كام مليون<br>‫آه، بوحشها بتديني Call<br>آه، نفس كل يوم<br><br>Bonne nuit<br>فلوسي جديدة بس أنا قديم<br>‫Capone back home هيكون غشيم<br>راجع البيت بالـ ‫SUV<br>‫مش بـ Keep it غير لو Hunnid<br><br>فين الطُعم؟ لو مش صعب<br>مش بحل وده بيعمل مشكلة<br>أنا في الجبال بين الصخر<br>تحت الضغط<br>مستقل أنا بطولي، إنتَ بتضخ<br>‫Groupـات أو Solo<br>بنزل أقش زي الكومي<br>مونتانا توني، أنا مش چوني<br>إللي يشوفنا دلوقتي ما يصدقش الأيام إللي ما كانش فيها أندومي<br>آه، ما تشوفش وحش يا عيوني<br>‫Missedـات كتير على تليفوني<br>ما عرفوش يجيبوني فـ جابولهم كام إزازة وقاموا عبوا فيها صوتي",
        arabic: true,
        thumbnail: "img/pablo3.png",
      },
      {
        id: 5,
        name: "J’comprend pas",
        artist: "PNL",
        src: "Jcomprand pas.mp3",
        favorite: false,
        lyrics:
          "Ce soir, j'fume un gros, gros teh'<br>J'té-ma ton postérieur, je veux le même en po-poster<br>Si on se tue, je compte pas les balles qui s'perdent<br>La vie, c'est chelou, j'la baise, y a pas de mystère<br>Igo, j'deviens méchant, pas de Jasmine pour Jafar (Jafar)<br>J'suis comme le bas de mon bâtiment, j'ai tous les jours l'cafard (cafard)<br>Mes yeux clairs regardent l'enfer, l'enfer, l'enferm<br>Je croyais que t'étais droit, mais en fait, en fait, en fait<br>J'fais pompe et traction, j'ai l'tri' à Végéta (Végéta)<br>Les pec' à Léonidas et ta bitch se met des doigts<br>Et j'bande, et j'bande<br>Et j'fais un gros smiley (un gros smiley)<br>Et je vais tous les khabat si je vends mon cœur en tail-dé<br><br>Ouh wawa, ouh wawa, ouh wawa<br>J'ai trop traîné en bas-bas<br>Ouh wawa, ouh wawa, ouh wawa<br>J'dois faire l'million pour baba<br>Ouh wawa, ouh wawa, ouh wawa<br>Tu tests, on sort le ba-ba<br>Ouh wawa, ouh wawa, ouh wawa<br>J'comprends pas pourquoi on m'comprend pas<br><br>Que Dieu me pardonne si je me trompe (lala)<br>J'pose ma miff avant qu'on pose ma tombe (gala, gala, gala, gala)<br>Ce chemin étroit et sombre me séduit<br>L'impression qu'il soigne mon cœur de E.T<br>Couvert d'oseille, igo, j'suis sous calmant<br>De la haine à revendre, j'en ai tellement<br>Et j'comprends pas pourquoi on m'comprend pas<br>T'es seul dans le noir, j'espère que ton ombre ne t'a pas lâché (ne t'a pas lâché)<br>Et ils croient savoir pourquoi on en bave<br>J'serais pas le premier ni le dernier<br>QLF ceux qui crèvent à part<br>J'm'endors sous alcool vers Zadar<br>J'vends la drogue, c'est pas un hasard<br>Je prends mes tunes j'rentre à la casa<br>J'té-ma la lune, les péchés m'endettent<br>Les anges me parlent, mais moi, j'entends pas<br>Je suis dans ma bulle, je suis baisé, j'm'embête<br>Et j'comprends pas pourquoi j'comprends pas<br><br>Ouh wawa, ouh wawa, ouh wawa<br>J'ai trop traîné en bas-bas<br>Ouh wawa, ouh wawa, ouh wawa<br>J'dois faire l'million pour baba<br>Ouh wawa, ouh wawa, ouh wawa<br>Tu tests, on sort le ba-ba<br>Ouh wawa, ouh wawa, ouh wawa<br>J'comprends pas pourquoi on m'comprend pas<br><br>Ouh wawa, ouh wawa, ouh wawa<br>J'ai trop traîné en bas-bas<br>Ouh wawa, ouh wawa, ouh wawa<br>J'dois faire l'million pour baba<br>Ouh wawa, ouh wawa, ouh wawa<br>Tu tests, on sort le bas-bas<br>Ouh wawa, ouh wawa, ouh wawa<br>J'comprends pas pourquoi on m'comprend pas",
        arabic: false,
        thumbnail: "img/PNL.png",
      },
    ];

    this.songIndex = 0;
    this.favorites = [];
  }

  loadFavorites() {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      this.updateFavoritesIcon();
      this.updateFavorites();
    } catch (error) {
      console.error("Error loading favorites:", error);
      this.favorites = [];
    }
  }

  bindEvents() {
    // Play/Pause
    this.playPauseBtn?.addEventListener("click", () => this.togglePlayPause());

    // Navigation
    this.prevBtn?.addEventListener("click", () => this.playPreviousSong());
    this.nextBtn?.addEventListener("click", () => this.playNextSong());

    // Audio events
    this.audio?.addEventListener("timeupdate", (e) => this.updateProgress(e));
    this.audio?.addEventListener("ended", () => this.handleSongEnd());
    this.audio?.addEventListener("loadeddata", () => this.updateDuration());

    // Progress bar
    this.songTime?.addEventListener("click", (e) => this.seekSong(e));

    // Controls
    this.flipBtn?.addEventListener("click", () => this.flipToLyrics());
    this.flipBack?.addEventListener("click", () => this.flipToPlayer());
    this.repeatBtn?.addEventListener("click", () => this.repeatSong());
    this.shuffleBtn?.addEventListener("click", () => this.shuffleSong());

    // Volume
    this.volumeSlider?.addEventListener("input", (e) => this.updateVolume(e));

    // Favorites
    this.favoriteSong?.addEventListener("click", () => this.toggleFavorite());
    this.showFavorites?.addEventListener("click", () =>
      this.toggleFavoritesPage()
    );
    this.favoritesPage?.addEventListener("click", (e) =>
      this.handleFavoriteClick(e)
    );
  }

  loadSong(index) {
    if (index < 0 || index >= this.songData.length) return;

    const song = this.songData[index];

    // Update UI elements
    this.updateSongInfo(song);
    this.updateAudioSource(song);
    this.updateLyrics(song);
    this.updateFavoriteIcon(song);

    this.songIndex = index;
  }

  updateSongInfo(song) {
    if (this.coverName) this.coverName.textContent = song.name;
    if (this.coverArtist) this.coverArtist.textContent = song.artist;
    if (this.songName) this.songName.textContent = song.name;
    if (this.songArtist) this.songArtist.textContent = song.artist;
    if (this.songTitle) this.songTitle.textContent = song.name;
    if (this.currSong)
      this.currSong.style.backgroundImage = `url(${song.thumbnail})`;
  }

  updateAudioSource(song) {
    if (this.audio) {
      this.audio.src = `music/${song.src}`;
    }
  }

  updateLyrics(song) {
    if (!this.lyrics) return;

    this.lyrics.innerHTML = `<p>${song.lyrics}</p>`;
    this.lyrics.classList.remove("arabic", "not-arabic");
    this.lyrics.classList.add(song.arabic ? "arabic" : "not-arabic");
  }

  updateFavoriteIcon(song) {
    if (!this.favoriteSong) return;

    if (song.favorite) {
      this.favoriteSong.classList.remove("fa-regular");
      this.favoriteSong.classList.add("fa-solid");
    } else {
      this.favoriteSong.classList.remove("fa-solid");
      this.favoriteSong.classList.add("fa-regular");
    }
  }

  togglePlayPause() {
    if (this.container?.classList.contains("pause")) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  playSong() {
    if (!this.audio) return;

    this.container?.classList.add("pause");
    this.cover?.classList.add("rotate");

    if (this.playPauseBtn?.firstElementChild) {
      this.playPauseBtn.firstElementChild.className = "fa-solid fa-pause";
    }

    this.audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }

  pauseSong() {
    if (!this.audio) return;

    this.container?.classList.remove("pause");

    if (this.playPauseBtn?.firstElementChild) {
      this.playPauseBtn.firstElementChild.className = "fa-solid fa-play";
    }

    this.audio.pause();
  }

  playPreviousSong() {
    this.songIndex =
      this.songIndex <= 0 ? this.songData.length - 1 : this.songIndex - 1;
    this.loadSong(this.songIndex);
    this.playSong();
  }

  playNextSong() {
    this.songIndex =
      this.songIndex >= this.songData.length - 1 ? 0 : this.songIndex + 1;
    this.loadSong(this.songIndex);
    this.playSong();
  }

  playRandomSong() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.songData.length);
    } while (randomIndex === this.songIndex && this.songData.length > 1);

    this.loadSong(randomIndex);
    this.playSong();
  }

  handleSongEnd() {
    this.playNextSong();
  }

  updateProgress(e) {
    if (!this.audio || !this.songProgress) return;

    const { currentTime, duration } = e.target;

    if (duration) {
      const progressPercent = (currentTime / duration) * 100;
      this.songProgress.style.width = `${progressPercent}%`;
    }

    this.updateTimeDisplay(currentTime);
  }

  updateTimeDisplay(currentTime) {
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const formattedTime = `${currentMinutes}:${currentSeconds
      .toString()
      .padStart(2, "0")}`;

    const timeElement = document.querySelector(".time span:nth-child(1)");
    if (timeElement) timeElement.textContent = formattedTime;
  }

  updateDuration() {
    if (!this.audio) return;

    const duration = this.audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    const durationElement = document.querySelector(".time span:nth-child(2)");
    if (durationElement) durationElement.textContent = formattedDuration;
  }

  seekSong(e) {
    if (!this.audio || !this.songTime) return;

    const progressWidth = this.songTime.clientWidth;
    const clickedOffsetX = e.offsetX;
    const duration = this.audio.duration;

    if (duration) {
      this.audio.currentTime = (clickedOffsetX / progressWidth) * duration;
      this.playSong();
    }
  }

  shuffleSong() {
    let randomNumber = Math.floor(Math.random() * this.songData.length);
    this.loadSong(randomNumber);
    this.playSong();
  }

  repeatSong() {
    this.loadSong(this.songIndex);
    this.playSong();
  }

  updateVolume(e) {
    if (!this.audio || !this.volumeSlider) return;

    const volume = e.target.value / 100;
    this.audio.volume = volume;

    // Update slider appearance
    this.volumeSlider.style.background = `linear-gradient(
      to right,
      #62bc68 0%,
      #3baa7b ${e.target.value}%,
      #fff ${e.target.value}%,
      #fff 100%
    )`;
  }

  toggleFavorite() {
    const currentSong = this.songData[this.songIndex];
    currentSong.favorite = !currentSong.favorite;

    this.updateFavoriteIcon(currentSong);

    if (currentSong.favorite) {
      this.addToFavorites(currentSong);
    } else {
      this.removeFromFavorites(currentSong);
    }

    this.updateFavorites();
    this.saveFavorites();
  }

  addToFavorites(song) {
    if (!this.favorites.some((fav) => fav.id === song.id)) {
      this.favorites.push({ ...song }); // Create a copy
    }
  }

  removeFromFavorites(song) {
    this.favorites = this.favorites.filter((fav) => fav.id !== song.id);
  }

  updateFavoritesIcon() {
    this.songData.forEach((song) => {
      song.favorite = this.favorites.some((fav) => fav.id === song.id);
    });
  }

  updateFavorites() {
    if (!this.favoritesPage) return;

    // Remove existing favorite songs
    this.favoritesPage
      .querySelectorAll(".favorite__song")
      .forEach((el) => el.remove());

    // Add current favorites
    this.favorites.forEach((fav) => this.renderFavorite(fav));
    this.updateInitialText();
  }

  renderFavorite(favorite) {
    const songIndex = this.getSongIndex(favorite);
    const html = `
      <div class="favorite__song" data-index="${songIndex}" data-id="${favorite.id}">
        <span class='close-fav-btn'><i class="fa-solid fa-xmark"></i></span>
        <img src="${favorite.thumbnail}" alt="thumbnail" class="favorite__img" />
        <div class="favorite__textWrapper">
          <p class="favorite__name">${favorite.name}</p>
          <p class="favorite__artist">${favorite.artist}</p>
        </div>
      </div>
    `;

    this.favoritesPage?.insertAdjacentHTML("beforeend", html);
  }

  getSongIndex(song) {
    return this.songData.findIndex((s) => s.id === song.id);
  }

  updateInitialText() {
    if (!this.initialText) return;

    this.initialText.style.display =
      this.favorites.length === 0 ? "block" : "none";
  }

  handleFavoriteClick(e) {
    if (e.target.closest(".close-fav-btn")) {
      this.handleRemoveFavorite(e);
    } else {
      this.handlePlayFavorite(e);
    }
  }

  handleRemoveFavorite(e) {
    const songElement = e.target.closest(".favorite__song");
    if (!songElement) return;

    const songId = parseInt(songElement.dataset.id);
    const songIndex = parseInt(songElement.dataset.index);

    // Update song data
    if (songIndex >= 0) {
      this.songData[songIndex].favorite = false;
    }

    // Remove from favorites
    this.favorites = this.favorites.filter((f) => f.id !== songId);

    // Update UI
    this.updateFavorites();
    this.saveFavorites();

    // Update favorite icon if this is the current song
    if (songIndex === this.songIndex) {
      this.updateFavoriteIcon(this.songData[this.songIndex]);
    }
  }

  handlePlayFavorite(e) {
    const songElement = e.target.closest(".favorite__song");
    if (!songElement) return;

    const songIndex = parseInt(songElement.dataset.index);
    if (songIndex >= 0) {
      this.loadSong(songIndex);
      this.playSong();
      this.toggleFavoritesPage();
    }
  }

  toggleFavoritesPage() {
    this.favoritesPage?.classList.toggle("show");
  }

  flipToLyrics() {
    this.favoritesPage?.classList.remove("show");
    this.playerWrapper?.classList.add("flip");
  }

  flipToPlayer() {
    this.playerWrapper?.classList.remove("flip");
  }

  saveFavorites() {
    try {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }
}

// Initialize the music player when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.musicPlayer = new MusicPlayer();
});
