document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeMoviesPage, 300);
});

function initializeMoviesPage() {
    if (!document.querySelector('.category')) {
        console.log('Categories not loaded yet, retrying...');
        setTimeout(initializeMoviesPage, 100);
        return;
    }
    
    loadUserData();
    checkLoginStatus();
    initAuthSystem();
} 
 
window.handleSignup = null;
window.handleLogin = null;
window.logout = null;
window.loginUser = null;
window.checkLoginStatus = null;
window.updateProfileDisplay = null;
const sliderMovieMapping = {
    'Howls Moving Castle': 'Howl\'s Moving Castle',
    'Spirited Away': 'Spirited Away',
    'My Neighbor Totoro': 'My Neighbor Totoro',
    'Princess Mononoke': 'Princess Mononoke',
    'Kikis Delivery Service': 'Kiki\'s Delivery Service'
};

function isMovieInWatchlist(movieTitle) {
    const watchlist = JSON.parse(localStorage.getItem('ghibliUsers'))?.[currentUser]?.watchlist || [];
    return watchlist.includes(movieTitle);
}

function updateWatchlistButtonState(button, movieTitle) {
    const isInWatchlist = currentUser && isMovieInWatchlist(movieTitle);
    
    if (isInWatchlist) {
        button.classList.add('added-to-watchlist');
        button.innerHTML = '<i class="fas fa-check watchlist-checkmark"></i> ✓  WATCH LIST';
    } else {
        button.classList.remove('added-to-watchlist');
        button.innerHTML = '<i class="fas fa-plus"></i> +  WATCH LIST';
    }
}
 const categoryMovies = {
        'ALL': [
            { img: 'spirited-away.jpg', title: 'Spirited Away', bg: 'spirited-away-bg.jpg', description: 'A young girl, Chihiro, enters a magical world ruled by gods, witches, and spirits, and where humans are changed into beasts. She must work in a bathhouse to free herself and her parents.', director: 'Hayao Miyazaki', year: '2001', trailerUrl: 'https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.6/10', userVotes: '912k', category: '|     2001 · Fantasy / Adventure' },
            { img: 'my-neighbor-totoro.jpg', title: 'My Neighbor Totoro', bg: 'totoro-bg.png', description: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby. Their days soon fill with wonder as they explore a hidden world of enchantment and friendship.', director: 'Hayao Miyazaki', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=92a7Hj0ijLs&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.1/10', userVotes: '408k', category: '|     1988 · Fantasy / Comedy / Family' },
            { img: 'princess-mononoke.jpg', title: 'Princess Mononoke', bg: 'princess-mononoke-bg.png', description: 'While seeking to cure himself of a curse, young warrior Ashitaka stumbles into a conflict between the people of Iron Town and Princess Mononoke, a girl raised by wolves, who will stop at nothing to prevent the destruction of her home.', director: 'Hayao Miyazaki', year: '1997', trailerUrl: 'https://www.youtube.com/watch?v=4OiMOHRDs14&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.3/10', userVotes: '461k', category: '|     1997 · Fantasy / Adventure / Action' },
            { img: 'howls-moving-castle.jpg', title: 'Howl\'s Moving Castle', bg: 'howlsfeatured.jpg', description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.', director: 'Hayao Miyazaki', year: '2004', trailerUrl: 'https://www.youtube.com/watch?v=iwROgK94zcM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.2/10', userVotes: '484k', category: '|     2004 · Fantasy / Adventure / Romance' },
            { img: 'kikis-delivery-service.jpg', title: 'Kiki\'s Delivery Service', bg: 'kikis-bg.jpg', description: 'Along with her black cat Jiji, Kiki settles in a seaside town and starts a high-flying delivery service. Here begins her magical encounter with independence and responsibility, making lifelong friends and finding her place in the world.', director: 'Hayao Miyazaki', year: '1989', trailerUrl: 'https://www.youtube.com/watch?v=4bG17OYs-GA&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '178k', category: '|     1989 · Fantasy / Family' },
            { img: 'princess-kaguya.jpg', title: 'The Tale of the Princess Kaguya', bg: 'kaguya-bg.png', description: 'Kaguya is a beautiful young woman coveted by five nobles. To try to avoid marrying a stranger she doesn\'t love, she sends her suitors on seemingly impossible tasks. But she will have to face her fate and punishment for her choices.', director: 'Isao Takahata', year: '2013', trailerUrl: 'https://www.youtube.com/watch?v=W71mtorCZDw&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.0/10', userVotes: '58k', category: '|    2013 · Drama / Fairy-Tale / Family' },
            { img: 'nausica.jpg', title: 'Nausicaä of the Valley of the Wind', bg: 'nausica-bg.png', description: 'Warrior and pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet. She fights to restore balance between humans and nature.', director: 'Hayao Miyazaki', year: '1984', trailerUrl: 'https://www.youtube.com/watch?v=6zhLBe319KE&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.0/10', userVotes: '191k', category: '|     1984 · Sci-Fi / Adventure ' },
            { img: 'laputa.jpg', title: 'Castle in the Sky', bg: 'laputa-bg.png', description: 'Pazu\'s life changes when he meets Sheeta, a girl whom pirates are chasing for her crystal amulet, which has the potential to locate Laputa, a legendary castle floating in the sky.', director: 'Hayao Miyazaki', year: '1986', trailerUrl: 'https://www.youtube.com/watch?v=8ykEy-yPBFc&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.0/10', userVotes: '191k', category: '|     1986 · Fantasy / Adventure / Family' },
            { img: 'ponyo.jpg', title: 'Ponyo', bg: 'ponyo-bg.png', description: 'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him. Their friendship sets off a magical journey that could change both their worlds.', director: 'Hayao Miyazaki', year: '2008', trailerUrl: 'https://www.youtube.com/watch?v=CsR3KVgBzSM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '175k', category: '|     2008 · Fantasy / Adventure / Comedy / Family' },
            { img: 'wind-rises.jpg', title: 'The Wind Rises', bg: 'the-wind-rises-bg.png', description: 'Jiro Horikoshi studies assiduously to fulfill his aim of becoming an aeronautical engineer. As WWII begins, fighter aircraft designed by him end up getting used by the Japanese Empire against its foes.', director: 'Hayao Miyazaki', year: '2013', trailerUrl: 'https://www.youtube.com/watch?v=YrueAaw0RYg&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '107k', category: '|     2013 · Drama / Romance / Biography ' },
            { img: 'grave-of-fireflies.jpg', title: 'Grave of the Fireflies', bg: 'grave-of-fireflies-bg.png', description: 'A young boy and his little sister struggle to survive in Japan during World War II, facing the harsh realities of war, loss, and hunger in a country torn apart by conflict.  Their fight for survival reveals the quiet tragedies of civilian life during wartime.', director: 'Isao Takahata', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=4vPeTSRd580&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.5/10', userVotes: '350k', category: '|     1988 · Drama / War / Tragedy' },
            { img: 'only-yesterday.jpg', title: 'Only Yesterday', bg: 'only-yesterday-bg.jpg', description: 'A twenty-seven-year-old office worker travels to the countryside while reminiscing about her childhood in Tokyo. As past and present begin to blur, she questions what she truly wants from life.', director: 'Isao Takahata', year: '1991', trailerUrl: 'https://www.youtube.com/watch?v=OfkQlZArxw0&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '40k', category: '|     1991 · Drama / Romance' },
            { img: 'porco-rosso.jpg', title: 'Porco Rosso', bg: 'porco-rosso-bg.png', description: 'In 1930s Italy, a veteran World War I pilot is cursed to look like an anthropomorphic pig. As he battles sky pirates and his own past, he searches for meaning in a world shifting around him.', director: 'Hayao Miyazaki', year: '1992', trailerUrl: 'https://www.youtube.com/watch?v=awEC-aLDzjs&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.7/10', userVotes: '110k', category: '|     1992 · Comedy / Adventure' },
            { img: 'ocean-waves.jpg', title: 'Ocean Waves', bg: 'ocean-waves-bg.png', description: 'As a young man returns home after his first year away at college he recalls his senior year of high school and the iron-willed, big city girl that turned his world upside down.', director: 'Tomomi Mochizuki', year: '1993', trailerUrl: 'https://www.youtube.com/watch?v=tfkHiHjrqa8&ab_channel=CrunchyrollStoreAustralia', imdbRating: '6.6/10', userVotes: '22k', category: '|     1993 · Drama / Romance' },
            { img: 'pom-poko.jpg', title: 'Pom Poko', bg: 'pompoko-bg.jpg', description: 'A community of magical shape-shifting raccoon dogs struggle to prevent their forest home from being destroyed by urban development. As the city expands, they face a growing dilemma between resistance and survival.', director: 'Isao Takahata', year: '1994', trailerUrl: 'https://www.youtube.com/watch?v=_7cowIHjCD4&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.3/10', userVotes: '37k', category: '|     1994 · Family / Fantasy / Drama / Comedy' },
            { img: 'whisper-of-the-heart.jpg', title: 'Whisper of the Heart', bg: 'whisper-of-the-heart-bg.jpg', description: 'A love story between a girl who loves reading books and a boy who has previously checked out all of the library books she chooses. Their quiet connection leads her on a journey of self-discovery and dreams beyond the page.', director: 'Yoshifumi Kondō', year: '1995', trailerUrl: 'https://www.youtube.com/watch?v=0pVkiod6V0U&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '79k', category: '|     1995 · Family / Drama / Romance' },
            { img: 'my-neighbors.jpg', title: 'My Neighbors the Yamadas', bg: 'yamadas-bg.jpg', description: 'The life and misadventures of a family in contemporary Japan. Through everyday moments and quirky situations, they reveal the humor, warmth, and quiet chaos of ordinary life.', director: 'Isao Takahata', year: '1999', trailerUrl: 'https://www.youtube.com/watch?v=1C9ujuCPlnY&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.1/10', userVotes: '17k', category: '|     1999 · Family / Comedy' },
            { img: 'the-cat-returns.jpg', title: 'The Cat Returns', bg: 'the-cat-returns-bg.jpg', description: 'After helping a cat, a seventeen-year-old girl finds herself involuntarily engaged to a cat Prince in a magical world where her only hope of freedom lies with a dapper cat statuette come to life.', director: 'Hiroyuki Morita', year: '2002', trailerUrl: 'https://www.youtube.com/watch?v=Gp-H_YOcYTM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.1/10', userVotes: '69k', category: '|     2002· Fantasy / Romance /Family / Comedy' },
            { img: 'arrietyy.jpg', title: 'The Secret World of Arrietty', bg: 'arrietyy-bg.png', description: 'The Clock family are four-inch-tall people who live anonymously in another family\'s residence, borrowing simple items to make their home. Life changes for the Clocks when their teenage daughter Arrietty is discovered.', director: 'Hiromasa Yonebayashi', year: '2010', trailerUrl: 'https://www.youtube.com/watch?v=9CtIXPhPo0g&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '111k', category: '|     2010 · Fantasy / Family / Drama' },
            { img: 'earthsea.jpg', title: 'Tales from Earthsea', bg: 'earthsea-bg.png', description: 'In a mythical land, a man and a young boy investigate a series of unusual occurrences. Their search uncovers strange creatures, hidden powers, and a mystery that could change their world.', director: 'Gorō Miyazaki', year: '2006', trailerUrl: 'https://www.youtube.com/watch?v=8hxYx3Jq3kI&ab_channel=CrunchyrollStoreAustralia', imdbRating: '6.3/10', userVotes: '47k', category: '|     2006 · Fantasy / Adventure' },
            { img: 'poppy-hill.jpg', title: 'From Up on Poppy Hill', bg: 'poppy-hill-bg.png', description: 'A group of Yokohama teens look to save their school\'s clubhouse from the wrecking ball in preparations for the 1964 Tokyo Olympics. Along the way, they uncover buried memories and form unexpected bonds that reshape their future.', director: 'Gorō Miyazaki', year: '2011', trailerUrl: 'https://www.youtube.com/watch?v=9nzpk_Br6yo&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.4/10', userVotes: '56k', category: '|     2011 · Drama / Comedy / Romance' },
            { img: 'when-marnie-was-there.jpg', title: 'When Marnie Was There', bg: 'marnie-bg.png', description: 'Anna, a shy 12-year-old girl, is sent to spend time with her aunt and uncle who live in the countryside, where she meets Marnie. The two become best friends. But Anna gradually discovers that Marnie is not quite who she appears to be.', director: 'Hiromasa Yonebayashi', year: '2014', trailerUrl: 'https://www.youtube.com/watch?v=jjmrxqcQdYg&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '52k', category: '|     2014 · Drama / Family / Mystery' },
            { img: 'earwig.jpg', title: 'Earwig and the Witch', bg: 'earwig-bg.png', description: 'An orphan girl, Earwig, is adopted by a witch and comes home to a spooky house filled with mystery and magic. But unlike other children, she’s determined to bend this strange new world to her will.', director: 'Gorō Miyazaki', year: '2020', trailerUrl: 'https://www.youtube.com/watch?v=Lk5YWIbwzRE&ab_channel=GKIDSFilms', imdbRating: '4.6/10', userVotes: '6.5k', category: '|     2020 · Fantasy / Family / Adventure' },
            { img: 'the-boy-heron.jpg', title: 'The Boy and the Heron', bg: 'the-boy-heron-bg.png', description: 'In the wake of his mother\'s death and his father\'s remarriage, a headstrong boy ventures into a dreamlike world shared by the living and the dead in search of his missing stepmother.', director: 'Hayao Miyazaki', year: '2023', trailerUrl: 'https://www.youtube.com/watch?v=t5khm-VjEu4&ab_channel=GKIDSFilms', imdbRating: '7.4/10', userVotes: '96k', category: '|     2023 · Fantasy / Adventure / Drama' }
        ],
        'POPULAR': [
            { img: 'spirited-away.jpg', title: 'Spirited Away', bg: 'spirited-away-bg.jpg', description: 'A young girl, Chihiro, enters a magical world ruled by gods, witches, and spirits, and where humans are changed into beasts. She must work in a bathhouse to free herself and her parents.', director: 'Hayao Miyazaki', year: '2001', trailerUrl: 'https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.6/10', userVotes: '912k', category: '|     2001 · Fantasy / Adventure' },
            { img: 'howls-moving-castle.jpg', title: 'Howl\'s Moving Castle', bg: 'howlsfeatured.jpg', description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.', director: 'Hayao Miyazaki', year: '2004', trailerUrl: 'https://www.youtube.com/watch?v=iwROgK94zcM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.2/10', userVotes: '484k', category: '|     2004 · Fantasy / Adventure / Romance' },
            { img: 'princess-mononoke.jpg', title: 'Princess Mononoke', bg: 'princess-mononoke-bg.png', description: 'While seeking to cure himself of a curse, young warrior Ashitaka stumbles into a conflict between the people of Iron Town and Princess Mononoke, a girl raised by wolves, who will stop at nothing to prevent the destruction of her home.', director: 'Hayao Miyazaki', year: '1997', trailerUrl: 'https://www.youtube.com/watch?v=4OiMOHRDs14&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.3/10', userVotes: '461k', category: '|     1997 · Fantasy / Adventure / Action' },
            { img: 'my-neighbor-totoro.jpg', title: 'My Neighbor Totoro', bg: 'totoro-bg.png', description: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby. Their days soon fill with wonder as they explore a hidden world of enchantment and friendship.', director: 'Hayao Miyazaki', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=92a7Hj0ijLs&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.1/10', userVotes: '408k', category: '|     1988 · Fantasy / Comedy / Family' },
            { img: 'grave-of-fireflies.jpg', title: 'Grave of the Fireflies', bg: 'grave-of-fireflies-bg.png', description: 'A young boy and his little sister struggle to survive in Japan during World War II, facing the harsh realities of war, loss, and hunger in a country torn apart by conflict.  Their fight for survival reveals the quiet tragedies of civilian life during wartime.', director: 'Isao Takahata', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=4vPeTSRd580&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.5/10', userVotes: '350k', category: '|     1988 · Drama / War / Tragedy' },
            { img: 'ponyo.jpg', title: 'Ponyo', bg: 'ponyo-bg.png', description: 'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him. Their friendship sets off a magical journey that could change both their worlds.', director: 'Hayao Miyazaki', year: '2008', trailerUrl: 'https://www.youtube.com/watch?v=CsR3KVgBzSM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '175k', category: '|     2008 · Fantasy / Adventure / Comedy / Family' },
            { img: 'nausica.jpg', title: 'Nausicaä of the Valley of the Wind', bg: 'nausica-bg.png', description: 'Warrior and pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet. She fights to restore balance between humans and nature.', director: 'Hayao Miyazaki', year: '1984', trailerUrl: 'https://www.youtube.com/watch?v=6zhLBe319KE&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.0/10', userVotes: '191k', category: '|     1984 · Sci-Fi / Adventure ' },
            { img: 'laputa.jpg', title: 'Castle in the Sky', bg: 'laputa-bg.png', description: 'Pazu\'s life changes when he meets Sheeta, a girl whom pirates are chasing for her crystal amulet, which has the potential to locate Laputa, a legendary castle floating in the sky.', director: 'Hayao Miyazaki', year: '1986', trailerUrl: 'https://www.youtube.com/watch?v=8ykEy-yPBFc&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.0/10', userVotes: '191k', category: '|     1986 · Fantasy / Adventure / Family' },
            { img: 'wind-rises.jpg', title: 'The Wind Rises', bg: 'the-wind-rises-bg.png', description: 'Jiro Horikoshi studies assiduously to fulfill his aim of becoming an aeronautical engineer. As WWII begins, fighter aircraft designed by him end up getting used by the Japanese Empire against its foes.', director: 'Hayao Miyazaki', year: '2013', trailerUrl: 'https://www.youtube.com/watch?v=YrueAaw0RYg&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '107k', category: '|     2013 · Drama / Romance / Biography ' },
            { img: 'kikis-delivery-service.jpg', title: 'Kiki\'s Delivery Service', bg: 'kikis-bg.jpg', description: 'Along with her black cat Jiji, Kiki settles in a seaside town and starts a high-flying delivery service. Here begins her magical encounter with independence and responsibility, making lifelong friends and finding her place in the world.', director: 'Hayao Miyazaki', year: '1989', trailerUrl: 'https://www.youtube.com/watch?v=4bG17OYs-GA&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '178k', category: '|     1989 · Fantasy / Family' }
        ],
        'TRENDING-NOW': [
            { img: 'the-boy-heron.jpg', title: 'The Boy and the Heron', bg: 'the-boy-heron-bg.png', description: 'In the wake of his mother\'s death and his father\'s remarriage, a headstrong boy ventures into a dreamlike world shared by the living and the dead in search of his missing stepmother.', director: 'Hayao Miyazaki', year: '2023', trailerUrl: 'https://www.youtube.com/watch?v=t5khm-VjEu4&ab_channel=GKIDSFilms', imdbRating: '7.4/10', userVotes: '96k', category: '|     2023 · Fantasy / Adventure / Drama' },
            { img: 'princess-mononoke.jpg', title: 'Princess Mononoke', bg: 'princess-mononoke-bg.png', description: 'While seeking to cure himself of a curse, young warrior Ashitaka stumbles into a conflict between the people of Iron Town and Princess Mononoke, a girl raised by wolves, who will stop at nothing to prevent the destruction of her home.', director: 'Hayao Miyazaki', year: '1997', trailerUrl: 'https://www.youtube.com/watch?v=4OiMOHRDs14&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.3/10', userVotes: '461k', category: '|     1997 · Fantasy / Adventure / Action' },
            { img: 'spirited-away.jpg', title: 'Spirited Away', bg: 'spirited-away-bg.jpg', description: 'A young girl, Chihiro, enters a magical world ruled by gods, witches, and spirits, and where humans are changed into beasts. She must work in a bathhouse to free herself and her parents.', director: 'Hayao Miyazaki', year: '2001', trailerUrl: 'https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.6/10', userVotes: '912k', category: '|     2001 · Fantasy / Adventure' },
            { img: 'howls-moving-castle.jpg', title: 'Howl\'s Moving Castle', bg: 'howlsfeatured.jpg', description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.', director: 'Hayao Miyazaki', year: '2004', trailerUrl: 'https://www.youtube.com/watch?v=iwROgK94zcM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.2/10', userVotes: '484k', category: '|     2004 · Fantasy / Adventure / Romance' },
            { img: 'grave-of-fireflies.jpg', title: 'Grave of the Fireflies', bg: 'grave-of-fireflies-bg.png', description: 'A young boy and his little sister struggle to survive in Japan during World War II, facing the harsh realities of war, loss, and hunger in a country torn apart by conflict.  Their fight for survival reveals the quiet tragedies of civilian life during wartime.', director: 'Isao Takahata', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=4vPeTSRd580&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.5/10', userVotes: '350k', category: '|     1988 · Drama / War / Tragedy' },
            { img: 'my-neighbor-totoro.jpg', title: 'My Neighbor Totoro', bg: 'totoro-bg.png', description: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby. Their days soon fill with wonder as they explore a hidden world of enchantment and friendship.', director: 'Hayao Miyazaki', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=92a7Hj0ijLs&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.1/10', userVotes: '408k', category: '|     1988 · Fantasy / Comedy / Family' },
            { img: 'ponyo.jpg', title: 'Ponyo', bg: 'ponyo-bg.png', description: 'A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him. Their friendship sets off a magical journey that could change both their worlds.', director: 'Hayao Miyazaki', year: '2008', trailerUrl: 'https://www.youtube.com/watch?v=CsR3KVgBzSM&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '175k', category: '|     2008 · Fantasy / Adventure / Comedy / Family' },
            { img: 'kikis-delivery-service.jpg', title: 'Kiki\'s Delivery Service', bg: 'kikis-bg.jpg', description: 'Along with her black cat Jiji, Kiki settles in a seaside town and starts a high-flying delivery service. Here begins her magical encounter with independence and responsibility, making lifelong friends and finding her place in the world.', director: 'Hayao Miyazaki', year: '1989', trailerUrl: 'https://www.youtube.com/watch?v=4bG17OYs-GA&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '178k', category: '|     1989 · Fantasy / Family' },
            { img: 'arrietyy.jpg', title: 'The Secret World of Arrietty', bg: 'arrietyy-bg.png', description: 'The Clock family are four-inch-tall people who live anonymously in another family\'s residence, borrowing simple items to make their home. Life changes for the Clocks when their teenage daughter Arrietty is discovered.', director: 'Hiromasa Yonebayashi', year: '2010', trailerUrl: 'https://www.youtube.com/watch?v=9CtIXPhPo0g&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '111k', category: '|     2010 · Fantasy / Family / Drama' }
        ],
        'AWARD-WINNING': [
            { img: 'spirited-away.jpg', title: 'Spirited Away', bg: 'spirited-away-bg.jpg', description: 'A young girl, Chihiro, enters a magical world ruled by gods, witches, and spirits, and where humans are changed into beasts. She must work in a bathhouse to free herself and her parents.', director: 'Hayao Miyazaki', year: '2001', trailerUrl: 'https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.6/10', userVotes: '912k', category: '|     2001 · Fantasy / Adventure' },
            { img: 'the-boy-heron.jpg', title: 'The Boy and the Heron', bg: 'the-boy-heron-bg.png', description: 'In the wake of his mother\'s death and his father\'s remarriage, a headstrong boy ventures into a dreamlike world shared by the living and the dead in search of his missing stepmother.', director: 'Hayao Miyazaki', year: '2023', trailerUrl: 'https://www.youtube.com/watch?v=t5khm-VjEu4&ab_channel=GKIDSFilms', imdbRating: '7.4/10', userVotes: '96k', category: '|     2023 · Fantasy / Adventure / Drama' },
            { img: 'princess-mononoke.jpg', title: 'Princess Mononoke', bg: 'princess-mononoke-bg.png', description: 'While seeking to cure himself of a curse, young warrior Ashitaka stumbles into a conflict between the people of Iron Town and Princess Mononoke, a girl raised by wolves, who will stop at nothing to prevent the destruction of her home.', director: 'Hayao Miyazaki', year: '1997', trailerUrl: 'https://www.youtube.com/watch?v=4OiMOHRDs14&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.3/10', userVotes: '461k', category: '|     1997 · Fantasy / Adventure / Action' },
            { img: 'grave-of-fireflies.jpg', title: 'Grave of the Fireflies', bg: 'grave-of-fireflies-bg.png', description: 'A young boy and his little sister struggle to survive in Japan during World War II, facing the harsh realities of war, loss, and hunger in a country torn apart by conflict.  Their fight for survival reveals the quiet tragedies of civilian life during wartime.', director: 'Isao Takahata', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=4vPeTSRd580&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.5/10', userVotes: '350k', category: '|     1988 · Drama / War / Tragedy' },
            { img: 'my-neighbor-totoro.jpg', title: 'My Neighbor Totoro', bg: 'totoro-bg.png', description: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby. Their days soon fill with wonder as they explore a hidden world of enchantment and friendship.', director: 'Hayao Miyazaki', year: '1988', trailerUrl: 'https://www.youtube.com/watch?v=92a7Hj0ijLs&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.1/10', userVotes: '408k', category: '|     1988 · Fantasy / Comedy / Family' },
            { img: 'princess-kaguya.jpg', title: 'The Tale of the Princess Kaguya', bg: 'kaguya-bg.png', description: 'Kaguya is a beautiful young woman coveted by five nobles. To try to avoid marrying a stranger she doesn\'t love, she sends her suitors on seemingly impossible tasks. But she will have to face her fate and punishment for her choices.', director: 'Isao Takahata', year: '2013', trailerUrl: 'https://www.youtube.com/watch?v=W71mtorCZDw&ab_channel=CrunchyrollStoreAustralia', imdbRating: '8.0/10', userVotes: '58k', category: '|    2013 · Drama / Fairy-Tale / Family' },
            { img: 'when-marnie-was-there.jpg', title: 'When Marnie Was There', bg: 'marnie-bg.png', description: 'Anna, a shy 12-year-old girl, is sent to spend time with her aunt and uncle who live in the countryside, where she meets Marnie. The two become best friends. But Anna gradually discovers that Marnie is not quite who she appears to be.', director: 'Hiromasa Yonebayashi', year: '2014', trailerUrl: 'https://www.youtube.com/watch?v=jjmrxqcQdYg&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.6/10', userVotes: '52k', category: '|     2014 · Drama / Family / Mystery' },
            { img: 'wind-rises.jpg', title: 'The Wind Rises', bg: 'the-wind-rises-bg.png', description: 'Jiro Horikoshi studies assiduously to fulfill his aim of becoming an aeronautical engineer. As WWII begins, fighter aircraft designed by him end up getting used by the Japanese Empire against its foes.', director: 'Hayao Miyazaki', year: '2013', trailerUrl: 'https://www.youtube.com/watch?v=YrueAaw0RYg&ab_channel=CrunchyrollStoreAustralia', imdbRating: '7.8/10', userVotes: '107k', category: '|     2013 · Drama / Romance / Biography ' }
        ]
    };

document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.category');
    const mainSection = document.querySelector('.section');
    const originalMoviePostersContainer = document.querySelector('.movie-posters');

   

    const categoryContainers = {};

        function createMovieCard(movieInfo) {

            const card = document.createElement('div');
            card.className = 'movie-card';

            const img = document.createElement('img');
            img.src = `img/${movieInfo.img}`;
            img.alt = movieInfo.title;

            const playButton = document.createElement('div');
            playButton.className = 'play-button';

            const playIcon = document.createElement('div');
            playIcon.className = 'play-icon';

            playButton.appendChild(playIcon);
            card.appendChild(img);
            card.appendChild(playButton);

            card.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'movie-fullscreen-overlay';

            const bgImage = document.createElement('div');
            bgImage.className = 'overlay-background';
            bgImage.style.backgroundImage = `url('img/${movieInfo.bg}')`;

            const textContentContainer = document.createElement('div');
            textContentContainer.className = 'overlay-text-content';
            textContentContainer.className = 'overlay-text-content';
            // make text black all black :>
            if (movieInfo.title === "Howl's Moving Castle") {
                textContentContainer.classList.add('howls-black-text');
            }
            else if (movieInfo.title === "The Tale of the Princess Kaguya") {
                textContentContainer.classList.add('howls-black-text');
            } else if (movieInfo.title === "Only Yesterday") {
                textContentContainer.classList.add('howls-black-text');
            }else if (movieInfo.title === "Ocean Waves") {
                textContentContainer.classList.add('howls-black-text');
            }else if (movieInfo.title === "My Neighbors the Yamadas") {
                textContentContainer.classList.add('howls-black-text');
            }
            // Movie Titles
            const titleElement = document.createElement('div');
            titleElement.className = 'movie-title-display'; 

            if (movieInfo.title === 'Spirited Away') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/spirited-away-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '200px';
                titleImage.style.width = '550px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';

                titleElement.appendChild(titleImage);
            } 
             else if (movieInfo.title === 'My Neighbor Totoro') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/totoro-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '280px';
                titleImage.style.width = '310px';
                titleImage.style.paddingBottom = '70px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Princess Mononoke') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/mononoke-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '450px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Howl\'s Moving Castle') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/howls-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '470px';
                titleImage.style.paddingBottom = '60px';
                

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Kiki\'s Delivery Service') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/kikis-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '410px';
                titleImage.style.width = '460px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'The Tale of the Princess Kaguya') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/kaguya-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '470px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Nausicaä of the Valley of the Wind') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/nausicaa-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '470px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Castle in the Sky') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/laputa-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '600px';
                titleImage.style.width = '360px';
                titleImage.style.paddingBottom = '68px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Ponyo') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/ponyo-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '400px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'The Wind Rises') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/the-wind-rises-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '850px';
                titleImage.style.width = '500px';
                titleImage.style.paddingBottom = '70px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Grave of the Fireflies') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/grave-of-fireflies-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '380px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Only Yesterday') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/only-yesterday-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '400px';
                titleImage.style.paddingBottom = '40px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }  else if (movieInfo.title === 'Porco Rosso') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/porco-rosso-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';

                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Ocean Waves') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/ocean-waves-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Pom Poko') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/pompoko-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Whisper of the Heart') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/whisper-of-the-heart-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '55px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'My Neighbors the Yamadas') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/yamadas-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '480px';
                titleImage.style.width = '460px';
                titleImage.style.paddingBottom = '70px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'The Cat Returns') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/the-cat-returns-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '350px';
                titleImage.style.width = '400px';
                titleImage.style.paddingBottom = '40px';

                titleImage.style.display = 'block';
                


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'The Secret World of Arrietty') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/arrietyy-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '380px';
                titleImage.style.width = '380px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'Tales from Earthsea') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/earthsea-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '320px';
                titleImage.style.width = '340px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'From Up on Poppy Hill') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/poppy-hill-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '550px';
                titleImage.style.width = '450px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'When Marnie Was There') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/marnie-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '550px';
                titleImage.style.width = '450px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'Earwig and the Witch') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/earwig-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '390px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'The Boy and the Heron') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/the-boy-heron-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '500px';
                titleImage.style.width = '430px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }
            else {
                const titleText = document.createElement('h2');
                titleText.textContent = movieInfo.title;
                titleElement.appendChild(titleText);
            }
            textContentContainer.appendChild(titleElement);

            const imdbLogo = document.createElement('img');
            imdbLogo.src = 'img/imdb-logo.png';
            imdbLogo.alt = 'IMDb Logo';
            imdbLogo.style.width = '60px'; 
            imdbLogo.style.marginTop = '-170px';
            imdbLogo.style.marginRight = '-53px'; 
            const ratingDisplayContainer = document.createElement('div');
            ratingDisplayContainer.className = 'movie-rating-container';

            if (movieInfo.imdbRating) { 
                const ratingTextSpan = document.createElement('span');
                ratingTextSpan.className = 'movie-rating-text'; 

                const [ratingValue, totalScale] = movieInfo.imdbRating.split('/'); 

                const ratingValueBold = document.createElement('span');
                ratingValueBold.textContent = ratingValue;
                ratingValueBold.style.fontWeight = 'bold'; 

                const totalScaleNormal = document.createElement('span');
                totalScaleNormal.textContent = `/${totalScale}`; 

                ratingTextSpan.appendChild(ratingValueBold);
                ratingTextSpan.appendChild(totalScaleNormal);

                ratingDisplayContainer.appendChild(ratingTextSpan); 
            }

            const userVotesElement = document.createElement('div'); 
            userVotesElement.className = 'movie-user-votes'; 
            if (movieInfo.userVotes) {
                userVotesElement.textContent = `(${movieInfo.userVotes} votes)`; 
            } else {
                userVotesElement.textContent = ''; 
            }
            // --------------------------------------------------

            if (movieInfo.imdbRating) { 
                textContentContainer.appendChild(ratingDisplayContainer);
            }
            textContentContainer.appendChild(userVotesElement);

            const categoryElement = document.createElement('div');
            categoryElement.className = 'movie-category-display';
            if (movieInfo.category) {
                const categoryParts = movieInfo.category.split('|');
                
                if (categoryParts.length > 1) {
                    const firstPart = document.createElement('span');
                    firstPart.textContent = categoryParts[0];
                    
                    const separator = document.createElement('span');
                    separator.textContent = '|';
                    separator.style.fontWeight = 'bold';
                    separator.style.fontSize = '1.6em';
                    separator.style.color = 'white';
                    separator.style.margin = ' 0 30px'; 
                    
                    const secondPart = document.createElement('span');
                    secondPart.textContent = categoryParts[1];
                    
                    categoryElement.appendChild(firstPart);
                    categoryElement.appendChild(separator);
                    categoryElement.appendChild(secondPart);
                } else {
                    categoryElement.textContent = movieInfo.category;
                }
            } else {
                categoryElement.textContent = ''; 
            }

    textContentContainer.appendChild(categoryElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = movieInfo.description;
            const descriptionWrapper = document.createElement('div');
            descriptionWrapper.style.display = 'flex';
            descriptionWrapper.style.alignItems = 'center'; 
            descriptionWrapper.appendChild(imdbLogo);
            descriptionWrapper.appendChild(descriptionElement);
            textContentContainer.appendChild(descriptionWrapper); 


    // --- START OF NEW BUTTONS CODE ---

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'overlay-buttons-container';


    // Trailer Button
    const trailerButton = document.createElement('button');
    trailerButton.className = 'overlay-button trailer-button';

    const playIconCircle = document.createElement('span');
    playIconCircle.className = 'play-icon-circle';
    playIconCircle.innerHTML = '▶'; 

    const buttonText = document.createElement('span');
    buttonText.textContent = 'TRAILER';

    trailerButton.appendChild(playIconCircle);
    trailerButton.appendChild(buttonText);

    trailerButton.addEventListener('click', function() {
        if (movieInfo.trailerUrl) {
            window.open(movieInfo.trailerUrl, '_blank'); 
        } else {
            alert(`No trailer available for: ${movieInfo.title}`);
        }
    });
    buttonsContainer.appendChild(trailerButton);

    // Watchlist Button
    const watchlistButton = document.createElement('button');
    watchlistButton.className = 'overlay-button watchlist-button';

    updateWatchlistButtonState(watchlistButton, movieInfo.title);

watchlistButton.addEventListener('click', function() {
    if (!currentUser) {
        closeOverlay();
        setTimeout(() => {
        showAuthModal('signup');
        }, 300);
        return;
    }
    
    if (isMovieInWatchlist(movieInfo.title)) {
        removeFromWatchlist(movieInfo.title);
    } else {
        addToWatchlist(movieInfo.title);
    }
    
    updateWatchlistButtonState(watchlistButton, movieInfo.title);
    
    updateSliderWatchlistButtons();
    updateMovieCardWatchlistButtons();
    
    if (document.getElementById('watchlistContent')) {
        loadWatchlistPage();
    }
});
    buttonsContainer.appendChild(watchlistButton);
    textContentContainer.appendChild(buttonsContainer); 

    // --- END OF NEW BUTTONS CODE ---


    const closeButton = document.createElement('button');
    closeButton.className = 'close-overlay-btn';
    closeButton.innerHTML = '&times;';

        function closeOverlay() {
        overlay.classList.remove('active');
        overlay.addEventListener('transitionend', function handler() {
            if (overlay.parentNode) {
            document.body.removeChild(overlay);
            }
            overlay.removeEventListener('transitionend', handler);
        });
        document.body.style.overflow = 'auto';
        }

    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        closeOverlay();
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeOverlay();
        }
    });

    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeOverlay();
            document.removeEventListener('keydown', handleEscKey);
        }
    }
    document.addEventListener('keydown', handleEscKey);
    overlay.appendChild(bgImage);
    overlay.appendChild(textContentContainer);
    overlay.appendChild(closeButton); 

    document.body.appendChild(overlay);
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    document.body.style.overflow = 'hidden'; 
});

return card;
}

        Object.keys(categoryMovies).forEach(category => {
            const container = document.createElement('div');
            container.className = 'movie-posters category-section';
            container.id = `category-${category.toLowerCase().replace(/\s+/g, '-')}`;
            container.style.display = category === 'ALL' ? 'grid' : 'none';

            categoryMovies[category].forEach(movieInfo => {
                const card = createMovieCard(movieInfo);
                container.appendChild(card);
            });

            categoryContainers[category] = container;
        });

        if (originalMoviePostersContainer) {
            const allMoviePosters = document.querySelectorAll('.movie-posters');
            allMoviePosters.forEach(container => {
                container.remove();
            });
        }

        const movieCategories = document.querySelector('.movie-categories');
        if (movieCategories && mainSection) {
            Object.values(categoryContainers).forEach(container => {
                mainSection.insertBefore(container, movieCategories.nextSibling);
            });
        }

        categories.forEach(category => {
            category.addEventListener('click', function() {
                if (this.classList.contains('active')) return;

                const scrollPosition = window.scrollY;

                categories.forEach(cat => cat.classList.remove('active'));
                this.classList.add('active');

                const selectedCategory = this.textContent.trim();

                Object.keys(categoryContainers).forEach(category => {
                    if (categoryContainers[category].style.display !== 'none') {
                        categoryContainers[category].classList.add('fade-out');
                    }
                });

                setTimeout(() => {
                    Object.keys(categoryContainers).forEach(category => {
                        categoryContainers[category].style.display = 'none';
                        categoryContainers[category].classList.remove('fade-out');
                    });

                    if (categoryContainers[selectedCategory]) {
                        categoryContainers[selectedCategory].style.display = 'grid';
                        categoryContainers[selectedCategory].classList.add('fade-in');

                        setTimeout(() => {
                            categoryContainers[selectedCategory].classList.remove('fade-in');
                        }, 500);
                    }

                    adjustSectionHeight();
                    window.scrollTo(0, scrollPosition);
                }, 300);
            });
        });

        function adjustSectionHeight() {
            if (!mainSection) return;

            setTimeout(() => {
                const visibleContainer = Object.values(categoryContainers).find(
                    container => container.style.display !== 'none'
                );

                if (visibleContainer) {
                    const containerRect = visibleContainer.getBoundingClientRect();
                    const containerHeight = containerRect.height;

                    const topPadding = parseInt(window.getComputedStyle(mainSection).paddingTop);
                    const bottomPadding = parseInt(window.getComputedStyle(mainSection).paddingBottom);

                    const buffer = 60;

                    const categoriesNav = document.querySelector('.movie-categories');
                    const categoriesHeight = categoriesNav ? categoriesNav.getBoundingClientRect().height : 0;

                    const newHeight = topPadding + categoriesHeight + containerHeight + bottomPadding + buffer;

                    console.log("Adjusting section height to: " + newHeight + "px");
                    mainSection.style.height = newHeight + "px";

                    if (!mainSection.style.transition) {
                        mainSection.style.transition = "height 0.5s ease";
                    }
                }
            }, 200);
        }

        function applyConsistentStyling() {
            const filterButton = document.querySelector('.filter-button');
            if (filterButton) {
                filterButton.style.position = "absolute";
                filterButton.style.right = "-100px";
                filterButton.style.top = "-30px";
            }

            if (mainSection) {
                mainSection.style.backgroundImage = "url('img/bg-blue.jpg')";
                mainSection.style.backgroundSize = "cover";
                mainSection.style.backgroundPosition = "center top";
                mainSection.style.backgroundRepeat = "no-repeat";
                mainSection.style.padding = "50px 110px";
                mainSection.style.color = "#333";
                mainSection.style.textAlign = "center";
                mainSection.style.position = "relative";
            }

            Object.values(categoryContainers).forEach(container => {
                container.style.display = container.style.display;
                container.style.display = container.id === 'category-all' && !container.style.display ? 'grid' : container.style.display;
                container.style.gridTemplateColumns = "repeat(5, 1fr)";
                container.style.gap = "30px";
                container.style.padding = "20px 0 70px";
            });
        }

const filterOverlay = document.getElementById('filterOverlay');
const filterClose = document.getElementById('filterClose');
const applyFiltersBtn = document.getElementById('applyFilters');

const filterButton = document.querySelector('.filter-button');
if (filterButton) {
    filterButton.addEventListener('click', function() {
        filterOverlay.classList.toggle('active');
        filterButton.classList.toggle('active');
    });
}


if (filterClose) {
    filterClose.addEventListener('click', function() {
        filterOverlay.classList.remove('active');
        filterButton.classList.remove('active');
    });
}


document.addEventListener('click', function(e) {
    if (!filterButton.contains(e.target) && !filterOverlay.contains(e.target)) {
        filterOverlay.classList.remove('active');
        filterButton.classList.remove('active');
    }
});

if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function() {
        applyFilters();
        filterOverlay.classList.remove('active');
        filterButton.classList.remove('active');
    });
}

function applyFilters() {
    const sortBy = document.getElementById('sortBy').value;
    const minRating = parseFloat(document.getElementById('minRating').value) || 0;
    const maxRating = parseFloat(document.getElementById('maxRating').value) || 10;
    
    const selectedYears = Array.from(document.querySelectorAll('#yearFilters input:checked')).map(cb => cb.value);
    const selectedGenres = Array.from(document.querySelectorAll('#genreFilters input:checked')).map(cb => cb.value);
    const selectedCreators = Array.from(document.querySelectorAll('#creatorFilters input:checked')).map(cb => cb.value);
    
    const activeCategory = document.querySelector('.category.active').textContent.trim();
    let moviesToFilter = [...categoryMovies[activeCategory]];
    
    let filteredMovies = moviesToFilter.filter(movie => {
        const rating = parseFloat(movie.imdbRating.split('/')[0]);
        if (rating < minRating || rating > maxRating) return false;
        
        if (selectedYears.length > 0) {
            const movieYear = parseInt(movie.year);
            const yearMatch = selectedYears.some(decade => {
                const startYear = parseInt(decade.substring(0, 4));
                return movieYear >= startYear && movieYear < startYear + 10;
            });
            if (!yearMatch) return false;
        }
        
        if (selectedGenres.length > 0) {
            const movieGenres = movie.category.toLowerCase();
            const genreMatch = selectedGenres.some(genre => 
                movieGenres.includes(genre.toLowerCase())
            );
            if (!genreMatch) return false;
        }
        
        if (selectedCreators.length > 0) {
            if (!selectedCreators.includes(movie.director)) return false;
        }
        
        return true;
    });
    
    switch(sortBy) {
        case 'top-rated':
            filteredMovies.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
            break;
        case 'newest-first':
            filteredMovies.sort((a, b) => parseInt(b.year) - parseInt(a.year));
            break;
        case 'oldest-first':
            filteredMovies.sort((a, b) => parseInt(a.year) - parseInt(b.year));
            break;
        case 'a-z':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'z-a':
            filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'most-reviewed':
            filteredMovies.sort((a, b) => parseInt(b.userVotes.replace('k', '')) - parseInt(a.userVotes.replace('k', '')));
            break;
    }
    
    updateMovieDisplay(filteredMovies, activeCategory);
}

function updateMovieDisplay(movies, category) {
     const activeContainer = categoryContainers[category];
    if (activeContainer) {
        activeContainer.innerHTML = '';
        
        if (movies.length === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results-message';
            noResultsDiv.innerHTML = `
                <div class="no-results-content">
                    <h3>No Results Found</h3>
                    <p>Try adjusting your filter criteria to see more movies.</p>
                </div>
            `;
            activeContainer.appendChild(noResultsDiv);
        } else {
            movies.forEach(movieInfo => {
                const card = createMovieCard(movieInfo);
                activeContainer.appendChild(card);
            });
        }
        
        adjustSectionHeight();
    }
}

        const allCategory = document.querySelector('.category:first-child');
        if (allCategory) {
            allCategory.classList.add('active');

            setTimeout(function() {
                applyConsistentStyling();
                adjustSectionHeight();
            }, 500);
        }

        //CSS STYLING
    const style = document.createElement('style');
    style.textContent = `
        .movie-categories {
            padding-left: 20px !important;
            margin-left: 0 !important;
        }

        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }

        .fade-out {
            animation: fadeOut 0.3s ease forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        .category-section {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0px;
            width: 100%;
        }
            
        .movie-fullscreen-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9); 
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center; 
            backdrop-filter: blur(5px);
            opacity: 0;
            transform: scale(0.9); 
            visibility: hidden; 
            transition: opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0.3s;
            transition-delay: 0s, 0s, 0.3s; 
        }

        .movie-fullscreen-overlay.active {
            opacity: 1; 
            transform: scale(1); 
            visibility: visible; 
            transition-delay: 0s, 0s, 0s; 
        }

        .overlay-buttons-container {
            margin-top: 30px;
            display: flex; 
            gap: 20px;      
            justify-content: flex-start; 
            flex-wrap: wrap; 
            padding-bottom: 20px;
        }

        .overlay-button {
            background-color: #7ca454; 
            color: white;
            border: 2px solid transparent; 
            padding: 15px 35px;
            font-size: 1.1em;
            font-weight: bold;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.4s ease; 
            display: flex;
            align-items: center;
            gap: 10px; 
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
           
        }

        .overlay-button:hover {
            background-color: rgba(124, 164, 84, 0.7); 
            border-color: white; 
            color: white;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4); 
        }

        .movie-fullscreen-overlay .trailer-button {
            background-color: #7ca454; 
            color: white; 
            border: 2px solid #7ca454;
        }

        .movie-fullscreen-overlay .trailer-button:hover {
            background-color: white; 
            color: #7ca454; 
            border-color: white;
        }

        .movie-fullscreen-overlay .play-icon-circle {
            background-color: white; 
            color: #7ca454; 
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            transition: all 0.4s ease; 
            margin-left: -5px; 
        }
        .movie-fullscreen-overlay .trailer-button:hover .play-icon-circle {
            background-color: #7ca454; 
            color: white; 
        }

        .watchlist-button {
            background-color: transparent; 
            border: 2px solid white; 
            color: white; 
            padding: 0px 20px;
             margin-top: 20px; 
            font-size: 1em;
            font-weight: bold;
            border-radius: 30px; 
            cursor: pointer;
            transition: all 0.3s ease; 
            display: flex; 
            align-items: center;
            gap: 10px; 
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
        }

        .watchlist-button:hover {
            background-color: rgba(255, 255, 255, 0.2);
            border-color: white; 
            color: white;
            transform: translateY(-3px); 
        }
        .close-overlay-btn {
            position: absolute;
            top: 95px;
            left: 30px;
            background: #7ca454;
            border: none;
            color: white;
            font-size: 40px;
            width: 40px;
            height: 40px;
            border-radius: 50%; 
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 10000;
            line-height: 1;
        }

       
        .overlay-text-content p {
            margin-top: 5px;
        }
        .overlay-background {
            position: absolute;
            top: 0; 
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 100; 
            z-index: -1; 
        }

        .movie-rating-container {
        text-align: left;
        color: white;
        font-size: 0.9em;
        width: 100%;
        padding-left: 75px;
        margin-top: -50px;
        display: block;
        margin-bottom: -5px; 
    }

    .movie-user-votes {
        font-size: 0.7em; 
        color: rgba(255, 255, 255, 0.7); 
        padding-left: 75px; 
        margin-top: -5px; 
        display: block; 
    }

        .description-wrapper {
            display: flex;
            align-items: center; 
            margin-bottom: 8px;
       
        }

        .overlay-text-content {
            position: relative;
            z-index: 1;
            text-align: left;
            color: white;
            padding: 40px; 
            max-width: 800px; 
            line-height: 1.8;
            font-size: 1.2em;
            margin-right: auto; 
            margin-left: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-start; 
            
        }

        .overlay-text-content h2,
        .overlay-text-content p,
        .movie-title-display {
            text-align: left;
            width: 100%; 
        }

        .movie-title-display img {
            margin-left: 0; 
            margin-right: auto;
        }


        .overlay-text-content strong {
            color: #b3d1ff; 
        }

        nav, .navbar, header {
            z-index: 10000 !important;
        }
        .movie-category-display {
        
        font-size: 0.8em;
        color: white;
        padding-left: 140px;
        margin-top: -50px;
        margin-bottom: 13px;
        display: block;
        font-weight: normal;
        
    }     
    .howls-black-text,
    .howls-black-text h2,
    .howls-black-text p,
    .howls-black-text .movie-rating-container,
    .howls-black-text .movie-rating-text,
    .howls-black-text .movie-user-votes,
    .howls-black-text .movie-category-display {
        color: black !important;
    }

    .howls-black-text .movie-category-display span {
        color: black !important;
    }

    .howls-black-text .watchlist-button {
        color: black;
        border-color: black;
    }

    .howls-black-text .watchlist-button:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-color: black;
        color: black;
    }
.filter-container {
    position: relative;
    margin-left: auto; 
    margin-right: 120px;
}

.filter-button {
    background: #7ca454;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    align-items: left;
    gap: 8px;
}

.filter-button:hover {
    background: #38753b;
}

.filter-button .arrow {
    transition: transform 0.3s ease;
    font-size: 12px;
}

.filter-button.active .arrow {
    transform: rotate(180deg);
}

.filter-overlay {
    position: absolute;
    top: calc(100% + 150px); 
    width: 280px;
    background: #7ca454;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    max-height: 50vh;
    overflow-y: auto;
    left: 56%;
    right: auto;
    transform: translateX(-50%) translateY(-10px);
}

.filter-overlay.active {
    opacity: 1;
    visibility: visible;
     transform: translateX(-50%) translateY(0);
}

.movie-categories {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    gap: 30px;
    position: relative;
}

.filter-panel {
    background: transparent;
    border-radius: 0;
    padding: 0;
    width: 100%;
    position: relative;
}

.filter-close {
    display: none;
}

.filter-section {
    margin-bottom: 15px;
}

.filter-section h3 {
    color: white;
    margin: 0 0 12px 0;
    font-size: 1em;
    font-weight: bold;
}

.filter-dropdown {
    width: 100%;
    padding: 10px;
    background: #38753b;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 13px;
    cursor: pointer;
}

.filter-dropdown option {
    background: #38753b;
    color: white;
}

.filter-checkboxes {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 13px;
}

.checkbox-item input[type="checkbox"] {
    width: 14px;
    height: 14px;
    accent-color: #38753b;
}

.rating-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.rating-input {
    width: 50px;
    padding: 6px;
    background: #38753b;
    border: none;
    border-radius: 5px;
    color: white;
    text-align: center;
    font-size: 12px;
}

.rating-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.rating-separator {
    color: white;
    font-weight: bold;
    font-size: 12px;
}

.enter-button {
    width: 100%;
    padding: 12px;
    background: white;
    border: none;
    border-radius: 20px;
    color: #7ca454;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    margin-top: 15px;
    transition: all 0.3s ease;
}

.enter-button:hover {
    background: #f0f0f0;
    transform: translateY(-1px);
}
    .no-results-message {
    grid-column: 1 / -1; 
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    text-align: center;
}

.no-results-content {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

.no-results-content h3 {
    margin: 0 0 15px 0;
    font-size: 1.5em;
    color: #7ca454;
}

.no-results-content p {
    margin: 0;
    font-size: 1.1em;
    opacity: 0.8;
}
css/*---------------- */
.overlay-button.watchlist-button.added-to-watchlist {
    background-color: #ffffff !important; 
    color: black !important;
    border: none !important;
    border-color: transparent !important;
}

.overlay-button.watchlist-button.added-to-watchlist:hover {
    background-color: #f0f0f0 !important; 
    color: black !important;
    border: none !important;
    border-color: transparent !important;
    transform: translateY(-3px);
}

.slider-watchlist-button.added-to-watchlist {
    background-color: #ffffff !important; 
    color: black !important;
    border: none !important;
    border-color: transparent !important;
}

.slider-watchlist-button.added-to-watchlist:hover {
    background-color: #f0f0f0 !important;
    color: black !important;
    border: none !important;
    border-color: transparent !important;
    transform: translateY(-3px);
}

.watchlist-checkmark {
    color: #4CAF50 !important;
    font-weight: bold;
}

.howls-black-text .watchlist-button.added-to-watchlist {
    background-color: #ffffff !important; 
    color: black !important;
    border: none !important;
    border-color: transparent !important;
}

.howls-black-text .watchlist-button.added-to-watchlist:hover {
    background-color: #f0f0f0 !important; 
    color: black !important;
    border: none !important;
    border-color: transparent !important;
}

.howls-black-text .watchlist-button .watchlist-checkmark {
    color: #4CAF50 !important;
}

.howls-black-slider .slider-watchlist-button:not(.added-to-watchlist) {
   color: black !important;
   border: 2px solid black !important;
   background-color: transparent !important;
}

.howls-black-slider .slider-watchlist-button:not(.added-to-watchlist):hover {
   background-color: rgba(0, 0, 0, 0.1) !important;
   border: 2px solid black !important;
   color: black !important;
}

.howls-black-slider .slider-watchlist-button.added-to-watchlist {
   background-color: #ffffff !important;
   color: black !important;
   border: 2px solid black !important;
   border-color: black !important;
}

.howls-black-slider .slider-watchlist-button.added-to-watchlist:hover {
   background-color: #f0f0f0 !important;
   color: black !important;
   border: 2px solid black !important;
   border-color: black !important;
   transform: translateY(-3px);
}

.howls-black-text .watchlist-button:not(.added-to-watchlist) {
   color: black !important;
   border: 2px solid black !important;
   background-color: transparent !important;
}

.howls-black-text .watchlist-button:not(.added-to-watchlist):hover {
   background-color: rgba(0, 0, 0, 0.1) !important;
   border: 2px solid black !important;
   color: black !important;
}

.howls-black-text .watchlist-button.added-to-watchlist {
   background-color: #ffffff !important;
   color: black !important;
   border: 2px solid black !important;
   border-color: black !important;
}

.howls-black-text .watchlist-button.added-to-watchlist:hover {
   background-color: #f0f0f0 !important;
   color: black !important;
   border: 2px solid black !important;
   border-color: black !important;
   transform: translateY(-3px);
}

.howls-black-slider .slider-watchlist-button,
.howls-black-text .watchlist-button {
   border-width: 2px !important;
   border-style: solid !important;
   border-color: black !important;
}

.howls-black-slider .slider-watchlist-button .watchlist-checkmark,
.howls-black-text .watchlist-button .watchlist-checkmark {
   color: #4CAF50 !important;
}
        `;
    document.head.appendChild(style);
});

function toggleDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.classList.toggle('show');
}

window.addEventListener('click', function(event) {
  const profileSection = document.querySelector('.profile-section');
  if (!profileSection.contains(event.target)) {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.remove('show');
  }
});

window.currentUser = localStorage.getItem('currentGhibliUser') || null;
window.users = JSON.parse(localStorage.getItem('ghibliUsers')) || {};

window.currentUser = null;
window.users = {};

document.addEventListener('DOMContentLoaded', function() {
  loadUserData();
  checkLoginStatus();
  initAuthSystem();
});

function loadUserData() {
  window.users = JSON.parse(localStorage.getItem('ghibliUsers')) || {};
  window.currentUser = localStorage.getItem('currentGhibliUser') || null;
}

function initAuthSystem() {
  const authModal = document.getElementById('authModal');
  const authClose = document.querySelector('.auth-close');
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const showLogin = document.getElementById('showLogin');
  const showSignup = document.getElementById('showSignup');
  const authAction = document.getElementById('authAction');
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');

  authAction.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentUser) {
      logout();
    } else {
      showAuthModal('signup');
    }
  });

  authClose.addEventListener('click', function() {
    authModal.style.display = 'none';
  });

  authModal.addEventListener('click', function(e) {
    if (e.target === authModal) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
  });

  const authModalContent = document.querySelector('.auth-modal-content');
  if (authModalContent) {
    authModalContent.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
    });
  }

  document.addEventListener('click', function(e) {
    if (authModal.style.display === 'block') {
      if (!authModalContent.contains(e.target) && e.target !== authClose) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    }
  }, true); 

  showLogin.addEventListener('click', function(e) {
    e.preventDefault();
    switchAuthForm('login');
  });

  showSignup.addEventListener('click', function(e) {
    e.preventDefault();
    switchAuthForm('signup');
  });

  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    handleSignup();
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    handleLogin();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && authModal.style.display === 'block') {
      if (signupForm.style.display !== 'none') {
        handleSignup();
      } else {
        handleLogin();
      }
    }
  });
}

function showAuthModal(type) {
  const authModal = document.getElementById('authModal');
  authModal.style.display = 'block';
  switchAuthForm(type);
}

function switchAuthForm(type) {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  
  if (type === 'signup') {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
  } else {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  }
}

function handleSignup() {
  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!username || !password) {
    alert('Please fill in all fields');
    return;
  }

  if (username.length < 8) {
    alert('Username must be at least 8 characters long');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  if (window.users[username]) {
    alert('Username already exists!');
    return;
  }

  window.users[username] = {
    password: password,
    watchlist: [],
    avatar: 'totoro-avatar.png'
  };

  localStorage.setItem('ghibliUsers', JSON.stringify(window.users));
  loginUser(username);
  
  document.getElementById('authModal').style.display = 'none';
  alert('Account created successfully!');
}

function handleLogin() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!username || !password) {
    alert('Please fill in all fields');
    return;
  }

  if (username.length < 8 || password.length < 8) {
    alert('Username and password must be at least 8 characters long');
    return;
  }
  
  if (!window.users[username] || window.users[username].password !== password) {
    alert('Invalid username or password!');
    return;
  }

  loginUser(username);
  document.getElementById('authModal').style.display = 'none';
  alert('Logged in successfully!');
}

function loginUser(username) {
  window.currentUser = username;
  localStorage.setItem('currentGhibliUser', username);
  updateProfileDisplay();
  refreshWatchlistButtons();
}

function logout() {
  window.currentUser = null;
  localStorage.removeItem('currentGhibliUser');
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown) {
    dropdown.classList.remove('show');
  }

  updateProfileDisplay();
  refreshWatchlistButtons();
  alert('Logged out successfully!');
  
}

function checkLoginStatus() {
  const savedUser = localStorage.getItem('currentGhibliUser');
  const users = JSON.parse(localStorage.getItem('ghibliUsers')) || {};
  
  if (savedUser && users[savedUser]) {
    window.currentUser = savedUser;
    window.users = users;
    updateProfileDisplay();
  }
}

function addToWatchlist(movieTitle) {
  if (!currentUser) {
    alert('Please log in to add movies to your watchlist!');
    return;
  }
  
  if (!users[currentUser].watchlist.includes(movieTitle)) {
    users[currentUser].watchlist.push(movieTitle);
    localStorage.setItem('ghibliUsers', JSON.stringify(users));
    updateWatchlistCount();
    console.log(`"${movieTitle}" added to watchlist!`);
  }
}

function getUserWatchlist() {
  if (!currentUser) return [];
  return users[currentUser].watchlist || [];
}

function updateWatchlistCount() {
  const countElement = document.getElementById('watchlistCount');
  if (countElement) {
    const watchlist = getUserWatchlist();
    countElement.textContent = watchlist.length;
    
    if (watchlist.length === 0) {
      countElement.style.display = 'none';
    } else {
      countElement.style.display = 'flex';
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  setTimeout(() => {
    updateWatchlistCount();
  }, 100);
});

function updateProfileDisplay() {
  const profileImg = document.querySelector('.profile-img');
  const authAction = document.getElementById('authAction');

  if (currentUser) {
    profileImg.src = 'img/totoro-avatar.png';
    profileImg.classList.add('logged-in');
    authAction.textContent = 'LOGOUT';
  } else {
    profileImg.src = 'img/defaultpfp.jpg';
    profileImg.classList.remove('logged-in');
    authAction.textContent = 'SIGN UP';
  }
  
  updateWatchlistCount();
  
  refreshWatchlistButtons();
  updateSliderWatchlistButtons();
}


function closeMovieOverlay() {
  const overlay = document.querySelector('.movie-fullscreen-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.addEventListener('transitionend', function handler() {
      if (overlay.parentNode) {
        document.body.removeChild(overlay);
      }
      overlay.removeEventListener('transitionend', handler);
    });
    document.body.style.overflow = 'auto';
  }
}

function removeFromWatchlist(movieTitle) {
  if (!currentUser) return;
  
  const watchlist = users[currentUser].watchlist;
  const index = watchlist.indexOf(movieTitle);
  if (index > -1) {
    watchlist.splice(index, 1);
    localStorage.setItem('ghibliUsers', JSON.stringify(users));
    updateWatchlistCount();
    console.log(`"${movieTitle}" removed from watchlist!`);
  }
}

function refreshWatchlistButtons() {
    const watchlistButtons = document.querySelectorAll('.movie-fullscreen-overlay .watchlist-button');
    watchlistButtons.forEach(button => {
        const movieTitle = button.closest('.movie-fullscreen-overlay').querySelector('.movie-title-display img, .movie-title-display h2');
        if (movieTitle) {
            const title = movieTitle.alt || movieTitle.textContent;
            const isInWatchlist = currentUser && getUserWatchlist().includes(title);
            
            if (isInWatchlist) {
                button.innerHTML = '<i class="fas fa-check watchlist-checkmark"></i> ✓  WATCH LIST';
                button.classList.add('added-to-watchlist'); 
            } else {
                button.innerHTML = '<i class="fas fa-plus"></i> +  WATCH LIST';
                button.classList.remove('added-to-watchlist');
            }
        }
    });
}

function loadWatchlistPage() {
    const watchlistContent = document.getElementById('watchlistContent');
    if (!watchlistContent) return; 
    
    const watchlist = getUserWatchlist();
    
    if (watchlist.length === 0) {
        watchlistContent.innerHTML = `
            <div class="empty-watchlist">
                <h2>Your watchlist is empty</h2>
                <p>Start adding your favorite Ghibli movies to keep track of what you want to watch!</p>
            </div>
        `;
    } else {
        watchlistContent.innerHTML = `<div class="watchlist-grid" id="watchlistGrid"></div>`;
        const grid = document.getElementById('watchlistGrid');
        
        watchlist.forEach(movieTitle => {
            const movieData = findMovieByTitle(movieTitle);
            if (movieData) {
                const card = createWatchlistCard(movieData);
                grid.appendChild(card);
            }
        });
    }
}

function createWatchlistCard(movieInfo) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.position = 'relative'; 
    
    const img = document.createElement('img');
    img.src = `img/${movieInfo.img}`;
    img.alt = movieInfo.title;
    
    const playButton = document.createElement('div');
    playButton.className = 'play-button';

    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';

    playButton.appendChild(playIcon);
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-from-watchlist';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = function(e) {
        e.stopPropagation();
        removeFromWatchlistAndRefresh(movieInfo.title);
    };
    
    card.appendChild(img);
    card.appendChild(playButton);
    card.appendChild(removeBtn);
    
    card.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.className = 'movie-fullscreen-overlay';

        const bgImage = document.createElement('div');
        bgImage.className = 'overlay-background';
        bgImage.style.backgroundImage = `url('img/${movieInfo.bg}')`;

        const textContentContainer = document.createElement('div');
        textContentContainer.className = 'overlay-text-content';
        
        if (movieInfo.title === "Howl's Moving Castle") {
            textContentContainer.classList.add('howls-black-text');
        }
        else if (movieInfo.title === "The Tale of the Princess Kaguya") {
            textContentContainer.classList.add('howls-black-text');
        } else if (movieInfo.title === "Only Yesterday") {
            textContentContainer.classList.add('howls-black-text');
        }else if (movieInfo.title === "Ocean Waves") {
            textContentContainer.classList.add('howls-black-text');
        }else if (movieInfo.title === "My Neighbors the Yamadas") {
            textContentContainer.classList.add('howls-black-text');
        }else if (movieInfo.title === "The Cat Returns") {
            textContentContainer.classList.add('howls-black-text');
        }

        const titleElement = document.createElement('div');
        titleElement.className = 'movie-title-display';

        if (movieInfo.title === 'Spirited Away') {
            const titleImage = document.createElement('img');
            titleImage.src = 'img/spirited-away-font.png';
            titleImage.alt = movieInfo.title;
            titleImage.style.maxHeight = '200px';
            titleImage.style.width = '550px';
            titleImage.style.paddingBottom = '60px';
            titleImage.style.display = 'block';
            titleElement.appendChild(titleImage);
        } 
        else if (movieInfo.title === 'My Neighbor Totoro') {
            const titleImage = document.createElement('img');
            titleImage.src = 'img/totoro-font.png';
            titleImage.alt = movieInfo.title;
            titleImage.style.maxHeight = '280px';
            titleImage.style.width = '310px';
            titleImage.style.paddingBottom = '70px';
            titleImage.style.display = 'block';
            titleElement.appendChild(titleImage);
        } else if (movieInfo.title === 'Princess Mononoke') {
            const titleImage = document.createElement('img');
            titleImage.src = 'img/mononoke-font.png';
            titleImage.alt = movieInfo.title;
            titleImage.style.maxHeight = '400px';
            titleImage.style.width = '450px';
            titleImage.style.paddingBottom = '60px';
            titleImage.style.display = 'block';
            titleElement.appendChild(titleImage);
        } else if (movieInfo.title === 'Howl\'s Moving Castle') {
            const titleImage = document.createElement('img');
            titleImage.src = 'img/howls-font.png';
            titleImage.alt = movieInfo.title;
            titleImage.style.maxHeight = '450px';
            titleImage.style.width = '470px';
            titleImage.style.paddingBottom = '60px';
            titleImage.style.display = 'block';
            titleElement.appendChild(titleImage);
        } else if (movieInfo.title === 'Kiki\'s Delivery Service') {
            const titleImage = document.createElement('img');
            titleImage.src = 'img/kikis-font.png';
            titleImage.alt = movieInfo.title;
            titleImage.style.maxHeight = '410px';
            titleImage.style.width = '460px';
            titleImage.style.paddingBottom = '60px';
            titleImage.style.display = 'block';
            titleElement.appendChild(titleImage);
        }else if (movieInfo.title === 'The Tale of the Princess Kaguya') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/kaguya-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '470px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Nausicaä of the Valley of the Wind') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/nausicaa-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '470px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Castle in the Sky') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/laputa-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '400px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Ponyo') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/ponyo-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '400px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'The Wind Rises') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/the-wind-rises-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '850px';
                titleImage.style.width = '500px';
                titleImage.style.paddingBottom = '70px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Grave of the Fireflies') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/grave-of-fireflies-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '380px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';

                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Only Yesterday') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/only-yesterday-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '400px';
                titleImage.style.paddingBottom = '40px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }  else if (movieInfo.title === 'Porco Rosso') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/porco-rosso-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Ocean Waves') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/ocean-waves-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Pom Poko') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/pompoko-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Whisper of the Heart') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/whisper-of-the-heart-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '350px';
                titleImage.style.paddingBottom = '55px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'My Neighbors the Yamadas') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/yamadas-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '480px';
                titleImage.style.width = '460px';
                titleImage.style.paddingBottom = '70px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'The Cat Returns') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/the-cat-returns-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '330px';
                titleImage.style.width = '380px';
                titleImage.style.paddingBottom = '70px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'The Secret World of Arrietty') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/arrietyy-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '380px';
                titleImage.style.width = '380px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'Tales from Earthsea') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/earthsea-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '320px';
                titleImage.style.width = '340px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'From Up on Poppy Hill') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/poppy-hill-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '550px';
                titleImage.style.width = '450px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'When Marnie Was There') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/marnie-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '550px';
                titleImage.style.width = '450px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'Earwig and the Witch') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/earwig-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '390px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            }else if (movieInfo.title === 'The Boy and the Heron') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/the-boy-heron-font.png';
                titleImage.alt = movieInfo.title;

                titleImage.style.maxHeight = '500px';
                titleImage.style.width = '430px';
                titleImage.style.paddingBottom = '60px';

                titleImage.style.display = 'block';


                titleElement.appendChild(titleImage);
            } else {
            const titleText = document.createElement('h2');
            titleText.textContent = movieInfo.title;
            titleElement.appendChild(titleText);
        }
        textContentContainer.appendChild(titleElement);

        const imdbLogo = document.createElement('img');
        imdbLogo.src = 'img/imdb-logo.png';
        imdbLogo.alt = 'IMDb Logo';
        imdbLogo.style.width = '60px';
        imdbLogo.style.marginTop = '-170px';
        imdbLogo.style.marginRight = '-53px';

        const ratingDisplayContainer = document.createElement('div');
        ratingDisplayContainer.className = 'movie-rating-container';

        if (movieInfo.imdbRating) {
            const ratingTextSpan = document.createElement('span');
            ratingTextSpan.className = 'movie-rating-text';

            const [ratingValue, totalScale] = movieInfo.imdbRating.split('/');

            const ratingValueBold = document.createElement('span');
            ratingValueBold.textContent = ratingValue;
            ratingValueBold.style.fontWeight = 'bold';

            const totalScaleNormal = document.createElement('span');
            totalScaleNormal.textContent = `/${totalScale}`;

            ratingTextSpan.appendChild(ratingValueBold);
            ratingTextSpan.appendChild(totalScaleNormal);
            ratingDisplayContainer.appendChild(ratingTextSpan);
        }

        const userVotesElement = document.createElement('div');
        userVotesElement.className = 'movie-user-votes';
        if (movieInfo.userVotes) {
            userVotesElement.textContent = `(${movieInfo.userVotes} votes)`;
        }

        if (movieInfo.imdbRating) {
            textContentContainer.appendChild(ratingDisplayContainer);
        }
        textContentContainer.appendChild(userVotesElement);

        const categoryElement = document.createElement('div');
        categoryElement.className = 'movie-category-display';
        if (movieInfo.category) {
            const categoryParts = movieInfo.category.split('|');
            
            if (categoryParts.length > 1) {
                const firstPart = document.createElement('span');
                firstPart.textContent = categoryParts[0];
                
                const separator = document.createElement('span');
                separator.textContent = '|';
                separator.style.fontWeight = 'bold';
                separator.style.fontSize = '1.6em';
                separator.style.color = 'white';
                separator.style.margin = ' 0 30px';
                
                const secondPart = document.createElement('span');
                secondPart.textContent = categoryParts[1];
                
                categoryElement.appendChild(firstPart);
                categoryElement.appendChild(separator);
                categoryElement.appendChild(secondPart);
            } else {
                categoryElement.textContent = movieInfo.category;
            }
        }

        textContentContainer.appendChild(categoryElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = movieInfo.description;

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.style.display = 'flex';
        descriptionWrapper.style.alignItems = 'center';
        descriptionWrapper.appendChild(imdbLogo);
        descriptionWrapper.appendChild(descriptionElement);
        textContentContainer.appendChild(descriptionWrapper);
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'overlay-buttons-container';
        const trailerButton = document.createElement('button');
        trailerButton.className = 'overlay-button trailer-button';

        const playIconCircle = document.createElement('span');
        playIconCircle.className = 'play-icon-circle';
        playIconCircle.innerHTML = '▶';

        const buttonText = document.createElement('span');
        buttonText.textContent = 'TRAILER';

        trailerButton.appendChild(playIconCircle);
        trailerButton.appendChild(buttonText);

        trailerButton.addEventListener('click', function() {
            if (movieInfo.trailerUrl) {
                window.open(movieInfo.trailerUrl, '_blank');
            }
        });
        buttonsContainer.appendChild(trailerButton);

        const watchlistButton = document.createElement('button');
        watchlistButton.className = 'overlay-button watchlist-button';

        updateWatchlistButtonState(watchlistButton, movieInfo.title);

        watchlistButton.addEventListener('click', function() {
    if (!currentUser) {
        closeOverlay();
        setTimeout(() => {
        showAuthModal('signup');
        }, 300);
        return;
    }
    
    if (getUserWatchlist().includes(movieInfo.title)) {
        removeFromWatchlist(movieInfo.title);
        loadWatchlistPage();
    } else {
        addToWatchlist(movieInfo.title);
    }
    
    updateWatchlistButtonState(watchlistButton, movieInfo.title);
    
    updateSliderWatchlistButtons();
    updateMovieCardWatchlistButtons();
    
    if (document.getElementById('watchlistContent')) {
        loadWatchlistPage();
    }
});
        buttonsContainer.appendChild(watchlistButton);
        textContentContainer.appendChild(buttonsContainer);

        const closeButton = document.createElement('button');
        closeButton.className = 'close-overlay-btn';
        closeButton.innerHTML = '&times;';

        function closeOverlay() {
            overlay.classList.remove('active');
            overlay.addEventListener('transitionend', function handler() {
                if (overlay.parentNode) {
                document.body.removeChild(overlay);
                }
                overlay.removeEventListener('transitionend', handler);
            });
            document.body.style.overflow = 'auto';
        }

        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            closeOverlay();
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        function handleEscKey(e) {
            if (e.key === 'Escape') {
                closeOverlay();
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        document.addEventListener('keydown', handleEscKey);

        overlay.appendChild(bgImage);
        overlay.appendChild(textContentContainer);
        overlay.appendChild(closeButton);

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden';
    });
    
    return card;
}

function removeFromWatchlistAndRefresh(movieTitle) {
    if (!currentUser) return;
    
    const watchlist = users[currentUser].watchlist;
    const index = watchlist.indexOf(movieTitle);
    if (index > -1) {
        watchlist.splice(index, 1);
        localStorage.setItem('ghibliUsers', JSON.stringify(users));
        updateWatchlistCount();
        loadWatchlistPage(); 
    }
}

function findMovieByTitle(title) {
    for (const category in categoryMovies) {
        const movie = categoryMovies[category].find(m => m.title === title);
        if (movie) return movie;
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('watchlistContent')) {
        loadWatchlistPage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

 let currentSlideIndex = 0;
        const slidesContainer = document.getElementById('heroSlidesContainer');
        const dots = document.querySelectorAll('.hero-dot');
        const totalSlides = 5;
        
    let isFirstLoad = true;
    let isSliderTransitioning = false;
    let transitionTimeout = null;
    const TRANSITION_DURATION = 1000; 

function showSlide(index, skipTransition = false) {
    if (isSliderTransitioning && !skipTransition) {
        return; 
    }
    
    if (!skipTransition) {
        isSliderTransitioning = true;
    }
    
    if (transitionTimeout) {
        clearTimeout(transitionTimeout);
    }
    
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider && !skipTransition) {
        heroSlider.classList.add('transitioning');
        setTimeout(() => {
            heroSlider.classList.remove('transitioning');
        }, 300);
    }
    
    if (skipTransition && slidesContainer) {
        slidesContainer.style.transition = 'none';
    }
    
    const translateX = -index * 20;
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(${translateX}%)`;
    }
    
    if (skipTransition && slidesContainer) {
        slidesContainer.offsetHeight;
        setTimeout(() => {
            slidesContainer.style.transition = '0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
    }
    
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    const allSlides = document.querySelectorAll('.hero-slide');
    allSlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    const titleOverlays = document.querySelectorAll('.hero-title-overlay');
    const movieInfoOverlays = document.querySelectorAll('.slider-movie-info');
    const descriptionOverlays = document.querySelectorAll('.slider-description');
    const buttonOverlays = document.querySelectorAll('.slider-buttons');
    
    titleOverlays.forEach(overlay => {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });
    movieInfoOverlays.forEach(overlay => {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });
    descriptionOverlays.forEach(overlay => {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });
    buttonOverlays.forEach(overlay => {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });
    
    const baseDelay = skipTransition ? 0 : 200;
    const titleDelay = skipTransition ? 0 : 300;
    const infoDelay = skipTransition ? 0 : 450;
    const descDelay = skipTransition ? 0 : 600;
    const buttonDelay = skipTransition ? 0 : 750;
    
    setTimeout(() => {
        const currentTitle = document.querySelector(`.hero-title-overlay[data-slide="${index}"]`);
        if (currentTitle) {
            currentTitle.style.opacity = '';
            currentTitle.style.visibility = '';
            currentTitle.classList.add('active');
        }
    }, titleDelay);
    
    setTimeout(() => {
        const currentMovieInfo = document.querySelector(`.slider-movie-info[data-slide="${index}"]`);
        if (currentMovieInfo) {
            currentMovieInfo.style.opacity = '';
            currentMovieInfo.style.visibility = '';
            currentMovieInfo.classList.add('active');
        }
    }, infoDelay);
    
    setTimeout(() => {
        const currentDescription = document.querySelector(`.slider-description[data-slide="${index}"]`);
        if (currentDescription) {
            currentDescription.style.opacity = '';
            currentDescription.style.visibility = '';
            currentDescription.classList.add('active');
        }
    }, descDelay);
    
    setTimeout(() => {
        const currentButtons = document.querySelector(`.slider-buttons[data-slide="${index}"]`);
        if (currentButtons) {
            currentButtons.style.opacity = '';
            currentButtons.style.visibility = '';
            currentButtons.classList.add('active');
        }
    }, buttonDelay);
    
    currentSlideIndex = index;
    if (!skipTransition) {
        transitionTimeout = setTimeout(() => {
            isSliderTransitioning = false;
        }, TRANSITION_DURATION);
    }
    if (isFirstLoad) {
        isFirstLoad = false;
    }
}

function openTrailer(url) {
    window.open(url, '_blank');
}
function toggleSliderWatchlist(movieTitle, button) {
    if (!currentUser) {
        showAuthModal('signup');
        return;
    }
    
    const actualMovieTitle = sliderMovieMapping[movieTitle] || movieTitle;
    
    const watchlist = getUserWatchlist();
    if (watchlist.includes(actualMovieTitle)) {
        removeFromWatchlist(actualMovieTitle);
        button.innerHTML = '<i class="fas fa-plus"></i> + WATCH LIST';
        button.classList.remove('added-to-watchlist');
    } else {
        addToWatchlist(actualMovieTitle);
        button.innerHTML = '<i class="fas fa-check watchlist-checkmark"></i> ✓ WATCH LIST';
        button.classList.add('added-to-watchlist'); 
    }
    
    updateSliderWatchlistButtons();
    refreshWatchlistButtons();
    updateMovieCardWatchlistButtons();
    
    if (document.getElementById('watchlistContent')) {
        loadWatchlistPage();
    }
}

function updateMovieCardWatchlistButtons() {
    const overlayWatchlistButtons = document.querySelectorAll('.movie-fullscreen-overlay .watchlist-button');
    overlayWatchlistButtons.forEach(button => {
        const overlay = button.closest('.movie-fullscreen-overlay');
        const titleElement = overlay.querySelector('.movie-title-display img, .movie-title-display h2');
        if (titleElement) {
            const movieTitle = titleElement.alt || titleElement.textContent;
            updateWatchlistButtonState(button, movieTitle);
        }
    });
}

function updateSliderWatchlistButtons() {
    const sliderWatchlistButtons = document.querySelectorAll('.slider-watchlist-button');
    sliderWatchlistButtons.forEach(button => {
        const sliderMovieTitle = button.getAttribute('data-movie');
        if (sliderMovieTitle) {
            const actualMovieTitle = sliderMovieMapping[sliderMovieTitle] || sliderMovieTitle;
            
            if (currentUser && isMovieInWatchlist(actualMovieTitle)) {
                button.innerHTML = '<i class="fas fa-check watchlist-checkmark"></i> ✓ WATCH LIST';
                button.classList.add('added-to-watchlist');
            } else {
                button.innerHTML = '<i class="fas fa-plus"></i> + WATCH LIST';
                button.classList.remove('added-to-watchlist');
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const firstSlide = document.querySelector('.hero-slide');
    if (firstSlide) firstSlide.classList.add('active');
    
    const firstMovieInfo = document.querySelector('.slider-movie-info');
    if (firstMovieInfo) firstMovieInfo.classList.add('active');
    
    const firstDescription = document.querySelector('.slider-description');
    if (firstDescription) firstDescription.classList.add('active');
    
    const firstButtons = document.querySelector('.slider-buttons');
    if (firstButtons) firstButtons.classList.add('active');
    
    document.querySelectorAll('.slider-trailer-button').forEach(button => {
        button.addEventListener('click', function() {
            const trailerUrl = this.getAttribute('data-trailer');
            window.open(trailerUrl, '_blank');
        });
    });
    
    document.querySelectorAll('.slider-watchlist-button').forEach(button => {
        button.addEventListener('click', function() {
            const movieTitle = this.getAttribute('data-movie');
            toggleSliderWatchlist(movieTitle, this);
        });
    });
    
    showSlide(0, true); 
    startAutoSlide();
    
    setTimeout(() => {
        updateSliderWatchlistButtons();
    }, 500);
});

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

function startAutoSlide() {
    setInterval(() => {
        nextSlide();
    }, 6000); 
}

function initializeSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    const searchIcon = document.getElementById('searchIcon');
    
    if (!searchBar || !searchResults) {
        console.log('Search elements not found');
        return;
    }

    let searchTimeout;

    searchBar.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length === 0) {
            hideSearchResults();
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

   
    searchIcon.addEventListener('click', function() {
        const query = searchBar.value.trim();
        if (query.length > 0) {
            performSearch(query);
        }
    });

    searchBar.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        }
    });

    document.addEventListener('click', function(e) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            hideSearchResults();
        }
    });
}

function performSearch(query) {
    console.log('Searching for:', query);
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    const allMovies = getAllMovies();
    console.log('Total movies found:', allMovies.length); 
    
    const filteredMovies = allMovies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(query.toLowerCase());
        const directorMatch = movie.director && movie.director.toLowerCase().includes(query.toLowerCase());
        const yearMatch = movie.year && movie.year.includes(query);
        const categoryMatch = movie.category && movie.category.toLowerCase().includes(query.toLowerCase());
        
        return titleMatch || directorMatch || yearMatch || categoryMatch;
    });

    console.log('Filtered movies:', filteredMovies.length); 
    displaySearchResults(filteredMovies, query);
}

function getAllMovies() {
    if (typeof categoryMovies === 'undefined') {
        console.error('categoryMovies not found - make sure it is defined globally');
        return [];
    }
    
    const allMovies = [];
    const seenTitles = new Set();
    
    for (const category in categoryMovies) {
        if (categoryMovies[category] && Array.isArray(categoryMovies[category])) {
            categoryMovies[category].forEach(movie => {
                if (!seenTitles.has(movie.title)) {
                    seenTitles.add(movie.title);
                    allMovies.push(movie);
                }
            });
        }
    }
    
    return allMovies;
}

function displaySearchResults(movies, query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (movies.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                No results found for "${query}"
            </div>
        `;
    } else {
        searchResults.innerHTML = movies.map(movie => `
            <div class="search-result-item" onclick="openMovieFromSearch('${movie.title.replace(/'/g, "\\'")}')">
                <img src="img/${movie.img}" alt="${movie.title}" class="search-result-poster" onerror="this.src='img/placeholder.jpg'">
                <div class="search-result-info">
                    <div class="search-result-title">${movie.title}</div>
                    <div class="search-result-year">${movie.year}</div>
                    <div class="search-result-category">${movie.category ? movie.category.split('·')[1]?.trim() || movie.category.replace(/\|/g, '').replace(/ㅤ/g, '').replace(/\d{4}\s*·\s*/, '').trim() : ''}</div>
                </div>
            </div>
        `).join('');
    }

    showSearchResults();
}

function showSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.classList.add('show');
    }
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.classList.remove('show');
    }
}

function openMovieFromSearch(movieTitle) {
    console.log('Opening movie:', movieTitle);
    hideSearchResults();
    document.getElementById('searchBar').value = '';
    
    const existingOverlay = document.querySelector('.movie-fullscreen-overlay');
    if (existingOverlay) {
        existingOverlay.classList.remove('active');
        setTimeout(() => {
            if (existingOverlay.parentNode) {
                document.body.removeChild(existingOverlay);
            }
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    setTimeout(() => {
        const allMovies = getAllMovies();
        const movieInfo = allMovies.find(movie => movie.title === movieTitle);
        
        if (movieInfo) {
            console.log('Movie found:', movieInfo);
            const overlay = document.createElement('div');
            overlay.className = 'movie-fullscreen-overlay';

            const bgImage = document.createElement('div');
            bgImage.className = 'overlay-background';
            bgImage.style.backgroundImage = `url('img/${movieInfo.bg}')`;

            const textContentContainer = document.createElement('div');
            textContentContainer.className = 'overlay-text-content';
            
            if (movieInfo.title === "Howl's Moving Castle" || 
                movieInfo.title === "The Tale of the Princess Kaguya" || 
                movieInfo.title === "Only Yesterday" ||
                movieInfo.title === "Ocean Waves" ||
                movieInfo.title === "My Neighbors the Yamadas" ||
                movieInfo.title === "The Cat Returns") {
                textContentContainer.classList.add('howls-black-text');
            }

            const titleElement = document.createElement('div');
            titleElement.className = 'movie-title-display';

            if (movieInfo.title === 'Spirited Away') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/spirited-away-font.png';
                titleImage.alt = movieInfo.title;
                titleImage.style.maxHeight = '200px';
                titleImage.style.width = '550px';
                titleImage.style.paddingBottom = '60px';
                titleImage.style.display = 'block';
                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'My Neighbor Totoro') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/totoro-font.png';
                titleImage.alt = movieInfo.title;
                titleImage.style.maxHeight = '280px';
                titleImage.style.width = '310px';
                titleImage.style.paddingBottom = '70px';
                titleImage.style.display = 'block';
                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Princess Mononoke') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/mononoke-font.png';
                titleImage.alt = movieInfo.title;
                titleImage.style.maxHeight = '400px';
                titleImage.style.width = '450px';
                titleImage.style.paddingBottom = '60px';
                titleImage.style.display = 'block';
                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Howl\'s Moving Castle') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/howls-font.png';
                titleImage.alt = movieInfo.title;
                titleImage.style.maxHeight = '450px';
                titleImage.style.width = '470px';
                titleImage.style.paddingBottom = '60px';
                titleImage.style.display = 'block';
                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'Kiki\'s Delivery Service') {
                const titleImage = document.createElement('img');
                titleImage.src = 'img/kikis-font.png';
                titleImage.alt = movieInfo.title;
                titleImage.style.maxHeight = '410px';
                titleImage.style.width = '460px';
                titleImage.style.paddingBottom = '60px';
                titleImage.style.display = 'block';
                titleElement.appendChild(titleImage);
            } else if (movieInfo.title === 'The Tale of the Princess Kaguya') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/kaguya-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '450px';
                    titleImage.style.width = '470px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Nausicaä of the Valley of the Wind') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/nausicaa-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '450px';
                    titleImage.style.width = '470px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Castle in the Sky') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/laputa-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '450px';
                    titleImage.style.width = '400px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Ponyo') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/ponyo-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '450px';
                    titleImage.style.width = '400px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'The Wind Rises') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/the-wind-rises-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '850px';
                    titleImage.style.width = '500px';
                    titleImage.style.paddingBottom = '70px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Grave of the Fireflies') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/grave-of-fireflies-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '400px';
                    titleImage.style.width = '380px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Only Yesterday') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/only-yesterday-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '450px';
                    titleImage.style.width = '400px';
                    titleImage.style.paddingBottom = '40px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }  else if (movieInfo.title === 'Porco Rosso') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/porco-rosso-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '400px';
                    titleImage.style.width = '350px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Ocean Waves') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/ocean-waves-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '400px';
                    titleImage.style.width = '350px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Pom Poko') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/pompoko-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '400px';
                    titleImage.style.width = '350px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                } else if (movieInfo.title === 'Whisper of the Heart') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/whisper-of-the-heart-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '400px';
                    titleImage.style.width = '350px';
                    titleImage.style.paddingBottom = '55px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'My Neighbors the Yamadas') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/yamadas-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '480px';
                    titleImage.style.width = '460px';
                    titleImage.style.paddingBottom = '70px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'The Cat Returns') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/the-cat-returns-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '330px';
                    titleImage.style.width = '380px';
                    titleImage.style.paddingBottom = '70px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'The Secret World of Arrietty') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/arrietyy-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '380px';
                    titleImage.style.width = '380px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'Tales from Earthsea') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/earthsea-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '320px';
                    titleImage.style.width = '340px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'From Up on Poppy Hill') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/poppy-hill-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '550px';
                    titleImage.style.width = '450px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'When Marnie Was There') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/marnie-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '550px';
                    titleImage.style.width = '450px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'Earwig and the Witch') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/earwig-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '450px';
                    titleImage.style.width = '390px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else if (movieInfo.title === 'The Boy and the Heron') {
                    const titleImage = document.createElement('img');
                    titleImage.src = 'img/the-boy-heron-font.png';
                    titleImage.alt = movieInfo.title;
                    titleImage.style.maxHeight = '500px';
                    titleImage.style.width = '430px';
                    titleImage.style.paddingBottom = '60px';
                    titleImage.style.display = 'block';
                    titleElement.appendChild(titleImage);
                }else {
                const titleText = document.createElement('h2');
                titleText.textContent = movieInfo.title;
                titleElement.appendChild(titleText);
            }
            textContentContainer.appendChild(titleElement);

            const imdbLogo = document.createElement('img');
            imdbLogo.src = 'img/imdb-logo.png';
            imdbLogo.alt = 'IMDb Logo';
            imdbLogo.style.width = '60px';
            imdbLogo.style.marginTop = '-170px';
            imdbLogo.style.marginRight = '-53px';

            if (movieInfo.imdbRating) {
                const ratingDisplayContainer = document.createElement('div');
                ratingDisplayContainer.className = 'movie-rating-container';
                
                const ratingTextSpan = document.createElement('span');
                ratingTextSpan.className = 'movie-rating-text';
                const [ratingValue, totalScale] = movieInfo.imdbRating.split('/');
                const ratingValueBold = document.createElement('span');
                ratingValueBold.textContent = ratingValue;
                ratingValueBold.style.fontWeight = 'bold';
                const totalScaleNormal = document.createElement('span');
                totalScaleNormal.textContent = `/${totalScale}`;
                ratingTextSpan.appendChild(ratingValueBold);
                ratingTextSpan.appendChild(totalScaleNormal);
                ratingDisplayContainer.appendChild(ratingTextSpan);
                textContentContainer.appendChild(ratingDisplayContainer);
            }

            const userVotesElement = document.createElement('div');
            userVotesElement.className = 'movie-user-votes';
            if (movieInfo.userVotes) {
                userVotesElement.textContent = `(${movieInfo.userVotes} votes)`;
            }
            textContentContainer.appendChild(userVotesElement);

            // Category
            const categoryElement = document.createElement('div');
            categoryElement.className = 'movie-category-display';
            if (movieInfo.category) {
                const categoryParts = movieInfo.category.split('|');
                if (categoryParts.length > 1) {
                    const firstPart = document.createElement('span');
                    firstPart.textContent = categoryParts[0];
                    const separator = document.createElement('span');
                    separator.textContent = '|';
                    separator.style.fontWeight = 'bold';
                    separator.style.fontSize = '1.6em';
                    separator.style.color = 'white';
                    separator.style.margin = ' 0 30px';
                    const secondPart = document.createElement('span');
                    secondPart.textContent = categoryParts[1];
                    categoryElement.appendChild(firstPart);
                    categoryElement.appendChild(separator);
                    categoryElement.appendChild(secondPart);
                } else {
                    categoryElement.textContent = movieInfo.category;
                }
            }
            textContentContainer.appendChild(categoryElement);

            // Description
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = movieInfo.description;
            const descriptionWrapper = document.createElement('div');
            descriptionWrapper.style.display = 'flex';
            descriptionWrapper.style.alignItems = 'center';
            descriptionWrapper.appendChild(imdbLogo);
            descriptionWrapper.appendChild(descriptionElement);
            textContentContainer.appendChild(descriptionWrapper);

            // Buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'overlay-buttons-container';

            // Trailer Button
            const trailerButton = document.createElement('button');
            trailerButton.className = 'overlay-button trailer-button';
            const playIconCircle = document.createElement('span');
            playIconCircle.className = 'play-icon-circle';
            playIconCircle.innerHTML = '▶';
            const buttonText = document.createElement('span');
            buttonText.textContent = 'TRAILER';
            trailerButton.appendChild(playIconCircle);
            trailerButton.appendChild(buttonText);
            trailerButton.addEventListener('click', function() {
                if (movieInfo.trailerUrl) {
                    window.open(movieInfo.trailerUrl, '_blank');
                }
            });
            buttonsContainer.appendChild(trailerButton);

            // Watchlist Button
            const watchlistButton = document.createElement('button');
            watchlistButton.className = 'overlay-button watchlist-button';
            updateWatchlistButtonState(watchlistButton, movieInfo.title);
            watchlistButton.addEventListener('click', function() {
                if (!currentUser) {
                    closeOverlay();
                    setTimeout(() => {
                        showAuthModal('signup');
                    }, 300);
                    return;
                }
                
                if (isMovieInWatchlist(movieInfo.title)) {
                    removeFromWatchlist(movieInfo.title);
                } else {
                    addToWatchlist(movieInfo.title);
                }
                
                updateWatchlistButtonState(watchlistButton, movieInfo.title);
                updateSliderWatchlistButtons();
                updateMovieCardWatchlistButtons();
                
                if (document.getElementById('watchlistContent')) {
                    loadWatchlistPage();
                }
            });
            buttonsContainer.appendChild(watchlistButton);
            textContentContainer.appendChild(buttonsContainer);

            // Close button
            const closeButton = document.createElement('button');
            closeButton.className = 'close-overlay-btn';
            closeButton.innerHTML = '&times;';

            function closeOverlay() {
                overlay.classList.remove('active');
                overlay.addEventListener('transitionend', function handler() {
                    if (overlay.parentNode) {
                        document.body.removeChild(overlay);
                    }
                    overlay.removeEventListener('transitionend', handler);
                });
                document.body.style.overflow = 'auto';
            }

            closeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                closeOverlay();
            });

            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeOverlay();
                }
            });

            function handleEscKey(e) {
                if (e.key === 'Escape') {
                    closeOverlay();
                    document.removeEventListener('keydown', handleEscKey);
                }
            }
            document.addEventListener('keydown', handleEscKey);

            overlay.appendChild(bgImage);
            overlay.appendChild(textContentContainer);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);

            document.body.style.overflow = 'hidden';
            
        } else {
            console.error('Movie not found in data');
        }
    }, 350); 
}

window.performSearch = performSearch;
window.openMovieFromSearch = openMovieFromSearch;
window.hideSearchResults = hideSearchResults;
window.initializeSearch = initializeSearch;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeSearch();
    }, 500);
});
window.handleSignup = handleSignup;
window.handleLogin = handleLogin;
window.logout = logout;
window.loginUser = loginUser;
window.checkLoginStatus = checkLoginStatus;
window.updateProfileDisplay = updateProfileDisplay;
window.getUserWatchlist = getUserWatchlist;
window.addToWatchlist = addToWatchlist;
window.removeFromWatchlist = removeFromWatchlist;