"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DataTopic: () => DataTopic,
  GRID_LAYOUTS: () => GRID_LAYOUTS,
  PIN_DEFAULT_STATE: () => PIN_DEFAULT_STATE,
  WIDGET_DEFAULT_STATE: () => WIDGET_DEFAULT_STATE,
  activeSpeakerObserver: () => activeSpeakerObserver,
  allParticipantEvents: () => allParticipantEvents,
  allParticipantRoomEvents: () => allParticipantRoomEvents,
  allRemoteParticipantEvents: () => allRemoteParticipantEvents,
  allRemoteParticipantRoomEvents: () => allRemoteParticipantRoomEvents,
  attachIfSubscribed: () => attachIfSubscribed,
  computeMenuPosition: () => computeMenuPosition,
  connectedParticipantObserver: () => connectedParticipantObserver,
  connectedParticipantsObserver: () => connectedParticipantsObserver,
  connectionStateObserver: () => connectionStateObserver,
  createActiveDeviceObservable: () => createActiveDeviceObservable,
  createConnectionQualityObserver: () => createConnectionQualityObserver,
  createDataObserver: () => createDataObserver,
  createDefaultGrammar: () => createDefaultGrammar,
  createEmailRegExp: () => import_email_regex.default,
  createInteractingObservable: () => createInteractingObservable,
  createIsSpeakingObserver: () => createIsSpeakingObserver,
  createMediaDeviceObserver: () => createMediaDeviceObserver,
  createTrackObserver: () => createTrackObserver,
  createUrlRegExp: () => createUrlRegExp,
  cssPrefix: () => cssPrefix,
  encryptionStatusObservable: () => encryptionStatusObservable,
  getScrollBarWidth: () => getScrollBarWidth,
  getTrackByIdentifier: () => getTrackByIdentifier,
  getTrackReferenceId: () => getTrackReferenceId,
  getTrackReferenceSource: () => getTrackReferenceSource,
  isEqualTrackRef: () => isEqualTrackRef,
  isLocal: () => isLocal,
  isMobileBrowser: () => isMobileBrowser,
  isParticipantSourcePinned: () => isParticipantSourcePinned,
  isParticipantTrackReferencePinned: () => isParticipantTrackReferencePinned,
  isPlaceholderReplacement: () => isPlaceholderReplacement,
  isRemote: () => isRemote,
  isSourceWitOptions: () => isSourceWitOptions,
  isSourcesWithOptions: () => isSourcesWithOptions,
  isTrackReference: () => isTrackReference,
  isTrackReferencePinned: () => isTrackReferencePinned,
  isTrackReferencePlaceholder: () => isTrackReferencePlaceholder,
  isWeb: () => isWeb,
  loadUserChoices: () => loadUserChoices,
  log: () => log,
  mutedObserver: () => mutedObserver,
  observeParticipantEvents: () => observeParticipantEvents,
  observeParticipantMedia: () => observeParticipantMedia,
  observeRoomEvents: () => observeRoomEvents,
  observeTrackEvents: () => observeTrackEvents,
  participantEventSelector: () => participantEventSelector,
  participantInfoObserver: () => participantInfoObserver,
  participantPermissionObserver: () => participantPermissionObserver,
  roomAudioPlaybackAllowedObservable: () => roomAudioPlaybackAllowedObservable,
  roomEventSelector: () => roomEventSelector,
  roomInfoObserver: () => roomInfoObserver,
  roomObserver: () => roomObserver,
  roomVideoPlaybackAllowedObservable: () => roomVideoPlaybackAllowedObservable,
  saveUserChoices: () => saveUserChoices,
  screenShareObserver: () => screenShareObserver,
  selectGridLayout: () => selectGridLayout,
  sendMessage: () => sendMessage,
  setDifference: () => setDifference,
  setLogExtension: () => setLogExtension,
  setLogLevel: () => setLogLevel,
  setupChat: () => setupChat,
  setupChatToggle: () => setupChatToggle,
  setupClearPinButton: () => setupClearPinButton,
  setupConnectionQualityIndicator: () => setupConnectionQualityIndicator,
  setupDataMessageHandler: () => setupDataMessageHandler,
  setupDeviceSelector: () => setupDeviceSelector,
  setupDisconnectButton: () => setupDisconnectButton,
  setupFocusToggle: () => setupFocusToggle,
  setupLiveKitRoom: () => setupLiveKitRoom,
  setupManualToggle: () => setupManualToggle,
  setupMediaToggle: () => setupMediaToggle,
  setupMediaTrack: () => setupMediaTrack,
  setupParticipantName: () => setupParticipantName,
  setupParticipantTile: () => setupParticipantTile,
  setupStartAudio: () => setupStartAudio,
  setupStartVideo: () => setupStartVideo,
  setupTrackMutedIndicator: () => setupTrackMutedIndicator,
  sortParticipants: () => sortParticipants,
  sortTrackReferences: () => sortTrackReferences,
  supportsScreenSharing: () => supportsScreenSharing,
  tokenize: () => tokenize,
  trackObservable: () => trackObservable,
  trackReferencesObservable: () => trackReferencesObservable,
  updatePages: () => updatePages,
  wasClickOutside: () => wasClickOutside
});
module.exports = __toCommonJS(src_exports);

// src/constants.ts
var cssPrefix = "lk";

// src/utils.ts
var import_livekit_client = require("livekit-client");

// src/track-reference/track-reference.types.ts
function isTrackReference(trackReference) {
  if (typeof trackReference === "undefined") {
    return false;
  }
  return isTrackReferenceSubscribed(trackReference) || isTrackReferencePublished(trackReference);
}
function isTrackReferenceSubscribed(trackReference) {
  var _a;
  if (!trackReference) {
    return false;
  }
  return trackReference.hasOwnProperty("participant") && trackReference.hasOwnProperty("source") && trackReference.hasOwnProperty("track") && typeof ((_a = trackReference.publication) == null ? void 0 : _a.track) !== "undefined";
}
function isTrackReferencePublished(trackReference) {
  if (!trackReference) {
    return false;
  }
  return trackReference.hasOwnProperty("participant") && trackReference.hasOwnProperty("source") && trackReference.hasOwnProperty("publication") && typeof trackReference.publication !== "undefined";
}
function isTrackReferencePlaceholder(trackReference) {
  if (!trackReference) {
    return false;
  }
  return trackReference.hasOwnProperty("participant") && trackReference.hasOwnProperty("source") && typeof trackReference.publication === "undefined";
}

// src/track-reference/track-reference.utils.ts
function getTrackReferenceId(trackReference) {
  if (typeof trackReference === "string" || typeof trackReference === "number") {
    return `${trackReference}`;
  } else if (isTrackReferencePlaceholder(trackReference)) {
    return `${trackReference.participant.identity}_${trackReference.source}_placeholder`;
  } else if (isTrackReference(trackReference)) {
    return `${trackReference.participant.identity}_${trackReference.publication.source}_${trackReference.publication.trackSid}`;
  } else {
    throw new Error(`Can't generate a id for the given track reference: ${trackReference}`);
  }
}
function getTrackReferenceSource(trackReference) {
  if (isTrackReference(trackReference)) {
    return trackReference.publication.source;
  } else {
    return trackReference.source;
  }
}
function isEqualTrackRef(a, b) {
  if (a === void 0 || b === void 0) {
    return false;
  }
  if (isTrackReference(a) && isTrackReference(b)) {
    return a.publication.trackSid === b.publication.trackSid;
  } else {
    return getTrackReferenceId(a) === getTrackReferenceId(b);
  }
}
function isTrackReferencePinned(trackReference, pinState) {
  if (typeof pinState === "undefined") {
    return false;
  }
  if (isTrackReference(trackReference)) {
    return pinState.some(
      (pinnedTrackReference) => pinnedTrackReference.participant.identity === trackReference.participant.identity && isTrackReference(pinnedTrackReference) && pinnedTrackReference.publication.trackSid === trackReference.publication.trackSid
    );
  } else if (isTrackReferencePlaceholder(trackReference)) {
    return pinState.some(
      (pinnedTrackReference) => pinnedTrackReference.participant.identity === trackReference.participant.identity && isTrackReferencePlaceholder(pinnedTrackReference) && pinnedTrackReference.source === trackReference.source
    );
  } else {
    return false;
  }
}
function isPlaceholderReplacement(currentTrackRef, nextTrackRef) {
  return isTrackReferencePlaceholder(currentTrackRef) && isTrackReference(nextTrackRef) && nextTrackRef.participant.identity === currentTrackRef.participant.identity && nextTrackRef.source === currentTrackRef.source;
}

// src/utils.ts
function isLocal(p) {
  return p instanceof import_livekit_client.LocalParticipant;
}
function isRemote(p) {
  return p instanceof import_livekit_client.RemoteParticipant;
}
var attachIfSubscribed = (publication, element) => {
  if (!publication)
    return;
  const { isSubscribed, track } = publication;
  if (element && track) {
    if (isSubscribed) {
      track.attach(element);
    } else {
      track.detach(element);
    }
  }
};
function isParticipantSourcePinned(participant, source, pinState) {
  if (pinState === void 0) {
    return false;
  }
  return pinState.some(
    ({ source: pinnedSource, participant: pinnedParticipant }) => pinnedSource === source && pinnedParticipant.identity === participant.identity
  );
}
function isParticipantTrackReferencePinned(trackRef, pinState) {
  if (pinState === void 0) {
    return false;
  }
  return pinState.some((pinnedTrackRef) => isEqualTrackRef(pinnedTrackRef, trackRef));
}
function getScrollBarWidth() {
  const inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  const outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  document.body.removeChild(outer);
  const scrollBarWidth = w1 - w2;
  return scrollBarWidth;
}

// src/helper/detectMobileBrowser.ts
function isWeb() {
  return typeof document !== "undefined";
}
function isMobileBrowser() {
  return isWeb() ? /Mobi/i.test(window.navigator.userAgent) : false;
}

// src/helper/url-regex.ts
function createUrlRegExp(options) {
  options = __spreadValues({}, options);
  const protocol = `(?:(?:[a-z]+:)?//)?`;
  const auth = "(?:\\S+(?::\\S*)?@)?";
  const ip = new RegExp(
    "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
    "g"
  ).source;
  const host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  const domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  const tld = `(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?`;
  const port = "(?::\\d{2,5})?";
  const path = '(?:[/?#][^\\s"]*)?';
  const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;
  return options.exact ? new RegExp(`(?:^${regex}$)`, "i") : new RegExp(regex, "ig");
}

// src/helper/emailRegex.ts
var import_email_regex = __toESM(require("email-regex"));

// src/helper/floating-menu.ts
var import_dom = require("@floating-ui/dom");
function computeMenuPosition(button, menu) {
  return __async(this, null, function* () {
    const { x, y } = yield (0, import_dom.computePosition)(button, menu, {
      placement: "top",
      middleware: [(0, import_dom.offset)(6), (0, import_dom.flip)(), (0, import_dom.shift)({ padding: 5 })]
    });
    return { x, y };
  });
}
function wasClickOutside(insideElement, event) {
  const isOutside = !insideElement.contains(event.target);
  return isOutside;
}

// src/helper/tokenizer.ts
var createDefaultGrammar = () => {
  return {
    email: (0, import_email_regex.default)(),
    url: createUrlRegExp({})
  };
};
function tokenize(input, grammar) {
  const matches = Object.entries(grammar).map(
    ([type, rx], weight) => Array.from(input.matchAll(rx)).map(({ index, 0: content }) => ({
      type,
      weight,
      content,
      index: index != null ? index : 0
    }))
  ).flat().sort((a, b) => {
    const d = a.index - b.index;
    return d !== 0 ? d : a.weight - b.weight;
  }).filter(({ index }, i, arr) => {
    if (i === 0)
      return true;
    const prev = arr[i - 1];
    return prev.index + prev.content.length <= index;
  });
  const tokens = [];
  let pos = 0;
  for (const { type, content, index } of matches) {
    if (index > pos)
      tokens.push(input.substring(pos, index));
    tokens.push({ type, content });
    pos = index + content.length;
  }
  if (input.length > pos)
    tokens.push(input.substring(pos));
  return tokens;
}

// src/helper/eventGroups.ts
var import_livekit_client2 = require("livekit-client");
var allRemoteParticipantRoomEvents = [
  import_livekit_client2.RoomEvent.ConnectionStateChanged,
  import_livekit_client2.RoomEvent.RoomMetadataChanged,
  import_livekit_client2.RoomEvent.ActiveSpeakersChanged,
  import_livekit_client2.RoomEvent.ConnectionQualityChanged,
  import_livekit_client2.RoomEvent.ParticipantConnected,
  import_livekit_client2.RoomEvent.ParticipantDisconnected,
  import_livekit_client2.RoomEvent.ParticipantPermissionsChanged,
  import_livekit_client2.RoomEvent.ParticipantMetadataChanged,
  import_livekit_client2.RoomEvent.TrackMuted,
  import_livekit_client2.RoomEvent.TrackUnmuted,
  import_livekit_client2.RoomEvent.TrackPublished,
  import_livekit_client2.RoomEvent.TrackUnpublished,
  import_livekit_client2.RoomEvent.TrackStreamStateChanged,
  import_livekit_client2.RoomEvent.TrackSubscriptionFailed,
  import_livekit_client2.RoomEvent.TrackSubscriptionPermissionChanged,
  import_livekit_client2.RoomEvent.TrackSubscriptionStatusChanged
];
var allParticipantRoomEvents = [
  ...allRemoteParticipantRoomEvents,
  import_livekit_client2.RoomEvent.LocalTrackPublished,
  import_livekit_client2.RoomEvent.LocalTrackUnpublished
];
var allRemoteParticipantEvents = [
  import_livekit_client2.ParticipantEvent.ConnectionQualityChanged,
  import_livekit_client2.ParticipantEvent.IsSpeakingChanged,
  import_livekit_client2.ParticipantEvent.ParticipantMetadataChanged,
  import_livekit_client2.ParticipantEvent.ParticipantPermissionsChanged,
  import_livekit_client2.ParticipantEvent.TrackMuted,
  import_livekit_client2.ParticipantEvent.TrackUnmuted,
  import_livekit_client2.ParticipantEvent.TrackPublished,
  import_livekit_client2.ParticipantEvent.TrackUnpublished,
  import_livekit_client2.ParticipantEvent.TrackStreamStateChanged,
  import_livekit_client2.ParticipantEvent.TrackSubscriptionFailed,
  import_livekit_client2.ParticipantEvent.TrackSubscriptionPermissionChanged,
  import_livekit_client2.ParticipantEvent.TrackSubscriptionStatusChanged
];
var allParticipantEvents = [
  ...allRemoteParticipantEvents,
  import_livekit_client2.ParticipantEvent.LocalTrackPublished,
  import_livekit_client2.ParticipantEvent.LocalTrackUnpublished
];

// src/logger.ts
var import_livekit_client3 = require("livekit-client");
var import_loglevel = __toESM(require("loglevel"));
var log = import_loglevel.default.getLogger("lk-components-js");
log.setDefaultLevel("WARN");
function setLogLevel(level, options = {}) {
  var _a;
  log.setLevel(level);
  (0, import_livekit_client3.setLogLevel)((_a = options.liveKitClientLogLevel) != null ? _a : level);
}
function setLogExtension(extension, options = {}) {
  var _a;
  const originalFactory = log.methodFactory;
  log.methodFactory = (methodName, configLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, configLevel, loggerName);
    const logLevel = import_livekit_client3.LogLevel[methodName];
    const needLog = logLevel >= configLevel && logLevel < import_livekit_client3.LogLevel.silent;
    return (msg, context) => {
      if (context)
        rawMethod(msg, context);
      else
        rawMethod(msg);
      if (needLog) {
        extension(logLevel, msg, context);
      }
    };
  };
  log.setLevel(log.getLevel());
  (0, import_livekit_client3.setLogExtension)((_a = options.liveKitClientLogExtension) != null ? _a : extension);
}

// src/helper/grid-layouts.ts
var GRID_LAYOUTS = [
  {
    columns: 1,
    rows: 1,
    name: "1x1",
    minTiles: 1,
    maxTiles: 1,
    minWidth: 0,
    minHeight: 0
  },
  {
    columns: 1,
    rows: 2,
    name: "1x2",
    minTiles: 2,
    maxTiles: 2,
    minWidth: 0,
    minHeight: 0
  },
  {
    columns: 2,
    rows: 1,
    name: "2x1",
    minTiles: 2,
    maxTiles: 2,
    minWidth: 900,
    minHeight: 0
  },
  {
    columns: 2,
    rows: 2,
    name: "2x2",
    minTiles: 3,
    maxTiles: 4,
    minWidth: 560,
    minHeight: 0
  },
  {
    columns: 3,
    rows: 3,
    name: "3x3",
    minTiles: 5,
    maxTiles: 9,
    minWidth: 700,
    minHeight: 0
  },
  {
    columns: 4,
    rows: 4,
    name: "4x4",
    minTiles: 10,
    maxTiles: 16,
    minWidth: 960,
    minHeight: 0
  },
  {
    columns: 5,
    rows: 5,
    name: "5x5",
    minTiles: 17,
    maxTiles: 25,
    minWidth: 1100,
    minHeight: 0
  }
];
function selectGridLayout(layouts, participantCount, width, height) {
  let currentLayoutIndex = 0;
  let layout = layouts.find((layout_, index, allLayouts) => {
    currentLayoutIndex = index;
    const isBiggerLayoutAvailable = allLayouts.findIndex((l, i) => {
      const layoutIsBiggerThanCurrent = i > index;
      const layoutFitsSameAmountOfParticipants = l.maxTiles === layout_.maxTiles;
      return layoutIsBiggerThanCurrent && layoutFitsSameAmountOfParticipants;
    }) !== -1;
    return layout_.maxTiles >= participantCount && !isBiggerLayoutAvailable;
  });
  if (layout === void 0) {
    layout = layouts[layouts.length - 1];
    if (layout) {
      log.warn(
        `No layout found for: participantCount: ${participantCount}, width/height: ${width}/${height} fallback to biggest available layout (${layout.name}).`
      );
    } else {
      throw new Error(`No layout or fallback layout found.`);
    }
  }
  if (width < layout.minWidth || height < layout.minHeight) {
    if (currentLayoutIndex > 0) {
      const smallerLayout = layouts[currentLayoutIndex - 1];
      layout = selectGridLayout(
        layouts.slice(0, currentLayoutIndex),
        smallerLayout.maxTiles,
        width,
        height
      );
    }
  }
  return layout;
}

// src/helper/set-helper.ts
function setDifference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

// src/helper/featureDetection.ts
function supportsScreenSharing() {
  return typeof navigator !== "undefined" && navigator.mediaDevices && !!navigator.mediaDevices.getDisplayMedia;
}

// src/types.ts
var PIN_DEFAULT_STATE = [];
var WIDGET_DEFAULT_STATE = { showChat: false, unreadMessages: 0 };
function isSourceWitOptions(source) {
  return typeof source === "object";
}
function isSourcesWithOptions(sources) {
  return Array.isArray(sources) && sources.filter(isSourceWitOptions).length > 0;
}

// src/sorting/sort-track-bundles.ts
var import_livekit_client5 = require("livekit-client");

// src/sorting/base-sort-functions.ts
var import_livekit_client4 = require("livekit-client");
function sortParticipantsByAudioLevel(a, b) {
  return b.audioLevel - a.audioLevel;
}
function sortParticipantsByIsSpeaking(a, b) {
  if (a.isSpeaking === b.isSpeaking) {
    return 0;
  } else {
    return a.isSpeaking ? -1 : 1;
  }
}
function sortParticipantsByLastSpokenAT(a, b) {
  var _a, _b, _c, _d;
  if (a.lastSpokeAt !== void 0 || b.lastSpokeAt !== void 0) {
    return ((_b = (_a = b.lastSpokeAt) == null ? void 0 : _a.getTime()) != null ? _b : 0) - ((_d = (_c = a.lastSpokeAt) == null ? void 0 : _c.getTime()) != null ? _d : 0);
  } else {
    return 0;
  }
}
function sortParticipantsByJoinedAt(a, b) {
  var _a, _b, _c, _d;
  return ((_b = (_a = a.joinedAt) == null ? void 0 : _a.getTime()) != null ? _b : 0) - ((_d = (_c = b.joinedAt) == null ? void 0 : _c.getTime()) != null ? _d : 0);
}
function sortTrackReferencesByType(a, b) {
  if (isTrackReference(a)) {
    if (isTrackReference(b)) {
      return 0;
    } else {
      return -1;
    }
  } else if (isTrackReference(b)) {
    return 1;
  } else {
    return 0;
  }
}
function sortTrackRefsByIsCameraEnabled(a, b) {
  const aVideo = a.participant.isCameraEnabled;
  const bVideo = b.participant.isCameraEnabled;
  if (aVideo !== bVideo) {
    if (aVideo) {
      return -1;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

// src/sorting/sort-track-bundles.ts
function sortTrackReferences(tracks) {
  const localTracks = [];
  const screenShareTracks = [];
  const cameraTracks = [];
  const undefinedTracks = [];
  tracks.forEach((trackRef) => {
    if (trackRef.participant.isLocal && trackRef.source === import_livekit_client5.Track.Source.Camera) {
      localTracks.push(trackRef);
    } else if (trackRef.source === import_livekit_client5.Track.Source.ScreenShare) {
      screenShareTracks.push(trackRef);
    } else if (trackRef.source === import_livekit_client5.Track.Source.Camera) {
      cameraTracks.push(trackRef);
    } else {
      undefinedTracks.push(trackRef);
    }
  });
  const sortedScreenShareTracks = sortScreenShareTracks(screenShareTracks);
  const sortedCameraTracks = sortCameraTracks(cameraTracks);
  return [...localTracks, ...sortedScreenShareTracks, ...sortedCameraTracks, ...undefinedTracks];
}
function sortScreenShareTracks(screenShareTracks) {
  const localScreenShares = [];
  const remoteScreenShares = [];
  screenShareTracks.forEach((trackRef) => {
    if (trackRef.participant.isLocal) {
      localScreenShares.push(trackRef);
    } else {
      remoteScreenShares.push(trackRef);
    }
  });
  localScreenShares.sort((a, b) => sortParticipantsByJoinedAt(a.participant, b.participant));
  remoteScreenShares.sort((a, b) => sortParticipantsByJoinedAt(a.participant, b.participant));
  const sortedScreenShareTrackRefs = [...remoteScreenShares, ...localScreenShares];
  return sortedScreenShareTrackRefs;
}
function sortCameraTracks(cameraTrackReferences) {
  const localCameraTracks = [];
  const remoteCameraTracks = [];
  cameraTrackReferences.forEach((trackRef) => {
    if (trackRef.participant.isLocal) {
      localCameraTracks.push(trackRef);
    } else {
      remoteCameraTracks.push(trackRef);
    }
  });
  remoteCameraTracks.sort((a, b) => {
    if (a.participant.isSpeaking && b.participant.isSpeaking) {
      return sortParticipantsByAudioLevel(a.participant, b.participant);
    }
    if (a.participant.isSpeaking !== b.participant.isSpeaking) {
      return sortParticipantsByIsSpeaking(a.participant, b.participant);
    }
    if (a.participant.lastSpokeAt !== b.participant.lastSpokeAt) {
      return sortParticipantsByLastSpokenAT(a.participant, b.participant);
    }
    if (isTrackReference(a) !== isTrackReference(b)) {
      return sortTrackReferencesByType(a, b);
    }
    if (a.participant.isCameraEnabled !== b.participant.isCameraEnabled) {
      return sortTrackRefsByIsCameraEnabled(a, b);
    }
    return sortParticipantsByJoinedAt(a.participant, b.participant);
  });
  return [...localCameraTracks, ...remoteCameraTracks];
}

// src/sorting/sort-participants.ts
var import_livekit_client6 = require("livekit-client");
function sortParticipants(participants) {
  const sortedParticipants = [...participants];
  sortedParticipants.sort((a, b) => {
    if (a.isSpeaking && b.isSpeaking) {
      return sortParticipantsByAudioLevel(a, b);
    }
    if (a.isSpeaking !== b.isSpeaking) {
      return sortParticipantsByIsSpeaking(a, b);
    }
    if (a.lastSpokeAt !== b.lastSpokeAt) {
      return sortParticipantsByLastSpokenAT(a, b);
    }
    const aVideo = a.videoTracks.size > 0;
    const bVideo = b.videoTracks.size > 0;
    if (aVideo !== bVideo) {
      if (aVideo) {
        return -1;
      } else {
        return 1;
      }
    }
    return sortParticipantsByJoinedAt(a, b);
  });
  const localParticipant = sortedParticipants.find((p) => p instanceof import_livekit_client6.LocalParticipant);
  if (localParticipant) {
    const localIdx = sortedParticipants.indexOf(localParticipant);
    if (localIdx >= 0) {
      sortedParticipants.splice(localIdx, 1);
      if (sortedParticipants.length > 0) {
        sortedParticipants.splice(0, 0, localParticipant);
      } else {
        sortedParticipants.push(localParticipant);
      }
    }
  }
  return sortedParticipants;
}

// src/helper/array-helper.ts
function chunk(input, size) {
  return input.reduce(
    (arr, item, idx) => {
      return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    },
    []
  );
}
function zip(a1, a2) {
  const resultLength = Math.max(a1.length, a2.length);
  return new Array(resultLength).fill([]).map((_val, idx) => [a1[idx], a2[idx]]);
}
function differenceBy(a1, a2, by) {
  return a1.filter((c) => !a2.map((v) => by(v)).includes(by(c)));
}

// src/track-reference/test-utils.ts
var import_livekit_client7 = require("livekit-client");
function flatTrackReferenceArray(list) {
  return list.map((item) => {
    if (typeof item === "string" || typeof item === "number") {
      return `${item}`;
    } else {
      return getTrackReferenceId(item);
    }
  });
}

// src/sorting/tile-array-update.ts
function visualPageChange(state, next) {
  return {
    dropped: differenceBy(state, next, getTrackReferenceId),
    added: differenceBy(next, state, getTrackReferenceId)
  };
}
function listNeedsUpdating(changes) {
  return changes.added.length !== 0 || changes.dropped.length !== 0;
}
function findIndex(trackReference, trackReferences) {
  const indexToReplace = trackReferences.findIndex(
    (trackReference_) => getTrackReferenceId(trackReference_) === getTrackReferenceId(trackReference)
  );
  if (indexToReplace === -1) {
    throw new Error(
      `Element not part of the array: ${getTrackReferenceId(
        trackReference
      )} not in ${flatTrackReferenceArray(trackReferences)}`
    );
  }
  return indexToReplace;
}
function swapItems(moveForward, moveBack, trackReferences) {
  const indexToReplace = findIndex(moveForward, trackReferences);
  const indexReplaceWith = findIndex(moveBack, trackReferences);
  trackReferences.splice(indexToReplace, 1, moveBack);
  trackReferences.splice(indexReplaceWith, 1, moveForward);
  return trackReferences;
}
function dropItem(itemToDrop, list) {
  const indexOfElementToDrop = findIndex(itemToDrop, list);
  list.splice(indexOfElementToDrop, 1);
  return list;
}
function addItem(itemToAdd, list) {
  return [...list, itemToAdd];
}
function divideIntoPages(list, maxElementsOnPage) {
  const pages = chunk(list, maxElementsOnPage);
  return pages;
}
function updatePages(currentList, nextList, maxItemsOnPage) {
  let updatedList = refreshList(currentList, nextList);
  if (updatedList.length < nextList.length) {
    const addedItems = differenceBy(nextList, updatedList, getTrackReferenceId);
    updatedList = [...updatedList, ...addedItems];
  }
  const currentPages = divideIntoPages(updatedList, maxItemsOnPage);
  const nextPages = divideIntoPages(nextList, maxItemsOnPage);
  zip(currentPages, nextPages).forEach(([currentPage, nextPage], pageIndex) => {
    if (currentPage && nextPage) {
      const updatedPage = divideIntoPages(updatedList, maxItemsOnPage)[pageIndex];
      const changes = visualPageChange(updatedPage, nextPage);
      if (listNeedsUpdating(changes)) {
        log.debug(
          `Detected visual changes on page: ${pageIndex}, current: ${flatTrackReferenceArray(
            currentPage
          )}, next: ${flatTrackReferenceArray(nextPage)}`,
          { changes }
        );
        if (changes.added.length === changes.dropped.length) {
          zip(changes.added, changes.dropped).forEach(([added, dropped]) => {
            if (added && dropped) {
              updatedList = swapItems(added, dropped, updatedList);
            } else {
              throw new Error(
                `For a swap action we need a addition and a removal one is missing: ${added}, ${dropped}`
              );
            }
          });
        }
        if (changes.added.length === 0 && changes.dropped.length > 0) {
          changes.dropped.forEach((item) => {
            updatedList = dropItem(item, updatedList);
          });
        }
        if (changes.added.length > 0 && changes.dropped.length === 0) {
          changes.added.forEach((item) => {
            updatedList = addItem(item, updatedList);
          });
        }
      }
    }
  });
  if (updatedList.length > nextList.length) {
    const missingItems = differenceBy(updatedList, nextList, getTrackReferenceId);
    updatedList = updatedList.filter(
      (item) => !missingItems.map(getTrackReferenceId).includes(getTrackReferenceId(item))
    );
  }
  return updatedList;
}
function refreshList(currentList, nextList) {
  return currentList.map((currentItem) => {
    const updateForCurrentItem = nextList.find(
      (newItem_) => (
        // If the IDs match or ..
        getTrackReferenceId(currentItem) === getTrackReferenceId(newItem_) || // ... if the current item is a placeholder and the new item is the track reference can replace it.
        typeof currentItem !== "number" && isTrackReferencePlaceholder(currentItem) && isTrackReference(newItem_) && isPlaceholderReplacement(currentItem, newItem_)
      )
    );
    return updateForCurrentItem != null ? updateForCurrentItem : currentItem;
  });
}

// src/components/mediaToggle.ts
var import_livekit_client11 = require("livekit-client");
var import_rxjs4 = require("rxjs");

// src/observables/participant.ts
var import_livekit_client10 = require("livekit-client");
var import_rxjs3 = require("rxjs");

// src/observables/room.ts
var import_rxjs = require("rxjs");
var import_livekit_client8 = require("livekit-client");
function observeRoomEvents(room, ...events) {
  const observable = new import_rxjs.Observable((subscribe) => {
    const onRoomUpdate = () => {
      subscribe.next(room);
    };
    events.forEach((evt) => {
      room.on(evt, onRoomUpdate);
    });
    const unsubscribe = () => {
      events.forEach((evt) => {
        room.off(evt, onRoomUpdate);
      });
    };
    return unsubscribe;
  }).pipe((0, import_rxjs.startWith)(room));
  return observable;
}
function roomEventSelector(room, event) {
  const observable = new import_rxjs.Observable((subscribe) => {
    const update = (...params) => {
      subscribe.next(params);
    };
    room.on(event, update);
    const unsubscribe = () => {
      room.off(event, update);
    };
    return unsubscribe;
  });
  return observable;
}
function roomObserver(room) {
  const observable = observeRoomEvents(
    room,
    import_livekit_client8.RoomEvent.ParticipantConnected,
    import_livekit_client8.RoomEvent.ParticipantDisconnected,
    import_livekit_client8.RoomEvent.ActiveSpeakersChanged,
    import_livekit_client8.RoomEvent.TrackSubscribed,
    import_livekit_client8.RoomEvent.TrackUnsubscribed,
    import_livekit_client8.RoomEvent.LocalTrackPublished,
    import_livekit_client8.RoomEvent.LocalTrackUnpublished,
    import_livekit_client8.RoomEvent.AudioPlaybackStatusChanged,
    import_livekit_client8.RoomEvent.ConnectionStateChanged
  ).pipe((0, import_rxjs.startWith)(room));
  return observable;
}
function connectionStateObserver(room) {
  return roomEventSelector(room, import_livekit_client8.RoomEvent.ConnectionStateChanged).pipe(
    (0, import_rxjs.map)(([connectionState]) => connectionState),
    (0, import_rxjs.startWith)(room.state)
  );
}
function screenShareObserver(room) {
  let screenShareSubscriber;
  const observers = [];
  const observable = new import_rxjs.Observable((subscriber) => {
    screenShareSubscriber = subscriber;
    return () => {
      observers.forEach((observer) => {
        observer.unsubscribe();
      });
    };
  });
  const screenShareTracks = [];
  const handleSub = (publication, participant) => {
    if (publication.source !== import_livekit_client8.Track.Source.ScreenShare && publication.source !== import_livekit_client8.Track.Source.ScreenShareAudio) {
      return;
    }
    let trackMap = screenShareTracks.find((tr) => tr.participant.identity === participant.identity);
    const getScreenShareTracks = (participant2) => {
      return participant2.getTracks().filter(
        (track) => (track.source === import_livekit_client8.Track.Source.ScreenShare || track.source === import_livekit_client8.Track.Source.ScreenShareAudio) && track.track
      );
    };
    if (!trackMap) {
      trackMap = {
        participant,
        tracks: getScreenShareTracks(participant)
      };
    } else {
      const index = screenShareTracks.indexOf(trackMap);
      screenShareTracks.splice(index, 1);
      trackMap.tracks = getScreenShareTracks(participant);
    }
    if (trackMap.tracks.length > 0) {
      screenShareTracks.push(trackMap);
    }
    screenShareSubscriber.next(screenShareTracks);
  };
  observers.push(
    roomEventSelector(room, import_livekit_client8.RoomEvent.TrackSubscribed).subscribe(
      ([, ...args]) => handleSub(...args)
    )
  );
  observers.push(
    roomEventSelector(room, import_livekit_client8.RoomEvent.TrackUnsubscribed).subscribe(
      ([, ...args]) => handleSub(...args)
    )
  );
  observers.push(
    roomEventSelector(room, import_livekit_client8.RoomEvent.LocalTrackPublished).subscribe((args) => handleSub(...args))
  );
  observers.push(
    roomEventSelector(room, import_livekit_client8.RoomEvent.LocalTrackUnpublished).subscribe((args) => {
      handleSub(...args);
    })
  );
  observers.push(
    roomEventSelector(room, import_livekit_client8.RoomEvent.TrackMuted).subscribe((args) => {
      handleSub(...args);
    })
  );
  observers.push(
    roomEventSelector(room, import_livekit_client8.RoomEvent.TrackUnmuted).subscribe((args) => {
      handleSub(...args);
    })
  );
  setTimeout(() => {
    for (const p of room.participants.values()) {
      p.getTracks().forEach((track) => {
        handleSub(track, p);
      });
    }
  }, 1);
  return observable;
}
function roomInfoObserver(room) {
  const observer = observeRoomEvents(
    room,
    import_livekit_client8.RoomEvent.RoomMetadataChanged,
    import_livekit_client8.RoomEvent.ConnectionStateChanged
  ).pipe(
    (0, import_rxjs.map)((r) => {
      return { name: r.name, metadata: r.metadata };
    })
  );
  return observer;
}
function activeSpeakerObserver(room) {
  return roomEventSelector(room, import_livekit_client8.RoomEvent.ActiveSpeakersChanged).pipe(
    (0, import_rxjs.map)(([speakers]) => speakers)
  );
}
function createMediaDeviceObserver(kind, onError, requestPermissions = true) {
  var _a;
  const onDeviceChange = () => __async(this, null, function* () {
    try {
      const newDevices = yield import_livekit_client8.Room.getLocalDevices(kind, requestPermissions);
      deviceSubject.next(newDevices);
    } catch (e) {
      onError == null ? void 0 : onError(e);
    }
  });
  const deviceSubject = new import_rxjs.Subject();
  const observable = deviceSubject.pipe(
    (0, import_rxjs.finalize)(() => {
      var _a2;
      (_a2 = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : _a2.removeEventListener("devicechange", onDeviceChange);
    })
  );
  if (typeof window !== "undefined") {
    if (!window.isSecureContext) {
      throw new Error(
        `Accessing media devices is available only in secure contexts (HTTPS and localhost), in some or all supporting browsers. See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices`
      );
    }
    (_a = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : _a.addEventListener("devicechange", onDeviceChange);
  }
  return (0, import_rxjs.concat)(
    import_livekit_client8.Room.getLocalDevices(kind, requestPermissions).catch((e) => onError == null ? void 0 : onError(e)),
    observable
  );
}
function createDataObserver(room) {
  return roomEventSelector(room, import_livekit_client8.RoomEvent.DataReceived);
}
function roomAudioPlaybackAllowedObservable(room) {
  const observable = observeRoomEvents(room, import_livekit_client8.RoomEvent.AudioPlaybackStatusChanged).pipe(
    (0, import_rxjs.map)((room2) => {
      return { canPlayAudio: room2.canPlaybackAudio };
    })
  );
  return observable;
}
function roomVideoPlaybackAllowedObservable(room) {
  const observable = observeRoomEvents(room, import_livekit_client8.RoomEvent.VideoPlaybackStatusChanged).pipe(
    (0, import_rxjs.map)((room2) => {
      return { canPlayVideo: room2.canPlaybackVideo };
    })
  );
  return observable;
}
function createActiveDeviceObservable(room, kind) {
  return roomEventSelector(room, import_livekit_client8.RoomEvent.ActiveDeviceChanged).pipe(
    (0, import_rxjs.filter)(([kindOfDevice]) => kindOfDevice === kind),
    (0, import_rxjs.map)(([kind2, deviceId]) => {
      log.debug("activeDeviceObservable | RoomEvent.ActiveDeviceChanged", { kind: kind2, deviceId });
      return deviceId;
    }),
    (0, import_rxjs.startWith)(room.getActiveDevice(kind))
  );
}
function encryptionStatusObservable(room, participant) {
  return roomEventSelector(room, import_livekit_client8.RoomEvent.ParticipantEncryptionStatusChanged).pipe(
    (0, import_rxjs.filter)(
      ([, p]) => participant.identity === (p == null ? void 0 : p.identity) || !p && participant.identity === room.localParticipant.identity
    ),
    (0, import_rxjs.map)(([encrypted]) => encrypted),
    (0, import_rxjs.startWith)(
      participant instanceof import_livekit_client8.LocalParticipant ? participant.isE2EEEnabled : participant.isEncrypted
    )
  );
}

// src/components/mediaTrack.ts
var import_livekit_client9 = require("livekit-client");
var import_rxjs2 = require("rxjs");

// src/styles-interface/class-prefixer.ts
function prefixClass(unprefixedClassName) {
  return `${cssPrefix}-${unprefixedClassName}`;
}

// src/components/mediaTrack.ts
function setupMediaTrack(trackIdentifier) {
  const initialPub = getTrackByIdentifier(trackIdentifier);
  const trackObserver = observeParticipantMedia(trackIdentifier.participant).pipe(
    (0, import_rxjs2.map)(() => {
      return getTrackByIdentifier(trackIdentifier);
    }),
    (0, import_rxjs2.startWith)(initialPub)
  );
  const className = prefixClass(
    trackIdentifier.source === import_livekit_client9.Track.Source.Camera || trackIdentifier.source === import_livekit_client9.Track.Source.ScreenShare ? "participant-media-video" : "participant-media-audio"
  );
  return { className, trackObserver };
}
function getTrackByIdentifier(options) {
  if (isTrackReference(options)) {
    return options.publication;
  } else {
    const { source, name, participant } = options;
    if (source && name) {
      return participant.getTracks().find((pub) => pub.source === source && pub.trackName === name);
    } else if (name) {
      return participant.getTrackByName(name);
    } else if (source) {
      return participant.getTrack(source);
    } else {
      throw new Error("At least one of source and name needs to be defined");
    }
  }
}

// src/observables/participant.ts
function observeParticipantEvents(participant, ...events) {
  const observable = new import_rxjs3.Observable((subscribe) => {
    const onParticipantUpdate = () => {
      subscribe.next(participant);
    };
    events.forEach((evt) => {
      participant.on(evt, onParticipantUpdate);
    });
    const unsubscribe = () => {
      events.forEach((evt) => {
        participant.off(evt, onParticipantUpdate);
      });
    };
    return unsubscribe;
  }).pipe((0, import_rxjs3.startWith)(participant));
  return observable;
}
function observeParticipantMedia(participant) {
  const participantObserver = observeParticipantEvents(
    participant,
    import_livekit_client10.ParticipantEvent.TrackMuted,
    import_livekit_client10.ParticipantEvent.TrackUnmuted,
    import_livekit_client10.ParticipantEvent.ParticipantPermissionsChanged,
    // ParticipantEvent.IsSpeakingChanged,
    import_livekit_client10.ParticipantEvent.TrackPublished,
    import_livekit_client10.ParticipantEvent.TrackUnpublished,
    import_livekit_client10.ParticipantEvent.LocalTrackPublished,
    import_livekit_client10.ParticipantEvent.LocalTrackUnpublished,
    import_livekit_client10.ParticipantEvent.MediaDevicesError,
    import_livekit_client10.ParticipantEvent.TrackSubscriptionStatusChanged
    // ParticipantEvent.ConnectionQualityChanged,
  ).pipe(
    (0, import_rxjs3.map)((p) => {
      const { isMicrophoneEnabled, isCameraEnabled, isScreenShareEnabled } = p;
      const microphoneTrack = p.getTrack(import_livekit_client10.Track.Source.Microphone);
      const cameraTrack = p.getTrack(import_livekit_client10.Track.Source.Camera);
      const participantMedia = {
        isCameraEnabled,
        isMicrophoneEnabled,
        isScreenShareEnabled,
        cameraTrack,
        microphoneTrack,
        participant: p
      };
      return participantMedia;
    })
  );
  return participantObserver;
}
function createTrackObserver(participant, options) {
  return observeParticipantMedia(participant).pipe(
    (0, import_rxjs3.map)(() => {
      return { publication: getTrackByIdentifier(options) };
    })
  );
}
function participantInfoObserver(participant) {
  const observer = observeParticipantEvents(
    participant,
    import_livekit_client10.ParticipantEvent.ParticipantMetadataChanged
    // ParticipantEvent.LocalTrackPublished,
  ).pipe(
    (0, import_rxjs3.map)(({ name, identity, metadata }) => {
      return {
        name,
        identity,
        metadata
      };
    }),
    (0, import_rxjs3.startWith)({
      name: participant.name,
      identity: participant.identity,
      metadata: participant.metadata
    })
  );
  return observer;
}
function createConnectionQualityObserver(participant) {
  const observer = participantEventSelector(
    participant,
    import_livekit_client10.ParticipantEvent.ConnectionQualityChanged
  ).pipe(
    (0, import_rxjs3.map)(([quality]) => quality),
    (0, import_rxjs3.startWith)(participant.connectionQuality)
  );
  return observer;
}
function participantEventSelector(participant, event) {
  const observable = new import_rxjs3.Observable((subscribe) => {
    const update = (...params) => {
      subscribe.next(params);
    };
    participant.on(event, update);
    const unsubscribe = () => {
      participant.off(event, update);
    };
    return unsubscribe;
  });
  return observable;
}
function mutedObserver(trackRef) {
  var _a, _b, _c, _d;
  return observeParticipantEvents(
    trackRef.participant,
    import_livekit_client10.ParticipantEvent.TrackMuted,
    import_livekit_client10.ParticipantEvent.TrackUnmuted,
    import_livekit_client10.ParticipantEvent.TrackSubscribed,
    import_livekit_client10.ParticipantEvent.TrackUnsubscribed,
    import_livekit_client10.ParticipantEvent.LocalTrackPublished,
    import_livekit_client10.ParticipantEvent.LocalTrackUnpublished
  ).pipe(
    (0, import_rxjs3.map)((participant) => {
      var _a2, _b2;
      const pub = (_a2 = trackRef.publication) != null ? _a2 : participant.getTrack(trackRef.source);
      return (_b2 = pub == null ? void 0 : pub.isMuted) != null ? _b2 : true;
    }),
    (0, import_rxjs3.startWith)(
      (_d = (_c = (_a = trackRef.publication) == null ? void 0 : _a.isMuted) != null ? _c : (_b = trackRef.participant.getTrack(trackRef.source)) == null ? void 0 : _b.isMuted) != null ? _d : true
    )
  );
}
function createIsSpeakingObserver(participant) {
  return participantEventSelector(participant, import_livekit_client10.ParticipantEvent.IsSpeakingChanged).pipe(
    (0, import_rxjs3.map)(([isSpeaking]) => isSpeaking)
  );
}
function connectedParticipantsObserver(room, options = {}) {
  var _a;
  let subscriber;
  const observable = new import_rxjs3.Observable((sub) => {
    subscriber = sub;
    return () => listener.unsubscribe();
  }).pipe((0, import_rxjs3.startWith)(Array.from(room.participants.values())));
  const additionalRoomEvents = (_a = options.additionalRoomEvents) != null ? _a : allParticipantRoomEvents;
  const roomEvents = Array.from(
    /* @__PURE__ */ new Set([
      import_livekit_client10.RoomEvent.ParticipantConnected,
      import_livekit_client10.RoomEvent.ParticipantDisconnected,
      import_livekit_client10.RoomEvent.ConnectionStateChanged,
      ...additionalRoomEvents
    ])
  );
  const listener = observeRoomEvents(room, ...roomEvents).subscribe(
    (r) => subscriber == null ? void 0 : subscriber.next(Array.from(r.participants.values()))
  );
  if (room.participants.size > 0) {
    subscriber == null ? void 0 : subscriber.next(Array.from(room.participants.values()));
  }
  return observable;
}
function connectedParticipantObserver(room, identity, options = {}) {
  var _a;
  const additionalEvents = (_a = options.additionalEvents) != null ? _a : allParticipantEvents;
  const observable = observeRoomEvents(
    room,
    import_livekit_client10.RoomEvent.ParticipantConnected,
    import_livekit_client10.RoomEvent.ParticipantDisconnected,
    import_livekit_client10.RoomEvent.ConnectionStateChanged
  ).pipe(
    (0, import_rxjs3.switchMap)((r) => {
      const participant = r.getParticipantByIdentity(identity);
      if (participant) {
        return observeParticipantEvents(participant, ...additionalEvents);
      } else {
        return new import_rxjs3.Observable((subscribe) => subscribe.next(void 0));
      }
    }),
    (0, import_rxjs3.startWith)(room.getParticipantByIdentity(identity))
  );
  return observable;
}
function participantPermissionObserver(participant) {
  const observer = participantEventSelector(
    participant,
    import_livekit_client10.ParticipantEvent.ParticipantPermissionsChanged
  ).pipe(
    (0, import_rxjs3.map)(() => participant.permissions),
    (0, import_rxjs3.startWith)(participant.permissions)
  );
  return observer;
}

// src/components/mediaToggle.ts
function setupMediaToggle(source, room, options) {
  const { localParticipant } = room;
  const getSourceEnabled = (source2, localParticipant2) => {
    let isEnabled = false;
    switch (source2) {
      case import_livekit_client11.Track.Source.Camera:
        isEnabled = localParticipant2.isCameraEnabled;
        break;
      case import_livekit_client11.Track.Source.Microphone:
        isEnabled = localParticipant2.isMicrophoneEnabled;
        break;
      case import_livekit_client11.Track.Source.ScreenShare:
        isEnabled = localParticipant2.isScreenShareEnabled;
        break;
      default:
        break;
    }
    return isEnabled;
  };
  const enabledObserver = observeParticipantMedia(localParticipant).pipe(
    (0, import_rxjs4.map)((media) => {
      return getSourceEnabled(source, media.participant);
    }),
    (0, import_rxjs4.startWith)(getSourceEnabled(source, localParticipant))
  );
  const pendingSubject = new import_rxjs4.Subject();
  const toggle = (forceState, captureOptions) => __async(this, null, function* () {
    try {
      captureOptions != null ? captureOptions : captureOptions = options;
      pendingSubject.next(true);
      switch (source) {
        case import_livekit_client11.Track.Source.Camera:
          yield localParticipant.setCameraEnabled(
            forceState != null ? forceState : !localParticipant.isCameraEnabled,
            captureOptions
          );
          break;
        case import_livekit_client11.Track.Source.Microphone:
          yield localParticipant.setMicrophoneEnabled(
            forceState != null ? forceState : !localParticipant.isMicrophoneEnabled,
            captureOptions
          );
          break;
        case import_livekit_client11.Track.Source.ScreenShare:
          yield localParticipant.setScreenShareEnabled(
            forceState != null ? forceState : !localParticipant.isScreenShareEnabled,
            captureOptions
          );
          break;
        default:
          break;
      }
    } finally {
      pendingSubject.next(false);
    }
  });
  const className = prefixClass("button");
  return {
    className,
    toggle,
    enabledObserver,
    pendingObserver: pendingSubject.asObservable()
  };
}
function setupManualToggle() {
  let state = false;
  const enabledSubject = new import_rxjs4.Subject();
  const pendingSubject = new import_rxjs4.Subject();
  const toggle = (forceState) => __async(this, null, function* () {
    pendingSubject.next(true);
    state = forceState != null ? forceState : !state;
    enabledSubject.next(state);
    pendingSubject.next(false);
  });
  const className = prefixClass("button");
  return {
    className,
    toggle,
    enabledObserver: enabledSubject.asObservable(),
    pendingObserver: pendingSubject.asObservable()
  };
}

// src/components/mediaDeviceSelect.ts
var import_livekit_client12 = require("livekit-client");
var import_rxjs5 = require("rxjs");
function setupDeviceSelector(kind, room, localTrack) {
  const activeDeviceSubject = new import_rxjs5.BehaviorSubject(void 0);
  const activeDeviceObservable = room ? createActiveDeviceObservable(room, kind) : activeDeviceSubject.asObservable();
  const setActiveMediaDevice = (_0, ..._1) => __async(this, [_0, ..._1], function* (id, options = {}) {
    var _a, _b, _c;
    if (room) {
      log.debug(`Switching active device of kind "${kind}" with id ${id}.`);
      yield room.switchActiveDevice(kind, id, options.exact);
      const actualDeviceId = (_a = room.getActiveDevice(kind)) != null ? _a : id;
      if (actualDeviceId !== id && id !== "default") {
        log.info(
          `We tried to select the device with id (${id}), but the browser decided to select the device with id (${actualDeviceId}) instead.`
        );
      }
      let targetTrack = void 0;
      if (kind === "audioinput")
        targetTrack = (_b = room.localParticipant.getTrack(import_livekit_client12.Track.Source.Microphone)) == null ? void 0 : _b.track;
      else if (kind === "videoinput") {
        targetTrack = (_c = room.localParticipant.getTrack(import_livekit_client12.Track.Source.Camera)) == null ? void 0 : _c.track;
      }
      const useDefault = id === "default" && !targetTrack || id === "default" && (targetTrack == null ? void 0 : targetTrack.mediaStreamTrack.label.startsWith("Default"));
      activeDeviceSubject.next(useDefault ? id : actualDeviceId);
    } else if (localTrack) {
      yield localTrack.setDeviceId(options.exact ? { exact: id } : id);
      const actualId = yield localTrack.getDeviceId();
      activeDeviceSubject.next(
        id === "default" && localTrack.mediaStreamTrack.label.startsWith("Default") ? id : actualId
      );
    } else if (activeDeviceSubject.value !== id) {
      log.warn(
        "device switch skipped, please provide either a room or a local track to switch on. "
      );
      activeDeviceSubject.next(id);
    }
  });
  const className = prefixClass("media-device-select");
  return {
    className,
    activeDeviceObservable,
    setActiveMediaDevice
  };
}

// src/components/disconnectButton.ts
function setupDisconnectButton(room) {
  const disconnect = (stopTracks) => {
    room.disconnect(stopTracks);
  };
  const className = prefixClass("disconnect-button");
  return { className, disconnect };
}

// src/components/connectionQualityIndicator.ts
function setupConnectionQualityIndicator(participant) {
  const className = prefixClass("connection-quality");
  const connectionQualityObserver = createConnectionQualityObserver(participant);
  return { className, connectionQualityObserver };
}

// src/components/trackMutedIndicator.ts
var import_livekit_client13 = require("livekit-client");
function setupTrackMutedIndicator(trackRef) {
  let classForSource = "track-muted-indicator-camera";
  switch (trackRef.source) {
    case import_livekit_client13.Track.Source.Camera:
      classForSource = "track-muted-indicator-camera";
      break;
    case import_livekit_client13.Track.Source.Microphone:
      classForSource = "track-muted-indicator-microphone";
      break;
    default:
      break;
  }
  const className = prefixClass(classForSource);
  const mediaMutedObserver = mutedObserver(trackRef);
  return { className, mediaMutedObserver };
}

// src/components/participantName.ts
function setupParticipantName(participant) {
  const infoObserver = participantInfoObserver(participant);
  return { className: "lk-participant-name", infoObserver };
}

// src/components/participantTile.ts
function setupParticipantTile() {
  const className = prefixClass("participant-tile");
  return {
    className
  };
}

// src/components/chat.ts
var import_livekit_client15 = require("livekit-client");
var import_rxjs7 = require("rxjs");

// src/observables/dataChannel.ts
var import_livekit_client14 = require("livekit-client");
var import_rxjs6 = require("rxjs");
var DataTopic = {
  CHAT: "lk-chat-topic"
};
function sendMessage(_0, _1, _2) {
  return __async(this, arguments, function* (localParticipant, payload, topic, options = {}) {
    const { kind, destination } = options;
    yield localParticipant.publishData(payload, kind != null ? kind : import_livekit_client14.DataPacket_Kind.RELIABLE, {
      destination,
      topic
    });
  });
}
function setupDataMessageHandler(room, topic, onMessage) {
  const messageObservable = createDataObserver(room).pipe(
    (0, import_rxjs6.filter)(([, , , messageTopic]) => topic === void 0 || messageTopic === topic),
    (0, import_rxjs6.map)(([payload, participant, , messageTopic]) => {
      const msg = {
        payload,
        topic: messageTopic,
        from: participant
      };
      onMessage == null ? void 0 : onMessage(msg);
      return msg;
    })
  );
  let isSendingSubscriber;
  const isSendingObservable = new import_rxjs6.Observable((subscriber) => {
    isSendingSubscriber = subscriber;
  });
  const send = (_0, ..._1) => __async(this, [_0, ..._1], function* (payload, options = {}) {
    isSendingSubscriber.next(true);
    try {
      yield sendMessage(room.localParticipant, payload, topic, options);
    } finally {
      isSendingSubscriber.next(false);
    }
  });
  return { messageObservable, isSendingObservable, send };
}

// src/components/chat.ts
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var topicSubjectMap = /* @__PURE__ */ new Map();
var encode = (message) => encoder.encode(JSON.stringify({ message: message.message, timestamp: message.timestamp }));
var decode = (message) => JSON.parse(decoder.decode(message));
function setupChat(room, options) {
  var _a, _b;
  const onDestroyObservable = new import_rxjs7.Subject();
  const { messageDecoder, messageEncoder, channelTopic } = options != null ? options : {};
  const topic = channelTopic != null ? channelTopic : DataTopic.CHAT;
  let needsSetup = false;
  if (!topicSubjectMap.has(room)) {
    needsSetup = true;
  }
  const topicMap = (_a = topicSubjectMap.get(room)) != null ? _a : /* @__PURE__ */ new Map();
  const messageSubject = (_b = topicMap.get(topic)) != null ? _b : new import_rxjs7.Subject();
  topicMap.set(topic, messageSubject);
  topicSubjectMap.set(room, topicMap);
  if (needsSetup) {
    const { messageObservable } = setupDataMessageHandler(room, topic);
    messageObservable.pipe((0, import_rxjs7.takeUntil)(onDestroyObservable)).subscribe(messageSubject);
  }
  const finalMessageDecoder = messageDecoder != null ? messageDecoder : decode;
  const messagesObservable = messageSubject.pipe(
    (0, import_rxjs7.map)((msg) => {
      const parsedMessage = finalMessageDecoder(msg.payload);
      const newMessage = __spreadProps(__spreadValues({}, parsedMessage), { from: msg.from });
      return newMessage;
    }),
    (0, import_rxjs7.scan)((acc, value) => [...acc, value], []),
    (0, import_rxjs7.takeUntil)(onDestroyObservable)
  );
  const isSending$ = new import_rxjs7.BehaviorSubject(false);
  const finalMessageEncoder = messageEncoder != null ? messageEncoder : encode;
  const send = (message) => __async(this, null, function* () {
    const timestamp = Date.now();
    const encodedMsg = finalMessageEncoder({ message, timestamp });
    isSending$.next(true);
    try {
      yield sendMessage(room.localParticipant, encodedMsg, topic, {
        kind: import_livekit_client15.DataPacket_Kind.RELIABLE
      });
      messageSubject.next({
        payload: encodedMsg,
        topic,
        from: room.localParticipant
      });
    } finally {
      isSending$.next(false);
    }
  });
  function destroy() {
    onDestroyObservable.next();
    onDestroyObservable.complete();
    topicSubjectMap.clear();
  }
  room.once(import_livekit_client15.RoomEvent.Disconnected, destroy);
  return { messageObservable: messagesObservable, isSendingObservable: isSending$, send };
}

// src/components/startAudio.ts
function setupStartAudio() {
  const handleStartAudioPlayback = (room) => __async(this, null, function* () {
    log.info("Start Audio for room: ", room);
    yield room.startAudio();
  });
  const className = prefixClass("start-audio-button");
  return { className, roomAudioPlaybackAllowedObservable, handleStartAudioPlayback };
}

// src/components/startVideo.ts
function setupStartVideo() {
  const handleStartVideoPlayback = (room) => __async(this, null, function* () {
    log.info("Start Video for room: ", room);
    yield room.startVideo();
  });
  const className = prefixClass("start-audio-button");
  return { className, roomVideoPlaybackAllowedObservable, handleStartVideoPlayback };
}

// src/components/chatToggle.ts
function setupChatToggle() {
  const className = [prefixClass("button"), prefixClass("chat-toggle")].join(" ");
  return { className };
}

// src/components/focusToggle.ts
function setupFocusToggle() {
  const className = [prefixClass("button"), prefixClass("focus-toggle-button")].join(" ");
  return { className };
}

// src/components/clearPinButton.ts
function setupClearPinButton() {
  const className = "lk-clear-pin-button lk-button";
  return { className };
}

// src/components/room.ts
function setupLiveKitRoom() {
  const className = "lk-room-container";
  return { className };
}

// src/observables/track.ts
var import_livekit_client16 = require("livekit-client");
var import_rxjs8 = require("rxjs");
function trackObservable(track) {
  const trackObserver = observeTrackEvents(
    track,
    import_livekit_client16.TrackEvent.Muted,
    import_livekit_client16.TrackEvent.Unmuted,
    import_livekit_client16.TrackEvent.Subscribed,
    import_livekit_client16.TrackEvent.Unsubscribed
  );
  return trackObserver;
}
function observeTrackEvents(track, ...events) {
  const observable = new import_rxjs8.Observable((subscribe) => {
    const onTrackUpdate = () => {
      subscribe.next(track);
    };
    events.forEach((evt) => {
      track.on(evt, onTrackUpdate);
    });
    const unsubscribe = () => {
      events.forEach((evt) => {
        track.off(evt, onTrackUpdate);
      });
    };
    return unsubscribe;
  }).pipe((0, import_rxjs8.startWith)(track));
  return observable;
}
function getTrackReferences(room, sources, onlySubscribedTracks = true) {
  const localParticipant = room.localParticipant;
  const allParticipants = [localParticipant, ...Array.from(room.participants.values())];
  const trackReferences = [];
  allParticipants.forEach((participant) => {
    sources.forEach((source) => {
      const sourceReferences = Array.from(
        participant.tracks.values()
      ).filter(
        (track) => track.source === source && // either return all or only the ones that are subscribed
        (!onlySubscribedTracks || track.track)
      ).map((track) => {
        return {
          participant,
          publication: track,
          source: track.source
        };
      });
      trackReferences.push(...sourceReferences);
    });
  });
  return { trackReferences, participants: allParticipants };
}
function trackReferencesObservable(room, sources, options) {
  var _a, _b;
  const additionalRoomEvents = (_a = options.additionalRoomEvents) != null ? _a : allParticipantRoomEvents;
  const onlySubscribedTracks = (_b = options.onlySubscribed) != null ? _b : true;
  const roomEvents = Array.from(
    (/* @__PURE__ */ new Set([
      import_livekit_client16.RoomEvent.ParticipantConnected,
      import_livekit_client16.RoomEvent.ParticipantDisconnected,
      import_livekit_client16.RoomEvent.ConnectionStateChanged,
      import_livekit_client16.RoomEvent.LocalTrackPublished,
      import_livekit_client16.RoomEvent.LocalTrackUnpublished,
      import_livekit_client16.RoomEvent.TrackPublished,
      import_livekit_client16.RoomEvent.TrackUnpublished,
      import_livekit_client16.RoomEvent.TrackSubscriptionStatusChanged,
      ...additionalRoomEvents
    ])).values()
  );
  const observable = observeRoomEvents(room, ...roomEvents).pipe(
    (0, import_rxjs8.map)((room2) => {
      const data = getTrackReferences(room2, sources, onlySubscribedTracks);
      log.debug(`TrackReference[] was updated. (length ${data.trackReferences.length})`, data);
      return data;
    }),
    (0, import_rxjs8.startWith)(getTrackReferences(room, sources, onlySubscribedTracks))
  );
  return observable;
}

// src/observables/dom-event.ts
var import_rxjs9 = require("rxjs");
function createInteractingObservable(htmlElement, inactiveAfter = 1e3) {
  if (htmlElement === null)
    return (0, import_rxjs9.of)(false);
  const move$ = (0, import_rxjs9.fromEvent)(htmlElement, "mousemove", { passive: true }).pipe((0, import_rxjs9.map)(() => true));
  const moveAndStop$ = move$.pipe(
    (0, import_rxjs9.timeout)({
      each: inactiveAfter,
      with: () => (0, import_rxjs9.concat)((0, import_rxjs9.of)(false), moveAndStop$.pipe((0, import_rxjs9.skipUntil)(move$)))
    }),
    (0, import_rxjs9.distinctUntilChanged)()
  );
  return moveAndStop$;
}

// src/persistent-storage/local-storage-helpers.ts
function saveToLocalStorage(key, value) {
  if (typeof localStorage === "undefined") {
    log.error("Local storage is not available.");
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    log.error(`Error setting item to local storage: ${error}`);
  }
}
function loadFromLocalStorage(key) {
  if (typeof localStorage === "undefined") {
    log.error("Local storage is not available.");
    return void 0;
  }
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      log.warn(`Item with key ${key} does not exist in local storage.`);
      return void 0;
    }
    return JSON.parse(item);
  } catch (error) {
    log.error(`Error getting item from local storage: ${error}`);
    return void 0;
  }
}
function createLocalStorageInterface(key) {
  return {
    load: () => loadFromLocalStorage(key),
    save: (value) => saveToLocalStorage(key, value)
  };
}

// src/persistent-storage/user-choices.ts
var USER_CHOICES_KEY = `${cssPrefix}-user-choices`;
var defaultUserChoices = {
  videoEnabled: true,
  audioEnabled: true,
  videoDeviceId: "",
  audioDeviceId: "",
  username: "",
  e2ee: false,
  sharedPassphrase: ""
};
var { load, save } = createLocalStorageInterface(USER_CHOICES_KEY);
function saveUserChoices(userChoices, preventSave = false) {
  if (preventSave === true) {
    return;
  }
  const _a = userChoices, { e2ee, sharedPassphrase } = _a, toSave = __objRest(_a, ["e2ee", "sharedPassphrase"]);
  save(toSave);
}
function loadUserChoices(defaults, preventLoad = false) {
  var _a, _b, _c, _d, _e, _f, _g;
  const fallback = {
    videoEnabled: (_a = defaults == null ? void 0 : defaults.videoEnabled) != null ? _a : defaultUserChoices.videoEnabled,
    audioEnabled: (_b = defaults == null ? void 0 : defaults.audioEnabled) != null ? _b : defaultUserChoices.audioEnabled,
    videoDeviceId: (_c = defaults == null ? void 0 : defaults.videoDeviceId) != null ? _c : defaultUserChoices.videoDeviceId,
    audioDeviceId: (_d = defaults == null ? void 0 : defaults.audioDeviceId) != null ? _d : defaultUserChoices.audioDeviceId,
    username: (_e = defaults == null ? void 0 : defaults.username) != null ? _e : defaultUserChoices.username,
    e2ee: (_f = defaults == null ? void 0 : defaults.e2ee) != null ? _f : defaultUserChoices.e2ee,
    sharedPassphrase: (_g = defaults == null ? void 0 : defaults.sharedPassphrase) != null ? _g : defaultUserChoices.sharedPassphrase
  };
  if (preventLoad) {
    return fallback;
  } else {
    const maybeLoadedObject = load();
    const result = __spreadValues(__spreadValues({}, fallback), maybeLoadedObject != null ? maybeLoadedObject : {});
    return result;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataTopic,
  GRID_LAYOUTS,
  PIN_DEFAULT_STATE,
  WIDGET_DEFAULT_STATE,
  activeSpeakerObserver,
  allParticipantEvents,
  allParticipantRoomEvents,
  allRemoteParticipantEvents,
  allRemoteParticipantRoomEvents,
  attachIfSubscribed,
  computeMenuPosition,
  connectedParticipantObserver,
  connectedParticipantsObserver,
  connectionStateObserver,
  createActiveDeviceObservable,
  createConnectionQualityObserver,
  createDataObserver,
  createDefaultGrammar,
  createEmailRegExp,
  createInteractingObservable,
  createIsSpeakingObserver,
  createMediaDeviceObserver,
  createTrackObserver,
  createUrlRegExp,
  cssPrefix,
  encryptionStatusObservable,
  getScrollBarWidth,
  getTrackByIdentifier,
  getTrackReferenceId,
  getTrackReferenceSource,
  isEqualTrackRef,
  isLocal,
  isMobileBrowser,
  isParticipantSourcePinned,
  isParticipantTrackReferencePinned,
  isPlaceholderReplacement,
  isRemote,
  isSourceWitOptions,
  isSourcesWithOptions,
  isTrackReference,
  isTrackReferencePinned,
  isTrackReferencePlaceholder,
  isWeb,
  loadUserChoices,
  log,
  mutedObserver,
  observeParticipantEvents,
  observeParticipantMedia,
  observeRoomEvents,
  observeTrackEvents,
  participantEventSelector,
  participantInfoObserver,
  participantPermissionObserver,
  roomAudioPlaybackAllowedObservable,
  roomEventSelector,
  roomInfoObserver,
  roomObserver,
  roomVideoPlaybackAllowedObservable,
  saveUserChoices,
  screenShareObserver,
  selectGridLayout,
  sendMessage,
  setDifference,
  setLogExtension,
  setLogLevel,
  setupChat,
  setupChatToggle,
  setupClearPinButton,
  setupConnectionQualityIndicator,
  setupDataMessageHandler,
  setupDeviceSelector,
  setupDisconnectButton,
  setupFocusToggle,
  setupLiveKitRoom,
  setupManualToggle,
  setupMediaToggle,
  setupMediaTrack,
  setupParticipantName,
  setupParticipantTile,
  setupStartAudio,
  setupStartVideo,
  setupTrackMutedIndicator,
  sortParticipants,
  sortTrackReferences,
  supportsScreenSharing,
  tokenize,
  trackObservable,
  trackReferencesObservable,
  updatePages,
  wasClickOutside
});
//# sourceMappingURL=index.js.map