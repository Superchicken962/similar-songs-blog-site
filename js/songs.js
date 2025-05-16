const messageBox = document.querySelector(".messageDisplay");

async function loadData() {
    const reqSongs = await fetch("songs.json");
    const reqComparisons = await fetch("comparisons.json");
    let songs;
    let comparisons;

    try {
        songs = await reqSongs.json();
        comparisons = await reqComparisons.json();
    } catch (error) {
        messageBox.setMessage("Oops! There was an error loading the data!", "error");
        console.warn(error);
        return;
    }

    if (comparisons.length === 0) {
        messageBox.setMessage("Oops! There were no songs found!", "warning");
        return;
    }

    const songsContainer = document.querySelector(".songs");

    for (const comparison of comparisons) {
        const { songA: songA_, songB: songB_, description } = comparison;

        const times = {
            songA: {
                start: songA_.startAt,
                end: songA_.endAt
            },

            songB: {
                start: songB_.startAt,
                end: songB_.endAt
            }
        };

        const findSongA = songs.find(s => s.id === songA_.id);
        const findSongB = songs.find(s => s.id === songB_.id);

        if (!findSongA || !findSongB) continue;

        const songA = Song.fromObj(findSongA);
        const songB = Song.fromObj(findSongB);

        const element = buildComparisonElement(songA, songB, { times, description });

        songsContainer.appendChild(element);
    }
}

/**
 * 
 * @param { Song } songA 
 * @param { Song } songB 
 * @param { Object } info 
 * @returns { HTMLElement }
 */
function buildComparisonElement(songA, songB, info) {
    console.log(songA);
    console.log(songB);

    const element = document.createElement("div");
    element.className = "songComparison";

    element.innerHTML = `
        <div class="first song">
            <h3>${songA.author} - ${songA.name}</h3>
            <p class="release">${songA.formatRelease()}</p>
            <p class="duration">${songA.formatDuration()}</p>
        </div>

        <div class="second song">
            <h3>${songB.author} - ${songB.name}</h3>
            <p class="release">${songB.formatRelease()}</p>
            <p class="duration">${songB.formatDuration()}</p>
        </div>

        <div class="details">
            <p class="description">${info.description}</p>
        </div>
    `;

    return element;
}

loadData();