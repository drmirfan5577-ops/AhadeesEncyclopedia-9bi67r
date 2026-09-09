// ============================================================
// AHADEES ENCYCLOPEDIA — QURAN DATA
// All 114 Surahs with metadata + selected ayahs
// Full Quran API integration recommended for complete 6236 ayahs
// EvEr SmArT-wOrLd | Dr M Irfan Qadir Thaheem
// ============================================================

export interface QuranAyah {
  number: number;
  arabic: string;
  urdu: string;
  english: string;
}

export interface QuranSurah {
  id: number;
  name: string;
  nameAr: string;
  nameUr: string;
  meaning: string;
  meaningUr: string;
  ayahCount: number;
  type: 'Makki' | 'Madani';
  juz: number;
  ayahs: QuranAyah[];
}

// Helper to build surah entries
const s = (
  id: number, name: string, nameAr: string, nameUr: string,
  meaning: string, meaningUr: string, ayahCount: number,
  type: 'Makki' | 'Madani', juz: number,
  ayahs: QuranAyah[] = []
): QuranSurah => ({ id, name, nameAr, nameUr, meaning, meaningUr, ayahCount, type, juz, ayahs });

export const QURAN_SURAHS: QuranSurah[] = [
  s(1,'Al-Fatihah','الفاتحة','الفاتحہ','The Opening','افتتاح',7,'Makki',1,[
    {number:1,arabic:'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',urdu:'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے',english:'In the name of Allah, the Most Gracious, the Most Merciful.'},
    {number:2,arabic:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',urdu:'تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پروردگار ہے',english:'All praise is due to Allah, Lord of all the worlds.'},
    {number:3,arabic:'الرَّحْمَنِ الرَّحِيمِ',urdu:'بڑا مہربان نہایت رحم والا',english:'The Most Gracious, the Most Merciful.'},
    {number:4,arabic:'مَالِكِ يَوْمِ الدِّينِ',urdu:'بدلے کے دن کا مالک',english:'Master of the Day of Judgment.'},
    {number:5,arabic:'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',urdu:'ہم تیری ہی عبادت کرتے ہیں اور تجھ سے ہی مدد مانگتے ہیں',english:'It is You we worship and You we ask for help.'},
    {number:6,arabic:'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',urdu:'ہمیں سیدھا راستہ دکھا',english:'Guide us to the straight path.'},
    {number:7,arabic:'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',urdu:'ان لوگوں کا راستہ جن پر تو نے انعام کیا نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا',english:'The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.'},
  ]),
  s(2,'Al-Baqarah','البقرة','البقرہ','The Cow','گائے',286,'Madani',1,[
    {number:1,arabic:'الٓمٓ',urdu:'الف لام میم',english:'Alif, Lam, Meem.'},
    {number:2,arabic:'ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ',urdu:'یہ وہ کتاب ہے جس میں کوئی شک نہیں، پرہیزگاروں کے لیے ہدایت ہے',english:'This is the Book about which there is no doubt, a guidance for those conscious of Allah.'},
    {number:255,arabic:'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',urdu:'اللہ وہ ہے جس کے سوا کوئی معبود نہیں، زندہ ہے، سب کا قائم رکھنے والا ہے، اسے نہ اونگھ آتی ہے نہ نیند',english:'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.'},
    {number:256,arabic:'لَا إِكْرَاهَ فِي الدِّينِ ۖ قَد تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ',urdu:'دین میں کوئی جبر نہیں، یقیناً ہدایت گمراہی سے الگ ہو گئی',english:'There shall be no compulsion in acceptance of the religion. The right course has become clear from the wrong.'},
    {number:286,arabic:'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',urdu:'اللہ کسی جان کو اس کی طاقت سے زیادہ تکلیف نہیں دیتا',english:'Allah does not burden a soul beyond that it can bear.'},
  ]),
  s(3,"Ali 'Imran",'آل عمران','آل عمران','Family of Imran','عمران کا خاندان',200,'Madani',3,[
    {number:1,arabic:'الٓمٓ',urdu:'الف لام میم',english:'Alif, Lam, Meem.'},
    {number:26,arabic:'قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ',urdu:'کہو: اے اللہ! بادشاہی کے مالک، تو جسے چاہے بادشاہی دے',english:'Say, O Allah, Owner of Sovereignty, You give sovereignty to whom You will.'},
    {number:185,arabic:'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ',urdu:'ہر جان کو موت کا ذائقہ چکھنا ہے',english:'Every soul will taste death.'},
    {number:200,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ',urdu:'اے ایمان والو! صبر کرو اور ثابت قدم رہو اور مورچے جمائے رکھو اور اللہ سے ڈرو شاید تم کامیاب ہو',english:'O you who believe! Persevere and endure and remain stationed and fear Allah that you may be successful.'},
  ]),
  s(4,'An-Nisa','النساء','النساء','The Women','عورتیں',176,'Madani',4,[
    {number:1,arabic:'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ',urdu:'اے لوگو! اپنے رب سے ڈرو جس نے تمہیں ایک جان سے پیدا کیا',english:'O mankind, fear your Lord, who created you from one soul.'},
    {number:36,arabic:'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا',urdu:'اور اللہ کی عبادت کرو اور اس کے ساتھ کسی کو شریک نہ کرو',english:'Worship Allah and associate nothing with Him.'},
  ]),
  s(5,'Al-Maidah','المائدة','المائدہ','The Table Spread','دسترخوان',120,'Madani',6,[
    {number:3,arabic:'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي',urdu:'آج میں نے تمہارے لیے تمہارا دین مکمل کر دیا اور تم پر اپنی نعمت پوری کردی',english:'This day I have perfected for you your religion and completed My favor upon you.'},
  ]),
  s(6,'Al-Anam','الأنعام','الانعام','The Cattle','مویشی',165,'Makki',7,[
    {number:1,arabic:'الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ',urdu:'تمام تعریفیں اللہ کے لیے ہیں جس نے آسمانوں اور زمین کو پیدا کیا',english:'Praise be to Allah, who created the heavens and the earth.'},
  ]),
  s(7,'Al-Araf','الأعراف','الاعراف','The Heights','بلندیاں',206,'Makki',8,[
    {number:54,arabic:'إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ',urdu:'بے شک تمہارا رب وہ اللہ ہے جس نے آسمانوں اور زمین کو پیدا کیا',english:'Indeed, your Lord is Allah, who created the heavens and the earth.'},
  ]),
  s(8,'Al-Anfal','الأنفال','الانفال','The Spoils of War','مالِ غنیمت',75,'Madani',9,[
    {number:1,arabic:'يَسْأَلُونَكَ عَنِ الْأَنفَالِ ۖ قُلِ الْأَنفَالُ لِلَّهِ وَالرَّسُولِ',urdu:'یہ تم سے مالِ غنیمت کے بارے میں پوچھتے ہیں، کہو: مالِ غنیمت اللہ اور رسول کا ہے',english:'They ask you about the war gains. Say: The war gains are for Allah and the Messenger.'},
  ]),
  s(9,'At-Tawbah','التوبة','التوبہ','The Repentance','توبہ',129,'Madani',10,[
    {number:128,arabic:'لَقَدْ جَاءَكُمْ رَسُولٌ مِّنْ أَنفُسِكُمْ',urdu:'بے شک تمہارے پاس تمہی میں سے ایک رسول آیا',english:'There has certainly come to you a Messenger from among yourselves.'},
  ]),
  s(10,'Yunus','يونس','یونس','Jonah','یونسؑ',109,'Makki',11,[
    {number:62,arabic:'أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',urdu:'خبردار! بے شک اللہ کے دوستوں کو نہ کوئی خوف ہے اور نہ وہ غمزدہ ہوں گے',english:'Verily, on the friends of Allah there is no fear, nor shall they grieve.'},
  ]),
  s(11,'Hud','هود','ہود','Hud','ہودؑ',123,'Makki',11,[
    {number:6,arabic:'وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا',urdu:'زمین میں چلنے والا کوئی جاندار نہیں مگر اس کا رزق اللہ پر ہے',english:'And there is no creature on earth but that upon Allah is its provision.'},
  ]),
  s(12,'Yusuf','يوسف','یوسف','Joseph','یوسفؑ',111,'Makki',12,[
    {number:87,arabic:'لَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ',urdu:'اللہ کی رحمت سے مایوس مت ہو، بے شک اللہ کی رحمت سے مایوس صرف کافر قوم ہوتی ہے',english:'Do not despair of relief from Allah. Indeed, no one despairs of relief from Allah except the disbelieving people.'},
  ]),
  s(13,'Ar-Rad','الرعد','الرعد','The Thunder','گرج',43,'Madani',13,[
    {number:28,arabic:'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',urdu:'خبردار! اللہ کی یاد ہی سے دلوں کو اطمینان ملتا ہے',english:'Verily, in the remembrance of Allah do hearts find rest.'},
  ]),
  s(14,'Ibrahim','إبراهيم','ابراہیم','Abraham','ابراہیمؑ',52,'Makki',13,[
    {number:7,arabic:'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',urdu:'اگر تم شکر کرو گے تو میں تمہیں اور زیادہ دوں گا',english:'If you are grateful, I will surely increase you in favor.'},
  ]),
  s(15,'Al-Hijr','الحجر','الحجر','The Rocky Tract','پتھریلا علاقہ',99,'Makki',14,[
    {number:9,arabic:'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',urdu:'بے شک ہم نے ہی یہ ذکر نازل کیا اور ہم ہی اس کی حفاظت کریں گے',english:'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.'},
  ]),
  s(16,'An-Nahl','النحل','النحل','The Bee','مکھی',128,'Makki',14,[
    {number:125,arabic:'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ',urdu:'اپنے رب کے راستے کی طرف حکمت اور اچھی نصیحت کے ساتھ بلاؤ',english:'Invite to the way of your Lord with wisdom and good instruction.'},
  ]),
  s(17,'Al-Isra','الإسراء','الاسراء','The Night Journey','رات کا سفر',111,'Makki',15,[
    {number:23,arabic:'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',urdu:'تمہارے رب نے فیصلہ کر دیا ہے کہ اس کے سوا کسی کی عبادت نہ کرو اور والدین کے ساتھ حسن سلوک کرو',english:'Your Lord has decreed that you worship none but Him, and that you be kind to parents.'},
    {number:44,arabic:'وَإِن مِّن شَيْءٍ إِلَّا يُسَبِّحُ بِحَمْدِهِ وَلَكِن لَّا تَفْقَهُونَ تَسْبِيحَهُمْ',urdu:'اور کوئی چیز نہیں مگر اس کی تسبیح کرتی ہے لیکن تم ان کی تسبیح نہیں سمجھتے',english:'And there is not a thing except that it exalts Allah by His praise, but you do not understand their exaltation.'},
  ]),
  s(18,'Al-Kahf','الكهف','الکہف','The Cave','غار',110,'Makki',15,[
    {number:1,arabic:'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا',urdu:'تمام تعریفیں اللہ کے لیے جس نے اپنے بندے پر کتاب نازل کی اور اس میں کوئی کجی نہیں رکھی',english:'All praise is due to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.'},
    {number:10,arabic:'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً',urdu:'جب کچھ نوجوان غار میں پناہ لینے گئے تو کہا: اے ہمارے رب! ہمیں اپنے پاس سے رحمت عطا فرما',english:'When the youths retreated to the cave and said: Our Lord, grant us mercy from Yourself.'},
    {number:107,arabic:'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا',urdu:'جو لوگ ایمان لائے اور اچھے اعمال کیے ان کی مہمان نوازی کے لیے جنت الفردوس ہیں',english:'Indeed, those who have believed and done righteous deeds, they will have the Gardens of Paradise as a lodging.'},
  ]),
  s(19,'Maryam','مريم','مریم','Mary','مریمؑ',98,'Makki',16,[
    {number:16,arabic:'وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ إِذِ انتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا',urdu:'اور کتاب میں مریم کا ذکر کرو جب وہ اپنے گھر والوں سے الگ ہو کر مشرق کی طرف چلی گئیں',english:'And mention in the Book the story of Mary, when she withdrew from her family to a place toward the east.'},
  ]),
  s(20,'Ta-Ha','طه','طٰہٰ','Ta-Ha','طاہا',135,'Makki',16,[
    {number:14,arabic:'إِنَّنِي أَنَا اللَّهُ لَا إِلَهَ إِلَّا أَنَا فَاعْبُدْنِي',urdu:'بے شک میں ہی اللہ ہوں، میرے سوا کوئی معبود نہیں، پس میری ہی عبادت کرو',english:'Indeed, I am Allah. There is no deity except Me, so worship Me.'},
    {number:114,arabic:'وَقُل رَّبِّ زِدْنِي عِلْمًا',urdu:'اور کہو: اے میرے رب! میرے علم میں اضافہ فرما',english:'And say: My Lord, increase me in knowledge.'},
  ]),
  s(21,'Al-Anbiya','الأنبياء','الانبیاء','The Prophets','نبی',112,'Makki',17,[
    {number:107,arabic:'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',urdu:'اور ہم نے تجھے نہیں بھیجا مگر تمام جہانوں کے لیے رحمت بنا کر',english:'And We have not sent you except as a mercy to the worlds.'},
  ]),
  s(22,'Al-Hajj','الحج','الحج','The Pilgrimage','حج',78,'Madani',17,[
    {number:77,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا ارْكَعُوا وَاسْجُدُوا وَاعْبُدُوا رَبَّكُمْ',urdu:'اے ایمان والو! رکوع کرو اور سجدہ کرو اور اپنے رب کی عبادت کرو',english:'O you who have believed, bow and prostrate and worship your Lord.'},
  ]),
  s(23,'Al-Muminun','المؤمنون','المومنون','The Believers','مومنین',118,'Makki',18,[
    {number:1,arabic:'قَدْ أَفْلَحَ الْمُؤْمِنُونَ',urdu:'یقیناً مومن فلاح پا گئے',english:'Certainly will the believers have succeeded.'},
    {number:2,arabic:'الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',urdu:'وہ جو اپنی نماز میں عاجزی کرتے ہیں',english:'They who are during their prayer humbly submissive.'},
  ]),
  s(24,'An-Nur','النور','النور','The Light','روشنی',64,'Madani',18,[
    {number:35,arabic:'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',urdu:'اللہ آسمانوں اور زمین کا نور ہے',english:'Allah is the Light of the heavens and the earth.'},
  ]),
  s(25,'Al-Furqan','الفرقان','الفرقان','The Criterion','فرقان',77,'Makki',18,[
    {number:63,arabic:'وَعِبَادُ الرَّحْمَنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',urdu:'اور رحمان کے بندے وہ ہیں جو زمین پر عاجزی سے چلتے ہیں',english:'And the servants of the Most Merciful are those who walk upon the earth easily.'},
  ]),
  s(26,'Ash-Shuara','الشعراء','الشعراء','The Poets','شاعر',227,'Makki',19,[
    {number:89,arabic:'إِلَّا مَنْ أَتَى اللَّهَ بِقَلْبٍ سَلِيمٍ',urdu:'مگر وہ جو اللہ کے پاس سلامت دل لے کر آئے',english:'But only one who comes to Allah with a sound heart.'},
  ]),
  s(27,'An-Naml','النمل','النمل','The Ant','چیونٹی',93,'Makki',19,[
    {number:62,arabic:'أَمَّن يُجِيبُ الْمُضْطَرَّ إِذَا دَعَاهُ',urdu:'یا وہ جو مجبور کی دعا قبول کرتا ہے جب وہ پکارتا ہے',english:'Is He who responds to the distressed one when he calls upon Him?'},
  ]),
  s(28,'Al-Qasas','القصص','القصص','The Stories','کہانیاں',88,'Makki',20,[
    {number:24,arabic:'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',urdu:'اے میرے رب! تو جو بھی بھلائی مجھ پر نازل کرے میں اس کا محتاج ہوں',english:'My Lord, indeed I am, for whatever good You would send down to me, in need.'},
  ]),
  s(29,'Al-Ankabut','العنكبوت','العنکبوت','The Spider','مکڑی',69,'Makki',20,[
    {number:45,arabic:'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',urdu:'بے شک نماز بے حیائی اور برائی سے روکتی ہے',english:'Indeed, prayer prohibits immorality and wrongdoing.'},
    {number:69,arabic:'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا',urdu:'جو لوگ ہماری راہ میں جہاد کریں گے ہم انہیں ضرور اپنے راستے دکھائیں گے',english:'And those who strive for Us - We will surely guide them to Our ways.'},
  ]),
  s(30,'Ar-Rum','الروم','الروم','The Romans','رومی',60,'Makki',21,[
    {number:21,arabic:'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',urdu:'اور اس کی نشانیوں میں سے یہ ہے کہ اس نے تمہارے لیے تمہاری ہی جنس سے جوڑے بنائے تاکہ تم ان کے پاس سکون پاؤ',english:'And of His signs is that He created for you from yourselves mates that you may find tranquility in them.'},
  ]),
  s(31,'Luqman','لقمان','لقمان','Luqman','لقمان',34,'Makki',21,[
    {number:17,arabic:'يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ',urdu:'بیٹا! نماز قائم کرو اور نیکی کا حکم دو اور برائی سے روکو اور جو مصیبت آئے صبر کرو',english:'O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you.'},
  ]),
  s(32,'As-Sajda','السجدة','السجدہ','The Prostration','سجدہ',30,'Makki',21,[
    {number:15,arabic:'إِنَّمَا يُؤْمِنُ بِآيَاتِنَا الَّذِينَ إِذَا ذُكِّرُوا بِهَا خَرُّوا سُجَّدًا',urdu:'ہماری آیتوں پر وہی ایمان لاتے ہیں جو ان سے یاد دہانی پر سجدے میں گر پڑتے ہیں',english:'Only those believe in Our verses who, when they are reminded by them, fall down in prostration.'},
  ]),
  s(33,'Al-Ahzab','الأحزاب','الاحزاب','The Combined Forces','مشترکہ فوج',73,'Madani',21,[
    {number:21,arabic:'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ',urdu:'بے شک تمہارے لیے رسول اللہ میں بہترین نمونہ ہے',english:'There has certainly been for you in the Messenger of Allah an excellent pattern.'},
    {number:56,arabic:'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ',urdu:'بے شک اللہ اور اس کے فرشتے نبی پر درود بھیجتے ہیں',english:'Indeed, Allah confers blessing upon the Prophet, and His angels ask Him to do so.'},
  ]),
  s(34,'Saba','سبأ','سبا','Sheba','سبا',54,'Makki',22,[
    {number:13,arabic:'اعْمَلُوا آلَ دَاوُودَ شُكْرًا ۚ وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ',urdu:'اے آل داؤد! شکر کرتے ہوئے عمل کرو اور میرے بندوں میں شکر گزار کم ہیں',english:'Work, O family of David, in gratitude. And few of My servants are grateful.'},
  ]),
  s(35,'Fatir','فاطر','فاطر','Originator','پیدا کرنے والا',45,'Makki',22,[
    {number:28,arabic:'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ',urdu:'اللہ کے بندوں میں سے صرف علماء ہی اس سے ڈرتے ہیں',english:'Only those fear Allah, among His servants, who have knowledge.'},
  ]),
  s(36,'Ya-Sin','يس','یٰسٓ','Ya-Sin','یاسین',83,'Makki',22,[
    {number:58,arabic:'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ',urdu:'رحیم رب کی طرف سے سلام کا کلمہ',english:'Peace, a word from a Merciful Lord.'},
    {number:82,arabic:'إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ',urdu:'اس کا امر تو یہ ہے کہ جب وہ کسی چیز کا ارادہ کرتا ہے تو کہتا ہے ہو جا اور وہ ہو جاتی ہے',english:'His command is only when He intends a thing that He says to it, Be, and it is.'},
  ]),
  s(37,'As-Saffat','الصافات','الصافات','Those Who Set the Ranks','صف بستہ',182,'Makki',23,[
    {number:180,arabic:'سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ',urdu:'تیرا رب جو عزت والا ہے پاک ہے ان چیزوں سے جو یہ بیان کرتے ہیں',english:'Exalted is your Lord, the Lord of might, above what they describe.'},
  ]),
  s(38,'Sad','ص','صٓ','Sad','صاد',88,'Makki',23,[
    {number:29,arabic:'كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ',urdu:'یہ ایک بابرکت کتاب ہے جو ہم نے تیری طرف نازل کی تاکہ وہ اس کی آیتوں پر غور کریں',english:'A blessed Book which We have revealed to you that they might reflect upon its verses.'},
  ]),
  s(39,'Az-Zumar','الزمر','الزمر','The Troops','جتھے',75,'Makki',23,[
    {number:53,arabic:'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',urdu:'کہو: اے میرے بندو! جنہوں نے اپنے آپ پر زیادتی کی، اللہ کی رحمت سے ناامید نہ ہو',english:'Say, O My servants who have transgressed against themselves: Do not despair of the mercy of Allah.'},
  ]),
  s(40,'Ghafir','غافر','غافر','The Forgiver','بخشنے والا',85,'Makki',24,[
    {number:60,arabic:'وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ',urdu:'اور تمہارے رب نے فرمایا: مجھ سے دعا کرو میں قبول کروں گا',english:'And your Lord says, Call upon Me; I will respond to you.'},
  ]),
  s(41,'Fussilat','فصلت','فصلت','Explained in Detail','تفصیل',54,'Makki',24,[
    {number:30,arabic:'إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا',urdu:'بے شک جن لوگوں نے کہا ہمارا رب اللہ ہے پھر ثابت قدم رہے',english:'Indeed, those who have said, Our Lord is Allah, and then remained firm on the right path.'},
  ]),
  s(42,'Ash-Shura','الشورى','الشوری','The Consultation','مشاورت',53,'Makki',25,[
    {number:52,arabic:'وَإِنَّكَ لَتَهْدِي إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',urdu:'اور بے شک آپ ضرور سیدھے راستے کی طرف رہنمائی کرتے ہیں',english:'And indeed, you guide to a straight path.'},
  ]),
  s(43,'Az-Zukhruf','الزخرف','الزخرف','The Ornaments of Gold','سونے کی زینت',89,'Makki',25,[
    {number:67,arabic:'الْأَخِلَّاءُ يَوْمَئِذٍ بَعْضُهُمْ لِبَعْضٍ عَدُوٌّ إِلَّا الْمُتَّقِينَ',urdu:'اس دن دوست ایک دوسرے کے دشمن ہوں گے سوائے پرہیزگاروں کے',english:'Close friends, that Day, will be enemies to each other, except for the righteous.'},
  ]),
  s(44,'Ad-Dukhan','الدخان','الدخان','The Smoke','دھواں',59,'Makki',25,[
    {number:3,arabic:'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ',urdu:'بے شک ہم نے اسے ایک بابرکت رات میں نازل کیا',english:'Indeed, We sent it down during a blessed night.'},
  ]),
  s(45,'Al-Jathiyah','الجاثية','الجاثیہ','The Crouching','گھٹنوں پر',37,'Makki',25,[
    {number:18,arabic:'ثُمَّ جَعَلْنَاكَ عَلَىٰ شَرِيعَةٍ مِّنَ الْأَمْرِ فَاتَّبِعْهَا',urdu:'پھر ہم نے تجھے ایک شریعت پر قائم کیا پس اس کی اتباع کر',english:'Then We put you on a clear right path, so follow it.'},
  ]),
  s(46,'Al-Ahqaf','الأحقاف','الاحقاف','The Wind-Curved Sandhills','ریت کے ٹیلے',35,'Makki',26,[
    {number:15,arabic:'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا',urdu:'اور ہم نے انسان کو اپنے والدین کے ساتھ حسن سلوک کی وصیت کی',english:'And We have enjoined upon man, to his parents, good treatment.'},
  ]),
  s(47,'Muhammad','محمد','محمد','Muhammad','محمد ﷺ',38,'Madani',26,[
    {number:7,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ',urdu:'اے ایمان والو! اگر تم اللہ کی مدد کرو گے تو وہ تمہاری مدد کرے گا',english:'O you who have believed, if you support Allah, He will support you.'},
  ]),
  s(48,'Al-Fath','الفتح','الفتح','The Victory','فتح',29,'Madani',26,[
    {number:1,arabic:'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا',urdu:'بے شک ہم نے آپ کو کھلی فتح دی',english:'Indeed, We have given you a manifest victory.'},
  ]),
  s(49,'Al-Hujurat','الحجرات','الحجرات','The Rooms','کمرے',18,'Madani',26,[
    {number:12,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ',urdu:'اے ایمان والو! بہت زیادہ گمان سے بچو',english:'O you who have believed, avoid much negative assumption.'},
    {number:13,arabic:'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا',urdu:'اے لوگو! ہم نے تمہیں ایک مرد اور ایک عورت سے پیدا کیا اور تمہیں قومیں اور قبیلے بنائے تاکہ تم ایک دوسرے کو پہچانو',english:'O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.'},
  ]),
  s(50,'Qaf','ق','قٓ','Qaf','قاف',45,'Makki',26,[
    {number:16,arabic:'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',urdu:'اور ہم اس کی شہ رگ سے بھی زیادہ قریب ہیں',english:'And We are closer to him than his jugular vein.'},
  ]),
  s(51,'Adh-Dhariyat','الذاريات','الذاریات','The Winnowing Winds','بکھیرنے والی ہوا',60,'Makki',26,[
    {number:56,arabic:'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',urdu:'اور میں نے جن اور انسان کو صرف اپنی عبادت کے لیے پیدا کیا',english:'And I did not create the jinn and mankind except to worship Me.'},
  ]),
  s(52,'At-Tur','الطور','الطور','The Mountain','پہاڑ',49,'Makki',27,[
    {number:21,arabic:'وَالَّذِينَ آمَنُوا وَاتَّبَعَتْهُمْ ذُرِّيَّتُهُم بِإِيمَانٍ أَلْحَقْنَا بِهِمْ ذُرِّيَّتَهُمْ',urdu:'جو لوگ ایمان لائے اور ان کی اولاد نے ایمان میں ان کی پیروی کی ہم ان کی اولاد کو ان سے ملا دیں گے',english:'And those who believed and were followed by their descendants in faith, We will unite them with their descendants.'},
  ]),
  s(53,'An-Najm','النجم','النجم','The Star','ستارہ',62,'Makki',27,[
    {number:39,arabic:'وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ',urdu:'اور یہ کہ انسان کو وہی ملے گا جس کی اس نے کوشش کی',english:'And that there is not for man except that for which he strives.'},
  ]),
  s(54,'Al-Qamar','القمر','القمر','The Moon','چاند',55,'Makki',27,[
    {number:17,arabic:'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',urdu:'اور بے شک ہم نے قرآن کو نصیحت کے لیے آسان کیا پس کوئی نصیحت لینے والا ہے؟',english:'And We have certainly made the Quran easy for remembrance, so is there any who will remember?'},
  ]),
  s(55,'Ar-Rahman','الرحمن','الرحمٰن','The Beneficent','رحمٰن',78,'Madani',27,[
    {number:1,arabic:'الرَّحْمَنُ',urdu:'رحمٰن',english:'The Most Merciful'},
    {number:2,arabic:'عَلَّمَ الْقُرْآنَ',urdu:'نے قرآن سکھایا',english:'Taught the Quran,'},
    {number:3,arabic:'خَلَقَ الْإِنسَانَ',urdu:'انسان کو پیدا کیا',english:'Created man,'},
    {number:13,arabic:'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',urdu:'پس اپنے رب کی کون کون سی نعمتوں کو جھٹلاؤ گے',english:'So which of the favors of your Lord would you deny?'},
  ]),
  s(56,'Al-Waqia','الواقعة','الواقعہ','The Inevitable','ناگزیر',96,'Makki',27,[
    {number:1,arabic:'إِذَا وَقَعَتِ الْوَاقِعَةُ',urdu:'جب وہ واقعہ پیش آجائے',english:'When the Inevitable Event occurs,'},
    {number:77,arabic:'إِنَّهُ لَقُرْآنٌ كَرِيمٌ',urdu:'بے شک یہ بزرگ قرآن ہے',english:'Indeed, it is a noble Quran.'},
  ]),
  s(57,'Al-Hadid','الحديد','الحدید','The Iron','لوہا',29,'Madani',27,[
    {number:3,arabic:'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ',urdu:'وہ اول ہے اور آخر ہے اور ظاہر ہے اور باطن ہے',english:'He is the First and the Last, the Ascendant and the Intimate.'},
  ]),
  s(58,'Al-Mujadila','المجادلة','المجادلہ','The Pleading Woman','استدعا کرنے والی',22,'Madani',28,[
    {number:11,arabic:'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',urdu:'اللہ تم میں سے ایمان والوں کو اور جن کو علم دیا گیا ہے درجات میں بلند کرے گا',english:'Allah will raise those who have believed among you and those who were given knowledge by degrees.'},
  ]),
  s(59,'Al-Hashr','الحشر','الحشر','The Exile','جلاوطنی',24,'Madani',28,[
    {number:21,arabic:'لَوْ أَنزَلْنَا هَذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا',urdu:'اگر ہم یہ قرآن کسی پہاڑ پر نازل کرتے تو تم اسے خشوع کی حالت میں ٹکڑے ٹکڑے ہوتے دیکھتے',english:'If We had sent down this Quran upon a mountain, you would have seen it humbled and coming apart.'},
  ]),
  s(60,'Al-Mumtahina','الممتحنة','الممتحنہ','She That is to be Examined','جانچ پڑتال',13,'Madani',28,[
    {number:8,arabic:'لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ',urdu:'اللہ تمہیں ان لوگوں سے منع نہیں کرتا جنہوں نے دین کے بارے میں تم سے جنگ نہیں کی',english:'Allah does not forbid you from those who do not fight you because of religion.'},
  ]),
  s(61,'As-Saff','الصف','الصف','The Rows','صفیں',14,'Madani',28,[
    {number:10,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا هَلْ أَدُلُّكُمْ عَلَىٰ تِجَارَةٍ تُنجِيكُم مِّنْ عَذَابٍ أَلِيمٍ',urdu:'اے ایمان والو! کیا میں تمہیں ایسی تجارت بتاؤں جو تمہیں دردناک عذاب سے نجات دے',english:'O you who have believed, shall I guide you to a transaction that will save you from a painful punishment?'},
  ]),
  s(62,'Al-Jumuah','الجمعة','الجمعہ','The Congregation, Friday','جمعہ',11,'Madani',28,[
    {number:9,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ',urdu:'اے ایمان والو! جب جمعہ کے دن نماز کے لیے اذان دی جائے تو اللہ کی یاد کی طرف دوڑ پڑو',english:'O you who have believed, when the call to prayer is made on the day of Jumuah, proceed to the remembrance of Allah.'},
  ]),
  s(63,'Al-Munafiqun','المنافقون','المنافقون','The Hypocrites','منافق',11,'Madani',28,[
    {number:9,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُلْهِكُمْ أَمْوَالُكُمْ وَلَا أَوْلَادُكُمْ عَن ذِكْرِ اللَّهِ',urdu:'اے ایمان والو! تمہارے مال اور اولاد تمہیں اللہ کی یاد سے غافل نہ کریں',english:'O you who have believed, let not your wealth and your children divert you from remembrance of Allah.'},
  ]),
  s(64,'At-Taghabun','التغابن','التغابن','Mutual Disillusion','باہمی نقصان',18,'Madani',28,[
    {number:11,arabic:'مَا أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ اللَّهِ',urdu:'کوئی مصیبت نہیں آتی مگر اللہ کے اذن سے',english:'No disaster strikes except by permission of Allah.'},
  ]),
  s(65,'At-Talaq','الطلاق','الطلاق','Divorce','طلاق',12,'Madani',28,[
    {number:3,arabic:'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',urdu:'اور جو اللہ پر توکل کرے اللہ اسے کافی ہے',english:'And whoever relies upon Allah - then He is sufficient for him.'},
  ]),
  s(66,'At-Tahrim','التحريم','التحریم','The Prohibition','ممانعت',12,'Madani',28,[
    {number:8,arabic:'يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا',urdu:'اے ایمان والو! اللہ کی طرف سچی توبہ کرو',english:'O you who have believed, repent to Allah with sincere repentance.'},
  ]),
  s(67,'Al-Mulk','الملك','الملک','The Sovereignty','بادشاہی',30,'Makki',29,[
    {number:1,arabic:'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',urdu:'وہ بزرگ وبرتر ہے جس کے ہاتھ میں بادشاہت ہے اور وہ ہر چیز پر قادر ہے',english:'Blessed is He in whose hand is dominion, and He is over all things competent.'},
    {number:2,arabic:'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا',urdu:'جس نے موت اور زندگی کو پیدا کیا تاکہ تمہیں آزمائے کہ تم میں سے کون بہترین عمل والا ہے',english:'Who created death and life to test you as to which of you is best in deed.'},
  ]),
  s(68,'Al-Qalam','القلم','القلم','The Pen','قلم',52,'Makki',29,[
    {number:4,arabic:'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',urdu:'اور بے شک آپ بہت بڑے اخلاق پر ہیں',english:'And indeed, you are of a great moral character.'},
  ]),
  s(69,'Al-Haqqah','الحاقة','الحاقہ','The Inevitable Hour','یقینی گھڑی',52,'Makki',29,[
    {number:1,arabic:'الْحَاقَّةُ',urdu:'وہ حقیقی گھڑی',english:'The Inevitable Reality.'},
  ]),
  s(70,'Al-Maarij','المعارج','المعارج','The Ascending Stairways','چڑھنے کی سیڑھیاں',44,'Makki',29,[
    {number:5,arabic:'فَاصْبِرْ صَبْرًا جَمِيلًا',urdu:'پس خوبصورتی سے صبر کر',english:'So be patient with gracious patience.'},
  ]),
  s(71,'Nuh','نوح','نوح','Noah','نوحؑ',28,'Makki',29,[
    {number:10,arabic:'فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا',urdu:'پس میں نے کہا: اپنے رب سے معافی مانگو بے شک وہ بہت معاف کرنے والا ہے',english:'And said, Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.'},
  ]),
  s(72,'Al-Jinn','الجن','الجن','The Jinn','جن',28,'Makki',29,[
    {number:1,arabic:'قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ فَقَالُوا إِنَّا سَمِعْنَا قُرْآنًا عَجَبًا',urdu:'کہو: میری طرف وحی کی گئی کہ جنوں کے ایک گروہ نے سنا اور کہا: ہم نے ایک عجیب قرآن سنا',english:'Say: It has been revealed to me that a group of the jinn listened and said: Indeed, we have heard an amazing Quran.'},
  ]),
  s(73,'Al-Muzzammil','المزمل','المزمل','The Enshrouded One','لپٹا ہوا',20,'Makki',29,[
    {number:1,arabic:'يَا أَيُّهَا الْمُزَّمِّلُ',urdu:'اے لپٹے ہوئے',english:'O you who wraps himself in clothing,'},
    {number:8,arabic:'وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا',urdu:'اور اپنے رب کا نام یاد کرو اور سب سے کٹ کر اسی کی طرف متوجہ ہو جاؤ',english:'And remember the name of your Lord and devote yourself to Him with complete devotion.'},
  ]),
  s(74,'Al-Muddaththir','المدثر','المدثر','The One Enveloped','چادر اوڑھے ہوئے',56,'Makki',29,[
    {number:1,arabic:'يَا أَيُّهَا الْمُدَّثِّرُ',urdu:'اے چادر اوڑھے ہوئے',english:'O you who covers himself with a garment,'},
    {number:38,arabic:'كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ',urdu:'ہر نفس اپنے اعمال کے بدلے گروی ہے',english:'Every soul, for what it has earned, will be detained.'},
  ]),
  s(75,'Al-Qiyamah','القيامة','القیامہ','The Resurrection','قیامت',40,'Makki',29,[
    {number:36,arabic:'أَيَحْسَبُ الْإِنسَانُ أَن يُتْرَكَ سُدًى',urdu:'کیا انسان سمجھتا ہے کہ اسے یوں ہی چھوڑ دیا جائے گا',english:'Does man think that he will be left neglected?'},
  ]),
  s(76,'Al-Insan','الإنسان','الانسان','The Human','انسان',31,'Madani',29,[
    {number:8,arabic:'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا',urdu:'اور وہ اللہ کی محبت میں مسکین، یتیم اور قیدی کو کھانا کھلاتے ہیں',english:'And they give food in spite of love for it to the needy, the orphan, and the captive.'},
  ]),
  s(77,'Al-Mursalat','المرسلات','المرسلات','Those Sent Forth','بھیجے گئے',50,'Makki',29,[
    {number:50,arabic:'فَبِأَيِّ حَدِيثٍ بَعْدَهُ يُؤْمِنُونَ',urdu:'پس اس کے بعد وہ کس بات پر ایمان لائیں گے',english:'Then in what statement after the Quran will they believe?'},
  ]),
  s(78,'An-Naba','النبأ','النبأ','The Tidings','خبر',40,'Makki',30,[
    {number:1,arabic:'عَمَّ يَتَسَاءَلُونَ',urdu:'وہ کس چیز کے بارے میں پوچھتے ہیں',english:'About what are they asking one another?'},
    {number:2,arabic:'عَنِ النَّبَإِ الْعَظِيمِ',urdu:'اس بڑی خبر کے بارے میں',english:'About the great news.'},
  ]),
  s(79,'An-Naziat','النازعات','النازعات','Those Who Drag Forth','کھینچنے والے',46,'Makki',30,[
    {number:40,arabic:'وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ',urdu:'اور جو اپنے رب کے سامنے کھڑے ہونے سے ڈرا اور نفس کو خواہش سے روکا',english:'But as for he who feared the position of his Lord and prevented the soul from inclination.'},
    {number:41,arabic:'فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ',urdu:'تو بے شک جنت ہی ٹھکانہ ہے',english:'Then indeed, Paradise will be the refuge.'},
  ]),
  s(80,'Abasa','عبس','عبس','He Frowned','اس نے منہ پھیرا',42,'Makki',30,[
    {number:1,arabic:'عَبَسَ وَتَوَلَّىٰ',urdu:'اس نے منہ پھیرا اور بے رخی برتی',english:'The Prophet frowned and turned away.'},
  ]),
  s(81,'At-Takwir','التكوير','التکویر','The Overthrowing','لپیٹنا',29,'Makki',30,[
    {number:29,arabic:'وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ رَبُّ الْعَالَمِينَ',urdu:'اور تم نہیں چاہ سکتے مگر یہ کہ اللہ رب العالمین چاہے',english:'And you do not will except that Allah wills - Lord of the worlds.'},
  ]),
  s(82,'Al-Infitar','الانفطار','الانفطار','The Cleaving','پھٹنا',19,'Makki',30,[
    {number:6,arabic:'يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ',urdu:'اے انسان! کس چیز نے تجھے اپنے کریم رب سے دھوکے میں ڈالا',english:'O mankind, what has deceived you concerning your Lord, the Generous.'},
  ]),
  s(83,'Al-Mutaffifin','المطففين','المطففین','The Defrauders','ناپ تول میں کمی',36,'Makki',30,[
    {number:1,arabic:'وَيْلٌ لِّلْمُطَفِّفِينَ',urdu:'ناپ تول میں کمی کرنے والوں کے لیے ہلاکت ہے',english:'Woe to those who give less than due.'},
  ]),
  s(84,'Al-Inshiqaq','الانشقاق','الانشقاق','The Sundering','پھٹنا',25,'Makki',30,[
    {number:6,arabic:'يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ',urdu:'اے انسان! تو اپنے رب کی طرف تکلیف سے محنت کر رہا ہے پھر اس سے ملے گا',english:'O mankind, indeed you are laboring toward your Lord with great exertion and will meet Him.'},
  ]),
  s(85,'Al-Buruj','البروج','البروج','The Mansions of the Stars','برج',22,'Makki',30,[
    {number:11,arabic:'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ',urdu:'بے شک جو لوگ ایمان لائے اور اعمال صالح کیے ان کے لیے ایسے باغات ہیں جن کے نیچے نہریں بہتی ہیں',english:'Indeed, those who have believed and done righteous deeds will have gardens beneath which rivers flow.'},
  ]),
  s(86,'At-Tariq','الطارق','الطارق','The Morning Star','صبح کا ستارہ',17,'Makki',30,[
    {number:1,arabic:'وَالسَّمَاءِ وَالطَّارِقِ',urdu:'آسمان کی قسم اور رات کو چمکنے والے کی قسم',english:'By the sky and the night comer.'},
    {number:4,arabic:'إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ',urdu:'بے شک ہر نفس پر کوئی نگہبان ہے',english:'There is no soul but that it has over it a protector.'},
  ]),
  s(87,'Al-Ala','الأعلى','الاعلی','The Most High','بلند',19,'Makki',30,[
    {number:1,arabic:'سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى',urdu:'اپنے رب کے نام کی تسبیح کر جو بلند و برتر ہے',english:'Exalt the name of your Lord, the Most High.'},
    {number:17,arabic:'وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ',urdu:'اور آخرت بہتر اور ہمیشہ باقی رہنے والی ہے',english:'While the Hereafter is better and more lasting.'},
  ]),
  s(88,'Al-Ghashiyah','الغاشية','الغاشیہ','The Overwhelming','سب پر چھا جانے والا',26,'Makki',30,[
    {number:17,arabic:'أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ',urdu:'کیا وہ اونٹ کی طرف نہیں دیکھتے کہ وہ کیسے پیدا کیا گیا',english:'Then do they not look at the camels - how they are created?'},
  ]),
  s(89,'Al-Fajr','الفجر','الفجر','The Dawn','فجر',30,'Makki',30,[
    {number:27,arabic:'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ',urdu:'اے اطمینان والی جان',english:'O reassured soul,'},
    {number:28,arabic:'ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً',urdu:'اپنے رب کی طرف لوٹ جا، خوش اور خوشنود ہو کر',english:'Return to your Lord, well-pleased and pleasing to Him.'},
  ]),
  s(90,'Al-Balad','البلد','البلد','The City','شہر',20,'Makki',30,[
    {number:11,arabic:'فَلَا اقْتَحَمَ الْعَقَبَةَ',urdu:'پس اس نے مشکل گھاٹی نہیں چڑھی',english:'But he has not broken through the difficult pass.'},
  ]),
  s(91,'Ash-Shams','الشمس','الشمس','The Sun','سورج',15,'Makki',30,[
    {number:9,arabic:'قَدْ أَفْلَحَ مَن زَكَّاهَا',urdu:'بے شک وہ کامیاب ہو گیا جس نے نفس کا تزکیہ کیا',english:'He has succeeded who purifies the soul,'},
    {number:10,arabic:'وَقَدْ خَابَ مَن دَسَّاهَا',urdu:'اور وہ نامراد ہوا جس نے اسے گناہ میں دفن کیا',english:'And he has failed who instills it with corruption.'},
  ]),
  s(92,'Al-Layl','الليل','اللیل','The Night','رات',21,'Makki',30,[
    {number:5,arabic:'فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ',urdu:'تو جس نے دیا اور تقویٰ اختیار کیا',english:'As for he who gives and fears Allah.'},
    {number:6,arabic:'وَصَدَّقَ بِالْحُسْنَىٰ',urdu:'اور بہترین بات کی تصدیق کی',english:'And believed in the best reward.'},
  ]),
  s(93,'Ad-Duha','الضحى','الضحی','The Morning Hours','چاشت',11,'Makki',30,[
    {number:1,arabic:'وَالضُّحَىٰ',urdu:'قسم ہے چاشت کی',english:'By the morning brightness.'},
    {number:5,arabic:'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',urdu:'اور عنقریب تیرا رب تجھے اتنا دے گا کہ تو خوش ہو جائے گا',english:'And your Lord is going to give you, and you will be satisfied.'},
    {number:11,arabic:'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ',urdu:'اور اپنے رب کی نعمت کا ذکر کر',english:'But as for the favor of your Lord, report it.'},
  ]),
  s(94,'Ash-Sharh','الشرح','الشرح','The Relief','کشادگی',8,'Makki',30,[
    {number:1,arabic:'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',urdu:'کیا ہم نے تیرا سینہ کھول نہیں دیا',english:'Did We not expand for you your breast?'},
    {number:5,arabic:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',urdu:'پس بے شک تنگی کے ساتھ آسانی ہے',english:'For indeed, with hardship will be ease.'},
    {number:6,arabic:'إِنَّ مَعَ الْعُسْرِ يُسْرًا',urdu:'بے شک تنگی کے ساتھ آسانی ہے',english:'Indeed, with hardship will be ease.'},
  ]),
  s(95,'At-Tin','التين','التین','The Fig','انجیر',8,'Makki',30,[
    {number:4,arabic:'لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ',urdu:'بے شک ہم نے انسان کو بہترین صورت میں پیدا کیا',english:'We have certainly created man in the best of stature.'},
  ]),
  s(96,'Al-Alaq','العلق','العلق','The Clot','خون کا لوتھڑا',19,'Makki',30,[
    {number:1,arabic:'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',urdu:'پڑھو اپنے رب کے نام کے ساتھ جس نے پیدا کیا',english:'Recite in the name of your Lord who created.'},
    {number:2,arabic:'خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ',urdu:'جس نے انسان کو خون کے لوتھڑے سے پیدا کیا',english:'Created man from a clinging substance.'},
    {number:3,arabic:'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ',urdu:'پڑھو اور تیرا رب بڑا کریم ہے',english:'Recite, and your Lord is the most Generous.'},
    {number:4,arabic:'الَّذِي عَلَّمَ بِالْقَلَمِ',urdu:'جس نے قلم کے ذریعے سکھایا',english:'Who taught by the pen.'},
    {number:5,arabic:'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',urdu:'جس نے انسان کو وہ سکھایا جو وہ نہیں جانتا تھا',english:'Taught man that which he knew not.'},
  ]),
  s(97,'Al-Qadr','القدر','القدر','The Power','قدرت',5,'Makki',30,[
    {number:1,arabic:'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',urdu:'بے شک ہم نے اسے لیلۃ القدر میں نازل کیا',english:'Indeed, We sent the Quran down during the Night of Decree.'},
    {number:2,arabic:'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',urdu:'اور تجھے کیا معلوم کہ لیلۃ القدر کیا ہے',english:'And what can make you know what is the Night of Decree?'},
    {number:3,arabic:'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',urdu:'لیلۃ القدر ہزار مہینوں سے بہتر ہے',english:'The Night of Decree is better than a thousand months.'},
    {number:4,arabic:'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ',urdu:'اس میں فرشتے اور روح نازل ہوتے ہیں اپنے رب کے اذن سے ہر حکم لے کر',english:'The angels and the Spirit descend therein by permission of their Lord for every matter.'},
    {number:5,arabic:'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',urdu:'وہ رات سراسر سلامتی ہے فجر کے طلوع تک',english:'Peace it is until the emergence of dawn.'},
  ]),
  s(98,'Al-Bayyinah','البينة','البینہ','The Clear Proof','واضح دلیل',8,'Madani',30,[
    {number:5,arabic:'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ',urdu:'اور انہیں صرف یہ حکم دیا گیا کہ اخلاص کے ساتھ اللہ کی عبادت کریں',english:'And they were not commanded except to worship Allah, sincere to Him in religion.'},
  ]),
  s(99,'Az-Zalzalah','الزلزلة','الزلزلہ','The Earthquake','زلزلہ',8,'Madani',30,[
    {number:7,arabic:'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',urdu:'پس جس نے ذرہ برابر بھلائی کی وہ اسے دیکھ لے گا',english:'So whoever does an atom\'s weight of good will see it.'},
    {number:8,arabic:'وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ',urdu:'اور جس نے ذرہ برابر برائی کی وہ اسے دیکھ لے گا',english:'And whoever does an atom\'s weight of evil will see it.'},
  ]),
  s(100,'Al-Adiyat','العاديات','العادیات','The Courser','دوڑنے والا',11,'Makki',30,[
    {number:1,arabic:'وَالْعَادِيَاتِ ضَبْحًا',urdu:'دوڑنے والے گھوڑوں کی قسم جو ہانپتے ہیں',english:'By the racers, panting.'},
  ]),
  s(101,'Al-Qariah','القارعة','القارعہ','The Calamity','کھٹکھٹانے والی',11,'Makki',30,[
    {number:1,arabic:'الْقَارِعَةُ',urdu:'وہ کھٹکھٹانے والی',english:'The Striking Calamity.'},
    {number:6,arabic:'فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ',urdu:'تو جس کے پلڑے بھاری ہوں گے',english:'Then as for one whose scales are heavy with good deeds.'},
    {number:7,arabic:'فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ',urdu:'وہ پسندیدہ زندگی میں ہوگا',english:'He will be in a pleasant life.'},
  ]),
  s(102,'At-Takathur','التكاثر','التکاثر','The Rivalry in World Increase','زیادتی کی دوڑ',8,'Makki',30,[
    {number:1,arabic:'أَلْهَاكُمُ التَّكَاثُرُ',urdu:'مال و دولت کی کثرت کی طلب نے تمہیں غافل کر دیا',english:'Competition in worldly increase diverts you.'},
    {number:8,arabic:'ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ',urdu:'پھر اس دن تم سے نعمتوں کے بارے میں ضرور پوچھا جائے گا',english:'Then you will surely be asked that Day about pleasure.'},
  ]),
  s(103,'Al-Asr','العصر','العصر','The Declining Day','زمانہ',3,'Makki',30,[
    {number:1,arabic:'وَالْعَصْرِ',urdu:'قسم ہے زمانے کی',english:'By time,'},
    {number:2,arabic:'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',urdu:'بے شک انسان گھاٹے میں ہے',english:'Indeed, mankind is in loss,'},
    {number:3,arabic:'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',urdu:'سوائے ان لوگوں کے جو ایمان لائے نیک عمل کیے ایک دوسرے کو حق کی وصیت کی اور صبر کی وصیت کی',english:'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.'},
  ]),
  s(104,'Al-Humazah','الهمزة','الہمزہ','The Backbiter','عیب جو',9,'Makki',30,[
    {number:1,arabic:'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ',urdu:'ہر عیب جو اور پیٹھ پیچھے برائی کرنے والے کے لیے ہلاکت ہے',english:'Woe to every scorner and mocker.'},
  ]),
  s(105,'Al-Fil','الفيل','الفیل','The Elephant','ہاتھی',5,'Makki',30,[
    {number:1,arabic:'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ',urdu:'کیا تو نے نہیں دیکھا تیرے رب نے ہاتھی والوں کے ساتھ کیا کیا',english:'Have you not considered how your Lord dealt with the companions of the elephant?'},
  ]),
  s(106,'Quraysh','قريش','قریش','Quraysh','قریش',4,'Makki',30,[
    {number:1,arabic:'لِإِيلَافِ قُرَيْشٍ',urdu:'قریش کی مانوسیت کی وجہ سے',english:'For the accustomed security of the Quraysh.'},
    {number:3,arabic:'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ',urdu:'پس انہیں اس گھر کے رب کی عبادت کرنی چاہیے',english:'Let them worship the Lord of this House.'},
  ]),
  s(107,'Al-Maun','الماعون','الماعون','The Small Kindnesses','چھوٹی مدد',7,'Makki',30,[
    {number:1,arabic:'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ',urdu:'کیا تو نے اسے دیکھا جو دین کو جھٹلاتا ہے',english:'Have you seen the one who denies the Recompense?'},
    {number:2,arabic:'فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ',urdu:'یہ وہی ہے جو یتیم کو دھکے دیتا ہے',english:'For that is the one who drives away the orphan.'},
  ]),
  s(108,'Al-Kawthar','الكوثر','الکوثر','The Abundance','کثرت',3,'Makki',30,[
    {number:1,arabic:'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',urdu:'بے شک ہم نے تجھے کوثر عطا کیا',english:'Indeed, We have granted you al-Kawthar.'},
    {number:2,arabic:'فَصَلِّ لِرَبِّكَ وَانْحَرْ',urdu:'پس اپنے رب کے لیے نماز پڑھ اور قربانی کر',english:'So pray to your Lord and sacrifice to Him alone.'},
    {number:3,arabic:'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',urdu:'بے شک تیرا دشمن ہی بے نسل ہے',english:'Indeed, your enemy is the one cut off.'},
  ]),
  s(109,'Al-Kafirun','الكافرون','الکافرون','The Disbelievers','کافر',6,'Makki',30,[
    {number:1,arabic:'قُلْ يَا أَيُّهَا الْكَافِرُونَ',urdu:'کہو: اے کافرو',english:'Say: O disbelievers,'},
    {number:2,arabic:'لَا أَعْبُدُ مَا تَعْبُدُونَ',urdu:'میں اس کی عبادت نہیں کرتا جس کی تم عبادت کرتے ہو',english:'I do not worship what you worship.'},
    {number:6,arabic:'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',urdu:'تمہارا دین تمہارے لیے اور میرا دین میرے لیے',english:'For you is your religion, and for me is my religion.'},
  ]),
  s(110,'An-Nasr','النصر','النصر','The Divine Support','الہی مدد',3,'Madani',30,[
    {number:1,arabic:'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',urdu:'جب اللہ کی مدد اور فتح آئے',english:'When the victory of Allah has come and the conquest.'},
    {number:2,arabic:'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',urdu:'اور تو لوگوں کو اللہ کے دین میں جوق در جوق داخل ہوتے دیکھے',english:'And you see the people entering into the religion of Allah in multitudes.'},
    {number:3,arabic:'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا',urdu:'تو اپنے رب کی تسبیح اور تعریف کر اور اس سے معافی مانگ بے شک وہ بہت توبہ قبول کرنے والا ہے',english:'Then exalt Him with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.'},
  ]),
  s(111,'Al-Masad','المسد','المسد','The Palm Fiber','کھجور کی چھال',5,'Makki',30,[
    {number:1,arabic:'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',urdu:'ابولہب کے دونوں ہاتھ ٹوٹیں اور وہ ہلاک ہو',english:'May the hands of Abu Lahab be ruined, and ruined is he.'},
  ]),
  s(112,'Al-Ikhlas','الإخلاص','الاخلاص','Sincerity','اخلاص',4,'Makki',30,[
    {number:1,arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ',urdu:'کہو: وہ اللہ ایک ہے',english:'Say: He is Allah, the One.'},
    {number:2,arabic:'اللَّهُ الصَّمَدُ',urdu:'اللہ بے نیاز ہے',english:'Allah, the Eternal Refuge.'},
    {number:3,arabic:'لَمْ يَلِدْ وَلَمْ يُولَدْ',urdu:'نہ اس نے کسی کو جنا اور نہ وہ جنا گیا',english:'He neither begets nor is born.'},
    {number:4,arabic:'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',urdu:'اور اس کا کوئی ہمسر نہیں',english:'Nor is there to Him any equivalent.'},
  ]),
  s(113,'Al-Falaq','الفلق','الفلق','The Daybreak','صبح کی روشنی',5,'Makki',30,[
    {number:1,arabic:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',urdu:'کہو: میں صبح کے رب کی پناہ مانگتا ہوں',english:'Say: I seek refuge in the Lord of daybreak.'},
    {number:2,arabic:'مِن شَرِّ مَا خَلَقَ',urdu:'اس کی مخلوق کے شر سے',english:'From the evil of what He has created.'},
    {number:3,arabic:'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',urdu:'اور اندھیری رات کے شر سے جب وہ چھا جائے',english:'And from the evil of darkness when it settles.'},
    {number:4,arabic:'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',urdu:'اور گانٹھوں پر پھونکنے والیوں کے شر سے',english:'And from the evil of those who blow on knots.'},
    {number:5,arabic:'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',urdu:'اور حسد کرنے والے کے شر سے جب وہ حسد کرے',english:'And from the evil of an envier when he envies.'},
  ]),
  s(114,'An-Nas','الناس','الناس','Mankind','انسان',6,'Makki',30,[
    {number:1,arabic:'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',urdu:'کہو: میں لوگوں کے رب کی پناہ مانگتا ہوں',english:'Say: I seek refuge in the Lord of mankind.'},
    {number:2,arabic:'مَلِكِ النَّاسِ',urdu:'لوگوں کے بادشاہ',english:'The Sovereign of mankind.'},
    {number:3,arabic:'إِلَهِ النَّاسِ',urdu:'لوگوں کے معبود',english:'The God of mankind.'},
    {number:4,arabic:'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',urdu:'وسوسہ ڈالنے والے پیچھے ہٹنے والے کے شر سے',english:'From the evil of the retreating whisperer.'},
    {number:5,arabic:'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',urdu:'جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے',english:'Who whispers into the breasts of mankind.'},
    {number:6,arabic:'مِنَ الْجِنَّةِ وَالنَّاسِ',urdu:'جنوں میں سے اور انسانوں میں سے',english:'From among the jinn and mankind.'},
  ]),
];

// Juz data
export const QURAN_JUZ = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `پارہ ${i + 1}`,
  nameEn: `Juz ${i + 1}`,
  surahs: QURAN_SURAHS.filter((s) => s.juz === i + 1).map((s) => s.id),
}));
