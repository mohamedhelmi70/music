export type AppParamList = {
    Tab: undefined;
    Home: undefined;
    Track: {
        trackId: number;
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
    bpm: number;
    api_track: string;
    api_lyrics: string;
    artist: string;
}

export interface Artist {
    id_artist: number,
    artist: string,
    cover: string,
}