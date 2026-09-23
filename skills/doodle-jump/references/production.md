# Narration-led production

## Input and timing

Inspect only named audio/script files. Probe duration and streams with `ffprobe`; distinguish a video container carrying narration from sound effects or music. Preserve the source and make a project-local working copy. The script explains intent; the spoken recording controls exact duration and caption words.

Obtain word- or phrase-level measured timing using an available transcription/alignment tool. Prefer local transcription when configured; use the `remotion-captions` skill for its concrete transcription route when needed. Use a multilingual model for Russian. Preserve ASR uncertainty and listen around names, numbers, low-confidence words and divergent script sections. Do not manufacture timing by evenly distributing script words.

Caption input is a JSON array of `{text, startMs, endMs, timestampMs, confidence, pageBreakAfter?}`. Leading spaces separate tokens. Use phrase/page breaks for at most two readable lines. The starter uses exact millisecond highlighting and configurable `until-next`/spoken-interval persistence.

To attach new narration with measured tokens:

```bash
node scripts/attach-narration.mjs /absolute/audio.wav /absolute/measured-words.json /absolute/script.txt
```

The helper preserves the script, copies audio, derives composition duration, clears demo labels and produces a fixed-cadence mechanical route. It leaves `timingStatus: needs-review`. Keep the cadence steady; express spoken timing with `beats.json`, selected `landingId` links, phrase page breaks, story objects and theme cues. For replacement narration, inspect the timing differences and update affected semantic ranges instead of rerunning the attach helper.

Store a compact `beatPlan` in `project-spec.json`: event ID, exact spoken phrase, start/end frames, viewer-visible goal, action or reveal, visible result, landing ID if any, required asset and QA frames. Put renderable timing in `src/data/beats.json`; read [story-beats.md](story-beats.md) for its schema. Replace superseded decisions and keep measured narration timing separate from editorial assumptions. The final composition must contain the complete audio and a deliberate ending.

## Attention rhythm

Use approximately two seconds as an editorial target for a meaningful development in the picture. Place events at measured narration cues, and let a phrase, reading interval or payoff determine their exact duration. Record a short `holdReason` in the beat plan when a longer hold is deliberate. Keep the recording's natural timing.

Build connected microgoals: show what the hero is approaching, develop anticipation, show the action, then make its result readable. Introduce a visible goal in the opening; develop or complicate it through the climb and resolve it in the ending. Each phase can occupy its own beat. Repeated filler jumps, continuous scrolling, routine caption changes and identical landing sounds alone do not establish a new story beat.

Choose events that express the current spoken idea:

- **Anticipation:** reveal a relevant object, destination or unfamiliar silhouette ahead of the hero.
- **Obstacle:** a platform moves, cracks or becomes blocked because of a development in the story.
- **Action and reward:** the hero collects, combines or uses an object; the result reveals a fact or changes the next step.
- **Reaction:** a readable pose, expression or brief hesitation responds to what just happened.
- **Scale:** a motivated close-up reveals a useful detail, then returns to the journey. Keep subtitles in their fixed screen-space region.
- **World development:** transform the environment as the subject changes, preserving the hero's position and camera continuity.

For example, “the system became more complex” can branch a platform; “everything depended on one element” can show the hero remove a support and the structure collapse. Adapt the event to the actual claim. Build variation through consequences and escalating goals rather than an unrelated succession of gags. Use one primary event at a time and give its result enough screen time to read alongside the lower subtitles. Use sound accents at meaningful action cues, not as an automatic two-second pulse.

During proxy review, compare the actual image with every planned goal, action and result. Inspect the opening, intervals between developments and the ending; flag stretches longer than roughly two seconds with no new information or developing anticipation. Give each flagged stretch a motivated event, tighter visual pacing or a recorded deliberate hold. Check that the apparent novelty is visible and understandable at phone size. The engine's mechanics checks do not measure editorial rhythm or viewer attention.

## Assets and implementation

Read `asset-packs.md` when art is needed. Use a single theme for a new story unless the script motivates a transition. Replace the technical demo copy, art and route to the degree the user's story requires. Additional images, historical objects and locations are story props with explicit cue lifetimes. Era transitions change the environment, hero and future platforms together on a contact; already-visible platforms retain the era in which they appeared.

The starter follows the production pattern of `paint95-video-maker`: narration timing, shared cues, persistent object, targeted QA, proxy, final. Paint windows, stop-motion cadence, brush reveals and unrelated example-specific rules do not apply unless requested. This skill is self-contained; existing Paint95 projects and global model configuration are outside its initialization scope.

## Proxy and final

1. Run `npm run check`; render affected stills with `npm run qa` or a targeted `remotion still` command.
2. Inspect the motion in a complete `npm run proxy` output, including the world joins, final settle and the [attention-rhythm review](#attention-rhythm). Run `npm run review` for two-second full-timeline sheets and dense one-second motion strips. This local evidence path remains available when a video-viewing tool is unavailable.
3. Listen to narration and SFX together. A source file and a nominal gain do not establish audibility. Inspect mixed-waveform transients at contact cues and adjust gain if needed; avoid clipping or an audible tail after the ending.
4. Review measured caption onsets and spoken phrase beats. Set `timingStatus: reviewed`, render once at final quality, then use `ffprobe` to verify 1080×1920, intended FPS, complete duration and audio/video streams.

Keep noisy logs under `out/logs/`; render helpers return compact summaries. Avoid full-quality exports for local styling checks. Preserve the last known-good render until the changed output is verified.
