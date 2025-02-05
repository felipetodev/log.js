const FLAGS_TOGGLES = {
  'SHARE_CODE': 'SHARE_CODE'
} as const;

export const FEATURE_FLAGS: Record<string, boolean> = {
  [FLAGS_TOGGLES.SHARE_CODE]: true
};
