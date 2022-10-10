import { describe, expect, it, vitest, beforeEach } from 'vitest';

import { IEventsPerPlaces } from '../types';
import { getRandom } from '../../../test/utils';
import { EventsPerPlaces } from './events-per-places.entity';

describe('#EventsPerPlaces Entity', () => {
  let mockEventsPerPlaces: IEventsPerPlaces;
  beforeEach(() => {
    mockEventsPerPlaces = {
      eventId: getRandom(1),
      placeId: getRandom(1),
    };

    vitest.clearAllMocks().resetAllMocks();
  });

  it('Should be able to create a new EventsPerPlaces', () => {
    const eventsPerPlaces = new EventsPerPlaces(mockEventsPerPlaces);

    expect(eventsPerPlaces).toBeInstanceOf(EventsPerPlaces);
    expect(eventsPerPlaces.eventId).toBeDefined();
    expect(eventsPerPlaces.placeId).toEqual(Number(mockEventsPerPlaces.placeId));
  });
});
