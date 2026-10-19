// Seller configuration (public — safe to commit). No secrets here.
window.WG_CONFIG={
  // Ed25519 public key that verifies WG1- keys (private key stays in keys/ on the seller's machine only).
  publicKey:'q4tx5y75pG5QRVsGsImleNppelnGyRE2UDD3APBVDuc=',
  // Key service (Cloudflare Worker) URL, e.g. 'https://welcome-guide-keys.<you>.workers.dev'. Empty = no online revocation check.
  serviceUrl:'',
  // Gumroad product_id (Product → Content/Settings → License key section). Empty = Gumroad license keys not accepted.
  gumroadProductId:'uFNvVqw_7tbo_p2oDtWYvg==',
  buyUrl:'https://cjtools.gumroad.com/l/zxymj',          // where the "Buy a key" link points (Gumroad/Etsy listing)
  etsyClaimUrl:'',      // usually serviceUrl + '/claim'
  // EMERGENCY REVOKE LIST: key ids (kid, 12 hex chars) or Gumroad license keys that must stop working. Push to main to apply.
  revoked:['4bb39b5e160f'] // 4bb39b5e160f = test key used by QA to prove revocation works; safe to remove
};
