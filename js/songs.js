const messageBox = document.querySelector(".messageDisplay");

async function loadData() {
    // Ensure we don't get the cached versions of the files.
    const reqSongs = await fetch("songs.json", { cache: "no-cache" });
    const reqComparisons = await fetch("comparisons.json", { cache: "no-cache" });
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

    const songsContainer = document.querySelector(".songComparisonContainer");

    for (const comparison of comparisons) {
        const { songA: songA_, songB: songB_, description, similarity } = comparison;

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

        const element = buildComparisonElement(songA, songB, { times, description, similarity });

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

            <div class="similarity">
                Similarity:     
                <div class="similarityBar"><div class="bar" style="width:${info.similarity}%;"></div></div>
                ${info.similarity}%
            </div>
        </div>
    `;

    return element;
}

loadData();