import {Time} from "@angular/common";

export interface Location {
  id: string;
  urlFriendlyId: string;
  url: string;
  name: string;
  parkIds?: string[];
  media?: Media;
}

export interface Media {
  mapBubbleThumbSmall?: MediaItem;
  finderStandardThumb?: MediaItem;
  mapBubbleThumbLarge?: MediaItem;
}

export interface MediaItem {
  title?: string;
  url?: string;
  alt?: string;
  transcodeTemplate?: string;
}
