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
  AudioConference: () => AudioConference,
  AudioTrack: () => AudioTrack,
  AudioVisualizer: () => AudioVisualizer,
  CameraDisabledIcon: () => CameraDisabledIcon_default,
  CameraIcon: () => CameraIcon_default,
  CarouselLayout: () => CarouselLayout,
  CarouselView: () => CarouselView,
  Chat: () => Chat,
  ChatCloseIcon: () => ChatCloseIcon_default,
  ChatEntry: () => ChatEntry,
  ChatIcon: () => ChatIcon_default,
  ChatToggle: () => ChatToggle,
  Chevron: () => Chevron_default,
  ClearPinButton: () => ClearPinButton,
  ConnectionQualityIndicator: () => ConnectionQualityIndicator,
  ConnectionState: () => ConnectionState3,
  ConnectionStateToast: () => ConnectionStateToast,
  ControlBar: () => ControlBar,
  DisconnectButton: () => DisconnectButton,
  FocusLayout: () => FocusLayout,
  FocusLayoutContainer: () => FocusLayoutContainer,
  FocusToggle: () => FocusToggle,
  FocusToggleIcon: () => FocusToggleIcon_default,
  GearIcon: () => GearIcon_default,
  GridLayout: () => GridLayout,
  LKFeatureContext: () => LKFeatureContext,
  LayoutContext: () => LayoutContext,
  LayoutContextProvider: () => LayoutContextProvider,
  LeaveIcon: () => LeaveIcon_default,
  LiveKitRoom: () => LiveKitRoom,
  LockLockedIcon: () => LockLockedIcon_default,
  MediaDeviceMenu: () => MediaDeviceMenu,
  MediaDeviceSelect: () => MediaDeviceSelect,
  MicDisabledIcon: () => MicDisabledIcon_default,
  MicIcon: () => MicIcon_default,
  ParticipantAudioTile: () => ParticipantAudioTile,
  ParticipantContext: () => ParticipantContext,
  ParticipantContextIfNeeded: () => ParticipantContextIfNeeded,
  ParticipantLoop: () => ParticipantLoop,
  ParticipantName: () => ParticipantName,
  ParticipantPlaceholder: () => ParticipantPlaceholder_default,
  ParticipantTile: () => ParticipantTile,
  PreJoin: () => PreJoin,
  QualityExcellentIcon: () => QualityExcellentIcon_default,
  QualityGoodIcon: () => QualityGoodIcon_default,
  QualityPoorIcon: () => QualityPoorIcon_default,
  QualityUnknownIcon: () => QualityUnknownIcon_default,
  RoomAudioRenderer: () => RoomAudioRenderer,
  RoomContext: () => RoomContext,
  RoomName: () => RoomName,
  ScreenShareIcon: () => ScreenShareIcon_default,
  ScreenShareStopIcon: () => ScreenShareStopIcon_default,
  SpinnerIcon: () => SpinnerIcon_default,
  StartAudio: () => StartAudio,
  Toast: () => Toast,
  TrackContext: () => TrackContext,
  TrackLoop: () => TrackLoop,
  TrackMutedIndicator: () => TrackMutedIndicator,
  TrackRefContext: () => TrackRefContext,
  TrackToggle: () => TrackToggle,
  UnfocusToggleIcon: () => UnfocusToggleIcon_default,
  VideoConference: () => VideoConference,
  VideoTrack: () => VideoTrack,
  formatChatMessageLinks: () => formatChatMessageLinks,
  isTrackReference: () => import_components_core54.isTrackReference,
  setLogExtension: () => import_components_core54.setLogExtension,
  setLogLevel: () => import_components_core54.setLogLevel,
  useAudioPlayback: () => useAudioPlayback,
  useChat: () => useChat,
  useChatToggle: () => useChatToggle,
  useClearPinButton: () => useClearPinButton,
  useConnectionQualityIndicator: () => useConnectionQualityIndicator,
  useConnectionState: () => useConnectionState,
  useCreateLayoutContext: () => useCreateLayoutContext,
  useDataChannel: () => useDataChannel,
  useDisconnectButton: () => useDisconnectButton,
  useEnsureCreateLayoutContext: () => useEnsureCreateLayoutContext,
  useEnsureLayoutContext: () => useEnsureLayoutContext,
  useEnsureParticipant: () => useEnsureParticipant,
  useEnsureRoom: () => useEnsureRoom,
  useEnsureTrackRef: () => useEnsureTrackRef,
  useEnsureTrackReference: () => useEnsureTrackReference,
  useFacingMode: () => useFacingMode,
  useFeatureContext: () => useFeatureContext,
  useFocusToggle: () => useFocusToggle,
  useGridLayout: () => useGridLayout,
  useIsEncrypted: () => useIsEncrypted,
  useIsMuted: () => useIsMuted,
  useIsSpeaking: () => useIsSpeaking,
  useLayoutContext: () => useLayoutContext,
  useLiveKitRoom: () => useLiveKitRoom,
  useLocalParticipant: () => useLocalParticipant,
  useLocalParticipantPermissions: () => useLocalParticipantPermissions,
  useMaybeLayoutContext: () => useMaybeLayoutContext,
  useMaybeParticipantContext: () => useMaybeParticipantContext,
  useMaybeRoomContext: () => useMaybeRoomContext,
  useMaybeTrackContext: () => useMaybeTrackContext,
  useMaybeTrackRefContext: () => useMaybeTrackRefContext,
  useMediaDeviceSelect: () => useMediaDeviceSelect,
  useMediaDevices: () => useMediaDevices,
  useMediaTrack: () => useMediaTrack,
  useMediaTrackByName: () => useMediaTrackByName,
  useMultibandTrackVolume: () => useMultibandTrackVolume,
  usePagination: () => usePagination,
  useParticipantContext: () => useParticipantContext,
  useParticipantInfo: () => useParticipantInfo,
  useParticipantPermissions: () => useParticipantPermissions,
  useParticipantTile: () => useParticipantTile,
  useParticipants: () => useParticipants,
  usePersistentUserChoices: () => usePersistentUserChoices,
  usePinnedTracks: () => usePinnedTracks,
  usePreviewDevice: () => usePreviewDevice,
  usePreviewTracks: () => usePreviewTracks,
  useRemoteParticipant: () => useRemoteParticipant,
  useRemoteParticipants: () => useRemoteParticipants,
  useRoomContext: () => useRoomContext,
  useRoomInfo: () => useRoomInfo,
  useSortedParticipants: () => useSortedParticipants,
  useSpeakingParticipants: () => useSpeakingParticipants,
  useStartAudio: () => useStartAudio,
  useStartVideo: () => useStartVideo,
  useSwipe: () => useSwipe,
  useToken: () => useToken,
  useTrack: () => useTrack,
  useTrackByName: () => useTrackByName,
  useTrackContext: () => useTrackContext,
  useTrackMutedIndicator: () => useTrackMutedIndicator,
  useTrackRefContext: () => useTrackRefContext,
  useTrackToggle: () => useTrackToggle,
  useTrackVolume: () => useTrackVolume,
  useTracks: () => useTracks,
  useVisualStableUpdate: () => useVisualStableUpdate
});
module.exports = __toCommonJS(src_exports);

// src/components/controls/ClearPinButton.tsx
var React49 = __toESM(require("react"));

// src/hooks/useAudioPlayback.ts
var React9 = __toESM(require("react"));

// src/hooks/internal/useResizeObserver.ts
var React = __toESM(require("react"));
var import_latest = __toESM(require("@react-hook/latest"));
function useResizeObserver(target, callback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = (0, import_latest.default)(callback);
  React.useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target.current;
    if (!targetEl)
      return;
    function cb(entry, observer) {
      if (didUnsubscribe)
        return;
      storedCallback.current(entry, observer);
    }
    resizeObserver == null ? void 0 : resizeObserver.subscribe(targetEl, cb);
    return () => {
      didUnsubscribe = true;
      resizeObserver == null ? void 0 : resizeObserver.unsubscribe(targetEl, cb);
    };
  }, [target.current, resizeObserver, storedCallback]);
  return resizeObserver == null ? void 0 : resizeObserver.observer;
}
function createResizeObserver() {
  let ticking = false;
  let allEntries = [];
  const callbacks = /* @__PURE__ */ new Map();
  if (typeof window === "undefined") {
    return;
  }
  const observer = new ResizeObserver((entries, obs) => {
    allEntries = allEntries.concat(entries);
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const triggered = /* @__PURE__ */ new Set();
        for (let i = 0; i < allEntries.length; i++) {
          if (triggered.has(allEntries[i].target))
            continue;
          triggered.add(allEntries[i].target);
          const cbs = callbacks.get(allEntries[i].target);
          cbs == null ? void 0 : cbs.forEach((cb) => cb(allEntries[i], obs));
        }
        allEntries = [];
        ticking = false;
      });
    }
    ticking = true;
  });
  return {
    observer,
    subscribe(target, callback) {
      var _a;
      observer.observe(target);
      const cbs = (_a = callbacks.get(target)) != null ? _a : [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target, callback) {
      var _a;
      const cbs = (_a = callbacks.get(target)) != null ? _a : [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1)
        cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    }
  };
}
var _resizeObserver;
var getResizeObserver = () => !_resizeObserver ? _resizeObserver = createResizeObserver() : _resizeObserver;
var useSize = (target) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);
  const resizeCallback = React.useCallback(
    (entry) => setSize(entry.contentRect),
    []
  );
  useResizeObserver(target, resizeCallback);
  return size;
};

// src/hooks/internal/useObservableState.ts
var React2 = __toESM(require("react"));
function useObservableState(observable, startWith) {
  const [state, setState] = React2.useState(startWith);
  React2.useEffect(() => {
    if (typeof window === "undefined" || !observable)
      return;
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
}

// src/hooks/internal/useMediaQuery.ts
var React3 = __toESM(require("react"));
function useMediaQuery(query) {
  const getMatches = (query2) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query2).matches;
    }
    return false;
  };
  const [matches, setMatches] = React3.useState(getMatches(query));
  function handleChange() {
    setMatches(getMatches(query));
  }
  React3.useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);
  return matches;
}

// src/hooks/useAudioPlayback.ts
var import_components_core2 = require("@livekit/components-core");

// src/context/layout-context.ts
var import_components_core = require("@livekit/components-core");
var React4 = __toESM(require("react"));

// src/context/chat-context.ts
function chatReducer(state, action) {
  if (action.msg === "show_chat") {
    return __spreadProps(__spreadValues({}, state), { showChat: true, unreadMessages: 0 });
  } else if (action.msg === "hide_chat") {
    return __spreadProps(__spreadValues({}, state), { showChat: false });
  } else if (action.msg === "toggle_chat") {
    const newState = __spreadProps(__spreadValues({}, state), { showChat: !state.showChat });
    if (newState.showChat === true) {
      newState.unreadMessages = 0;
    }
    return newState;
  } else if (action.msg === "unread_msg") {
    return __spreadProps(__spreadValues({}, state), { unreadMessages: action.count });
  } else {
    return __spreadValues({}, state);
  }
}

// src/context/pin-context.ts
function pinReducer(state, action) {
  if (action.msg === "set_pin") {
    return [action.trackReference];
  } else if (action.msg === "clear_pin") {
    return [];
  } else {
    return __spreadValues({}, state);
  }
}

// src/context/layout-context.ts
var LayoutContext = React4.createContext(void 0);
function useLayoutContext() {
  const layoutContext = React4.useContext(LayoutContext);
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useEnsureLayoutContext(layoutContext) {
  const layout = useMaybeLayoutContext();
  layoutContext != null ? layoutContext : layoutContext = layout;
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useCreateLayoutContext() {
  const [pinState, pinDispatch] = React4.useReducer(pinReducer, import_components_core.PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React4.useReducer(chatReducer, import_components_core.WIDGET_DEFAULT_STATE);
  return {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useEnsureCreateLayoutContext(layoutContext) {
  const [pinState, pinDispatch] = React4.useReducer(pinReducer, import_components_core.PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React4.useReducer(chatReducer, import_components_core.WIDGET_DEFAULT_STATE);
  return layoutContext != null ? layoutContext : {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useMaybeLayoutContext() {
  return React4.useContext(LayoutContext);
}

// src/context/participant-context.ts
var React6 = __toESM(require("react"));

// src/context/track-reference-context.ts
var React5 = __toESM(require("react"));
var TrackRefContext = React5.createContext(
  void 0
);
var TrackContext = TrackRefContext;
function useTrackContext() {
  return useTrackRefContext();
}
function useTrackRefContext() {
  const trackReference = React5.useContext(TrackRefContext);
  if (!trackReference) {
    throw Error("tried to access track context outside of track context provider");
  }
  return trackReference;
}
function useMaybeTrackContext() {
  return useMaybeTrackRefContext();
}
function useMaybeTrackRefContext() {
  return React5.useContext(TrackRefContext);
}
function useEnsureTrackReference(track) {
  return useEnsureTrackRef(track);
}
function useEnsureTrackRef(trackRef) {
  const context = useMaybeTrackRefContext();
  const ref = trackRef != null ? trackRef : context;
  if (!ref) {
    throw new Error(
      "No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly"
    );
  }
  return ref;
}

// src/context/participant-context.ts
var ParticipantContext = React6.createContext(void 0);
function useParticipantContext() {
  const participant = React6.useContext(ParticipantContext);
  if (!participant) {
    throw Error("tried to access participant context outside of participant context provider");
  }
  return participant;
}
function useMaybeParticipantContext() {
  return React6.useContext(ParticipantContext);
}
function useEnsureParticipant(participant) {
  var _a;
  const context = useMaybeParticipantContext();
  const trackContext = useMaybeTrackRefContext();
  const p = (_a = participant != null ? participant : context) != null ? _a : trackContext == null ? void 0 : trackContext.participant;
  if (!p) {
    throw new Error(
      "No participant provided, make sure you are inside a participant context or pass the participant explicitly"
    );
  }
  return p;
}

// src/context/room-context.ts
var React7 = __toESM(require("react"));
var RoomContext = React7.createContext(void 0);
function useRoomContext() {
  const ctx = React7.useContext(RoomContext);
  if (!ctx) {
    throw Error("tried to access room context outside of livekit room component");
  }
  return ctx;
}
function useMaybeRoomContext() {
  return React7.useContext(RoomContext);
}
function useEnsureRoom(room) {
  const context = useMaybeRoomContext();
  const r = room != null ? room : context;
  if (!r) {
    throw new Error(
      "No room provided, make sure you are inside a Room context or pass the room explicitly"
    );
  }
  return r;
}

// src/context/feature-context.ts
var React8 = __toESM(require("react"));
var LKFeatureContext = React8.createContext(void 0);
function useFeatureContext(require2) {
  const ctx = React8.useContext(LKFeatureContext);
  if (require2 === true) {
    if (ctx) {
      return ctx;
    } else {
      throw Error("tried to access feature context, but none is present");
    }
  }
  return ctx;
}

// src/hooks/useAudioPlayback.ts
function useAudioPlayback(room) {
  const roomEnsured = useEnsureRoom(room);
  const startAudio = React9.useCallback(() => __async(this, null, function* () {
    yield roomEnsured.startAudio();
  }), [roomEnsured]);
  const observable = React9.useMemo(
    () => (0, import_components_core2.roomAudioPlaybackAllowedObservable)(roomEnsured),
    [roomEnsured]
  );
  const { canPlayAudio } = useObservableState(observable, {
    canPlayAudio: roomEnsured.canPlaybackAudio
  });
  return { canPlayAudio, startAudio };
}

// src/hooks/useClearPinButton.ts
var import_components_core3 = require("@livekit/components-core");
var React10 = __toESM(require("react"));

// src/mergeProps.ts
var import_clsx = __toESM(require("clsx"));
function chain(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function mergeProps(...args) {
  const result = __spreadValues({}, args[0]);
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];
      if (typeof a === "function" && typeof b === "function" && // This is a lot faster than a regex.
      key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= /* 'A' */
      65 && key.charCodeAt(2) <= /* 'Z' */
      90) {
        result[key] = chain(a, b);
      } else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string") {
        result[key] = (0, import_clsx.default)(a, b);
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
  }
  return result;
}

// src/hooks/useClearPinButton.ts
function useClearPinButton(props) {
  const { state, dispatch } = useLayoutContext().pin;
  const buttonProps = React10.useMemo(() => {
    const { className } = (0, import_components_core3.setupClearPinButton)();
    const mergedProps = mergeProps(props, {
      className,
      disabled: !(state == null ? void 0 : state.length),
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "clear_pin" });
      }
    });
    return mergedProps;
  }, [props, dispatch, state]);
  return { buttonProps };
}

// src/hooks/useConnectionQualityIndicator.ts
var import_components_core4 = require("@livekit/components-core");
var import_livekit_client = require("livekit-client");
var React11 = __toESM(require("react"));
function useConnectionQualityIndicator(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const { className, connectionQualityObserver } = React11.useMemo(
    () => (0, import_components_core4.setupConnectionQualityIndicator)(p),
    [p]
  );
  const quality = useObservableState(connectionQualityObserver, import_livekit_client.ConnectionQuality.Unknown);
  return { className, quality };
}

// src/hooks/useConnectionStatus.ts
var import_components_core5 = require("@livekit/components-core");
var React12 = __toESM(require("react"));
function useConnectionState(room) {
  const r = useEnsureRoom(room);
  const observable = React12.useMemo(() => (0, import_components_core5.connectionStateObserver)(r), [r]);
  const connectionState = useObservableState(observable, r.state);
  return connectionState;
}

// src/hooks/useDataChannel.ts
var import_components_core6 = require("@livekit/components-core");
var React13 = __toESM(require("react"));
function useDataChannel(topicOrCallback, callback) {
  const onMessage = typeof topicOrCallback === "function" ? topicOrCallback : callback;
  const topic = typeof topicOrCallback === "string" ? topicOrCallback : void 0;
  const room = useRoomContext();
  const { send, messageObservable, isSendingObservable } = React13.useMemo(
    () => (0, import_components_core6.setupDataMessageHandler)(room, topic, onMessage),
    [room, topic, onMessage]
  );
  const message = useObservableState(messageObservable, void 0);
  const isSending = useObservableState(isSendingObservable, false);
  return {
    message,
    send,
    isSending
  };
}

// src/hooks/useDisconnectButton.ts
var import_components_core7 = require("@livekit/components-core");
var import_livekit_client2 = require("livekit-client");
var React14 = __toESM(require("react"));
function useDisconnectButton(props) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const buttonProps = React14.useMemo(() => {
    const { className, disconnect } = (0, import_components_core7.setupDisconnectButton)(room);
    const mergedProps = mergeProps(props, {
      className,
      onClick: () => {
        var _a;
        return disconnect((_a = props.stopTracks) != null ? _a : true);
      },
      disabled: connectionState === import_livekit_client2.ConnectionState.Disconnected
    });
    return mergedProps;
  }, [room, props, connectionState]);
  return { buttonProps };
}

// src/hooks/useFacingMode.ts
var import_livekit_client3 = require("livekit-client");
function useFacingMode(trackReference) {
  if (trackReference.publication instanceof import_livekit_client3.LocalTrackPublication) {
    const localTrack = trackReference.publication.track;
    if (localTrack) {
      const { facingMode } = (0, import_livekit_client3.facingModeFromLocalTrack)(localTrack);
      return facingMode;
    }
  }
  return "undefined";
}

// src/hooks/useFocusToggle.ts
var import_components_core8 = require("@livekit/components-core");
var React15 = __toESM(require("react"));
function useFocusToggle({ trackRef, trackSource, participant, props }) {
  const p = useEnsureParticipant(participant);
  if (!trackRef && !trackSource) {
    throw new Error("trackRef or trackSource must be defined.");
  }
  const layoutContext = useMaybeLayoutContext();
  const { className } = React15.useMemo(() => (0, import_components_core8.setupFocusToggle)(), []);
  const inFocus = React15.useMemo(() => {
    if (trackRef) {
      return (0, import_components_core8.isTrackReferencePinned)(trackRef, layoutContext == null ? void 0 : layoutContext.pin.state);
    } else if (trackSource) {
      const track = p.getTrack(trackSource);
      if ((layoutContext == null ? void 0 : layoutContext.pin.state) && track) {
        return (0, import_components_core8.isTrackReferencePinned)(
          { participant: p, source: trackSource, publication: track },
          layoutContext.pin.state
        );
      } else {
        return false;
      }
    } else {
      throw new Error("trackRef or trackSource and participant must be defined.");
    }
  }, [trackRef, layoutContext == null ? void 0 : layoutContext.pin.state, p, trackSource]);
  const mergedProps = React15.useMemo(
    () => mergeProps(props, {
      className,
      onClick: (event) => {
        var _a, _b, _c, _d, _e;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
        if (trackRef) {
          if (inFocus) {
            (_c = layoutContext == null ? void 0 : (_b = layoutContext.pin).dispatch) == null ? void 0 : _c.call(_b, {
              msg: "clear_pin"
            });
          } else {
            (_e = layoutContext == null ? void 0 : (_d = layoutContext.pin).dispatch) == null ? void 0 : _e.call(_d, {
              msg: "set_pin",
              trackReference: trackRef
            });
          }
        } else if (trackSource) {
          const track = p.getTrack(trackSource);
          if ((layoutContext == null ? void 0 : layoutContext.pin.dispatch) && track) {
            if (inFocus) {
              layoutContext.pin.dispatch({
                msg: "clear_pin"
              });
            } else {
              layoutContext.pin.dispatch({
                msg: "set_pin",
                trackReference: {
                  participant: p,
                  publication: track,
                  source: track.source
                }
              });
            }
          }
        }
      }
    }),
    [props, className, trackRef, trackSource, inFocus, layoutContext == null ? void 0 : layoutContext.pin, p]
  );
  return { mergedProps, inFocus };
}

// src/hooks/useGridLayout.ts
var import_components_core9 = require("@livekit/components-core");
var React16 = __toESM(require("react"));
function useGridLayout(gridElement, trackCount) {
  const { width, height } = useSize(gridElement);
  const layout = width > 0 && height > 0 ? (0, import_components_core9.selectGridLayout)(import_components_core9.GRID_LAYOUTS, trackCount, width, height) : import_components_core9.GRID_LAYOUTS[0];
  React16.useEffect(() => {
    if (gridElement.current && layout) {
      gridElement.current.style.setProperty("--lk-col-count", layout == null ? void 0 : layout.columns.toString());
      gridElement.current.style.setProperty("--lk-row-count", layout == null ? void 0 : layout.rows.toString());
    }
  }, [gridElement, layout]);
  return {
    layout
  };
}

// src/hooks/useIsMuted.ts
var import_components_core10 = require("@livekit/components-core");
var React17 = __toESM(require("react"));
function useIsMuted(sourceOrTrackRef, options = {}) {
  var _a, _b;
  const passedParticipant = typeof sourceOrTrackRef === "string" ? options.participant : sourceOrTrackRef.participant;
  const p = useEnsureParticipant(passedParticipant);
  const ref = typeof sourceOrTrackRef === "string" ? { participant: p, source: sourceOrTrackRef } : sourceOrTrackRef;
  const [isMuted, setIsMuted] = React17.useState(
    !!(((_a = ref.publication) == null ? void 0 : _a.isMuted) || ((_b = p.getTrack(ref.source)) == null ? void 0 : _b.isMuted))
  );
  React17.useEffect(() => {
    const listener = (0, import_components_core10.mutedObserver)(ref).subscribe(setIsMuted);
    return () => listener.unsubscribe();
  }, [(0, import_components_core10.getTrackReferenceId)(ref)]);
  return isMuted;
}

// src/hooks/useIsSpeaking.ts
var import_components_core11 = require("@livekit/components-core");
var React18 = __toESM(require("react"));
function useIsSpeaking(participant) {
  const p = useEnsureParticipant(participant);
  const observable = React18.useMemo(() => (0, import_components_core11.createIsSpeakingObserver)(p), [p]);
  const isSpeaking = useObservableState(observable, p.isSpeaking);
  return isSpeaking;
}

// src/hooks/useLiveKitRoom.ts
var import_components_core12 = require("@livekit/components-core");
var import_livekit_client4 = require("livekit-client");
var React19 = __toESM(require("react"));
var defaultRoomProps = {
  connect: true,
  audio: false,
  video: false
};
function useLiveKitRoom(props) {
  const _a = __spreadValues(__spreadValues({}, defaultRoomProps), props), {
    token,
    serverUrl,
    options,
    room: passedRoom,
    connectOptions,
    connect,
    audio,
    video,
    screen,
    onConnected,
    onDisconnected,
    onError,
    onMediaDeviceFailure,
    onEncryptionError,
    simulateParticipants
  } = _a, rest = __objRest(_a, [
    "token",
    "serverUrl",
    "options",
    "room",
    "connectOptions",
    "connect",
    "audio",
    "video",
    "screen",
    "onConnected",
    "onDisconnected",
    "onError",
    "onMediaDeviceFailure",
    "onEncryptionError",
    "simulateParticipants"
  ]);
  if (options && passedRoom) {
    import_components_core12.log.warn(
      "when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead."
    );
  }
  const [room, setRoom] = React19.useState();
  React19.useEffect(() => {
    setRoom(passedRoom != null ? passedRoom : new import_livekit_client4.Room(options));
  }, [passedRoom]);
  const htmlProps = React19.useMemo(() => {
    const { className } = (0, import_components_core12.setupLiveKitRoom)();
    return mergeProps(rest, { className });
  }, [rest]);
  React19.useEffect(() => {
    if (!room)
      return;
    const onSignalConnected = () => {
      const localP = room.localParticipant;
      import_components_core12.log.debug("trying to publish local tracks");
      Promise.all([
        localP.setMicrophoneEnabled(!!audio, typeof audio !== "boolean" ? audio : void 0),
        localP.setCameraEnabled(!!video, typeof video !== "boolean" ? video : void 0),
        localP.setScreenShareEnabled(!!screen, typeof screen !== "boolean" ? screen : void 0)
      ]).catch((e) => {
        import_components_core12.log.warn(e);
        onError == null ? void 0 : onError(e);
      });
    };
    const handleMediaDeviceError = (e) => {
      const mediaDeviceFailure = import_livekit_client4.MediaDeviceFailure.getFailure(e);
      onMediaDeviceFailure == null ? void 0 : onMediaDeviceFailure(mediaDeviceFailure);
    };
    const handleEncryptionError = (e) => {
      onEncryptionError == null ? void 0 : onEncryptionError(e);
    };
    room.on(import_livekit_client4.RoomEvent.SignalConnected, onSignalConnected).on(import_livekit_client4.RoomEvent.MediaDevicesError, handleMediaDeviceError).on(import_livekit_client4.RoomEvent.EncryptionError, handleEncryptionError);
    return () => {
      room.off(import_livekit_client4.RoomEvent.SignalConnected, onSignalConnected).off(import_livekit_client4.RoomEvent.MediaDevicesError, handleMediaDeviceError).off(import_livekit_client4.RoomEvent.EncryptionError, handleEncryptionError);
    };
  }, [room, audio, video, screen, onError, onEncryptionError, onMediaDeviceFailure]);
  React19.useEffect(() => {
    if (!room)
      return;
    if (simulateParticipants) {
      room.simulateParticipants({
        participants: {
          count: simulateParticipants
        },
        publish: {
          audio: true,
          useRealTracks: true
        }
      });
      return;
    }
    if (!token) {
      import_components_core12.log.debug("no token yet");
      return;
    }
    if (!serverUrl) {
      import_components_core12.log.warn("no livekit url provided");
      onError == null ? void 0 : onError(Error("no livekit url provided"));
      return;
    }
    if (connect) {
      import_components_core12.log.debug("connecting");
      room.connect(serverUrl, token, connectOptions).catch((e) => {
        import_components_core12.log.warn(e);
        onError == null ? void 0 : onError(e);
      });
    } else {
      import_components_core12.log.debug("disconnecting because connect is false");
      room.disconnect();
    }
  }, [
    connect,
    token,
    JSON.stringify(connectOptions),
    room,
    onError,
    serverUrl,
    simulateParticipants
  ]);
  React19.useEffect(() => {
    if (!room)
      return;
    const connectionStateChangeListener = (state) => {
      switch (state) {
        case import_livekit_client4.ConnectionState.Disconnected:
          if (onDisconnected)
            onDisconnected();
          break;
        case import_livekit_client4.ConnectionState.Connected:
          if (onConnected)
            onConnected();
          break;
        default:
          break;
      }
    };
    room.on(import_livekit_client4.RoomEvent.ConnectionStateChanged, connectionStateChangeListener);
    return () => {
      room.off(import_livekit_client4.RoomEvent.ConnectionStateChanged, connectionStateChangeListener);
    };
  }, [token, onConnected, onDisconnected, room]);
  React19.useEffect(() => {
    if (!room)
      return;
    return () => {
      import_components_core12.log.info("disconnecting on onmount");
      room.disconnect();
    };
  }, [room]);
  return { room, htmlProps };
}

// src/hooks/useLocalParticipant.ts
var import_components_core13 = require("@livekit/components-core");
var React20 = __toESM(require("react"));
function useLocalParticipant(options = {}) {
  const room = useEnsureRoom(options.room);
  const [localParticipant, setLocalParticipant] = React20.useState(room.localParticipant);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = React20.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isCameraEnabled, setIsCameraEnabled] = React20.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [lastMicrophoneError, setLastMicrophoneError] = React20.useState(
    localParticipant.lastMicrophoneError
  );
  const [lastCameraError, setLastCameraError] = React20.useState(localParticipant.lastCameraError);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React20.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [microphoneTrack, setMicrophoneTrack] = React20.useState(
    void 0
  );
  const [cameraTrack, setCameraTrack] = React20.useState(void 0);
  const handleUpdate = (media) => {
    setIsCameraEnabled(media.isCameraEnabled);
    setIsMicrophoneEnabled(media.isMicrophoneEnabled);
    setIsScreenShareEnabled(media.isScreenShareEnabled);
    setCameraTrack(media.cameraTrack);
    setMicrophoneTrack(media.microphoneTrack);
    setLastMicrophoneError(media.participant.lastMicrophoneError);
    setLastCameraError(media.participant.lastCameraError);
    setLocalParticipant(media.participant);
  };
  React20.useEffect(() => {
    const listener = (0, import_components_core13.observeParticipantMedia)(room.localParticipant).subscribe(handleUpdate);
    return () => listener.unsubscribe();
  }, [room]);
  return {
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isCameraEnabled,
    microphoneTrack,
    cameraTrack,
    lastMicrophoneError,
    lastCameraError,
    localParticipant
  };
}

// src/hooks/useLocalParticipantPermissions.ts
var import_components_core14 = require("@livekit/components-core");
var React21 = __toESM(require("react"));
function useLocalParticipantPermissions() {
  const room = useRoomContext();
  const permissionObserver = React21.useMemo(
    () => (0, import_components_core14.participantPermissionObserver)(room.localParticipant),
    [room]
  );
  const permissions = useObservableState(permissionObserver, room.localParticipant.permissions);
  return permissions;
}

// src/hooks/useMediaDeviceSelect.ts
var import_components_core15 = require("@livekit/components-core");
var React22 = __toESM(require("react"));
function useMediaDeviceSelect({
  kind,
  room,
  track,
  requestPermissions,
  onError
}) {
  const roomContext = useMaybeRoomContext();
  const deviceObserver = React22.useMemo(
    () => (0, import_components_core15.createMediaDeviceObserver)(kind, onError, requestPermissions),
    [kind, requestPermissions, onError]
  );
  const devices = useObservableState(deviceObserver, []);
  const [currentDeviceId, setCurrentDeviceId] = React22.useState("");
  const { className, activeDeviceObservable, setActiveMediaDevice } = React22.useMemo(
    () => (0, import_components_core15.setupDeviceSelector)(kind, room != null ? room : roomContext, track),
    [kind, room, roomContext, track]
  );
  React22.useEffect(() => {
    const listener = activeDeviceObservable.subscribe((deviceId) => {
      import_components_core15.log.info("setCurrentDeviceId", deviceId);
      if (deviceId)
        setCurrentDeviceId(deviceId);
    });
    return () => {
      listener == null ? void 0 : listener.unsubscribe();
    };
  }, [activeDeviceObservable]);
  return { devices, className, activeDeviceId: currentDeviceId, setActiveMediaDevice };
}

// src/hooks/useMediaDevices.ts
var React23 = __toESM(require("react"));
var import_components_core16 = require("@livekit/components-core");
function useMediaDevices({ kind }) {
  const deviceObserver = React23.useMemo(() => (0, import_components_core16.createMediaDeviceObserver)(kind), [kind]);
  const devices = useObservableState(deviceObserver, []);
  return devices;
}

// src/hooks/useMediaTrackBySourceOrName.ts
var import_components_core18 = require("@livekit/components-core");
var import_components_core19 = require("@livekit/components-core");
var React25 = __toESM(require("react"));

// src/utils.ts
var React24 = __toESM(require("react"));
var import_components_core17 = require("@livekit/components-core");
function isProp(prop) {
  return prop !== void 0;
}
function mergeProps2(...props) {
  return mergeProps(...props.filter(isProp));
}
function cloneSingleChild(children, props, key) {
  return React24.Children.map(children, (child) => {
    if (React24.isValidElement(child) && React24.Children.only(children)) {
      return React24.cloneElement(child, __spreadProps(__spreadValues({}, props), { key }));
    }
    return child;
  });
}
function warnAboutMissingStyles(el) {
  var _a, _b;
  if (
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    (((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) === "dev" || ((_b = process == null ? void 0 : process.env) == null ? void 0 : _b.NODE_ENV) === "development") && typeof window !== "undefined"
  ) {
    const target = el != null ? el : document.querySelector(".lk-room-container");
    if (target && !getComputedStyle(target).getPropertyValue("--lk-has-imported-styles")) {
      import_components_core17.log.warn(
        "It looks like you're not using the `@livekit/components-styles package`. To render the UI with the default styling, please import it in your layout or page."
      );
    }
  }
}

// src/hooks/useMediaTrackBySourceOrName.ts
function useMediaTrackBySourceOrName(observerOptions, options = {}) {
  var _a;
  const [publication, setPublication] = React25.useState((0, import_components_core19.getTrackByIdentifier)(observerOptions));
  const [isMuted, setMuted] = React25.useState(publication == null ? void 0 : publication.isMuted);
  const [isSubscribed, setSubscribed] = React25.useState(publication == null ? void 0 : publication.isSubscribed);
  const [track, setTrack] = React25.useState(publication == null ? void 0 : publication.track);
  const [orientation, setOrientation] = React25.useState("landscape");
  const previousElement = React25.useRef();
  const { className, trackObserver } = React25.useMemo(() => {
    return (0, import_components_core19.setupMediaTrack)(observerOptions);
  }, [
    (_a = observerOptions.participant.sid) != null ? _a : observerOptions.participant.identity,
    observerOptions.source,
    (0, import_components_core18.isTrackReference)(observerOptions) && observerOptions.publication.trackSid
  ]);
  React25.useEffect(() => {
    const subscription = trackObserver.subscribe((publication2) => {
      import_components_core19.log.debug("update track", publication2);
      setPublication(publication2);
      setMuted(publication2 == null ? void 0 : publication2.isMuted);
      setSubscribed(publication2 == null ? void 0 : publication2.isSubscribed);
      setTrack(publication2 == null ? void 0 : publication2.track);
    });
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [trackObserver]);
  React25.useEffect(() => {
    var _a2, _b;
    if (track) {
      if (previousElement.current) {
        track.detach(previousElement.current);
      }
      if (((_a2 = options.element) == null ? void 0 : _a2.current) && !((0, import_components_core19.isLocal)(observerOptions.participant) && (track == null ? void 0 : track.kind) === "audio")) {
        track.attach(options.element.current);
      }
    }
    previousElement.current = (_b = options.element) == null ? void 0 : _b.current;
    return () => {
      if (previousElement.current) {
        track == null ? void 0 : track.detach(previousElement.current);
      }
    };
  }, [track, options.element]);
  React25.useEffect(() => {
    var _a2, _b;
    if (typeof ((_a2 = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _a2.width) === "number" && typeof ((_b = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _b.height) === "number") {
      const orientation_ = publication.dimensions.width > publication.dimensions.height ? "landscape" : "portrait";
      setOrientation(orientation_);
    }
  }, [publication]);
  return {
    publication,
    isMuted,
    isSubscribed,
    track,
    elementProps: mergeProps2(options.props, __spreadValues({
      className,
      "data-lk-local-participant": observerOptions.participant.isLocal,
      "data-lk-source": publication == null ? void 0 : publication.source
    }, (publication == null ? void 0 : publication.kind) === "video" && { "data-lk-orientation": orientation }))
  };
}

// src/hooks/useMediaTrack.ts
function useMediaTrack(source, participant, options = {}) {
  const p = useEnsureParticipant(participant);
  return useMediaTrackBySourceOrName({ source, participant: p }, options);
}

// src/hooks/useMediaTrackByName.ts
function useMediaTrackByName(name, participant, options = {}) {
  const p = useEnsureParticipant(participant);
  return useMediaTrackBySourceOrName({ name, participant: p }, options);
}

// src/hooks/usePagination.ts
var React27 = __toESM(require("react"));

// src/hooks/useVisualStableUpdate.ts
var import_components_core20 = require("@livekit/components-core");
var React26 = __toESM(require("react"));
function useVisualStableUpdate(trackReferences, maxItemsOnPage, options = {}) {
  const lastTrackRefs = React26.useRef([]);
  const lastMaxItemsOnPage = React26.useRef(-1);
  const layoutChanged = maxItemsOnPage !== lastMaxItemsOnPage.current;
  const sortedTrackRefs = typeof options.customSortFunction === "function" ? options.customSortFunction(trackReferences) : (0, import_components_core20.sortTrackReferences)(trackReferences);
  let updatedTrackRefs = [...sortedTrackRefs];
  if (layoutChanged === false) {
    try {
      updatedTrackRefs = (0, import_components_core20.updatePages)(lastTrackRefs.current, sortedTrackRefs, maxItemsOnPage);
    } catch (error) {
      import_components_core20.log.error("Error while running updatePages(): ", error);
    }
  }
  if (layoutChanged) {
    lastTrackRefs.current = sortedTrackRefs;
  } else {
    lastTrackRefs.current = updatedTrackRefs;
  }
  lastMaxItemsOnPage.current = maxItemsOnPage;
  return updatedTrackRefs;
}

// src/hooks/usePagination.ts
function usePagination(itemPerPage, trackReferences) {
  const [currentPage, setCurrentPage] = React27.useState(1);
  const totalPageCount = Math.max(Math.ceil(trackReferences.length / itemPerPage), 1);
  if (currentPage > totalPageCount) {
    setCurrentPage(totalPageCount);
  }
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const changePage = (direction) => {
    setCurrentPage((state) => {
      if (direction === "next") {
        if (state === totalPageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };
  const goToPage = (num) => {
    if (num > totalPageCount) {
      setCurrentPage(totalPageCount);
    } else if (num < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(num);
    }
  };
  const updatedTrackReferences = useVisualStableUpdate(trackReferences, itemPerPage);
  const tracksOnPage = updatedTrackReferences.slice(firstItemIndex, lastItemIndex);
  return {
    totalPageCount,
    nextPage: () => changePage("next"),
    prevPage: () => changePage("previous"),
    setPage: goToPage,
    firstItemIndex,
    lastItemIndex,
    tracks: tracksOnPage,
    currentPage
  };
}

// src/hooks/useParticipantInfo.ts
var import_components_core21 = require("@livekit/components-core");
var React28 = __toESM(require("react"));
function useParticipantInfo(props = {}) {
  const p = useEnsureParticipant(props.participant);
  const infoObserver = React28.useMemo(() => (0, import_components_core21.participantInfoObserver)(p), [p]);
  const { identity, name, metadata } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  return { identity, name, metadata };
}

// src/hooks/useParticipantPermissions.ts
var React29 = __toESM(require("react"));
var import_components_core22 = require("@livekit/components-core");
function useParticipantPermissions(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const permissionObserver = React29.useMemo(() => (0, import_components_core22.participantPermissionObserver)(p), [p]);
  const permissions = useObservableState(permissionObserver, p.permissions);
  return permissions;
}

// src/hooks/useParticipantTile.ts
var import_components_core23 = require("@livekit/components-core");
var import_livekit_client5 = require("livekit-client");
var React30 = __toESM(require("react"));
function useParticipantTile({
  trackRef,
  participant,
  source,
  publication,
  onParticipantClick,
  disableSpeakingIndicator,
  htmlProps
}) {
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const trackReference = React30.useMemo(() => {
    var _a, _b, _c, _d, _e, _f;
    const _source = (_b = (_a = trackRef == null ? void 0 : trackRef.source) != null ? _a : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _b : source;
    if (_source === void 0) {
      throw new Error(
        "Missing track `source`, provided it via `trackRef`, `source` property or via `TrackRefContext`."
      );
    }
    return {
      participant: (_d = (_c = trackRef == null ? void 0 : trackRef.participant) != null ? _c : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _d : p,
      publication: (_f = (_e = trackRef == null ? void 0 : trackRef.publication) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _f : publication,
      source: _source
    };
  }, [
    trackRef == null ? void 0 : trackRef.participant,
    trackRef == null ? void 0 : trackRef.source,
    trackRef == null ? void 0 : trackRef.publication,
    maybeTrackRef == null ? void 0 : maybeTrackRef.participant,
    maybeTrackRef == null ? void 0 : maybeTrackRef.source,
    maybeTrackRef == null ? void 0 : maybeTrackRef.publication,
    p,
    source,
    publication
  ]);
  const mergedProps = React30.useMemo(() => {
    const { className } = (0, import_components_core23.setupParticipantTile)();
    return mergeProps(htmlProps, {
      className,
      onClick: (event) => {
        var _a, _b;
        (_a = htmlProps.onClick) == null ? void 0 : _a.call(htmlProps, event);
        if (typeof onParticipantClick === "function") {
          const track = (_b = trackReference.publication) != null ? _b : trackReference.participant.getTrack(trackReference.source);
          onParticipantClick({ participant: trackReference.participant, track });
        }
      }
    });
  }, [
    htmlProps,
    onParticipantClick,
    trackReference.publication,
    trackReference.source,
    trackReference.participant
  ]);
  const isVideoMuted = useIsMuted(import_livekit_client5.Track.Source.Camera, { participant: trackReference.participant });
  const isAudioMuted = useIsMuted(import_livekit_client5.Track.Source.Microphone, {
    participant: trackReference.participant
  });
  const isSpeaking = useIsSpeaking(trackReference.participant);
  const facingMode = useFacingMode(trackReference);
  return {
    elementProps: __spreadValues({
      "data-lk-audio-muted": isAudioMuted,
      "data-lk-video-muted": isVideoMuted,
      "data-lk-speaking": disableSpeakingIndicator === true ? false : isSpeaking,
      "data-lk-local-participant": trackReference.participant.isLocal,
      "data-lk-source": trackReference.source,
      "data-lk-facing-mode": facingMode
    }, mergedProps)
  };
}

// src/hooks/useRemoteParticipants.ts
var import_components_core24 = require("@livekit/components-core");
var React31 = __toESM(require("react"));
function useRemoteParticipants(options = {}) {
  const room = useEnsureRoom(options.room);
  const [participants, setParticipants] = React31.useState([]);
  React31.useEffect(() => {
    const listener = (0, import_components_core24.connectedParticipantsObserver)(room, {
      additionalRoomEvents: options.updateOnlyOn
    }).subscribe(setParticipants);
    return () => listener.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn)]);
  return participants;
}

// src/hooks/useParticipants.ts
function useParticipants(options = {}) {
  const remoteParticipants = useRemoteParticipants(options);
  const { localParticipant } = useLocalParticipant(options);
  return [localParticipant, ...remoteParticipants];
}

// src/hooks/usePinnedTracks.ts
var React32 = __toESM(require("react"));
function usePinnedTracks(layoutContext) {
  layoutContext = useEnsureLayoutContext(layoutContext);
  return React32.useMemo(() => {
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) !== void 0 && layoutContext.pin.state.length >= 1) {
      return layoutContext.pin.state;
    }
    return [];
  }, [layoutContext.pin.state]);
}

// src/hooks/useRemoteParticipant.ts
var import_components_core25 = require("@livekit/components-core");
var React33 = __toESM(require("react"));
function useRemoteParticipant(identity, options = {}) {
  const room = useRoomContext();
  const [updateOnlyOn] = React33.useState(options.updateOnlyOn);
  const observable = React33.useMemo(
    () => (0, import_components_core25.connectedParticipantObserver)(room, identity, { additionalEvents: updateOnlyOn }),
    [room, identity, updateOnlyOn]
  );
  const participant = useObservableState(
    observable,
    room.getParticipantByIdentity(identity)
  );
  return participant;
}

// src/hooks/useRoomInfo.ts
var import_components_core26 = require("@livekit/components-core");
var React34 = __toESM(require("react"));
function useRoomInfo(options = {}) {
  const room = useEnsureRoom(options.room);
  const infoObserver = React34.useMemo(() => (0, import_components_core26.roomInfoObserver)(room), [room]);
  const { name, metadata } = useObservableState(infoObserver, {
    name: room.name,
    metadata: room.metadata
  });
  return { name, metadata };
}

// src/hooks/useSortedParticipants.ts
var import_components_core28 = require("@livekit/components-core");
var React36 = __toESM(require("react"));

// src/hooks/useSpeakingParticipants.ts
var import_components_core27 = require("@livekit/components-core");
var React35 = __toESM(require("react"));
function useSpeakingParticipants() {
  const room = useRoomContext();
  const speakerObserver = React35.useMemo(() => (0, import_components_core27.activeSpeakerObserver)(room), [room]);
  const activeSpeakers = useObservableState(speakerObserver, room.activeSpeakers);
  return activeSpeakers;
}

// src/hooks/useSortedParticipants.ts
function useSortedParticipants(participants) {
  const [sortedParticipants, setSortedParticipants] = React36.useState(
    (0, import_components_core28.sortParticipants)(participants)
  );
  const activeSpeakers = useSpeakingParticipants();
  React36.useEffect(() => {
    setSortedParticipants((0, import_components_core28.sortParticipants)(participants));
  }, [activeSpeakers, participants]);
  return sortedParticipants;
}

// src/hooks/useStartAudio.ts
var import_components_core29 = require("@livekit/components-core");
var React37 = __toESM(require("react"));
function useStartAudio({ room, props }) {
  const roomEnsured = useEnsureRoom(room);
  const { className, roomAudioPlaybackAllowedObservable: roomAudioPlaybackAllowedObservable2, handleStartAudioPlayback } = React37.useMemo(
    () => (0, import_components_core29.setupStartAudio)(),
    []
  );
  const observable = React37.useMemo(
    () => roomAudioPlaybackAllowedObservable2(roomEnsured),
    [roomEnsured, roomAudioPlaybackAllowedObservable2]
  );
  const { canPlayAudio } = useObservableState(observable, {
    canPlayAudio: roomEnsured.canPlaybackAudio
  });
  const mergedProps = React37.useMemo(
    () => mergeProps(props, {
      className,
      onClick: () => {
        handleStartAudioPlayback(roomEnsured);
      },
      style: { display: canPlayAudio ? "none" : "block" }
    }),
    [props, className, canPlayAudio, handleStartAudioPlayback, roomEnsured]
  );
  return { mergedProps, canPlayAudio };
}

// src/hooks/useStartVideo.ts
var import_components_core30 = require("@livekit/components-core");
var React38 = __toESM(require("react"));
function useStartVideo({ room, props }) {
  const roomEnsured = useEnsureRoom(room);
  const { className, roomVideoPlaybackAllowedObservable, handleStartVideoPlayback } = React38.useMemo(
    () => (0, import_components_core30.setupStartVideo)(),
    []
  );
  const observable = React38.useMemo(
    () => roomVideoPlaybackAllowedObservable(roomEnsured),
    [roomEnsured, roomVideoPlaybackAllowedObservable]
  );
  const { canPlayVideo } = useObservableState(observable, {
    canPlayVideo: roomEnsured.canPlaybackVideo
  });
  const mergedProps = React38.useMemo(
    () => mergeProps(props, {
      className,
      onClick: () => {
        handleStartVideoPlayback(roomEnsured);
      },
      style: { display: canPlayVideo ? "none" : "block" }
    }),
    [props, className, canPlayVideo, handleStartVideoPlayback, roomEnsured]
  );
  return { mergedProps, canPlayVideo };
}

// src/hooks/useSwipe.ts
var React39 = __toESM(require("react"));
function useSwipe(element, options = {}) {
  var _a;
  const touchStart = React39.useRef(null);
  const touchEnd = React39.useRef(null);
  const minSwipeDistance = (_a = options.minSwipeDistance) != null ? _a : 50;
  const onTouchStart = (event) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };
  const onTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };
  const onTouchEnd = React39.useCallback(() => {
    if (!touchStart.current || !touchEnd.current) {
      return;
    }
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && options.onLeftSwipe)
      options.onLeftSwipe();
    if (isRightSwipe && options.onRightSwipe)
      options.onRightSwipe();
  }, [minSwipeDistance, options]);
  React39.useEffect(() => {
    const elementCopy = element.current;
    if (elementCopy) {
      elementCopy.addEventListener("touchstart", onTouchStart, { passive: true });
      elementCopy.addEventListener("touchmove", onTouchMove, { passive: true });
      elementCopy.addEventListener("touchend", onTouchEnd, { passive: true });
    }
    return () => {
      if (elementCopy) {
        elementCopy.removeEventListener("touchstart", onTouchStart);
        elementCopy.removeEventListener("touchmove", onTouchMove);
        elementCopy.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [element, onTouchEnd]);
}

// src/hooks/useChatToggle.ts
var import_components_core31 = require("@livekit/components-core");
var React40 = __toESM(require("react"));
function useChatToggle({ props }) {
  const { dispatch, state } = useLayoutContext().widget;
  const { className } = React40.useMemo(() => (0, import_components_core31.setupChatToggle)(), []);
  const mergedProps = React40.useMemo(() => {
    return mergeProps(props, {
      className,
      onClick: () => {
        if (dispatch)
          dispatch({ msg: "toggle_chat" });
      },
      "aria-pressed": (state == null ? void 0 : state.showChat) ? "true" : "false",
      "data-lk-unread-msgs": state ? state.unreadMessages < 10 ? state.unreadMessages.toFixed(0) : "9+" : "0"
    });
  }, [props, className, dispatch, state]);
  return { mergedProps };
}

// src/hooks/useToken.ts
var import_components_core32 = require("@livekit/components-core");
var React41 = __toESM(require("react"));
function useToken(tokenEndpoint, roomName, options = {}) {
  const [token, setToken] = React41.useState(void 0);
  React41.useEffect(() => {
    var _a;
    if (tokenEndpoint === void 0) {
      throw Error("token endpoint needs to be defined");
    }
    if (((_a = options.userInfo) == null ? void 0 : _a.identity) === void 0) {
      return;
    }
    const tokenFetcher = () => __async(this, null, function* () {
      import_components_core32.log.debug("fetching token");
      const params = new URLSearchParams(__spreadProps(__spreadValues({}, options.userInfo), { roomName }));
      const res = yield fetch(`${tokenEndpoint}?${params.toString()}`);
      if (!res.ok) {
        import_components_core32.log.error(
          `Could not fetch token. Server responded with status ${res.status}: ${res.statusText}`
        );
        return;
      }
      const { accessToken } = yield res.json();
      setToken(accessToken);
    });
    tokenFetcher();
  }, [tokenEndpoint, roomName, JSON.stringify(options)]);
  return token;
}

// src/hooks/useTrackMutedIndicator.ts
var import_components_core33 = require("@livekit/components-core");
var React42 = __toESM(require("react"));
function useTrackMutedIndicator(trackRefOrSource, options = {}) {
  var _a, _b, _c, _d;
  let ref = useMaybeTrackRefContext();
  const p = (_b = (_a = useMaybeParticipantContext()) != null ? _a : options.participant) != null ? _b : ref == null ? void 0 : ref.participant;
  if (typeof trackRefOrSource === "string") {
    if (!p) {
      throw Error(`Participant missing, either provide it via context or pass it in directly`);
    }
    ref = { participant: p, source: trackRefOrSource };
  } else if (trackRefOrSource) {
    ref = trackRefOrSource;
  } else {
    throw Error(`No track reference found, either provide it via context or pass it in directly`);
  }
  const { className, mediaMutedObserver } = React42.useMemo(
    () => (0, import_components_core33.setupTrackMutedIndicator)(ref),
    [(0, import_components_core33.getTrackReferenceId)(ref)]
  );
  const isMuted = useObservableState(
    mediaMutedObserver,
    !!(((_c = ref.publication) == null ? void 0 : _c.isMuted) || ((_d = ref.participant.getTrack(ref.source)) == null ? void 0 : _d.isMuted))
  );
  return { isMuted, className };
}

// src/hooks/useTrackToggle.ts
var import_components_core34 = require("@livekit/components-core");
var React43 = __toESM(require("react"));
function useTrackToggle(_a) {
  var _b = _a, {
    source,
    onChange,
    initialState,
    captureOptions
  } = _b, rest = __objRest(_b, [
    "source",
    "onChange",
    "initialState",
    "captureOptions"
  ]);
  var _a2;
  const room = useMaybeRoomContext();
  const track = (_a2 = room == null ? void 0 : room.localParticipant) == null ? void 0 : _a2.getTrack(source);
  const userInteractionRef = React43.useRef(false);
  const { toggle, className, pendingObserver, enabledObserver } = React43.useMemo(
    () => room ? (0, import_components_core34.setupMediaToggle)(source, room, captureOptions) : (0, import_components_core34.setupManualToggle)(),
    [room, source, JSON.stringify(captureOptions)]
  );
  const pending = useObservableState(pendingObserver, false);
  const enabled = useObservableState(enabledObserver, initialState != null ? initialState : !!(track == null ? void 0 : track.isEnabled));
  React43.useEffect(() => {
    onChange == null ? void 0 : onChange(enabled, userInteractionRef.current);
    userInteractionRef.current = false;
  }, [enabled, onChange]);
  React43.useEffect(() => {
    if (initialState !== void 0) {
      import_components_core34.log.debug("forcing initial toggle state", source, initialState);
      toggle(initialState);
    }
  }, []);
  const newProps = React43.useMemo(() => mergeProps(rest, { className }), [rest, className]);
  const clickHandler = React43.useCallback(
    (evt) => {
      var _a3;
      userInteractionRef.current = true;
      toggle().finally(() => userInteractionRef.current = false);
      (_a3 = rest.onClick) == null ? void 0 : _a3.call(rest, evt);
    },
    [rest, toggle]
  );
  return {
    toggle,
    enabled,
    pending,
    track,
    buttonProps: __spreadProps(__spreadValues({}, newProps), {
      "aria-pressed": enabled,
      "data-lk-source": source,
      "data-lk-enabled": enabled,
      disabled: pending,
      onClick: clickHandler
    })
  };
}

// src/hooks/useTracks.ts
var import_components_core35 = require("@livekit/components-core");
var import_livekit_client6 = require("livekit-client");
var React44 = __toESM(require("react"));
function useTracks(sources = [
  import_livekit_client6.Track.Source.Camera,
  import_livekit_client6.Track.Source.Microphone,
  import_livekit_client6.Track.Source.ScreenShare,
  import_livekit_client6.Track.Source.ScreenShareAudio,
  import_livekit_client6.Track.Source.Unknown
], options = {}) {
  const room = useEnsureRoom(options.room);
  const [trackReferences, setTrackReferences] = React44.useState([]);
  const [participants, setParticipants] = React44.useState([]);
  const sources_ = React44.useMemo(() => {
    return sources.map((s) => (0, import_components_core35.isSourceWitOptions)(s) ? s.source : s);
  }, [JSON.stringify(sources)]);
  React44.useEffect(() => {
    const subscription = (0, import_components_core35.trackReferencesObservable)(room, sources_, {
      additionalRoomEvents: options.updateOnlyOn,
      onlySubscribed: options.onlySubscribed
    }).subscribe(({ trackReferences: trackReferences2, participants: participants2 }) => {
      import_components_core35.log.debug("setting track bundles", trackReferences2, participants2);
      setTrackReferences(trackReferences2);
      setParticipants(participants2);
    });
    return () => subscription.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn), JSON.stringify(sources)]);
  const maybeTrackReferences = React44.useMemo(() => {
    if ((0, import_components_core35.isSourcesWithOptions)(sources)) {
      const requirePlaceholder = requiredPlaceholders(sources, participants);
      const trackReferencesWithPlaceholders = Array.from(trackReferences);
      participants.forEach((participant) => {
        var _a;
        if (requirePlaceholder.has(participant.identity)) {
          const sourcesToAddPlaceholder = (_a = requirePlaceholder.get(participant.identity)) != null ? _a : [];
          sourcesToAddPlaceholder.forEach((placeholderSource) => {
            if (trackReferences.find(
              ({ participant: p, publication }) => participant.identity === p.identity && publication.source === placeholderSource
            )) {
              return;
            }
            import_components_core35.log.debug(
              `Add ${placeholderSource} placeholder for participant ${participant.identity}.`
            );
            const placeholder = {
              participant,
              source: placeholderSource
            };
            trackReferencesWithPlaceholders.push(placeholder);
          });
        }
      });
      return trackReferencesWithPlaceholders;
    } else {
      return trackReferences;
    }
  }, [trackReferences, participants, sources]);
  return maybeTrackReferences;
}
function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
function requiredPlaceholders(sources, participants) {
  const placeholderMap = /* @__PURE__ */ new Map();
  if ((0, import_components_core35.isSourcesWithOptions)(sources)) {
    const sourcesThatNeedPlaceholder = sources.filter((sourceWithOption) => sourceWithOption.withPlaceholder).map((sourceWithOption) => sourceWithOption.source);
    participants.forEach((participant) => {
      const sourcesOfSubscribedTracks = participant.getTracks().map((pub) => {
        var _a;
        return (_a = pub.track) == null ? void 0 : _a.source;
      }).filter((trackSource) => trackSource !== void 0);
      const placeholderNeededForThisParticipant = Array.from(
        difference(new Set(sourcesThatNeedPlaceholder), new Set(sourcesOfSubscribedTracks))
      );
      if (placeholderNeededForThisParticipant.length > 0) {
        placeholderMap.set(participant.identity, placeholderNeededForThisParticipant);
      }
    });
  }
  return placeholderMap;
}

// src/hooks/useTrack.ts
function useTrack(trackRef, options = {}) {
  return useMediaTrackBySourceOrName(trackRef, options);
}

// src/hooks/useTrackByName.ts
function useTrackByName(trackRef, options = {}) {
  const ref = useEnsureTrackRef(trackRef);
  return useMediaTrackBySourceOrName(ref, options);
}

// src/hooks/useChat.ts
var import_components_core36 = require("@livekit/components-core");
var React45 = __toESM(require("react"));
function useChat(options) {
  const room = useRoomContext();
  const [setup, setSetup] = React45.useState();
  const isSending = useObservableState(setup == null ? void 0 : setup.isSendingObservable, false);
  const chatMessages = useObservableState(setup == null ? void 0 : setup.messageObservable, []);
  React45.useEffect(() => {
    const setupChatReturn = (0, import_components_core36.setupChat)(room, options);
    setSetup(setupChatReturn);
  }, [room, options]);
  return { send: setup == null ? void 0 : setup.send, update: setup == null ? void 0 : setup.update, chatMessages, isSending };
}

// src/hooks/usePersistentUserChoices.ts
var import_components_core37 = require("@livekit/components-core");
var React46 = __toESM(require("react"));
function usePersistentUserChoices(options = {}) {
  var _a;
  const [userChoices, setSettings] = React46.useState(
    (0, import_components_core37.loadUserChoices)(options.defaults, (_a = options.preventLoad) != null ? _a : false)
  );
  const saveAudioInputEnabled = React46.useCallback((isEnabled) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { audioEnabled: isEnabled }));
  }, []);
  const saveVideoInputEnabled = React46.useCallback((isEnabled) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { videoEnabled: isEnabled }));
  }, []);
  const saveAudioInputDeviceId = React46.useCallback((deviceId) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { audioDeviceId: deviceId }));
  }, []);
  const saveVideoInputDeviceId = React46.useCallback((deviceId) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { videoDeviceId: deviceId }));
  }, []);
  const saveUsername = React46.useCallback((username) => {
    setSettings((prev) => __spreadProps(__spreadValues({}, prev), { username }));
  }, []);
  React46.useEffect(() => {
    var _a2;
    (0, import_components_core37.saveUserChoices)(userChoices, (_a2 = options.preventSave) != null ? _a2 : false);
  }, [userChoices, options.preventSave]);
  return {
    userChoices,
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
    saveUsername
  };
}

// src/hooks/useIsEncrypted.ts
var React47 = __toESM(require("react"));
var import_livekit_client7 = require("livekit-client");
var import_components_core38 = require("@livekit/components-core");
function useIsEncrypted(participant) {
  const p = useEnsureParticipant(participant);
  const room = useEnsureRoom();
  const observer = React47.useMemo(() => (0, import_components_core38.encryptionStatusObservable)(room, p), [room, p]);
  const isEncrypted = useObservableState(
    observer,
    p instanceof import_livekit_client7.LocalParticipant ? p.isE2EEEnabled : p.isEncrypted
  );
  return isEncrypted;
}

// src/hooks/useTrackVolume.ts
var React48 = __toESM(require("react"));
var import_livekit_client8 = require("livekit-client");
var import_components_core39 = require("@livekit/components-core");
var useTrackVolume = (trackOrTrackReference, options = { fftSize: 32, smoothingTimeConstant: 0 }) => {
  const track = (0, import_components_core39.isTrackReference)(trackOrTrackReference) ? trackOrTrackReference.publication.track : trackOrTrackReference;
  const [volume, setVolume] = React48.useState(0);
  React48.useEffect(() => {
    if (!track || !track.mediaStream) {
      return;
    }
    const { cleanup, analyser } = (0, import_livekit_client8.createAudioAnalyser)(track, options);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const a = dataArray[i];
        sum += a * a;
      }
      setVolume(Math.sqrt(sum / dataArray.length) / 255);
    };
    const interval = setInterval(updateVolume, 1e3 / 30);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [track, track == null ? void 0 : track.mediaStream, JSON.stringify(options)]);
  return volume;
};
var normalizeFrequencies = (frequencies) => {
  const normalizeDb = (value) => {
    const minDb = -100;
    const maxDb = -10;
    let db = 1 - Math.max(minDb, Math.min(maxDb, value)) * -1 / 100;
    db = Math.sqrt(db);
    return db;
  };
  return frequencies.map((value) => {
    if (value === -Infinity) {
      return 0;
    }
    return normalizeDb(value);
  });
};
var multibandDefaults = {
  bands: 5,
  loPass: 100,
  hiPass: 600,
  updateInterval: 10,
  analyserOptions: { fftSize: 2048 }
};
var useMultibandTrackVolume = (trackOrTrackReference, options = {}) => {
  var _a;
  const track = trackOrTrackReference instanceof import_livekit_client8.Track ? trackOrTrackReference : (_a = trackOrTrackReference == null ? void 0 : trackOrTrackReference.publication) == null ? void 0 : _a.track;
  const [frequencyBands, setFrequencyBands] = React48.useState([]);
  const opts = __spreadValues(__spreadValues({}, multibandDefaults), options);
  React48.useEffect(() => {
    if (!track || !(track == null ? void 0 : track.mediaStream)) {
      return;
    }
    const { analyser, cleanup } = (0, import_livekit_client8.createAudioAnalyser)(track, opts.analyserOptions);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const updateVolume = () => {
      analyser.getFloatFrequencyData(dataArray);
      let frequencies = new Float32Array(dataArray.length);
      for (let i = 0; i < dataArray.length; i++) {
        frequencies[i] = dataArray[i];
      }
      frequencies = frequencies.slice(options.loPass, options.hiPass);
      const normalizedFrequencies = normalizeFrequencies(frequencies);
      const chunkSize = Math.ceil(normalizedFrequencies.length / opts.bands);
      const chunks = [];
      for (let i = 0; i < opts.bands; i++) {
        const summedVolumes = normalizedFrequencies.slice(i * chunkSize, (i + 1) * chunkSize).reduce((acc, val) => acc += val, 0);
        chunks.push(summedVolumes / chunkSize);
      }
      setFrequencyBands(chunks);
    };
    const interval = setInterval(updateVolume, opts.updateInterval);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [track, track == null ? void 0 : track.mediaStream, JSON.stringify(options)]);
  return frequencyBands;
};

// src/components/controls/ClearPinButton.tsx
function ClearPinButton(props) {
  const { buttonProps } = useClearPinButton(props);
  return /* @__PURE__ */ React49.createElement("button", __spreadValues({}, buttonProps), props.children);
}

// src/components/ConnectionState.tsx
var React50 = __toESM(require("react"));
function ConnectionState3(_a) {
  var _b = _a, { room } = _b, props = __objRest(_b, ["room"]);
  const connectionState = useConnectionState(room);
  return /* @__PURE__ */ React50.createElement("div", __spreadValues({}, props), connectionState);
}

// src/components/controls/ChatToggle.tsx
var React51 = __toESM(require("react"));
function ChatToggle(props) {
  const { mergedProps } = useChatToggle({ props });
  return /* @__PURE__ */ React51.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/components/controls/DisconnectButton.tsx
var React52 = __toESM(require("react"));
function DisconnectButton(props) {
  const { buttonProps } = useDisconnectButton(props);
  return /* @__PURE__ */ React52.createElement("button", __spreadValues({}, buttonProps), props.children);
}

// src/components/controls/FocusToggle.tsx
var React72 = __toESM(require("react"));

// src/assets/icons/CameraDisabledIcon.tsx
var React53 = __toESM(require("react"));
var SvgCameraDisabledIcon = (props) => /* @__PURE__ */ React53.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React53.createElement("path", { d: "M1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708L11 10.293V4.5A1.5 1.5 0 0 0 9.5 3H3.707zM0 4.5a1.5 1.5 0 0 1 .943-1.393l9.532 9.533c-.262.224-.603.36-.975.36h-8A1.5 1.5 0 0 1 0 11.5z" }), /* @__PURE__ */ React53.createElement("path", { d: "m15.2 3.6-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4z" }));
var CameraDisabledIcon_default = SvgCameraDisabledIcon;

// src/assets/icons/CameraIcon.tsx
var React54 = __toESM(require("react"));
var SvgCameraIcon = (props) => /* @__PURE__ */ React54.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React54.createElement("path", { d: "M0 4.5A1.5 1.5 0 0 1 1.5 3h8A1.5 1.5 0 0 1 11 4.5v7A1.5 1.5 0 0 1 9.5 13h-8A1.5 1.5 0 0 1 0 11.5zM15.2 3.6l-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4z" }));
var CameraIcon_default = SvgCameraIcon;

// src/assets/icons/ChatCloseIcon.tsx
var React55 = __toESM(require("react"));
var SvgChatCloseIcon = (props) => /* @__PURE__ */ React55.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, viewBox: "0 0 24 24" }, props), /* @__PURE__ */ React55.createElement(
  "path",
  {
    fill: "#FFF",
    d: "M4.99 3.99a1 1 0 0 0-.697 1.717L10.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414L12 13.414l6.293 6.293a1 1 0 1 0 1.414-1.414L13.414 12l6.293-6.293a1 1 0 0 0-.727-1.717 1 1 0 0 0-.687.303L12 10.586 5.707 4.293a1 1 0 0 0-.717-.303z"
  }
));
var ChatCloseIcon_default = SvgChatCloseIcon;

// src/assets/icons/ChatIcon.tsx
var React56 = __toESM(require("react"));
var SvgChatIcon = (props) => /* @__PURE__ */ React56.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 18, fill: "none" }, props), /* @__PURE__ */ React56.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h10.5A2.75 2.75 0 0 1 16 2.75v13.594a.75.75 0 0 1-1.234.572l-3.691-3.12a1.25 1.25 0 0 0-.807-.296H2.75A2.75 2.75 0 0 1 0 10.75v-8ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h7.518c.65 0 1.279.23 1.775.65l2.457 2.077V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React56.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M3 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z",
    clipRule: "evenodd"
  }
));
var ChatIcon_default = SvgChatIcon;

// src/assets/icons/Chevron.tsx
var React57 = __toESM(require("react"));
var SvgChevron = (props) => /* @__PURE__ */ React57.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React57.createElement(
  "path",
  {
    fill: "currentcolor",
    fillRule: "evenodd",
    d: "M5.293 2.293a1 1 0 0 1 1.414 0l4.823 4.823a1.25 1.25 0 0 1 0 1.768l-4.823 4.823a1 1 0 0 1-1.414-1.414L9.586 8 5.293 3.707a1 1 0 0 1 0-1.414z",
    clipRule: "evenodd"
  }
));
var Chevron_default = SvgChevron;

// src/assets/icons/FocusToggleIcon.tsx
var React58 = __toESM(require("react"));
var SvgFocusToggleIcon = (props) => /* @__PURE__ */ React58.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React58.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React58.createElement("path", { d: "M10 1.75h4.25m0 0V6m0-4.25L9 7M6 14.25H1.75m0 0V10m0 4.25L7 9" })));
var FocusToggleIcon_default = SvgFocusToggleIcon;

// src/assets/icons/GearIcon.tsx
var React59 = __toESM(require("react"));
var SvgGearIcon = (props) => /* @__PURE__ */ React59.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React59.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M2 2.75A2.75 2.75 0 0 1 4.75 0h6.5A2.75 2.75 0 0 1 14 2.75v10.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25v.5a.75.75 0 0 1-1.5 0v-.5Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React59.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8.78 7.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h4.69l-.97-.97a.75.75 0 0 1 1.06-1.06l2.25 2.25Z",
    clipRule: "evenodd"
  }
));
var GearIcon_default = SvgGearIcon;

// src/assets/icons/LeaveIcon.tsx
var React60 = __toESM(require("react"));
var SvgLeaveIcon = (props) => /* @__PURE__ */ React60.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React60.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M2 2.75A2.75 2.75 0 0 1 4.75 0h6.5A2.75 2.75 0 0 1 14 2.75v10.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25v.5a.75.75 0 0 1-1.5 0v-.5Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React60.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8.78 7.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h4.69l-.97-.97a.75.75 0 0 1 1.06-1.06l2.25 2.25Z",
    clipRule: "evenodd"
  }
));
var LeaveIcon_default = SvgLeaveIcon;

// src/assets/icons/LockLockedIcon.tsx
var React61 = __toESM(require("react"));
var SvgLockLockedIcon = (props) => /* @__PURE__ */ React61.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React61.createElement(
  "path",
  {
    fill: "currentcolor",
    fillRule: "evenodd",
    d: "M4 6.104V4a4 4 0 1 1 8 0v2.104c1.154.326 2 1.387 2 2.646v4.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-4.5c0-1.259.846-2.32 2-2.646ZM5.5 4a2.5 2.5 0 0 1 5 0v2h-5V4Z",
    clipRule: "evenodd"
  }
));
var LockLockedIcon_default = SvgLockLockedIcon;

// src/assets/icons/MicDisabledIcon.tsx
var React62 = __toESM(require("react"));
var SvgMicDisabledIcon = (props) => /* @__PURE__ */ React62.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React62.createElement("path", { d: "M12.227 11.52a5.477 5.477 0 0 0 1.246-2.97.5.5 0 0 0-.995-.1 4.478 4.478 0 0 1-.962 2.359l-1.07-1.07C10.794 9.247 11 8.647 11 8V3a3 3 0 0 0-6 0v1.293L1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708zM8 12.5c.683 0 1.33-.152 1.911-.425l.743.743c-.649.359-1.378.59-2.154.66V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.502 5.502 0 0 1-4.973-4.929.5.5 0 0 1 .995-.098A4.5 4.5 0 0 0 8 12.5z" }), /* @__PURE__ */ React62.createElement("path", { d: "M8.743 10.907 5 7.164V8a3 3 0 0 0 3.743 2.907z" }));
var MicDisabledIcon_default = SvgMicDisabledIcon;

// src/assets/icons/MicIcon.tsx
var React63 = __toESM(require("react"));
var SvgMicIcon = (props) => /* @__PURE__ */ React63.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React63.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.975 8.002a.5.5 0 0 1 .547.449 4.5 4.5 0 0 0 8.956 0 .5.5 0 1 1 .995.098A5.502 5.502 0 0 1 8.5 13.478V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.502 5.502 0 0 1-4.973-4.929.5.5 0 0 1 .448-.547z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React63.createElement("path", { d: "M5 3a3 3 0 1 1 6 0v5a3 3 0 0 1-6 0z" }));
var MicIcon_default = SvgMicIcon;

// src/assets/icons/QualityExcellentIcon.tsx
var React64 = __toESM(require("react"));
var SvgQualityExcellentIcon = (props) => /* @__PURE__ */ React64.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React64.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React64.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }));
var QualityExcellentIcon_default = SvgQualityExcellentIcon;

// src/assets/icons/QualityGoodIcon.tsx
var React65 = __toESM(require("react"));
var SvgQualityGoodIcon = (props) => /* @__PURE__ */ React65.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React65.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React65.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React65.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React65.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React65.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityGoodIcon_default = SvgQualityGoodIcon;

// src/assets/icons/QualityPoorIcon.tsx
var React66 = __toESM(require("react"));
var SvgQualityPoorIcon = (props) => /* @__PURE__ */ React66.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React66.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React66.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React66.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React66.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React66.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React66.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityPoorIcon_default = SvgQualityPoorIcon;

// src/assets/icons/QualityUnknownIcon.tsx
var React67 = __toESM(require("react"));
var SvgQualityUnknownIcon = (props) => /* @__PURE__ */ React67.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React67.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React67.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" }), /* @__PURE__ */ React67.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" })));
var QualityUnknownIcon_default = SvgQualityUnknownIcon;

// src/assets/icons/ScreenShareIcon.tsx
var React68 = __toESM(require("react"));
var SvgScreenShareIcon = (props) => /* @__PURE__ */ React68.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React68.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h14.5A2.75 2.75 0 0 1 20 2.75v10.5A2.75 2.75 0 0 1 17.25 16H2.75A2.75 2.75 0 0 1 0 13.25V2.75ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React68.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M9.47 4.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v4.69a.75.75 0 0 1-1.5 0V6.56l-.97.97a.75.75 0 0 1-1.06-1.06l2.25-2.25Z",
    clipRule: "evenodd"
  }
));
var ScreenShareIcon_default = SvgScreenShareIcon;

// src/assets/icons/ScreenShareStopIcon.tsx
var React69 = __toESM(require("react"));
var SvgScreenShareStopIcon = (props) => /* @__PURE__ */ React69.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React69.createElement("g", { fill: "currentColor" }, /* @__PURE__ */ React69.createElement("path", { d: "M7.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L10 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L11.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L10 6.94z" }), /* @__PURE__ */ React69.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.75 0A2.75 2.75 0 0 0 0 2.75v10.5A2.75 2.75 0 0 0 2.75 16h14.5A2.75 2.75 0 0 0 20 13.25V2.75A2.75 2.75 0 0 0 17.25 0zM1.5 2.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H2.75c-.69 0-1.25-.56-1.25-1.25z",
    clipRule: "evenodd"
  }
)));
var ScreenShareStopIcon_default = SvgScreenShareStopIcon;

// src/assets/icons/SpinnerIcon.tsx
var React70 = __toESM(require("react"));
var SvgSpinnerIcon = (props) => /* @__PURE__ */ React70.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 12a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 12Z",
    clipRule: "evenodd",
    opacity: 0.7
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 1.072a.75.75 0 0 1 .274 1.024l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 12 1.072Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 11.464a.75.75 0 0 1 .274 1.025l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 6 11.464Z",
    clipRule: "evenodd",
    opacity: 0.6
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 4a.75.75 0 0 1-.274 1.025l-2.165 1.25a.75.75 0 1 1-.75-1.3l2.165-1.25A.75.75 0 0 1 14.928 4Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 10a.75.75 0 0 1-.275 1.024l-2.165 1.25a.75.75 0 0 1-.75-1.298l2.165-1.25A.75.75 0 0 1 4.536 10Z",
    clipRule: "evenodd",
    opacity: 0.5
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M16 8a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 16 8Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 8Z",
    clipRule: "evenodd",
    opacity: 0.4
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 12a.75.75 0 0 1-1.024.274l-2.165-1.25a.75.75 0 0 1 .75-1.299l2.165 1.25A.75.75 0 0 1 14.928 12Z",
    clipRule: "evenodd",
    opacity: 0.9
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 6a.75.75 0 0 1-1.025.275l-2.165-1.25a.75.75 0 1 1 .75-1.3l2.165 1.25A.75.75 0 0 1 4.536 6Z",
    clipRule: "evenodd",
    opacity: 0.3
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 14.928a.75.75 0 0 1-1.024-.274l-1.25-2.165a.75.75 0 0 1 1.298-.75l1.25 2.165A.75.75 0 0 1 12 14.928Z",
    clipRule: "evenodd",
    opacity: 0.8
  }
), /* @__PURE__ */ React70.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 4.536a.75.75 0 0 1-1.024-.275l-1.25-2.165a.75.75 0 1 1 1.299-.75l1.25 2.165A.75.75 0 0 1 6 4.536Z",
    clipRule: "evenodd",
    opacity: 0.2
  }
));
var SpinnerIcon_default = SvgSpinnerIcon;

// src/assets/icons/UnfocusToggleIcon.tsx
var React71 = __toESM(require("react"));
var SvgUnfocusToggleIcon = (props) => /* @__PURE__ */ React71.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React71.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React71.createElement("path", { d: "M13.25 7H9m0 0V2.75M9 7l5.25-5.25M2.75 9H7m0 0v4.25M7 9l-5.25 5.25" })));
var UnfocusToggleIcon_default = SvgUnfocusToggleIcon;

// src/components/controls/FocusToggle.tsx
function FocusToggle(_a) {
  var _b = _a, { trackRef, trackSource, participant } = _b, props = __objRest(_b, ["trackRef", "trackSource", "participant"]);
  const trackRefFromContext = useMaybeTrackRefContext();
  const { mergedProps, inFocus } = useFocusToggle({
    trackRef: trackRef != null ? trackRef : trackRefFromContext,
    trackSource,
    participant,
    props
  });
  return /* @__PURE__ */ React72.createElement(LayoutContext.Consumer, null, (layoutContext) => layoutContext !== void 0 && /* @__PURE__ */ React72.createElement("button", __spreadValues({}, mergedProps), props.children ? props.children : inFocus ? /* @__PURE__ */ React72.createElement(UnfocusToggleIcon_default, null) : /* @__PURE__ */ React72.createElement(FocusToggleIcon_default, null)));
}

// src/components/controls/MediaDeviceSelect.tsx
var React73 = __toESM(require("react"));
var import_livekit_client9 = require("livekit-client");
function MediaDeviceSelect(_a) {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    onDeviceListChange,
    onDeviceSelectError,
    exactMatch,
    track,
    requestPermissions,
    onError
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "onDeviceListChange",
    "onDeviceSelectError",
    "exactMatch",
    "track",
    "requestPermissions",
    "onError"
  ]);
  const room = useMaybeRoomContext();
  const handleError = React73.useCallback(
    (e) => {
      if (room) {
        room.emit(import_livekit_client9.RoomEvent.MediaDevicesError, e);
      }
      onError == null ? void 0 : onError(e);
    },
    [room, onError]
  );
  const { devices, activeDeviceId, setActiveMediaDevice, className } = useMediaDeviceSelect({
    kind,
    room,
    track,
    requestPermissions,
    onError: handleError
  });
  React73.useEffect(() => {
    if (initialSelection !== void 0) {
      setActiveMediaDevice(initialSelection);
    }
  }, [setActiveMediaDevice]);
  React73.useEffect(() => {
    if (typeof onDeviceListChange === "function") {
      onDeviceListChange(devices);
    }
  }, [onDeviceListChange, devices]);
  React73.useEffect(() => {
    if (activeDeviceId && activeDeviceId !== "") {
      onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(activeDeviceId);
    }
  }, [activeDeviceId]);
  const handleActiveDeviceChange = (deviceId) => __async(this, null, function* () {
    try {
      yield setActiveMediaDevice(deviceId, { exact: exactMatch });
    } catch (e) {
      if (e instanceof Error) {
        onDeviceSelectError == null ? void 0 : onDeviceSelectError(e);
      } else {
        throw e;
      }
    }
  });
  const mergedProps = React73.useMemo(
    () => mergeProps2(props, { className }, { className: "lk-list" }),
    [className, props]
  );
  function isActive(deviceId, activeDeviceId2, index) {
    return deviceId === activeDeviceId2 || index === 0 && activeDeviceId2 === "default";
  }
  return /* @__PURE__ */ React73.createElement("ul", __spreadValues({}, mergedProps), devices.map((device, index) => /* @__PURE__ */ React73.createElement(
    "li",
    {
      key: device.deviceId,
      id: device.deviceId,
      "data-lk-active": isActive(device.deviceId, activeDeviceId, index),
      "aria-selected": isActive(device.deviceId, activeDeviceId, index),
      role: "option"
    },
    /* @__PURE__ */ React73.createElement("button", { className: "lk-button", onClick: () => handleActiveDeviceChange(device.deviceId) }, device.label)
  )));
}

// src/components/controls/StartAudio.tsx
var React74 = __toESM(require("react"));
function StartAudio(_a) {
  var _b = _a, { label = "Allow Audio" } = _b, props = __objRest(_b, ["label"]);
  const room = useRoomContext();
  const { mergedProps } = useStartAudio({ room, props });
  return /* @__PURE__ */ React74.createElement("button", __spreadValues({}, mergedProps), label);
}

// src/components/controls/TrackToggle.tsx
var React76 = __toESM(require("react"));

// src/assets/icons/util.tsx
var React75 = __toESM(require("react"));
var import_livekit_client10 = require("livekit-client");
function getSourceIcon(source, enabled) {
  switch (source) {
    case import_livekit_client10.Track.Source.Microphone:
      return enabled ? /* @__PURE__ */ React75.createElement(MicIcon_default, null) : /* @__PURE__ */ React75.createElement(MicDisabledIcon_default, null);
    case import_livekit_client10.Track.Source.Camera:
      return enabled ? /* @__PURE__ */ React75.createElement(CameraIcon_default, null) : /* @__PURE__ */ React75.createElement(CameraDisabledIcon_default, null);
    case import_livekit_client10.Track.Source.ScreenShare:
      return enabled ? /* @__PURE__ */ React75.createElement(ScreenShareStopIcon_default, null) : /* @__PURE__ */ React75.createElement(ScreenShareIcon_default, null);
    default:
      return void 0;
  }
}
function getConnectionQualityIcon(quality) {
  switch (quality) {
    case import_livekit_client10.ConnectionQuality.Excellent:
      return /* @__PURE__ */ React75.createElement(QualityExcellentIcon_default, null);
    case import_livekit_client10.ConnectionQuality.Good:
      return /* @__PURE__ */ React75.createElement(QualityGoodIcon_default, null);
    case import_livekit_client10.ConnectionQuality.Poor:
      return /* @__PURE__ */ React75.createElement(QualityPoorIcon_default, null);
    default:
      return /* @__PURE__ */ React75.createElement(QualityUnknownIcon_default, null);
  }
}

// src/components/controls/TrackToggle.tsx
function TrackToggle(_a) {
  var _b = _a, { showIcon } = _b, props = __objRest(_b, ["showIcon"]);
  const { buttonProps, enabled } = useTrackToggle(props);
  return /* @__PURE__ */ React76.createElement("button", __spreadValues({}, buttonProps), (showIcon != null ? showIcon : true) && getSourceIcon(props.source, enabled), props.children);
}

// src/components/layout/FocusLayout.tsx
var React84 = __toESM(require("react"));

// src/components/participant/ParticipantTile.tsx
var React83 = __toESM(require("react"));
var import_livekit_client13 = require("livekit-client");
var import_components_core42 = require("@livekit/components-core");

// src/components/participant/ConnectionQualityIndicator.tsx
var React77 = __toESM(require("react"));
function ConnectionQualityIndicator(props) {
  var _a;
  const { className, quality } = useConnectionQualityIndicator(props);
  const elementProps = React77.useMemo(() => {
    return __spreadProps(__spreadValues({}, mergeProps2(props, { className })), { "data-lk-quality": quality });
  }, [quality, props, className]);
  return /* @__PURE__ */ React77.createElement("div", __spreadValues({}, elementProps), (_a = props.children) != null ? _a : getConnectionQualityIcon(quality));
}

// src/components/participant/ParticipantName.tsx
var import_components_core40 = require("@livekit/components-core");
var React78 = __toESM(require("react"));
function ParticipantName(_a) {
  var _b = _a, { participant } = _b, props = __objRest(_b, ["participant"]);
  const p = useEnsureParticipant(participant);
  const { className, infoObserver } = React78.useMemo(() => {
    return (0, import_components_core40.setupParticipantName)(p);
  }, [p]);
  const { identity, name } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  const mergedProps = React78.useMemo(() => {
    return mergeProps2(props, { className, "data-lk-participant-name": name });
  }, [props, className, name]);
  return /* @__PURE__ */ React78.createElement("span", __spreadValues({}, mergedProps), name !== "" ? name : identity, props.children);
}

// src/components/participant/TrackMutedIndicator.tsx
var React79 = __toESM(require("react"));
function TrackMutedIndicator(_a) {
  var _b = _a, {
    source,
    participant,
    trackRef,
    show = "always"
  } = _b, props = __objRest(_b, [
    "source",
    "participant",
    "trackRef",
    "show"
  ]);
  var _a2, _b2;
  const { className, isMuted } = useTrackMutedIndicator(trackRef != null ? trackRef : source, { participant });
  const showIndicator = show === "always" || show === "muted" && isMuted || show === "unmuted" && !isMuted;
  const htmlProps = React79.useMemo(
    () => mergeProps2(props, {
      className
    }),
    [className, props]
  );
  if (!showIndicator) {
    return null;
  }
  return /* @__PURE__ */ React79.createElement("div", __spreadProps(__spreadValues({}, htmlProps), { "data-lk-muted": isMuted }), (_b2 = props.children) != null ? _b2 : getSourceIcon((_a2 = trackRef == null ? void 0 : trackRef.source) != null ? _a2 : source, !isMuted));
}

// src/assets/images/ParticipantPlaceholder.tsx
var React80 = __toESM(require("react"));
var SvgParticipantPlaceholder = (props) => /* @__PURE__ */ React80.createElement(
  "svg",
  __spreadValues({
    width: 320,
    height: 320,
    viewBox: "0 0 320 320",
    preserveAspectRatio: "xMidYMid meet",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React80.createElement(
    "path",
    {
      d: "M160 180C204.182 180 240 144.183 240 100C240 55.8172 204.182 20 160 20C115.817 20 79.9997 55.8172 79.9997 100C79.9997 144.183 115.817 180 160 180Z",
      fill: "white",
      fillOpacity: 0.25
    }
  ),
  /* @__PURE__ */ React80.createElement(
    "path",
    {
      d: "M97.6542 194.614C103.267 191.818 109.841 192.481 115.519 195.141C129.025 201.466 144.1 205 159.999 205C175.899 205 190.973 201.466 204.48 195.141C210.158 192.481 216.732 191.818 222.345 194.614C262.703 214.719 291.985 253.736 298.591 300.062C300.15 310.997 291.045 320 280 320H39.9997C28.954 320 19.8495 310.997 21.4087 300.062C28.014 253.736 57.2966 214.72 97.6542 194.614Z",
      fill: "white",
      fillOpacity: 0.25
    }
  )
);
var ParticipantPlaceholder_default = SvgParticipantPlaceholder;

// src/components/participant/VideoTrack.tsx
var import_livekit_client11 = require("livekit-client");
var React81 = __toESM(require("react"));
var useHooks = __toESM(require("usehooks-ts"));
function VideoTrack(_a) {
  var _b = _a, {
    onTrackClick,
    onClick,
    onSubscriptionStatusChanged,
    trackRef,
    name,
    publication,
    source,
    participant: p,
    manageSubscription
  } = _b, props = __objRest(_b, [
    "onTrackClick",
    "onClick",
    "onSubscriptionStatusChanged",
    "trackRef",
    "name",
    "publication",
    "source",
    "participant",
    "manageSubscription"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
  const maybeTrackRef = useMaybeTrackRefContext();
  const _name = (_d = (_c = (_a2 = trackRef == null ? void 0 : trackRef.publication) == null ? void 0 : _a2.trackName) != null ? _c : (_b2 = maybeTrackRef == null ? void 0 : maybeTrackRef.publication) == null ? void 0 : _b2.trackName) != null ? _d : name;
  const _source = (_f = (_e = trackRef == null ? void 0 : trackRef.source) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _f : source;
  const _publication = (_h = (_g = trackRef == null ? void 0 : trackRef.publication) != null ? _g : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _h : publication;
  const _participant = (_j = (_i = trackRef == null ? void 0 : trackRef.participant) != null ? _i : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _j : p;
  if (_source === void 0) {
    throw new Error("VideoTrack: You must provide a trackRef or source property.");
  }
  const participant = useEnsureParticipant(_participant);
  const mediaEl = React81.useRef(null);
  const intersectionEntry = useHooks.useIntersectionObserver(mediaEl, {});
  const debouncedIntersectionEntry = useHooks.useDebounce(intersectionEntry, 3e3);
  React81.useEffect(() => {
    if (manageSubscription && _publication instanceof import_livekit_client11.RemoteTrackPublication && (debouncedIntersectionEntry == null ? void 0 : debouncedIntersectionEntry.isIntersecting) === false && (intersectionEntry == null ? void 0 : intersectionEntry.isIntersecting) === false) {
      _publication.setSubscribed(false);
    }
  }, [debouncedIntersectionEntry, _publication, manageSubscription]);
  React81.useEffect(() => {
    if (manageSubscription && _publication instanceof import_livekit_client11.RemoteTrackPublication && (intersectionEntry == null ? void 0 : intersectionEntry.isIntersecting) === true) {
      _publication.setSubscribed(true);
    }
  }, [intersectionEntry, _publication, manageSubscription]);
  const {
    elementProps,
    publication: pub,
    isSubscribed
  } = useMediaTrackBySourceOrName(
    { participant, name: _name, source: _source, publication: _publication },
    {
      element: mediaEl,
      props
    }
  );
  React81.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  const clickHandler = (evt) => {
    onClick == null ? void 0 : onClick(evt);
    onTrackClick == null ? void 0 : onTrackClick({ participant, track: pub });
  };
  return /* @__PURE__ */ React81.createElement("video", __spreadProps(__spreadValues({ ref: mediaEl }, elementProps), { muted: true, onClick: clickHandler }));
}

// src/components/participant/AudioTrack.tsx
var React82 = __toESM(require("react"));
var import_components_core41 = require("@livekit/components-core");
var import_livekit_client12 = require("livekit-client");
function AudioTrack(_a) {
  var _b = _a, {
    trackRef,
    onSubscriptionStatusChanged,
    volume,
    source,
    name,
    publication,
    participant: p
  } = _b, props = __objRest(_b, [
    "trackRef",
    "onSubscriptionStatusChanged",
    "volume",
    "source",
    "name",
    "publication",
    "participant"
  ]);
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
  const maybeTrackRef = useMaybeTrackRefContext();
  const _name = (_d = (_c = (_a2 = trackRef == null ? void 0 : trackRef.publication) == null ? void 0 : _a2.trackName) != null ? _c : (_b2 = maybeTrackRef == null ? void 0 : maybeTrackRef.publication) == null ? void 0 : _b2.trackName) != null ? _d : name;
  const _source = (_f = (_e = trackRef == null ? void 0 : trackRef.source) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _f : source;
  const _publication = (_h = (_g = trackRef == null ? void 0 : trackRef.publication) != null ? _g : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _h : publication;
  const _participant = (_j = (_i = trackRef == null ? void 0 : trackRef.participant) != null ? _i : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _j : p;
  if (_source === void 0) {
    throw new Error("The AudioTrack component expects a trackRef or source property.");
  }
  const mediaEl = React82.useRef(null);
  const participant = useEnsureParticipant(_participant);
  const {
    elementProps,
    isSubscribed,
    track,
    publication: pub
  } = useMediaTrackBySourceOrName(
    { source: _source, name: _name, participant, publication: _publication },
    {
      element: mediaEl,
      props
    }
  );
  React82.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  React82.useEffect(() => {
    if (track === void 0 || volume === void 0) {
      return;
    }
    if (track instanceof import_livekit_client12.RemoteAudioTrack) {
      track.setVolume(volume);
    } else {
      import_components_core41.log.warn("Volume can only be set on remote audio tracks.");
    }
  }, [volume, track]);
  React82.useEffect(() => {
    if (pub === void 0 || props.muted === void 0) {
      return;
    }
    if (pub instanceof import_livekit_client12.RemoteTrackPublication) {
      pub.setEnabled(!props.muted);
    } else {
      import_components_core41.log.warn("Can only call setEnabled on remote track publications.");
    }
  }, [props.muted, pub, track]);
  return /* @__PURE__ */ React82.createElement("audio", __spreadValues({ ref: mediaEl }, elementProps));
}

// src/components/participant/ParticipantTile.tsx
function ParticipantContextIfNeeded(props) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? /* @__PURE__ */ React83.createElement(ParticipantContext.Provider, { value: props.participant }, props.children) : /* @__PURE__ */ React83.createElement(React83.Fragment, null, props.children);
}
function TrackRefContextIfNeeded(props) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? /* @__PURE__ */ React83.createElement(TrackRefContext.Provider, { value: props.trackRef }, props.children) : /* @__PURE__ */ React83.createElement(React83.Fragment, null, props.children);
}
function ParticipantTile(_a) {
  var _b = _a, {
    trackRef,
    participant,
    children,
    source = import_livekit_client13.Track.Source.Camera,
    onParticipantClick,
    publication,
    disableSpeakingIndicator
  } = _b, htmlProps = __objRest(_b, [
    "trackRef",
    "participant",
    "children",
    "source",
    "onParticipantClick",
    "publication",
    "disableSpeakingIndicator"
  ]);
  var _a2, _b2;
  const maybeTrackRef = useMaybeTrackRefContext();
  const p = useEnsureParticipant(participant);
  const trackReference = React83.useMemo(() => {
    var _a3, _b3, _c, _d, _e, _f;
    return {
      participant: (_b3 = (_a3 = trackRef == null ? void 0 : trackRef.participant) != null ? _a3 : maybeTrackRef == null ? void 0 : maybeTrackRef.participant) != null ? _b3 : p,
      source: (_d = (_c = trackRef == null ? void 0 : trackRef.source) != null ? _c : maybeTrackRef == null ? void 0 : maybeTrackRef.source) != null ? _d : source,
      publication: (_f = (_e = trackRef == null ? void 0 : trackRef.publication) != null ? _e : maybeTrackRef == null ? void 0 : maybeTrackRef.publication) != null ? _f : publication
    };
  }, [maybeTrackRef, p, publication, source, trackRef]);
  const { elementProps } = useParticipantTile({
    participant: trackReference.participant,
    htmlProps,
    source: trackReference.source,
    publication: trackReference.publication,
    disableSpeakingIndicator,
    onParticipantClick
  });
  const isEncrypted = useIsEncrypted(p);
  const layoutContext = useMaybeLayoutContext();
  const autoManageSubscription = (_a2 = useFeatureContext()) == null ? void 0 : _a2.autoSubscription;
  const handleSubscribe = React83.useCallback(
    (subscribed) => {
      if (trackReference.source && !subscribed && layoutContext && layoutContext.pin.dispatch && (0, import_components_core42.isTrackReferencePinned)(trackReference, layoutContext.pin.state)) {
        layoutContext.pin.dispatch({ msg: "clear_pin" });
      }
    },
    [trackReference, layoutContext]
  );
  return /* @__PURE__ */ React83.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React83.createElement(TrackRefContextIfNeeded, { trackRef: trackReference }, /* @__PURE__ */ React83.createElement(ParticipantContextIfNeeded, { participant: trackReference.participant }, children != null ? children : /* @__PURE__ */ React83.createElement(React83.Fragment, null, (0, import_components_core42.isTrackReference)(trackReference) && (((_b2 = trackReference.publication) == null ? void 0 : _b2.kind) === "video" || trackReference.source === import_livekit_client13.Track.Source.Camera || trackReference.source === import_livekit_client13.Track.Source.ScreenShare) ? /* @__PURE__ */ React83.createElement(
    VideoTrack,
    {
      trackRef: trackReference,
      onSubscriptionStatusChanged: handleSubscribe,
      manageSubscription: autoManageSubscription
    }
  ) : (0, import_components_core42.isTrackReference)(trackReference) && /* @__PURE__ */ React83.createElement(
    AudioTrack,
    {
      trackRef: trackReference,
      onSubscriptionStatusChanged: handleSubscribe
    }
  ), /* @__PURE__ */ React83.createElement("div", { className: "lk-participant-placeholder" }, /* @__PURE__ */ React83.createElement(ParticipantPlaceholder_default, null)), /* @__PURE__ */ React83.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React83.createElement("div", { className: "lk-participant-metadata-item" }, trackReference.source === import_livekit_client13.Track.Source.Camera ? /* @__PURE__ */ React83.createElement(React83.Fragment, null, isEncrypted && /* @__PURE__ */ React83.createElement(LockLockedIcon_default, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ React83.createElement(
    TrackMutedIndicator,
    {
      source: import_livekit_client13.Track.Source.Microphone,
      show: "muted"
    }
  ), /* @__PURE__ */ React83.createElement(ParticipantName, null)) : /* @__PURE__ */ React83.createElement(React83.Fragment, null, /* @__PURE__ */ React83.createElement(ScreenShareIcon_default, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ React83.createElement(ParticipantName, null, "'s screen"))), /* @__PURE__ */ React83.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" }))), /* @__PURE__ */ React83.createElement(FocusToggle, { trackRef: trackReference }))));
}

// src/components/layout/FocusLayout.tsx
function FocusLayoutContainer(props) {
  const elementProps = mergeProps2(props, { className: "lk-focus-layout" });
  return /* @__PURE__ */ React84.createElement("div", __spreadValues({}, elementProps), props.children);
}
function FocusLayout(_a) {
  var _b = _a, { trackRef, track } = _b, htmlProps = __objRest(_b, ["trackRef", "track"]);
  const trackReference = trackRef != null ? trackRef : track;
  return /* @__PURE__ */ React84.createElement(ParticipantTile, __spreadValues(__spreadValues({}, trackReference), htmlProps));
}

// src/components/layout/GridLayout.tsx
var React88 = __toESM(require("react"));

// src/components/TrackLoop.tsx
var React85 = __toESM(require("react"));
var import_components_core43 = require("@livekit/components-core");
function TrackLoop(_a) {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  return /* @__PURE__ */ React85.createElement(React85.Fragment, null, tracks.map((trackReference) => {
    return /* @__PURE__ */ React85.createElement(
      TrackRefContext.Provider,
      {
        value: trackReference,
        key: (0, import_components_core43.getTrackReferenceId)(trackReference)
      },
      cloneSingleChild(props.children)
    );
  }));
}

// src/components/controls/PaginationControl.tsx
var React86 = __toESM(require("react"));
var import_components_core44 = require("@livekit/components-core");
function PaginationControl({
  totalPageCount,
  nextPage,
  prevPage,
  currentPage,
  pagesContainer: connectedElement
}) {
  const [interactive, setInteractive] = React86.useState(false);
  React86.useEffect(() => {
    let subscription;
    if (connectedElement) {
      subscription = (0, import_components_core44.createInteractingObservable)(connectedElement.current, 2e3).subscribe(
        setInteractive
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [connectedElement]);
  return /* @__PURE__ */ React86.createElement("div", { className: "lk-pagination-control", "data-lk-user-interaction": interactive }, /* @__PURE__ */ React86.createElement("button", { className: "lk-button", onClick: prevPage }, /* @__PURE__ */ React86.createElement(Chevron_default, null)), /* @__PURE__ */ React86.createElement("span", { className: "lk-pagination-count" }, `${currentPage} of ${totalPageCount}`), /* @__PURE__ */ React86.createElement("button", { className: "lk-button", onClick: nextPage }, /* @__PURE__ */ React86.createElement(Chevron_default, null)));
}

// src/components/controls/PaginationIndicator.tsx
var React87 = __toESM(require("react"));
function PaginationIndicator({ totalPageCount, currentPage }) {
  const bubbles = new Array(totalPageCount).fill("").map((_, index) => {
    if (index + 1 === currentPage) {
      return /* @__PURE__ */ React87.createElement("span", { "data-lk-active": true, key: index });
    } else {
      return /* @__PURE__ */ React87.createElement("span", { key: index });
    }
  });
  return /* @__PURE__ */ React87.createElement("div", { className: "lk-pagination-indicator" }, bubbles);
}

// src/components/layout/GridLayout.tsx
function GridLayout(_a) {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  const gridEl = React88.createRef();
  const elementProps = React88.useMemo(
    () => mergeProps2(props, { className: "lk-grid-layout" }),
    [props]
  );
  const { layout } = useGridLayout(gridEl, tracks.length);
  const pagination = usePagination(layout.maxTiles, tracks);
  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage
  });
  return /* @__PURE__ */ React88.createElement("div", __spreadValues({ ref: gridEl, "data-lk-pagination": pagination.totalPageCount > 1 }, elementProps), /* @__PURE__ */ React88.createElement(TrackLoop, { tracks: pagination.tracks }, props.children), tracks.length > layout.maxTiles && /* @__PURE__ */ React88.createElement(React88.Fragment, null, /* @__PURE__ */ React88.createElement(
    PaginationIndicator,
    {
      totalPageCount: pagination.totalPageCount,
      currentPage: pagination.currentPage
    }
  ), /* @__PURE__ */ React88.createElement(PaginationControl, __spreadValues({ pagesContainer: gridEl }, pagination))));
}

// src/components/layout/CarouselLayout.tsx
var import_components_core45 = require("@livekit/components-core");
var React89 = __toESM(require("react"));
var MIN_HEIGHT = 130;
var MIN_WIDTH = 140;
var MIN_VISIBLE_TILES = 1;
var ASPECT_RATIO = 16 / 10;
var ASPECT_RATIO_INVERT = (1 - ASPECT_RATIO) * -1;
var CarouselView = CarouselLayout;
function CarouselLayout(_a) {
  var _b = _a, { tracks, orientation } = _b, props = __objRest(_b, ["tracks", "orientation"]);
  const asideEl = React89.useRef(null);
  const [prevTiles, setPrevTiles] = React89.useState(0);
  const { width, height } = useSize(asideEl);
  const carouselOrientation = orientation ? orientation : height >= width ? "vertical" : "horizontal";
  const tileSpan = carouselOrientation === "vertical" ? Math.max(width * ASPECT_RATIO_INVERT, MIN_HEIGHT) : Math.max(height * ASPECT_RATIO, MIN_WIDTH);
  const scrollBarWidth = (0, import_components_core45.getScrollBarWidth)();
  const tilesThatFit = carouselOrientation === "vertical" ? Math.max((height - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES) : Math.max((width - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES);
  let maxVisibleTiles = Math.round(tilesThatFit);
  if (Math.abs(tilesThatFit - prevTiles) < 0.5) {
    maxVisibleTiles = Math.round(prevTiles);
  } else if (prevTiles !== tilesThatFit) {
    setPrevTiles(tilesThatFit);
  }
  const sortedTiles = useVisualStableUpdate(tracks, maxVisibleTiles);
  React89.useLayoutEffect(() => {
    if (asideEl.current) {
      asideEl.current.dataset.lkOrientation = carouselOrientation;
      asideEl.current.style.setProperty("--lk-max-visible-tiles", maxVisibleTiles.toString());
    }
  }, [maxVisibleTiles, carouselOrientation]);
  return /* @__PURE__ */ React89.createElement("aside", __spreadValues({ key: carouselOrientation, className: "lk-carousel", ref: asideEl }, props), /* @__PURE__ */ React89.createElement(TrackLoop, { tracks: sortedTiles }, props.children));
}

// src/components/layout/LayoutContextProvider.tsx
var import_components_core46 = require("@livekit/components-core");
var React90 = __toESM(require("react"));
function LayoutContextProvider({
  value,
  onPinChange,
  onWidgetChange,
  children
}) {
  const layoutContextValue = useEnsureCreateLayoutContext(value);
  React90.useEffect(() => {
    import_components_core46.log.debug("PinState Updated", { state: layoutContextValue.pin.state });
    if (onPinChange && layoutContextValue.pin.state)
      onPinChange(layoutContextValue.pin.state);
  }, [layoutContextValue.pin.state, onPinChange]);
  React90.useEffect(() => {
    import_components_core46.log.debug("Widget Updated", { widgetState: layoutContextValue.widget.state });
    if (onWidgetChange && layoutContextValue.widget.state) {
      onWidgetChange(layoutContextValue.widget.state);
    }
  }, [onWidgetChange, layoutContextValue.widget.state]);
  return /* @__PURE__ */ React90.createElement(LayoutContext.Provider, { value: layoutContextValue }, children);
}

// src/components/LiveKitRoom.tsx
var React91 = __toESM(require("react"));
function LiveKitRoom(props) {
  const { room, htmlProps } = useLiveKitRoom(props);
  return /* @__PURE__ */ React91.createElement("div", __spreadValues({}, htmlProps), room && /* @__PURE__ */ React91.createElement(RoomContext.Provider, { value: room }, /* @__PURE__ */ React91.createElement(LKFeatureContext.Provider, { value: props.featureFlags }, props.children)));
}

// src/components/participant/AudioVisualizer.tsx
var import_livekit_client14 = require("livekit-client");
var React92 = __toESM(require("react"));
function AudioVisualizer(_a) {
  var _b = _a, { participant, trackRef } = _b, props = __objRest(_b, ["participant", "trackRef"]);
  var _a2, _b2;
  const svgWidth = 200;
  const svgHeight = 90;
  const barWidth = 6;
  const barSpacing = 4;
  const volMultiplier = 50;
  const barCount = 7;
  const p = (_a2 = useMaybeParticipantContext()) != null ? _a2 : participant;
  let ref = (_b2 = useMaybeTrackRefContext()) != null ? _b2 : trackRef;
  if (!ref) {
    if (!p) {
      throw Error(`Participant missing, provide it directly or within a context`);
    }
    ref = { participant: p, source: import_livekit_client14.Track.Source.Microphone };
  }
  const volumes = useMultibandTrackVolume(ref, { bands: 7, loPass: 300 });
  return /* @__PURE__ */ React92.createElement(
    "svg",
    __spreadProps(__spreadValues({
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${svgWidth} ${svgHeight}`
    }, props), {
      className: "lk-audio-visualizer"
    }),
    /* @__PURE__ */ React92.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%" }),
    /* @__PURE__ */ React92.createElement(
      "g",
      {
        style: {
          transform: `translate(${(svgWidth - barCount * (barWidth + barSpacing)) / 2}px, 0)`
        }
      },
      volumes.map((vol, idx) => /* @__PURE__ */ React92.createElement(
        "rect",
        {
          key: idx,
          x: idx * (barWidth + barSpacing),
          y: svgHeight / 2 - vol * volMultiplier / 2,
          width: barWidth,
          height: vol * volMultiplier
        }
      ))
    )
  );
}

// src/components/ParticipantLoop.tsx
var React93 = __toESM(require("react"));
function ParticipantLoop(_a) {
  var _b = _a, { participants } = _b, props = __objRest(_b, ["participants"]);
  return /* @__PURE__ */ React93.createElement(React93.Fragment, null, participants.map((participant) => /* @__PURE__ */ React93.createElement(ParticipantContext.Provider, { value: participant, key: participant.identity }, cloneSingleChild(props.children))));
}

// src/components/RoomAudioRenderer.tsx
var import_components_core47 = require("@livekit/components-core");
var import_livekit_client15 = require("livekit-client");
var React94 = __toESM(require("react"));
function RoomAudioRenderer({ volume, muted }) {
  const tracks = useTracks(
    [import_livekit_client15.Track.Source.Microphone, import_livekit_client15.Track.Source.ScreenShareAudio, import_livekit_client15.Track.Source.Unknown],
    {
      updateOnlyOn: [],
      onlySubscribed: false
    }
  ).filter((ref) => !(0, import_components_core47.isLocal)(ref.participant) && ref.publication.kind === import_livekit_client15.Track.Kind.Audio);
  React94.useEffect(() => {
    for (const track of tracks) {
      track.publication.setSubscribed(true);
    }
  }, [tracks]);
  return /* @__PURE__ */ React94.createElement("div", { style: { display: "none" } }, tracks.map((trackRef) => /* @__PURE__ */ React94.createElement(
    AudioTrack,
    {
      key: (0, import_components_core47.getTrackReferenceId)(trackRef),
      trackRef,
      volume,
      muted
    }
  )));
}

// src/components/RoomName.tsx
var React95 = __toESM(require("react"));
function RoomName(_a) {
  var _b = _a, {
    childrenPosition = "before",
    children
  } = _b, htmlAttributes = __objRest(_b, [
    "childrenPosition",
    "children"
  ]);
  const { name } = useRoomInfo();
  return /* @__PURE__ */ React95.createElement("span", __spreadValues({}, htmlAttributes), childrenPosition === "before" && children, name, childrenPosition === "after" && children);
}

// src/components/Toast.tsx
var React96 = __toESM(require("react"));
function Toast(props) {
  const htmlProps = React96.useMemo(() => mergeProps2(props, { className: "lk-toast" }), [props]);
  return /* @__PURE__ */ React96.createElement("div", __spreadValues({}, htmlProps), props.children);
}

// src/components/participant/ParticipantAudioTile.tsx
var React97 = __toESM(require("react"));
var import_livekit_client16 = require("livekit-client");
function ParticipantAudioTile(_a) {
  var _b = _a, {
    participant,
    children,
    source,
    publication,
    disableSpeakingIndicator,
    onParticipantClick
  } = _b, htmlProps = __objRest(_b, [
    "participant",
    "children",
    "source",
    "publication",
    "disableSpeakingIndicator",
    "onParticipantClick"
  ]);
  const p = useEnsureParticipant(participant);
  const { elementProps } = useParticipantTile({
    participant: p,
    htmlProps,
    disableSpeakingIndicator,
    source: import_livekit_client16.Track.Source.Microphone,
    publication,
    onParticipantClick
  });
  return /* @__PURE__ */ React97.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React97.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React97.createElement(React97.Fragment, null, /* @__PURE__ */ React97.createElement(AudioTrack, { source: source != null ? source : import_livekit_client16.Track.Source.Microphone }), /* @__PURE__ */ React97.createElement(AudioVisualizer, null), /* @__PURE__ */ React97.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React97.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ React97.createElement(TrackMutedIndicator, { source: import_livekit_client16.Track.Source.Microphone }), /* @__PURE__ */ React97.createElement(ParticipantName, null)), /* @__PURE__ */ React97.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" })))));
}

// src/components/ConnectionStateToast.tsx
var import_livekit_client17 = require("livekit-client");
var React98 = __toESM(require("react"));
function ConnectionStateToast(props) {
  const [notification, setNotification] = React98.useState(void 0);
  const state = useConnectionState(props.room);
  React98.useEffect(() => {
    switch (state) {
      case import_livekit_client17.ConnectionState.Reconnecting:
        setNotification(
          /* @__PURE__ */ React98.createElement(React98.Fragment, null, /* @__PURE__ */ React98.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Reconnecting")
        );
        break;
      case import_livekit_client17.ConnectionState.Connecting:
        setNotification(
          /* @__PURE__ */ React98.createElement(React98.Fragment, null, /* @__PURE__ */ React98.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Connecting")
        );
        break;
      case import_livekit_client17.ConnectionState.Disconnected:
        setNotification(/* @__PURE__ */ React98.createElement(React98.Fragment, null, "Disconnected"));
        break;
      default:
        setNotification(void 0);
        break;
    }
  }, [state]);
  return notification ? /* @__PURE__ */ React98.createElement(Toast, { className: "lk-toast-connection-state" }, notification) : /* @__PURE__ */ React98.createElement(React98.Fragment, null);
}

// src/components/ChatEntry.tsx
var import_components_core48 = require("@livekit/components-core");
var React99 = __toESM(require("react"));
function ChatEntry(_a) {
  var _b = _a, {
    entry,
    hideName = false,
    hideTimestamp = false,
    messageFormatter
  } = _b, props = __objRest(_b, [
    "entry",
    "hideName",
    "hideTimestamp",
    "messageFormatter"
  ]);
  var _a2, _b2, _c, _d;
  const formattedMessage = React99.useMemo(() => {
    return messageFormatter ? messageFormatter(entry.message) : entry.message;
  }, [entry.message, messageFormatter]);
  const hasBeenEdited = !!entry.editTimestamp;
  const time = new Date(entry.timestamp);
  const locale = navigator ? navigator.language : "en-US";
  return /* @__PURE__ */ React99.createElement(
    "li",
    __spreadValues({
      className: "lk-chat-entry",
      title: time.toLocaleTimeString(locale, { timeStyle: "full" }),
      "data-lk-message-origin": ((_a2 = entry.from) == null ? void 0 : _a2.isLocal) ? "local" : "remote"
    }, props),
    (!hideTimestamp || !hideName || hasBeenEdited) && /* @__PURE__ */ React99.createElement("span", { className: "lk-meta-data" }, !hideName && /* @__PURE__ */ React99.createElement("strong", { className: "lk-participant-name" }, (_d = (_b2 = entry.from) == null ? void 0 : _b2.name) != null ? _d : (_c = entry.from) == null ? void 0 : _c.identity), (!hideTimestamp || hasBeenEdited) && /* @__PURE__ */ React99.createElement("span", { className: "lk-timestamp" }, hasBeenEdited && "edited ", time.toLocaleTimeString(locale, { timeStyle: "short" }))),
    /* @__PURE__ */ React99.createElement("span", { className: "lk-message-body" }, formattedMessage)
  );
}
function formatChatMessageLinks(message) {
  return (0, import_components_core48.tokenize)(message, (0, import_components_core48.createDefaultGrammar)()).map((tok, i) => {
    if (typeof tok === `string`) {
      return tok;
    } else {
      const content = tok.content.toString();
      const href = tok.type === `url` ? /^http(s?):\/\//.test(content) ? content : `https://${content}` : `mailto:${content}`;
      return /* @__PURE__ */ React99.createElement("a", { className: "lk-chat-link", key: i, href, target: "_blank", rel: "noreferrer" }, content);
    }
  });
}

// src/prefabs/Chat.tsx
var React100 = __toESM(require("react"));
function Chat(_a) {
  var _b = _a, {
    messageFormatter,
    messageDecoder,
    messageEncoder,
    channelTopic
  } = _b, props = __objRest(_b, [
    "messageFormatter",
    "messageDecoder",
    "messageEncoder",
    "channelTopic"
  ]);
  const inputRef = React100.useRef(null);
  const ulRef = React100.useRef(null);
  const chatOptions = React100.useMemo(() => {
    return { messageDecoder, messageEncoder, channelTopic };
  }, [messageDecoder, messageEncoder, channelTopic]);
  const { send, chatMessages, isSending } = useChat(chatOptions);
  const layoutContext = useMaybeLayoutContext();
  const lastReadMsgAt = React100.useRef(0);
  function handleSubmit(event) {
    return __async(this, null, function* () {
      event.preventDefault();
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        if (send) {
          yield send(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    });
  }
  React100.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);
  React100.useEffect(() => {
    var _a2, _b2, _c, _d, _e;
    if (!layoutContext || chatMessages.length === 0) {
      return;
    }
    if (((_a2 = layoutContext.widget.state) == null ? void 0 : _a2.showChat) && chatMessages.length > 0 && lastReadMsgAt.current !== ((_b2 = chatMessages[chatMessages.length - 1]) == null ? void 0 : _b2.timestamp)) {
      lastReadMsgAt.current = (_c = chatMessages[chatMessages.length - 1]) == null ? void 0 : _c.timestamp;
      return;
    }
    const unreadMessageCount = chatMessages.filter(
      (msg) => !lastReadMsgAt.current || msg.timestamp > lastReadMsgAt.current
    ).length;
    const { widget } = layoutContext;
    if (unreadMessageCount > 0 && ((_d = widget.state) == null ? void 0 : _d.unreadMessages) !== unreadMessageCount) {
      (_e = widget.dispatch) == null ? void 0 : _e.call(widget, { msg: "unread_msg", count: unreadMessageCount });
    }
  }, [chatMessages, layoutContext == null ? void 0 : layoutContext.widget]);
  return /* @__PURE__ */ React100.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat" }), /* @__PURE__ */ React100.createElement("div", { className: "lk-chat-header" }, "Messages", /* @__PURE__ */ React100.createElement(ChatToggle, { className: "lk-close-button" }, /* @__PURE__ */ React100.createElement(ChatCloseIcon_default, null))), /* @__PURE__ */ React100.createElement("ul", { className: "lk-list lk-chat-messages", ref: ulRef }, props.children ? chatMessages.map(
    (msg, idx) => {
      var _a2;
      return cloneSingleChild(props.children, {
        entry: msg,
        key: (_a2 = msg.id) != null ? _a2 : idx,
        messageFormatter
      });
    }
  ) : chatMessages.map((msg, idx, allMsg) => {
    var _a2;
    const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
    const hideTimestamp = idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 6e4;
    return /* @__PURE__ */ React100.createElement(
      ChatEntry,
      {
        key: (_a2 = msg.id) != null ? _a2 : idx,
        hideName,
        hideTimestamp: hideName === false ? false : hideTimestamp,
        entry: msg,
        messageFormatter
      }
    );
  })), /* @__PURE__ */ React100.createElement("form", { className: "lk-chat-form", onSubmit: handleSubmit }, /* @__PURE__ */ React100.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      disabled: isSending,
      ref: inputRef,
      type: "text",
      placeholder: "Enter a message..."
    }
  ), /* @__PURE__ */ React100.createElement("button", { type: "submit", className: "lk-button lk-chat-form-button", disabled: isSending }, "Send")));
}

// src/prefabs/PreJoin.tsx
var import_livekit_client18 = require("livekit-client");
var React103 = __toESM(require("react"));

// src/prefabs/MediaDeviceMenu.tsx
var import_components_core49 = require("@livekit/components-core");
var React101 = __toESM(require("react"));
var import_components_core50 = require("@livekit/components-core");
function MediaDeviceMenu(_a) {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    tracks,
    requestPermissions = false
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "tracks",
    "requestPermissions"
  ]);
  const [isOpen, setIsOpen] = React101.useState(false);
  const [devices, setDevices] = React101.useState([]);
  const [updateRequired, setUpdateRequired] = React101.useState(true);
  const handleActiveDeviceChange = (kind2, deviceId) => {
    import_components_core50.log.debug("handle device change");
    setIsOpen(false);
    onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(kind2, deviceId);
  };
  const button = React101.useRef(null);
  const tooltip = React101.useRef(null);
  React101.useLayoutEffect(() => {
    if (button.current && tooltip.current && (devices || updateRequired)) {
      (0, import_components_core49.computeMenuPosition)(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, { left: `${x}px`, top: `${y}px` });
        }
      });
    }
    setUpdateRequired(false);
  }, [button, tooltip, devices, updateRequired]);
  const handleClickOutside = React101.useCallback(
    (event) => {
      if (!tooltip.current) {
        return;
      }
      if (event.target === button.current) {
        return;
      }
      if (isOpen && (0, import_components_core49.wasClickOutside)(tooltip.current, event)) {
        setIsOpen(false);
      }
    },
    [isOpen, tooltip, button]
  );
  React101.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", () => setUpdateRequired(true));
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", () => setUpdateRequired(true));
    };
  }, [handleClickOutside, setUpdateRequired]);
  return /* @__PURE__ */ React101.createElement(React101.Fragment, null, /* @__PURE__ */ React101.createElement(
    "button",
    __spreadProps(__spreadValues({
      className: "lk-button lk-button-menu",
      "aria-pressed": isOpen
    }, props), {
      onClick: () => setIsOpen(!isOpen),
      ref: button
    }),
    props.children
  ), !props.disabled && /* @__PURE__ */ React101.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: tooltip,
      style: { visibility: isOpen ? "visible" : "hidden" }
    },
    kind ? /* @__PURE__ */ React101.createElement(
      MediaDeviceSelect,
      {
        initialSelection,
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange(kind, deviceId),
        onDeviceListChange: setDevices,
        kind,
        track: tracks == null ? void 0 : tracks[kind],
        requestPermissions
      }
    ) : /* @__PURE__ */ React101.createElement(React101.Fragment, null, /* @__PURE__ */ React101.createElement("div", { className: "lk-device-menu-heading" }, "Audio inputs"), /* @__PURE__ */ React101.createElement(
      MediaDeviceSelect,
      {
        kind: "audioinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("audioinput", deviceId),
        onDeviceListChange: setDevices,
        track: tracks == null ? void 0 : tracks.audioinput,
        requestPermissions
      }
    ), /* @__PURE__ */ React101.createElement("div", { className: "lk-device-menu-heading" }, "Video inputs"), /* @__PURE__ */ React101.createElement(
      MediaDeviceSelect,
      {
        kind: "videoinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("videoinput", deviceId),
        onDeviceListChange: setDevices,
        track: tracks == null ? void 0 : tracks.videoinput,
        requestPermissions
      }
    ))
  ));
}

// src/prefabs/PreJoin.tsx
var import_components_core51 = require("@livekit/components-core");

// src/hooks/useWarnAboutMissingStyles.ts
var React102 = __toESM(require("react"));
function useWarnAboutMissingStyles() {
  React102.useEffect(() => {
    warnAboutMissingStyles();
  }, []);
}

// src/prefabs/PreJoin.tsx
var DEFAULT_USER_CHOICES = {
  username: "",
  videoEnabled: true,
  audioEnabled: true,
  videoDeviceId: "default",
  audioDeviceId: "default",
  e2ee: false,
  sharedPassphrase: ""
};
function usePreviewTracks(options, onError) {
  const [tracks, setTracks] = React103.useState();
  React103.useEffect(() => {
    let trackPromise = void 0;
    let needsCleanup = false;
    if (options.audio || options.video) {
      trackPromise = (0, import_livekit_client18.createLocalTracks)(options);
      trackPromise.then((tracks2) => {
        if (needsCleanup) {
          tracks2.forEach((tr) => tr.stop());
        } else {
          setTracks(tracks2);
        }
      }).catch(onError);
    }
    return () => {
      needsCleanup = true;
      trackPromise == null ? void 0 : trackPromise.then(
        (tracks2) => tracks2.forEach((track) => {
          track.stop();
        })
      );
    };
  }, [JSON.stringify(options)]);
  return tracks;
}
function usePreviewDevice(enabled, deviceId, kind) {
  const [deviceError, setDeviceError] = React103.useState(null);
  const [isCreatingTrack, setIsCreatingTrack] = React103.useState(false);
  const devices = useMediaDevices({ kind });
  const [selectedDevice, setSelectedDevice] = React103.useState(
    void 0
  );
  const [localTrack, setLocalTrack] = React103.useState();
  const [localDeviceId, setLocalDeviceId] = React103.useState(deviceId);
  React103.useEffect(() => {
    setLocalDeviceId(deviceId);
  }, [deviceId]);
  const createTrack = (deviceId2, kind2) => __async(this, null, function* () {
    try {
      const track = kind2 === "videoinput" ? yield (0, import_livekit_client18.createLocalVideoTrack)({
        deviceId: deviceId2,
        resolution: import_livekit_client18.VideoPresets.h720.resolution
      }) : yield (0, import_livekit_client18.createLocalAudioTrack)({ deviceId: deviceId2 });
      const newDeviceId = yield track.getDeviceId();
      if (newDeviceId && deviceId2 !== newDeviceId) {
        prevDeviceId.current = newDeviceId;
        setLocalDeviceId(newDeviceId);
      }
      setLocalTrack(track);
    } catch (e) {
      if (e instanceof Error) {
        setDeviceError(e);
      }
    }
  });
  const switchDevice = (track, id) => __async(this, null, function* () {
    yield track.setDeviceId(id);
    prevDeviceId.current = id;
  });
  const prevDeviceId = React103.useRef(localDeviceId);
  React103.useEffect(() => {
    if (enabled && !localTrack && !deviceError && !isCreatingTrack) {
      import_components_core51.log.debug("creating track", kind);
      setIsCreatingTrack(true);
      createTrack(localDeviceId, kind).finally(() => {
        setIsCreatingTrack(false);
      });
    }
  }, [enabled, localTrack, deviceError, isCreatingTrack]);
  React103.useEffect(() => {
    if (!localTrack) {
      return;
    }
    if (!enabled) {
      import_components_core51.log.debug(`muting ${kind} track`);
      localTrack.mute().then(() => import_components_core51.log.debug(localTrack.mediaStreamTrack));
    } else if ((selectedDevice == null ? void 0 : selectedDevice.deviceId) && prevDeviceId.current !== (selectedDevice == null ? void 0 : selectedDevice.deviceId)) {
      import_components_core51.log.debug(`switching ${kind} device from`, prevDeviceId.current, selectedDevice.deviceId);
      switchDevice(localTrack, selectedDevice.deviceId);
    } else {
      import_components_core51.log.debug(`unmuting local ${kind} track`);
      localTrack.unmute();
    }
  }, [localTrack, selectedDevice, enabled, kind]);
  React103.useEffect(() => {
    return () => {
      if (localTrack) {
        import_components_core51.log.debug(`stopping local ${kind} track`);
        localTrack.stop();
        localTrack.mute();
      }
    };
  }, []);
  React103.useEffect(() => {
    setSelectedDevice(devices.find((dev) => dev.deviceId === localDeviceId));
  }, [localDeviceId, devices]);
  return {
    selectedDevice,
    localTrack,
    deviceError
  };
}
function PreJoin(_a) {
  var _b = _a, {
    defaults = {},
    onValidate,
    onSubmit,
    onError,
    debug,
    joinLabel = "Join Room",
    micLabel = "Microphone",
    camLabel = "Camera",
    userLabel = "Username",
    showE2EEOptions = false,
    persistUserChoices = true
  } = _b, htmlProps = __objRest(_b, [
    "defaults",
    "onValidate",
    "onSubmit",
    "onError",
    "debug",
    "joinLabel",
    "micLabel",
    "camLabel",
    "userLabel",
    "showE2EEOptions",
    "persistUserChoices"
  ]);
  var _a2, _b2;
  const [userChoices, setUserChoices] = React103.useState(DEFAULT_USER_CHOICES);
  const partialDefaults = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, defaults.audioDeviceId !== void 0 && { audioDeviceId: defaults.audioDeviceId }), defaults.videoDeviceId !== void 0 && { videoDeviceId: defaults.videoDeviceId }), defaults.audioEnabled !== void 0 && { audioEnabled: defaults.audioEnabled }), defaults.videoEnabled !== void 0 && { videoEnabled: defaults.videoEnabled }), defaults.username !== void 0 && { username: defaults.username });
  const {
    userChoices: initialUserChoices,
    saveAudioInputDeviceId,
    saveAudioInputEnabled,
    saveVideoInputDeviceId,
    saveVideoInputEnabled,
    saveUsername
  } = usePersistentUserChoices({
    defaults: partialDefaults,
    preventSave: !persistUserChoices,
    preventLoad: !persistUserChoices
  });
  const [audioEnabled, setAudioEnabled] = React103.useState(initialUserChoices.audioEnabled);
  const [videoEnabled, setVideoEnabled] = React103.useState(initialUserChoices.videoEnabled);
  const [audioDeviceId, setAudioDeviceId] = React103.useState(
    initialUserChoices.audioDeviceId
  );
  const [videoDeviceId, setVideoDeviceId] = React103.useState(
    initialUserChoices.videoDeviceId
  );
  const [username, setUsername] = React103.useState(initialUserChoices.username);
  const [e2ee, setE2ee] = React103.useState((_a2 = defaults.e2ee) != null ? _a2 : DEFAULT_USER_CHOICES.e2ee);
  const [sharedPassphrase, setSharedPassphrase] = React103.useState(
    (_b2 = defaults.sharedPassphrase) != null ? _b2 : DEFAULT_USER_CHOICES.sharedPassphrase
  );
  React103.useEffect(() => {
    saveAudioInputEnabled(audioEnabled);
  }, [audioEnabled, saveAudioInputEnabled]);
  React103.useEffect(() => {
    saveVideoInputEnabled(videoEnabled);
  }, [videoEnabled, saveVideoInputEnabled]);
  React103.useEffect(() => {
    saveAudioInputDeviceId(audioDeviceId);
  }, [audioDeviceId, saveAudioInputDeviceId]);
  React103.useEffect(() => {
    saveVideoInputDeviceId(videoDeviceId);
  }, [videoDeviceId, saveVideoInputDeviceId]);
  React103.useEffect(() => {
    saveUsername(username);
  }, [username, saveUsername]);
  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: initialUserChoices.audioDeviceId } : false,
      video: videoEnabled ? { deviceId: initialUserChoices.videoDeviceId } : false
    },
    onError
  );
  const videoEl = React103.useRef(null);
  const videoTrack = React103.useMemo(
    () => tracks == null ? void 0 : tracks.filter((track) => track.kind === import_livekit_client18.Track.Kind.Video)[0],
    [tracks]
  );
  const facingMode = React103.useMemo(() => {
    if (videoTrack) {
      const { facingMode: facingMode2 } = (0, import_livekit_client18.facingModeFromLocalTrack)(videoTrack);
      return facingMode2;
    } else {
      return "undefined";
    }
  }, [videoTrack]);
  const audioTrack = React103.useMemo(
    () => tracks == null ? void 0 : tracks.filter((track) => track.kind === import_livekit_client18.Track.Kind.Audio)[0],
    [tracks]
  );
  React103.useEffect(() => {
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }
    return () => {
      videoTrack == null ? void 0 : videoTrack.detach();
    };
  }, [videoTrack]);
  const [isValid, setIsValid] = React103.useState();
  const handleValidation = React103.useCallback(
    (values) => {
      if (typeof onValidate === "function") {
        return onValidate(values);
      } else {
        return values.username !== "";
      }
    },
    [onValidate]
  );
  React103.useEffect(() => {
    const newUserChoices = {
      username,
      videoEnabled,
      videoDeviceId,
      audioEnabled,
      audioDeviceId,
      e2ee,
      sharedPassphrase
    };
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices));
  }, [
    username,
    videoEnabled,
    handleValidation,
    audioEnabled,
    audioDeviceId,
    videoDeviceId,
    sharedPassphrase,
    e2ee
  ]);
  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation(userChoices)) {
      if (typeof onSubmit === "function") {
        onSubmit(userChoices);
      }
    } else {
      import_components_core51.log.warn("Validation failed with: ", userChoices);
    }
  }
  useWarnAboutMissingStyles();
  return /* @__PURE__ */ React103.createElement("div", __spreadValues({ className: "lk-prejoin" }, htmlProps), /* @__PURE__ */ React103.createElement("div", { className: "lk-video-container" }, videoTrack && /* @__PURE__ */ React103.createElement("video", { ref: videoEl, width: "1280", height: "720", "data-lk-facing-mode": facingMode }), (!videoTrack || !videoEnabled) && /* @__PURE__ */ React103.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ React103.createElement(ParticipantPlaceholder_default, null))), /* @__PURE__ */ React103.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ React103.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ React103.createElement(
    TrackToggle,
    {
      initialState: audioEnabled,
      source: import_livekit_client18.Track.Source.Microphone,
      onChange: (enabled) => setAudioEnabled(enabled)
    },
    micLabel
  ), /* @__PURE__ */ React103.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React103.createElement(
    MediaDeviceMenu,
    {
      initialSelection: audioDeviceId,
      kind: "audioinput",
      disabled: !audioTrack,
      tracks: { audioinput: audioTrack },
      onActiveDeviceChange: (_, id) => setAudioDeviceId(id)
    }
  ))), /* @__PURE__ */ React103.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ React103.createElement(
    TrackToggle,
    {
      initialState: videoEnabled,
      source: import_livekit_client18.Track.Source.Camera,
      onChange: (enabled) => setVideoEnabled(enabled)
    },
    camLabel
  ), /* @__PURE__ */ React103.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React103.createElement(
    MediaDeviceMenu,
    {
      initialSelection: videoDeviceId,
      kind: "videoinput",
      disabled: !videoTrack,
      tracks: { videoinput: videoTrack },
      onActiveDeviceChange: (_, id) => setVideoDeviceId(id)
    }
  )))), /* @__PURE__ */ React103.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ React103.createElement(
    "input",
    {
      className: "lk-form-control",
      id: "username",
      name: "username",
      type: "text",
      defaultValue: username,
      placeholder: userLabel,
      onChange: (inputEl) => setUsername(inputEl.target.value),
      autoComplete: "off"
    }
  ), showE2EEOptions && /* @__PURE__ */ React103.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } }, /* @__PURE__ */ React103.createElement("div", { style: { display: "flex", flexDirection: "row", gap: "1rem" } }, /* @__PURE__ */ React103.createElement(
    "input",
    {
      id: "use-e2ee",
      type: "checkbox",
      checked: e2ee,
      onChange: (ev) => setE2ee(ev.target.checked)
    }
  ), /* @__PURE__ */ React103.createElement("label", { htmlFor: "use-e2ee" }, "Enable end-to-end encryption")), e2ee && /* @__PURE__ */ React103.createElement("div", { style: { display: "flex", flexDirection: "row", gap: "1rem" } }, /* @__PURE__ */ React103.createElement("label", { htmlFor: "passphrase" }, "Passphrase"), /* @__PURE__ */ React103.createElement(
    "input",
    {
      id: "passphrase",
      type: "password",
      value: sharedPassphrase,
      onChange: (ev) => setSharedPassphrase(ev.target.value)
    }
  ))), /* @__PURE__ */ React103.createElement(
    "button",
    {
      className: "lk-button lk-join-button",
      type: "submit",
      onClick: handleSubmit,
      disabled: !isValid
    },
    joinLabel
  )), debug && /* @__PURE__ */ React103.createElement(React103.Fragment, null, /* @__PURE__ */ React103.createElement("strong", null, "User Choices:"), /* @__PURE__ */ React103.createElement("ul", { className: "lk-list", style: { overflow: "hidden", maxWidth: "15rem" } }, /* @__PURE__ */ React103.createElement("li", null, "Username: ", `${userChoices.username}`), /* @__PURE__ */ React103.createElement("li", null, "Video Enabled: ", `${userChoices.videoEnabled}`), /* @__PURE__ */ React103.createElement("li", null, "Audio Enabled: ", `${userChoices.audioEnabled}`), /* @__PURE__ */ React103.createElement("li", null, "Video Device: ", `${userChoices.videoDeviceId}`), /* @__PURE__ */ React103.createElement("li", null, "Audio Device: ", `${userChoices.audioDeviceId}`))));
}

// src/prefabs/VideoConference.tsx
var import_components_core53 = require("@livekit/components-core");
var import_livekit_client20 = require("livekit-client");
var React106 = __toESM(require("react"));

// src/prefabs/ControlBar.tsx
var import_livekit_client19 = require("livekit-client");
var React105 = __toESM(require("react"));
var import_components_core52 = require("@livekit/components-core");

// src/components/controls/StartMediaButton.tsx
var React104 = __toESM(require("react"));
function StartMediaButton(_a) {
  var _b = _a, { label } = _b, props = __objRest(_b, ["label"]);
  const room = useRoomContext();
  const { mergedProps: audioProps, canPlayAudio } = useStartAudio({ room, props });
  const { mergedProps, canPlayVideo } = useStartVideo({ room, props: audioProps });
  const _a2 = mergedProps, { style } = _a2, restProps = __objRest(_a2, ["style"]);
  style.display = canPlayAudio && canPlayVideo ? "none" : "block";
  return /* @__PURE__ */ React104.createElement("button", __spreadValues({ style }, restProps), label != null ? label : `Start ${!canPlayAudio ? "Audio" : "Video"}`);
}

// src/prefabs/ControlBar.tsx
function ControlBar(_a) {
  var _b = _a, {
    variation,
    controls,
    saveUserChoices: saveUserChoices2 = true
  } = _b, props = __objRest(_b, [
    "variation",
    "controls",
    "saveUserChoices"
  ]);
  var _a2, _b2, _c, _d, _e;
  const [isChatOpen, setIsChatOpen] = React105.useState(false);
  const layoutContext = useMaybeLayoutContext();
  React105.useEffect(() => {
    var _a3, _b3;
    if (((_a3 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _a3.showChat) !== void 0) {
      setIsChatOpen((_b3 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _b3.showChat);
    }
  }, [(_a2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _a2.showChat]);
  const isTooLittleSpace = useMediaQuery(`(max-width: ${isChatOpen ? 1e3 : 760}px)`);
  const defaultVariation = isTooLittleSpace ? "minimal" : "verbose";
  variation != null ? variation : variation = defaultVariation;
  const visibleControls = __spreadValues({ leave: true }, controls);
  const localPermissions = useLocalParticipantPermissions();
  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    (_b2 = visibleControls.camera) != null ? _b2 : visibleControls.camera = localPermissions.canPublish;
    (_c = visibleControls.microphone) != null ? _c : visibleControls.microphone = localPermissions.canPublish;
    (_d = visibleControls.screenShare) != null ? _d : visibleControls.screenShare = localPermissions.canPublish;
    (_e = visibleControls.chat) != null ? _e : visibleControls.chat = localPermissions.canPublishData && (controls == null ? void 0 : controls.chat);
  }
  const showIcon = React105.useMemo(
    () => variation === "minimal" || variation === "verbose",
    [variation]
  );
  const showText = React105.useMemo(
    () => variation === "textOnly" || variation === "verbose",
    [variation]
  );
  const browserSupportsScreenSharing = (0, import_components_core52.supportsScreenSharing)();
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React105.useState(false);
  const onScreenShareChange = React105.useCallback(
    (enabled) => {
      setIsScreenShareEnabled(enabled);
    },
    [setIsScreenShareEnabled]
  );
  const htmlProps = mergeProps2({ className: "lk-control-bar" }, props);
  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId
  } = usePersistentUserChoices({ preventSave: !saveUserChoices2 });
  const microphoneOnChange = React105.useCallback(
    (enabled, isUserInitiated) => isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled]
  );
  const cameraOnChange = React105.useCallback(
    (enabled, isUserInitiated) => isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled]
  );
  return /* @__PURE__ */ React105.createElement("div", __spreadValues({}, htmlProps), visibleControls.microphone && /* @__PURE__ */ React105.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React105.createElement(
    TrackToggle,
    {
      source: import_livekit_client19.Track.Source.Microphone,
      showIcon,
      onChange: microphoneOnChange
    },
    showText && "Microphone"
  ), /* @__PURE__ */ React105.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React105.createElement(
    MediaDeviceMenu,
    {
      kind: "audioinput",
      onActiveDeviceChange: (_kind, deviceId) => saveAudioInputDeviceId(deviceId != null ? deviceId : "")
    }
  ))), visibleControls.camera && /* @__PURE__ */ React105.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React105.createElement(TrackToggle, { source: import_livekit_client19.Track.Source.Camera, showIcon, onChange: cameraOnChange }, showText && "Camera"), /* @__PURE__ */ React105.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React105.createElement(
    MediaDeviceMenu,
    {
      kind: "videoinput",
      onActiveDeviceChange: (_kind, deviceId) => saveVideoInputDeviceId(deviceId != null ? deviceId : "")
    }
  ))), visibleControls.screenShare && browserSupportsScreenSharing && /* @__PURE__ */ React105.createElement(
    TrackToggle,
    {
      source: import_livekit_client19.Track.Source.ScreenShare,
      captureOptions: { audio: true, selfBrowserSurface: "include" },
      showIcon,
      onChange: onScreenShareChange
    },
    showText && (isScreenShareEnabled ? "Stop screen share" : "Share screen")
  ), visibleControls.chat && /* @__PURE__ */ React105.createElement(ChatToggle, null, showIcon && /* @__PURE__ */ React105.createElement(ChatIcon_default, null), showText && "Chat"), visibleControls.leave && /* @__PURE__ */ React105.createElement(DisconnectButton, null, showIcon && /* @__PURE__ */ React105.createElement(LeaveIcon_default, null), showText && "Leave"), /* @__PURE__ */ React105.createElement(StartMediaButton, null));
}

// src/prefabs/VideoConference.tsx
function VideoConference(_a) {
  var _b = _a, {
    chatMessageFormatter,
    chatMessageDecoder,
    chatMessageEncoder
  } = _b, props = __objRest(_b, [
    "chatMessageFormatter",
    "chatMessageDecoder",
    "chatMessageEncoder"
  ]);
  var _a2, _b2;
  const [widgetState, setWidgetState] = React106.useState({
    showChat: false,
    unreadMessages: 0
  });
  const lastAutoFocusedScreenShareTrack = React106.useRef(null);
  const tracks = useTracks(
    [
      { source: import_livekit_client20.Track.Source.Camera, withPlaceholder: true },
      { source: import_livekit_client20.Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { updateOnlyOn: [import_livekit_client20.RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );
  const widgetUpdate = (state) => {
    import_components_core53.log.debug("updating widget state", state);
    setWidgetState(state);
  };
  const layoutContext = useCreateLayoutContext();
  const screenShareTracks = tracks.filter(import_components_core53.isTrackReference).filter((track) => track.publication.source === import_livekit_client20.Track.Source.ScreenShare);
  const focusTrack = (_a2 = usePinnedTracks(layoutContext)) == null ? void 0 : _a2[0];
  const carouselTracks = tracks.filter((track) => !(0, import_components_core53.isEqualTrackRef)(track, focusTrack));
  React106.useEffect(() => {
    var _a3, _b3, _c, _d;
    if (screenShareTracks.some((track) => track.publication.isSubscribed) && lastAutoFocusedScreenShareTrack.current === null) {
      import_components_core53.log.debug("Auto set screen share focus:", { newScreenShareTrack: screenShareTracks[0] });
      (_b3 = (_a3 = layoutContext.pin).dispatch) == null ? void 0 : _b3.call(_a3, { msg: "set_pin", trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (lastAutoFocusedScreenShareTrack.current && !screenShareTracks.some(
      (track) => {
        var _a4, _b4;
        return track.publication.trackSid === ((_b4 = (_a4 = lastAutoFocusedScreenShareTrack.current) == null ? void 0 : _a4.publication) == null ? void 0 : _b4.trackSid);
      }
    )) {
      import_components_core53.log.debug("Auto clearing screen share focus.");
      (_d = (_c = layoutContext.pin).dispatch) == null ? void 0 : _d.call(_c, { msg: "clear_pin" });
      lastAutoFocusedScreenShareTrack.current = null;
    }
  }, [
    screenShareTracks.map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`).join(),
    (_b2 = focusTrack == null ? void 0 : focusTrack.publication) == null ? void 0 : _b2.trackSid
  ]);
  useWarnAboutMissingStyles();
  return /* @__PURE__ */ React106.createElement("div", __spreadValues({ className: "lk-video-conference" }, props), (0, import_components_core53.isWeb)() && /* @__PURE__ */ React106.createElement(
    LayoutContextProvider,
    {
      value: layoutContext,
      onWidgetChange: widgetUpdate
    },
    /* @__PURE__ */ React106.createElement("div", { className: "lk-video-conference-inner" }, !focusTrack ? /* @__PURE__ */ React106.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ React106.createElement(GridLayout, { tracks }, /* @__PURE__ */ React106.createElement(ParticipantTile, null))) : /* @__PURE__ */ React106.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ React106.createElement(FocusLayoutContainer, null, /* @__PURE__ */ React106.createElement(CarouselLayout, { tracks: carouselTracks }, /* @__PURE__ */ React106.createElement(ParticipantTile, null)), focusTrack && /* @__PURE__ */ React106.createElement(FocusLayout, { trackRef: focusTrack }))), /* @__PURE__ */ React106.createElement(ControlBar, { controls: { chat: true } })),
    /* @__PURE__ */ React106.createElement(
      Chat,
      {
        style: { display: widgetState.showChat ? "grid" : "none" },
        messageFormatter: chatMessageFormatter,
        messageEncoder: chatMessageEncoder,
        messageDecoder: chatMessageDecoder
      }
    )
  ), /* @__PURE__ */ React106.createElement(RoomAudioRenderer, null), /* @__PURE__ */ React106.createElement(ConnectionStateToast, null));
}

// src/prefabs/AudioConference.tsx
var React107 = __toESM(require("react"));
var import_livekit_client21 = require("livekit-client");
function AudioConference(_a) {
  var props = __objRest(_a, []);
  const [widgetState, setWidgetState] = React107.useState({
    showChat: false,
    unreadMessages: 0
  });
  const audioTracks = useTracks([import_livekit_client21.Track.Source.Microphone]);
  useWarnAboutMissingStyles();
  return /* @__PURE__ */ React107.createElement(LayoutContextProvider, { onWidgetChange: setWidgetState }, /* @__PURE__ */ React107.createElement("div", __spreadValues({ className: "lk-audio-conference" }, props), /* @__PURE__ */ React107.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ React107.createElement(TrackLoop, { tracks: audioTracks }, /* @__PURE__ */ React107.createElement(ParticipantAudioTile, null))), /* @__PURE__ */ React107.createElement(
    ControlBar,
    {
      controls: { microphone: true, screenShare: false, camera: false, chat: true }
    }
  ), widgetState.showChat && /* @__PURE__ */ React107.createElement(Chat, null)));
}

// src/index.ts
var import_components_core54 = require("@livekit/components-core");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioConference,
  AudioTrack,
  AudioVisualizer,
  CameraDisabledIcon,
  CameraIcon,
  CarouselLayout,
  CarouselView,
  Chat,
  ChatCloseIcon,
  ChatEntry,
  ChatIcon,
  ChatToggle,
  Chevron,
  ClearPinButton,
  ConnectionQualityIndicator,
  ConnectionState,
  ConnectionStateToast,
  ControlBar,
  DisconnectButton,
  FocusLayout,
  FocusLayoutContainer,
  FocusToggle,
  FocusToggleIcon,
  GearIcon,
  GridLayout,
  LKFeatureContext,
  LayoutContext,
  LayoutContextProvider,
  LeaveIcon,
  LiveKitRoom,
  LockLockedIcon,
  MediaDeviceMenu,
  MediaDeviceSelect,
  MicDisabledIcon,
  MicIcon,
  ParticipantAudioTile,
  ParticipantContext,
  ParticipantContextIfNeeded,
  ParticipantLoop,
  ParticipantName,
  ParticipantPlaceholder,
  ParticipantTile,
  PreJoin,
  QualityExcellentIcon,
  QualityGoodIcon,
  QualityPoorIcon,
  QualityUnknownIcon,
  RoomAudioRenderer,
  RoomContext,
  RoomName,
  ScreenShareIcon,
  ScreenShareStopIcon,
  SpinnerIcon,
  StartAudio,
  Toast,
  TrackContext,
  TrackLoop,
  TrackMutedIndicator,
  TrackRefContext,
  TrackToggle,
  UnfocusToggleIcon,
  VideoConference,
  VideoTrack,
  formatChatMessageLinks,
  isTrackReference,
  setLogExtension,
  setLogLevel,
  useAudioPlayback,
  useChat,
  useChatToggle,
  useClearPinButton,
  useConnectionQualityIndicator,
  useConnectionState,
  useCreateLayoutContext,
  useDataChannel,
  useDisconnectButton,
  useEnsureCreateLayoutContext,
  useEnsureLayoutContext,
  useEnsureParticipant,
  useEnsureRoom,
  useEnsureTrackRef,
  useEnsureTrackReference,
  useFacingMode,
  useFeatureContext,
  useFocusToggle,
  useGridLayout,
  useIsEncrypted,
  useIsMuted,
  useIsSpeaking,
  useLayoutContext,
  useLiveKitRoom,
  useLocalParticipant,
  useLocalParticipantPermissions,
  useMaybeLayoutContext,
  useMaybeParticipantContext,
  useMaybeRoomContext,
  useMaybeTrackContext,
  useMaybeTrackRefContext,
  useMediaDeviceSelect,
  useMediaDevices,
  useMediaTrack,
  useMediaTrackByName,
  useMultibandTrackVolume,
  usePagination,
  useParticipantContext,
  useParticipantInfo,
  useParticipantPermissions,
  useParticipantTile,
  useParticipants,
  usePersistentUserChoices,
  usePinnedTracks,
  usePreviewDevice,
  usePreviewTracks,
  useRemoteParticipant,
  useRemoteParticipants,
  useRoomContext,
  useRoomInfo,
  useSortedParticipants,
  useSpeakingParticipants,
  useStartAudio,
  useStartVideo,
  useSwipe,
  useToken,
  useTrack,
  useTrackByName,
  useTrackContext,
  useTrackMutedIndicator,
  useTrackRefContext,
  useTrackToggle,
  useTrackVolume,
  useTracks,
  useVisualStableUpdate
});
//# sourceMappingURL=index.js.map