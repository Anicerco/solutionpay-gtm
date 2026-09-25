# Solution Pay · Singular Web SDK (GTM) demo

Demo site for a fictional fintech, used to test the Singular Web SDK through Google Tag Manager, web-to-app attribution with Singular Links, and identity continuity from web to the mobile app. It is not a real financial institution.

Built with React, Vite, MUI and React Router. Available in Spanish, English and Portuguese.

## What it demonstrates

- **Web SDK via GTM:** the site only pushes events to the `dataLayer`. GTM loads and calls the Singular Web SDK using the official *Singular Web Tracking* template.
- **Web funnel:** anonymous visit → Personal Banking login → banking actions → logout. After login, every event carries the same `user_id`, which GTM sets as the Singular Custom User ID.
- **Web-to-app:** every "…in the app" CTA is a real `<a href>` to a Singular Link with its own deeplink (`_dl` / `_ddl`) and passthrough (`_p` with `lang` and `uid`). When the SDK is loaded, the GTM *Open App* tag opens the link with the web campaign parameters (`_web_params`). Otherwise the link opens as is.
- **App side:** the app reads `uid` and `lang` from the passthrough, sets the same Custom User ID and opens the matching product screen.
- **Debug panel:** the "Singular" button shows GTM / SDK status, the current `user_id`, the last web-to-app link and recent `dataLayer` events.

## dataLayer events

| Event | When |
|---|---|
| `virtual_page_view` | SPA route change (not on first load; SDK init already records it) |
| `login_view`, `login_start`, `sign_up_start` | Login page |
| `sign_up`, `login` (with `user_id`) | Registration / login |
| `banking_home_view`, `transfer_start`, `bill_payment_start`, `card_request_start`, `investment_start` | Web banking |
| `logout` | Logout |
| `singular_web_to_app_click` | Click on any web-to-app link (`w2a_product`, `w2a_placement`, `w2a_base_link`, `w2a_handler`) |
| `help_tile_click`, `personal_banking_click`, `language_change`, `password_reset_click` | Other interactions |

## Run locally

```bash
npm install
npm run dev
```

Append `?lang=en|es|pt` to force a language, and UTM parameters (for example `?utm_source=google&utm_campaign=demo`) to test web-to-app parameter forwarding.
