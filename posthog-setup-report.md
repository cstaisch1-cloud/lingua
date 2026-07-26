<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Lingua language learning Expo app. The following changes were made:

- **Installed** `posthog-react-native` and required Expo peer dependencies (`expo-file-system`, `expo-application`, `expo-device`, `expo-localization`, `react-native-svg`).
- **Created** `app.config.js` (converted from `app.json`) to expose PostHog env vars via `Constants.expoConfig?.extra`.
- **Created** `lib/posthog.ts` — singleton PostHog client configured from `expo-constants`, with graceful no-op when env vars are missing and a loud dev warning.
- **Updated** `app/_layout.tsx` — wrapped the app with `PostHogProvider` (autocapture: touches enabled, manual screen tracking) and added a `useEffect` for `posthog.screen()` on every Expo Router pathname change.
- **Updated** `app/(auth)/sign-in.tsx` — captures `user_signed_in` after successful email-code verification and Google SSO; calls `posthog.identify()` on email sign-in.
- **Updated** `app/(auth)/sign-up.tsx` — captures `user_signed_up` after email verification and Google SSO; calls `posthog.identify()` with `$set_once: { first_signup_date }` on email sign-up.
- **Updated** `app/language-select.tsx` — captures `language_selected` with `language_id` and `previous_language` when the user confirms their choice.
- **Updated** `app/(tabs)/profile.tsx` — captures `user_signed_out` and calls `posthog.reset()` before Clerk `signOut()`.
- **Updated** `app/(tabs)/home.tsx` — captures `lesson_continued` (Continue card and View All button) with `language_id`, `unit_id`, `lesson_id`; captures `ai_teacher_opened` (AI Video Call card) with `language_id`.
- **Set** `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` in `.env.local`.

| Event | Description | File |
|---|---|---|
| `user_signed_up` | Fired when a user successfully completes email or Google sign-up | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | Fired when a user successfully signs in via email code or Google SSO | `app/(auth)/sign-in.tsx` |
| `language_selected` | Fired when a user confirms their learning language selection | `app/language-select.tsx` |
| `user_signed_out` | Fired when a user taps the Sign Out button on the profile screen | `app/(tabs)/profile.tsx` |
| `lesson_continued` | Fired when a user taps Continue or View All to resume their current lesson | `app/(tabs)/home.tsx` |
| `ai_teacher_opened` | Fired when a user taps the AI Video Call card on the home screen | `app/(tabs)/home.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/526936/dashboard/1906135)
- **Insight**: [New sign-ups per day](https://us.posthog.com/project/526936/insights/lPuw1cLC)
- **Insight**: [Sign-up to language selection funnel](https://us.posthog.com/project/526936/insights/KzeViODR)
- **Insight**: [Language selections by language](https://us.posthog.com/project/526936/insights/rxvCrW2o)
- **Insight**: [Lesson engagement funnel](https://us.posthog.com/project/526936/insights/dwAC5fqF)
- **Insight**: [Sign-in method breakdown](https://us.posthog.com/project/526936/insights/tmpxxDm4)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Confirm the returning-visitor path also calls `identify` — currently `identify` is called on sign-up/sign-in completion; if a Clerk session is restored automatically on app launch (via `tokenCache`), that session should also trigger `posthog.identify()` with the Clerk user ID so returning sessions are not anonymous.
- [ ] This project uses Clerk for authentication. Running `npx @posthog/wizard warehouse` will connect Clerk user data to PostHog's data warehouse for richer person profiles.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
