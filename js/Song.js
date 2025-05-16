class Song {
    constructor(name, author, album, duration, releaseYear, releaseMonth) {
        this.name = name;
        this.author = author;
        this.album = album;
        this.duration = duration;
        this.release = {
            year: releaseYear,
            month: releaseMonth
        };
    }

    /**
     * Create a song class from a generic object.
     * 
     * @param { Object } obj 
     */
    static fromObj(obj) {
        return new Song(obj.name, obj.author, obj.album, obj.duration, obj.release?.year, obj.release?.month);
    }

    formatDuration() {
        const seconds = this.duration%60;
        const minutes = Math.floor(this.duration/60);

        return `${minutes}m ${seconds}s`;
    }

    formatRelease() {
        const date = new Date();
        date.setFullYear(this.release.year);
        if (this.release.month) date.setMonth(this.release.month-1);

        return date.toLocaleString("en-AU", {
            year: "numeric",
            month: "long"
        });
    }
}