# Product Description: SocialVibe

## 1. Introduction

SocialVibe is an AI-powered agent designed to automate and optimize engagement on social media platforms, starting with X (formerly Twitter). The primary goal is to achieve "smart engagement on steroids," enabling users to significantly grow their targeted audience and enhance their online presence with minimal manual intervention.

## 2. Vision

To provide users with a personal AI assistant that intelligently interacts with relevant online communities, builds a strong niche following, and ultimately creates opportunities for business or influence scaling, akin to a "personal ATM."

## 3. Core Problem Statement

Manually tracking influential accounts, identifying viral content, and crafting timely, engaging replies to gain visibility is a time-consuming and often inconsistent process. Users struggle to:
-   Monitor key accounts and posts in real-time.
-   Identify posts with high viral potential quickly.
-   Generate high-quality, contextually relevant replies in their unique voice.
-   Post consistently during peak traffic hours.
-   Scale engagement efforts to significantly grow a targeted follower base.

## 4. Target Users

-   Individuals (like Mihnea and George) looking to build a personal brand or niche following on X.
-   Small business owners aiming to increase visibility and engagement within their target market.
-   Content creators and influencers seeking to automate aspects of their audience growth.

## 5. Key Features & Functionality (Based on Initial Discussions)

### Phase 1: Growth (0 - 5,000 Followers) - Reply Focused

* **Target Account Monitoring:**
    * User provides a list of select X accounts to monitor.
    * Agent operates server-side, receives X.com cookie session data from iOS client via REST API.
    * Uses Thirtyfour (Rust) to power a headless web driver, loading the X account page for each monitored account.
* **Viral Post Detection & Alerting:**
    * Agent listens for notifications (new posts from monitored accounts, new replies to user's posts) in real-time.
    * Computes or predicts virality and engagement potential, assigns scores, and orders them.
    * Push notification server sends prioritized engagement opportunities to the user's iOS device (ideally within the first minute).
* **AI-Suggested Replies:**
    * Based on the viral post's content, suggest 4-5 reply options.
    * Replies are generated based on user-predefined styles/tones and strategic context.
    * User can approve or edit suggestions before posting, or enable YOLO mode for auto-posting.
* **Scheduled Engagement:**
    * Engage during predefined peak traffic hours.
* **Learning & Adaptation:**
    * Agent learns from approved/edited replies to improve future suggestions and better match the user's style.
    * Retrospective analysis of approved content for fine-tuning.
* **LLM Efficiency:**
    * When multiple users monitor the same content, the agent batches LLM requests for reply generation, tagging responses for routing to the correct user, saving on LLM costs.
* **Multi-Provider & Multi-Account Support:**
    * REST API structure supports multiple social networks (X, Substack, etc.) and multiple accounts per user, using endpoints like `/v1/user/{user_id}/provider/{provider_id}/accounts/{account_id}/`.
* **Goal:** Maximize impressions and funnel users to the profile for follows.

### Phase 2: Authority Building (5,000 - 10,000+ Followers) - Original Content Focused

* **Shift to Original Content:** As follower count grows, reduce reply frequency and increase original posts.
* **AI-Generated Content (User's Style & Niche):**
    * Generate content (threads, individual posts) based on user-defined topics, style, and strategic context (e.g., persuasive frameworks).
    * Leverage memory of past successful (approved) content.
* **Automated Posting (Optional):**
    * With sufficient learning and user trust, allow fully automated posting without prior approval.
* **Profile Optimization Guidance (Conceptual):**
    * The user's profile must be impeccable to convert impressions to followers (User responsibility, but agent strategy should align).

## 6. Success Metrics

* Follower growth rate (targeting 10,000 niche followers within 3 months as an ambitious goal).
* Impressions per reply/post.
* Engagement rate (likes, retweets, comments on agent-assisted content).
* Conversion rate of profile views to follows.
* User time saved managing X engagement.
* Qualitative feedback on reply/content quality and style match.

## 7. Non-Goals (Initially)

* Managing DMs or complex conversations beyond initial replies.
* Advanced sentiment analysis beyond identifying viral potential.
* Supporting platforms other than X (Substack mentioned as a future possibility, but not in scope for MVP).
* Spamming or overly aggressive posting patterns that could trigger platform penalties. Smart, not just voluminous, engagement is key.

## 8. Underlying Principles from Discussions

* **Targeted Niche Growth:** Focus on attracting followers interested in a specific niche for better conversion/sales potential.
* **Authenticity:** Replies and content should ideally sound like the user. AI should adapt to the user's style.
* **Strategic Context:** Content generation should be guided by explicit strategic inputs (e.g., persuasive frameworks, target audience needs).
* **Progressive Automation:** Start with human-in-the-loop (approval) and move towards more autonomy as the agent learns and trust is built.
* **Efficiency:** Aim for 24/7 operation with minimal daily user intervention for approvals.
* **Ethical Engagement:** Avoid spam. Mine for genuine engagement opportunities.
