
document.getElementById('searchButton').addEventListener('click',function(){
    const searchInput = document.getElementById('searchInput').value;
    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
    .then(res => res.json())
    .then(data =>{
        const bigData = data.data;
        const bigDataSlice = bigData.slice(0,5);
        const suggestSong = document.getElementById('suggestSong');
        for (let i = 0; i < bigDataSlice.length; i++) {
            const singleData = bigDataSlice[i];
            const songTitle = singleData.title;
            // console.log(songTitle)
            const songArtist = singleData.artist.name;
            // console.log(songArtist)
            const createTag = document.createElement('p');
            createTag.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${songTitle}</h3>
                        <p class="author lead">Album by <span>${songArtist}</span></p>
                    </div>

                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getSongLyrics('${songArtist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
            `
            suggestSong.appendChild(createTag);
        }
        
    })
})


{/* <p class="author lead"><strong>${songTitle}</strong> Album by <span>${songArtist}</span> <button onclick="getSongLyrics('${songArtist}','${songTitle}')" class="btn btn-success">Get Lyrics</button></p> */}

function getSongLyrics (artist , title){
    document.getElementById('lyricsTitle').innerText=`${title} - ${artist}`
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics ;
        console.log(lyrics);
        document.getElementById('songLyrics').innerText=lyrics;
    })
}
// getSongLyrics('Quality Control','Baby');
