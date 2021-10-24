export type AppParamList = {
    Tab: undefined;
    Home: undefined;
    Track: {
        trackId: number;
        albumId: number;
        artistId: number;
        title: string;
    }
    Artists: undefined;
    Artist: {
        artistId: number;
    }
    Search: undefined;
    Albums: undefined;
    Album:  {
        albumId: number;
    }
};

export interface Album {
    album: string,
    id_album: number,
    cover: string,
    api_album: string,
    api_tracks: string
}

export interface Track {
    id_track: number;
    track: string;
    album: string;
    bpm: number;
    api_track: string;
    api_lyrics: string;
    artist: string;
    haslyrics: boolean;
}

export interface Artist {
    id_artist: number,
    artist: string,
    cover: string,
}

export interface TrackLyrics {
    artist: string;
    id_artist: number;
    track: string;
    id_track: number;
    id_album: number;
    album: string;
    lyrics: string;
    api_artist: string;
    api_albums: string;
    api_album: string;
    api_tracks: string;
    api_track: string;
    api_lyrics: string;
    lang: string;
    copyright_label: string;
    copyright_notice: string;
    copyright_text: string;
}