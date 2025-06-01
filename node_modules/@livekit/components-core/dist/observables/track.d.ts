import type { Participant, Room, Track, TrackPublication } from 'livekit-client';
import { RoomEvent, TrackEvent } from 'livekit-client';
import { Observable } from 'rxjs';
import type { TrackReference } from '../track-reference';
export declare function trackObservable(track: TrackPublication): Observable<TrackPublication>;
export declare function observeTrackEvents(track: TrackPublication, ...events: TrackEvent[]): Observable<TrackPublication>;
type TrackReferencesObservableOptions = {
    additionalRoomEvents?: RoomEvent[];
    onlySubscribed?: boolean;
};
export declare function trackReferencesObservable(room: Room, sources: Track.Source[], options: TrackReferencesObservableOptions): Observable<{
    trackReferences: TrackReference[];
    participants: Participant[];
}>;
export {};
//# sourceMappingURL=track.d.ts.map